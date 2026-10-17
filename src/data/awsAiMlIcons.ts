import { CloudIconDefinition } from '../types';

export const AWS_AI_ML_ICONS: CloudIconDefinition[] = [
  // 1. Amazon DevOps Guru Insights
  {
    key: 'aws_devops_guru_insights',
    name: 'DevOps Guru Insights',
    provider: 'aws',
    category: 'ai',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_devopsguru_resource_collection',
    defaultSpecs: { insightType: 'REACTIVE', severity: 'HIGH', region: 'us-east-1' },
    description: 'Insights operacionais alimentados por ML pelo Amazon DevOps Guru para detecção precoce de anomalias',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Balão de Mensagem / Chat no canto inferior esquerdo -->
      <path d="M7 16H34V38H18L10 46V38H7C5.9 38 5 37.1 5 36V18C5 16.9 5.9 16 7 16Z" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="none" />
      <!-- Linhas de Texto no Balão -->
      <line x1="10" y1="23" x2="20" y2="23" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <line x1="10" y1="28" x2="27" y2="28" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <line x1="10" y1="33" x2="24" y2="33" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <!-- Engrenagem DevOps no canto superior direito -->
      <g transform="translate(24, 4)">
        <!-- Dentes da Engrenagem -->
        <path d="M18 6L19.5 8.5L22.5 8L23.5 11L26.5 11.5L26.5 14.5L29 16L27.5 18.5L29 21L26.5 22.5L26.5 25.5L23.5 26L22.5 29L19.5 28.5L18 31L16.5 28.5L13.5 29L12.5 26L9.5 25.5L9.5 22.5L7 21L8.5 18.5L7 16L9.5 14.5L9.5 11.5L12.5 11L13.5 8L16.5 8.5Z" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round" fill="none" />
        <!-- Ciclo de Setas Giratórias Internas -->
        <path d="M12 18.5C12 15.2 14.7 12.5 18 12.5C20.5 12.5 22.6 14 23.5 16" stroke="#00A4A6" stroke-width="2" stroke-linecap="round" />
        <polyline points="21,16 23.5,16 23.5,13.5" stroke="#00A4A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M24 18.5C24 21.8 21.3 24.5 18 24.5C15.5 24.5 13.4 23 12.5 21" stroke="#00A4A6" stroke-width="2" stroke-linecap="round" />
        <polyline points="15,21 12.5,21 12.5,23.5" stroke="#00A4A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Checkmark no Centro -->
        <path d="M15 18.5L17 20.5L21.5 16" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>`,
  },

  // 2. Amazon Rekognition Image
  {
    key: 'aws_rekognition_image',
    name: 'Rekognition Image',
    provider: 'aws',
    category: 'ai',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_rekognition_collection',
    defaultSpecs: { maxLabels: 10, minConfidence: 80, region: 'us-east-1' },
    description: 'Análise de imagens com visão computacional para detecção de objetos, rostos, texto e moderação',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Ondas de Radar / Varredura Externa -->
      <path d="M25 7C36.6 7 46 16.4 46 28" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <path d="M30 11C38.3 11 45 17.7 45 26" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <path d="M19 46C13.5 41 10 33.9 10 26" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <!-- Lente da Lupa -->
      <circle cx="34" cy="27" r="16" stroke="#00A4A6" stroke-width="3" fill="none" />
      <!-- Cabo da Lupa -->
      <path d="M22 39L9 52" stroke="#00A4A6" stroke-width="3.5" stroke-linecap="round" />
      <!-- Ícone de Fotografia / Imagem no interior da Lente -->
      <rect x="25" y="18" width="18" height="18" rx="2" stroke="#00A4A6" stroke-width="2.5" fill="none" />
      <circle cx="37" cy="23" r="1.8" fill="#00A4A6" />
      <path d="M25 31L30 25L35 30L38 27L43 32" stroke="#00A4A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
  },

  // 3. Amazon Rekognition Video
  {
    key: 'aws_rekognition_video',
    name: 'Rekognition Video',
    provider: 'aws',
    category: 'ai',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_rekognition_stream_processor',
    defaultSpecs: { jobType: 'person-tracking', minConfidence: 80, region: 'us-east-1' },
    description: 'Análise de vídeo em streaming ou gravado para rastreamento de pessoas e detecção de atividades',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Ondas de Radar / Varredura Externa -->
      <path d="M25 7C36.6 7 46 16.4 46 28" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <path d="M30 11C38.3 11 45 17.7 45 26" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <path d="M19 46C13.5 41 10 33.9 10 26" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <!-- Lente da Lupa -->
      <circle cx="34" cy="27" r="16" stroke="#00A4A6" stroke-width="3" fill="none" />
      <!-- Cabo da Lupa -->
      <path d="M22 39L9 52" stroke="#00A4A6" stroke-width="3.5" stroke-linecap="round" />
      <!-- Moldura de Vídeo e Botão Play -->
      <rect x="25" y="18" width="18" height="18" rx="2" stroke="#00A4A6" stroke-width="2.5" fill="none" />
      <polygon points="31,22.5 39,27 31,31.5" stroke="#00A4A6" stroke-width="2" stroke-linejoin="round" fill="none" />
    </svg>`,
  },

  // 4. Amazon SageMaker Canvas
  {
    key: 'aws_sagemaker_canvas',
    name: 'SageMaker Canvas',
    provider: 'aws',
    category: 'ai',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_sagemaker_app',
    defaultSpecs: { persona: 'BusinessAnalyst', autoMl: true, region: 'us-east-1' },
    description: 'Ambiente visual no-code para construir e gerar previsões de Machine Learning sem programação',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Janela do Aplicativo -->
      <rect x="7" y="7" width="50" height="50" rx="4" stroke="#00A4A6" stroke-width="3.5" fill="none" />
      <!-- Barra Superior / Header da Janela -->
      <line x1="7" y1="17" x2="57" y2="17" stroke="#00A4A6" stroke-width="3" />
      <!-- Controles da Janela -->
      <line x1="12" y1="12" x2="16" y2="12" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <line x1="20" y1="12" x2="24" y2="12" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <!-- Caixa Tracejada de Seleção / Bounding Box -->
      <rect x="13" y="23" width="28" height="24" stroke="#00A4A6" stroke-width="2.5" stroke-dasharray="4 3" fill="none" />
      <!-- Caixa Sólida Frontal -->
      <rect x="23" y="32" width="26" height="19" stroke="#00A4A6" stroke-width="3" fill="none" />
      <!-- Seta de Expansão / Canvas apontando para cima e esquerda -->
      <path d="M42 45L31 34M31 34h8M31 34v8" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
  },

  // 5. Amazon SageMaker Geospatial ML
  {
    key: 'aws_sagemaker_geospatial',
    name: 'SageMaker Geospatial ML',
    provider: 'aws',
    category: 'ai',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_sagemaker_geospatial_model',
    defaultSpecs: { dataset: 'Sentinel-2', resolution: '10m', region: 'us-west-2' },
    description: 'Modelos e pipelines de ML geoespacial com dados de satélite, clima e mapas planetários',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Globo Planetário -->
      <circle cx="28" cy="28" r="21" stroke="#00A4A6" stroke-width="3" fill="none" />
      <!-- Linha do Equador e Paralelos -->
      <line x1="7" y1="28" x2="49" y2="28" stroke="#00A4A6" stroke-width="2.5" />
      <path d="M12 18C16 19.5 22 20.5 28 20.5C34 20.5 40 19.5 44 18" stroke="#00A4A6" stroke-width="2" fill="none" />
      <path d="M12 38C16 36.5 22 35.5 28 35.5C34 35.5 40 36.5 44 38" stroke="#00A4A6" stroke-width="2" fill="none" />
      <!-- Meridianos / Elipses Verticais -->
      <ellipse cx="28" cy="28" rx="11" ry="21" stroke="#00A4A6" stroke-width="2.5" fill="none" />
      <!-- Lupa de Inspeção Geoespacial no Canto Inferior Direito -->
      <circle cx="43" cy="43" r="7.5" stroke="#00A4A6" stroke-width="3" fill="none" />
      <path d="M48 48L57 57" stroke="#00A4A6" stroke-width="3.5" stroke-linecap="round" />
    </svg>`,
  },

  // 6. Amazon SageMaker Model
  {
    key: 'aws_sagemaker_model',
    name: 'SageMaker Model',
    provider: 'aws',
    category: 'ai',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_sagemaker_model',
    defaultSpecs: { instanceType: 'ml.m5.xlarge', executionRole: 'arn:aws:iam::123456789012:role/sagemaker', region: 'us-east-1' },
    description: 'Modelo de Machine Learning empacotado para inferência em tempo real, batch ou serverless',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cérebro Eletrônico / Rede Neural (Divisão Vertical) -->
      <line x1="32" y1="9" x2="32" y2="55" stroke="#00A4A6" stroke-width="2" stroke-linecap="round" />
      <!-- Hemisfério Esquerdo com Circuitos -->
      <path d="M30 9C24 9 20 12 18 16C15 16 11 18 10 22C8 26 8 30 10 34C7 38 9 44 12 46C15 48 18 47 20 50C22 53 26 55 30 55" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <path d="M30 18H23V25" stroke="#00A4A6" stroke-width="2" />
      <circle cx="23" cy="25" r="2" fill="#00A4A6" />
      <path d="M30 32H18V38" stroke="#00A4A6" stroke-width="2" />
      <circle cx="18" cy="38" r="2" fill="#00A4A6" />
      <path d="M30 46H22" stroke="#00A4A6" stroke-width="2" />
      <circle cx="20" cy="46" r="2" fill="#00A4A6" />
      <!-- Hemisfério Direito com Circuitos -->
      <path d="M34 9C40 9 44 12 46 16C49 16 53 18 54 22C56 26 56 30 54 34C57 38 55 44 52 46C49 48 46 47 44 50C42 53 38 55 34 55" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <path d="M34 18H41V25" stroke="#00A4A6" stroke-width="2" />
      <circle cx="41" cy="25" r="2" fill="#00A4A6" />
      <path d="M34 32H46V38" stroke="#00A4A6" stroke-width="2" />
      <circle cx="46" cy="38" r="2" fill="#00A4A6" />
      <path d="M34 46H42" stroke="#00A4A6" stroke-width="2" />
      <circle cx="44" cy="46" r="2" fill="#00A4A6" />
    </svg>`,
  },

  // 7. Amazon SageMaker Notebook
  {
    key: 'aws_sagemaker_notebook',
    name: 'SageMaker Notebook',
    provider: 'aws',
    category: 'ai',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_sagemaker_notebook_instance',
    defaultSpecs: { instanceType: 'ml.t3.medium', volumeSizeGb: 20, region: 'us-east-1' },
    description: 'Caderno de desenvolvimento interativo Jupyter totalmente gerenciado para ciência de dados e ML',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Página do Bloco de Notas / Caderno -->
      <rect x="16" y="8" width="37" height="48" rx="4" stroke="#00A4A6" stroke-width="3.5" fill="none" />
      <!-- Espirais do Caderno à Esquerda -->
      <path d="M12 14h8M12 21h8M12 28h8M12 35h8M12 42h8M12 49h8" stroke="#00A4A6" stroke-width="3.5" stroke-linecap="round" />
      <!-- Linhas de Conteúdo no Caderno -->
      <line x1="26" y1="18" x2="45" y2="18" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" />
      <line x1="26" y1="26" x2="45" y2="26" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" />
      <line x1="26" y1="34" x2="45" y2="34" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" />
      <line x1="26" y1="42" x2="36" y2="42" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" />
    </svg>`,
  },

  // 8. Amazon SageMaker Shadow Testing
  {
    key: 'aws_sagemaker_shadow_testing',
    name: 'SageMaker Shadow Testing',
    provider: 'aws',
    category: 'ai',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_sagemaker_endpoint_configuration',
    defaultSpecs: { trafficSamplingPercentage: 100, shadowVariant: 'variant-b', region: 'us-east-1' },
    description: 'Validação de novos modelos ML com tráfego real em modo shadow sem afetar a resposta de produção',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Tubo de Ensaio à Esquerda -->
      <g transform="translate(4, 0)">
        <path d="M10 16H20" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" />
        <path d="M12 16V46C12 49.3 14.7 52 18 52C21.3 52 24 49.3 24 46V16" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" fill="none" />
        <!-- Marca de X no Tubo de Ensaio -->
        <path d="M15 28L21 34M21 28L15 34" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <!-- Balão de Erlenmeyer à Direita -->
      <g transform="translate(18, 0)">
        <path d="M19 14H29" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" />
        <path d="M21 14V24L11 48C9.5 51.5 12 55 16 55H32C36 55 38.5 51.5 37 48L27 24V14" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        <!-- Marca de Checkmark no Balão -->
        <path d="M18 43L23 48L31 39" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>`,
  },

  // 9. Amazon SageMaker Train
  {
    key: 'aws_sagemaker_train',
    name: 'SageMaker Training Job',
    provider: 'aws',
    category: 'ai',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_sagemaker_training_job',
    defaultSpecs: { instanceType: 'ml.p3.2xlarge', instanceCount: 1, volumeSizeGb: 50, region: 'us-east-1' },
    description: 'Treinamento distribuído de modelos de ML com instâncias otimizadas para GPU e dados do S3',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Folha de Documento no Canto Inferior Esquerdo -->
      <rect x="7" y="19" width="34" height="38" rx="3" stroke="#00A4A6" stroke-width="3.5" fill="none" />
      <!-- Linhas de Treinamento no Documento -->
      <line x1="13" y1="27" x2="27" y2="27" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" />
      <line x1="13" y1="34" x2="31" y2="34" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" />
      <line x1="13" y1="41" x2="31" y2="41" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" />
      <line x1="13" y1="48" x2="23" y2="48" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" />
      <!-- Lupa de Validação com Checkmark no Canto Superior Direito -->
      <circle cx="41" cy="22" r="13" stroke="#00A4A6" stroke-width="3" fill="none" />
      <path d="M50 31L60 41" stroke="#00A4A6" stroke-width="3.5" stroke-linecap="round" />
      <path d="M35 22L39 26L47 18" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
  },

  // 10. Amazon Textract Analyze Lending
  {
    key: 'aws_textract_analyze_lending',
    name: 'Textract Analyze Lending',
    provider: 'aws',
    category: 'ai',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_textract_analyze_lending',
    defaultSpecs: { documentType: 'MORTGAGE_PACKET', extractSignatures: true, region: 'us-east-1' },
    description: 'Processamento inteligente e extração de dados e assinaturas de pacotes de crédito e hipoteca',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Documento Traseiro -->
      <path d="M21 8H44L52 16V40" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round" fill="none" />
      <!-- Documento Frontal Principal -->
      <path d="M14 17H38L47 26V54C47 55.7 45.7 57 44 57H17C15.3 57 14 55.7 14 54V17Z" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="none" />
      <!-- Dobra do Canto do Documento -->
      <path d="M38 17V26H47" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round" fill="none" />
      <!-- Linhas de Dados Extraídos -->
      <line x1="31" y1="32" x2="41" y2="32" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <line x1="31" y1="38" x2="41" y2="38" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <line x1="31" y1="44" x2="41" y2="44" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <line x1="31" y1="50" x2="37" y2="50" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" />
      <!-- Lupa de Extração no Canto Inferior Esquerdo -->
      <circle cx="21" cy="39" r="10" stroke="#00A4A6" stroke-width="3" fill="none" />
      <path d="M28 46L36 54" stroke="#00A4A6" stroke-width="3.5" stroke-linecap="round" />
    </svg>`,
  },
];
