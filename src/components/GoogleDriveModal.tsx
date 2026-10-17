import React, { useState, useEffect } from 'react';
import { DiagramState } from '../types';
import { 
  GoogleUser, 
  DriveFileItem, 
  authenticateWithGoogle, 
  uploadToGoogleDrive, 
  listDriveDiagrams, 
  downloadDriveFileContent 
} from '../services/googleDrive';
import { exportCanvasToBlob } from '../utils/exportUtils';
import { 
  Cloud, 
  HardDrive, 
  LogOut, 
  LogIn, 
  FileJson, 
  Image as ImageIcon, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  FolderOpen, 
  X, 
  UploadCloud, 
  RefreshCw,
  UserCheck
} from 'lucide-react';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagram: DiagramState;
  setDiagram: React.Dispatch<React.SetStateAction<DiagramState>>;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  googleUser: GoogleUser | null;
  setGoogleUser: (user: GoogleUser | null) => void;
  theme?: 'dark' | 'light';
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  diagram,
  setDiagram,
  canvasRef,
  googleUser,
  setGoogleUser,
  theme = 'dark'
}) => {
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState<'save' | 'open'>('save');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string; link?: string } | null>(null);
  
  const [saveFormat, setSaveFormat] = useState<'json' | 'png'>('json');
  const [customFileName, setCustomFileName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCustomFileName(`MultiCloudCanvas_${(diagram.title || 'Architecture').replace(/\s+/g, '_')}`);
      setStatusMessage(null);
      if (googleUser && activeTab === 'open') {
        fetchFiles();
      }
    }
  }, [isOpen, diagram.title, googleUser, activeTab]);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setIsAuthenticating(true);
    setStatusMessage(null);
    try {
      const user = await authenticateWithGoogle();
      setGoogleUser(user);
      setStatusMessage({
        type: 'success',
        text: `Conectado com sucesso como ${user.email}!`
      });
    } catch (err: any) {
      console.error('Google Login Error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Falha ao autenticar com a conta Google. Tente novamente.'
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cloudcraft_google_user');
    setGoogleUser(null);
    setStatusMessage({
      type: 'info',
      text: 'Você se desconectou da conta Google.'
    });
  };

  const handleSaveToDrive = async () => {
    if (!googleUser) {
      await handleLogin();
      return;
    }

    setIsUploading(true);
    setStatusMessage(null);

    try {
      const cleanTitle = (customFileName || 'MultiCloudCanvas_Architecture').replace(/[/\\?%*:|"<>]/g, '_');

      if (saveFormat === 'json') {
        const fileName = `${cleanTitle}.json`;
        const jsonContent = JSON.stringify(diagram, null, 2);

        const savedFile = await uploadToGoogleDrive({
          fileName,
          content: jsonContent,
          mimeType: 'application/json',
          accessToken: googleUser.accessToken
        });

        setStatusMessage({
          type: 'success',
          text: `Projeto "${fileName}" salvo com sucesso no Google Drive!`,
          link: savedFile.webViewLink
        });
      } else {
        // PNG export
        if (!canvasRef.current) {
          throw new Error('Canvas ref não está disponível para captura');
        }

        const blob = await exportCanvasToBlob(canvasRef.current, diagram);
        if (!blob) {
          throw new Error('Erro ao gerar imagem do diagrama');
        }

        const fileName = `${cleanTitle}.png`;
        const savedFile = await uploadToGoogleDrive({
          fileName,
          content: blob,
          mimeType: 'image/png',
          accessToken: googleUser.accessToken
        });

        setStatusMessage({
          type: 'success',
          text: `Imagem "${fileName}" salva com sucesso no Google Drive!`,
          link: savedFile.webViewLink
        });
      }
    } catch (err: any) {
      console.error('Save to Drive Error:', err);
      if (err.message?.includes('401') || err.message?.includes('invalid credentials')) {
        handleLogout();
        setStatusMessage({
          type: 'error',
          text: 'Sua sessão do Google expirou. Por favor, conecte-se novamente.'
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: err.message || 'Erro ao salvar o arquivo no Google Drive'
        });
      }
    } finally {
      setIsUploading(false);
    }
  };

  const fetchFiles = async () => {
    if (!googleUser) return;
    setIsLoadingFiles(true);
    setStatusMessage(null);
    try {
      const files = await listDriveDiagrams(googleUser.accessToken);
      setDriveFiles(files);
    } catch (err: any) {
      console.error('Fetch Drive Files Error:', err);
      setStatusMessage({
        type: 'error',
        text: 'Não foi possível carregar seus arquivos do Google Drive.'
      });
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleOpenDiagramFile = async (file: DriveFileItem) => {
    if (!googleUser) return;
    setIsLoadingFiles(true);
    setStatusMessage(null);

    try {
      const content = await downloadDriveFileContent(file.id, googleUser.accessToken);
      const parsedDiagram: DiagramState = JSON.parse(content);

      if (!parsedDiagram.nodes || !Array.isArray(parsedDiagram.nodes)) {
        throw new Error('Arquivo do Google Drive não contém um formato de diagrama MultiCloud Canvas Studio válido.');
      }

      setDiagram(parsedDiagram);
      setStatusMessage({
        type: 'success',
        text: `Diagrama "${file.name}" carregado do Google Drive!`
      });
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error('Open Drive File Error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Erro ao abrir o arquivo do Google Drive'
      });
    } finally {
      setIsLoadingFiles(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-slate-400/20'
            : 'bg-[#12141A] border-white/10 text-white shadow-black/80'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`p-4 border-b flex items-center justify-between transition-colors ${
            isLight
              ? 'bg-gradient-to-r from-blue-50/90 via-slate-50 to-indigo-50/90 border-slate-200'
              : 'bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border-white/10'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-xl border transition-colors ${
                isLight
                  ? 'bg-blue-100 border-blue-200 text-blue-600'
                  : 'bg-blue-600/20 border-blue-500/40 text-blue-400'
              }`}
            >
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <span>Google Drive Integration</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${
                    isLight
                      ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  }`}
                >
                  OAuth 2.0
                </span>
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Salve e acesse seus diagramas diretamente na sua conta do Google Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-all ${
              isLight
                ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-200/80'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Auth Banner */}
        <div
          className={`px-4 py-3 border-b flex items-center justify-between transition-colors ${
            isLight
              ? 'bg-slate-100/70 border-slate-200'
              : 'bg-black/40 border-white/5'
          }`}
        >
          {googleUser ? (
            <div className="flex items-center space-x-3 min-w-0">
              {googleUser.picture ? (
                <img
                  src={googleUser.picture}
                  alt={googleUser.name}
                  className={`w-8 h-8 rounded-full border flex-shrink-0 ${
                    isLight ? 'border-blue-400 ring-2 ring-blue-100' : 'border-blue-500/50'
                  }`}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                  {googleUser.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 truncate">
                <div
                  className={`text-xs font-semibold truncate flex items-center gap-1.5 ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}
                >
                  <span className="truncate">{googleUser.name}</span>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                </div>
                <div className={`text-[11px] font-mono truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {googleUser.email}
                </div>
              </div>
            </div>
          ) : (
            <div className={`flex items-center space-x-2 text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>Nenhuma conta do Google conectada.</span>
            </div>
          )}

          <div>
            {googleUser ? (
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border text-xs transition-all ${
                  isLight
                    ? 'bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 border-slate-300 shadow-sm'
                    : 'bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-300 border-white/10'
                }`}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Desconectar</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                disabled={isAuthenticating}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Conectando...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Entrar com Google</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div
          className={`flex border-b px-4 pt-2 transition-colors ${
            isLight ? 'border-slate-200 bg-slate-50/70' : 'border-white/10 bg-black/20'
          }`}
        >
          <button
            onClick={() => setActiveTab('save')}
            className={`flex items-center space-x-2 px-4 py-2 border-b-2 text-xs font-semibold transition-all ${
              activeTab === 'save'
                ? isLight
                  ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg shadow-sm font-bold'
                  : 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-lg font-bold'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200 rounded-t-lg'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Salvar no Google Drive</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('open');
              if (googleUser) fetchFiles();
            }}
            className={`flex items-center space-x-2 px-4 py-2 border-b-2 text-xs font-semibold transition-all ${
              activeTab === 'open'
                ? isLight
                  ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg shadow-sm font-bold'
                  : 'border-blue-500 text-blue-400 bg-blue-500/10 rounded-t-lg font-bold'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200 rounded-t-lg'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Abrir do Drive</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className={`p-5 space-y-4 overflow-y-auto flex-1 ${isLight ? 'bg-white' : ''}`}>
          {/* Notifications / Status Alerts */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start justify-between space-x-2 ${
                statusMessage.type === 'success'
                  ? isLight
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : statusMessage.type === 'error'
                  ? isLight
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  : isLight
                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                  : 'bg-blue-950/40 border-blue-500/40 text-blue-200'
              }`}
            >
              <div className="flex items-start space-x-2 min-w-0">
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="font-medium leading-relaxed">{statusMessage.text}</p>
                  {statusMessage.link && (
                    <a
                      href={statusMessage.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-1.5 mt-2 px-3 py-1 font-semibold rounded-lg text-xs transition-all shadow-sm border ${
                        isLight
                          ? 'bg-emerald-100 hover:bg-emerald-200 border-emerald-300 text-emerald-900'
                          : 'bg-emerald-600/30 hover:bg-emerald-600/50 border-emerald-500/50 text-emerald-300'
                      }`}
                    >
                      <span>Abrir no Google Drive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'save' && (
            <div className="space-y-4">
              <div>
                <label
                  className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  Nome do Arquivo
                </label>
                <input
                  type="text"
                  value={customFileName}
                  onChange={(e) => setCustomFileName(e.target.value)}
                  className={`w-full rounded-lg px-3 py-2 text-xs outline-none transition-all border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white placeholder:text-slate-400'
                      : 'bg-black/50 border-white/10 text-white focus:border-blue-500 placeholder:text-slate-500'
                  }`}
                  placeholder="Nome do arquivo..."
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  Formato do Arquivo
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSaveFormat('json')}
                    className={`p-3 rounded-xl border flex items-center space-x-3 transition-all ${
                      saveFormat === 'json'
                        ? isLight
                          ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-sm ring-2 ring-blue-500/20'
                          : 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-lg ring-1 ring-blue-500/50'
                        : isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        : 'bg-black/30 border-white/10 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <FileJson className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <div className="text-left min-w-0">
                      <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Projeto JSON
                      </div>
                      <div className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Estado completo editável
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSaveFormat('png')}
                    className={`p-3 rounded-xl border flex items-center space-x-3 transition-all ${
                      saveFormat === 'png'
                        ? isLight
                          ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-sm ring-2 ring-blue-500/20'
                          : 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-lg ring-1 ring-blue-500/50'
                        : isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        : 'bg-black/30 border-white/10 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <ImageIcon className="w-6 h-6 text-sky-500 flex-shrink-0" />
                    <div className="text-left min-w-0">
                      <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Imagem PNG
                      </div>
                      <div className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Visualização gráfica HD
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveToDrive}
                  disabled={isUploading}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enviando para o Google Drive...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4 text-blue-100" />
                      <span>Salvar Agora no Google Drive</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'open' && (
            <div className="space-y-3">
              {!googleUser ? (
                <div
                  className={`text-center py-8 rounded-xl border p-4 space-y-3 ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-black/30 border-white/5 text-slate-300'
                  }`}
                >
                  <Cloud className={`w-10 h-10 mx-auto ${isLight ? 'text-slate-400' : 'text-slate-600'}`} />
                  <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Conecte sua conta do Google para visualizar e importar seus diagramas salvos no Google Drive.
                  </p>
                  <button
                    onClick={handleLogin}
                    disabled={isAuthenticating}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md inline-flex items-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Conectar Conta Google</span>
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className={`flex items-center justify-between text-xs ${
                      isLight ? 'text-slate-600 font-medium' : 'text-slate-400'
                    }`}
                  >
                    <span>Arquivos JSON de diagrama salvos no seu Drive:</span>
                    <button
                      onClick={fetchFiles}
                      disabled={isLoadingFiles}
                      className={`p-1.5 rounded transition-all flex items-center space-x-1 ${
                        isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          : 'text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                      <span className="text-[11px] font-medium">Atualizar</span>
                    </button>
                  </div>

                  {isLoadingFiles ? (
                    <div
                      className={`py-8 flex flex-col items-center justify-center text-xs space-y-2 ${
                        isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                      <span>Buscando arquivos no Google Drive...</span>
                    </div>
                  ) : driveFiles.length === 0 ? (
                    <div
                      className={`text-center py-8 rounded-xl border p-4 space-y-2 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'
                      }`}
                    >
                      <FolderOpen className={`w-8 h-8 mx-auto ${isLight ? 'text-slate-400' : 'text-slate-600'}`} />
                      <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        Nenhum diagrama MultiCloud Canvas Studio encontrado no seu Google Drive.
                      </p>
                      <p className={`text-[11px] ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                        Salve um novo diagrama para visualizar aqui.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {driveFiles.map((file) => (
                        <div
                          key={file.id}
                          className={`p-3 rounded-xl flex items-center justify-between transition-all border group ${
                            isLight
                              ? 'bg-slate-50 hover:bg-blue-50/60 border-slate-200 hover:border-blue-300'
                              : 'bg-black/40 hover:bg-white/5 border-white/10 hover:border-blue-500/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <FileJson className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <div className="min-w-0">
                              <div
                                className={`text-xs font-bold truncate transition-colors ${
                                  isLight
                                    ? 'text-slate-800 group-hover:text-blue-700'
                                    : 'text-slate-200 group-hover:text-blue-300'
                                }`}
                              >
                                {file.name}
                              </div>
                              <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                Modificado em: {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : 'Desconhecido'}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-1.5 rounded-lg transition-all ${
                                  isLight
                                    ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/10'
                                }`}
                                title="Visualizar no Drive"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}

                            <button
                              onClick={() => handleOpenDiagramFile(file)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm border ${
                                isLight
                                  ? 'bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border-blue-200 hover:border-blue-600'
                                  : 'bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border-blue-500/40'
                              }`}
                            >
                              Carregar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
