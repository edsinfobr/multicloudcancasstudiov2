import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  ImageRun
} from 'docx';
import { DiagramState, ProposalConfig, ProposalType, ArchitectureImageAttachment } from '../types';
import { calculateTotalCost, calculateNodeCost } from './costCalculator';

// Helper to convert base64 (with or without data URL prefix) to Uint8Array for docx ImageRun
function base64ToUint8Array(base64: string): Uint8Array {
  const cleanBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
  const binaryString = atob(cleanBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Brand colors for document styling (RGB hex without '#')
const COLOR_PRIMARY = '0F172A';    // Slate 900
const COLOR_SECONDARY = '1D4ED8';  // Blue 700
const COLOR_ACCENT = '2563EB';     // Blue 600
const COLOR_MUTED = '64748B';      // Slate 500
const COLOR_BG_HEADER = 'F1F5F9';  // Slate 100
const COLOR_BG_ALT = 'F8FAFC';     // Slate 50
const COLOR_BORDER = 'CBD5E1';     // Slate 300
const COLOR_BORDER_LIGHT = 'E2E8F0';

const cellBorderNone = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
};

const cellBorderThin = {
  top: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  left: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  right: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER }
};

export async function generateProposalDocx(
  diagram: DiagramState,
  config: ProposalConfig,
  architectureImageAttachment?: ArchitectureImageAttachment | null
): Promise<Blob> {
  const isMigration = config.type === 'migration';
  const proposalTypeName = isMigration
    ? 'Proposta Técnica e Comercial de Migração para Cloud'
    : 'Proposta Técnica e Comercial de Implementação Cloud';

  const archImage = architectureImageAttachment || config.architectureImage || null;

  const issueDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const validUntilDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Calculate cloud operational costs
  const costReport = calculateTotalCost(diagram.nodes);
  const totalMonthlyUSD = costReport.totalMonthly;
  const totalMonthlyBRL = totalMonthlyUSD * 5.65; // Approx baseline exchange rate
  const projectValueBrl = config.projectBudgetBrl || (isMigration ? 48500 : 38000);
  const monthlySupportBrl = config.monthlySupportBudgetBrl || (isMigration ? 6500 : 4900);
  const estimatedWeeks = config.estimatedWeeks || (isMigration ? 8 : 6);

  // Group nodes by provider and category
  const activeProviders = Array.from(new Set(diagram.nodes.map((n) => n.provider.toUpperCase())));
  const providerDisplay = activeProviders.length > 0 ? activeProviders.join(', ') : 'MULTI-CLOUD';

  // Section 1: Header and Document Setup
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 22, // 11pt
            color: '1E293B'
          },
          paragraph: {
            spacing: {
              line: 276,
              after: 120
            }
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,    // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { after: 100 },
                children: [
                  new TextRun({
                    text: 'EdsInfoBR Consultoria em Nuvem & IA  |  ',
                    size: 18,
                    color: COLOR_MUTED
                  }),
                  new TextRun({
                    text: isMigration ? 'Proposta de Migração' : 'Proposta de Implementação',
                    size: 18,
                    bold: true,
                    color: COLOR_SECONDARY
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Confidencial  |  MultiCloud Canvas Studio  |  www.edsinfobr.com.br',
                    size: 16,
                    color: COLOR_MUTED
                  }),
                  new TextRun({
                    text: '  —  Página ',
                    size: 16,
                    color: COLOR_MUTED
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: COLOR_MUTED,
                    bold: true
                  }),
                  new TextRun({
                    text: ' de ',
                    size: 16,
                    color: COLOR_MUTED
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: COLOR_MUTED,
                    bold: true
                  })
                ]
              })
            ]
          })
        },
        children: [
          // ==========================================
          // COVER PAGE / CABEÇALHO EXECUTIVO
          // ==========================================
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 400, after: 100 },
            children: [
              new TextRun({
                text: 'EDSINFOBR  •  CONSULTORIA EM NUVEM & INTELIGÊNCIA ARTIFICIAL',
                bold: true,
                size: 18,
                color: COLOR_ACCENT
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: proposalTypeName.toUpperCase(),
                bold: true,
                size: 40, // 20pt
                color: COLOR_PRIMARY
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: `Projeto: ${config.projectTitle || diagram.title || 'Arquitetura MultiCloud'} (Versão ${diagram.version || 'v1.0'})`,
                size: 26,
                color: COLOR_MUTED,
                italics: true
              })
            ]
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Cliente / Empresa:', bold: true, size: 20 })] })]
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: `${config.clientCompany || 'Empresa Contratante'} (${config.clientName || 'Responsável Técnico'})`, size: 20 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Consultoria Líder:', bold: true, size: 20 })] })]
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: `${config.consultantCompany || 'EdsInfoBR Consultoria'} — ${config.consultantName || diagram.metadata?.author || 'Arquiteto de Soluções'} (${config.consultantRole || diagram.metadata?.role || 'Especialista MultiCloud'})`, size: 20 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Ambiente / Cloud:', bold: true, size: 20 })] })]
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: `${providerDisplay} (Infraestrutura como Código - Terraform)`, size: 20 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Data de Emissão:', bold: true, size: 20 })] })]
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: `${issueDate} (Validade: 30 dias — até ${validUntilDate})`, size: 20 })] })]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 300, after: 100 }, children: [] }),

          // ==========================================
          // 1. SUMÁRIO EXECUTIVO & OBJETIVOS
          // ==========================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '1. Sumário Executivo e Objetivos Estratégicos',
                bold: true,
                color: COLOR_SECONDARY,
                size: 28
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: isMigration
                  ? `Esta proposta tem por objetivo apresentar o plano técnico e comercial para a migração estratégica de cargas de trabalho críticas para o ecossistema de computação em nuvem (${providerDisplay}). O projeto contempla desde o discovery detalhado do ambiente legado até a homologação final, assegurando zero perda de dados, mínima janela de indisponibilidade (near-zero downtime) e ganhos expressivos de escalabilidade, segurança e eficiência operacional.`
                  : `Esta proposta estabelece as diretrizes técnicas e comerciais para a implantação completa da nova arquitetura de nuvem (${providerDisplay}), concebida para atender aos mais rigorosos padrões de Alta Disponibilidade (HA), Segurança da Informação, observabilidade e governança corporativa. O ambiente será provisionado integralmente via Infraestrutura como Código (Terraform/IaC), garantindo reprodutibilidade e conformidade regulatória.`
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [
              new TextRun({
                text: 'Metas e Indicadores de Sucesso (KPIs):',
                bold: true
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Disponibilidade de Serviço (SLA): ', bold: true }),
              new TextRun({ text: config.slaTarget || '99.95% garantido por arquitetura distribuída e redundância multi-AZ.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Recuperação de Desastres (RTO & RPO): ', bold: true }),
              new TextRun({ text: 'RTO (Recovery Time Objective) < 1 hora e RPO (Recovery Point Objective) < 15 minutos.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Segurança & Compliance: ', bold: true }),
              new TextRun({ text: 'Adequação estrita às normas LGPD, CIS Benchmarks e práticas de Zero-Trust em todas as camadas de rede.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Automação Contínua: ', bold: true }),
              new TextRun({ text: 'Provisionamento 100% via Terraform, com versionamento em Git e integração contínua (CI/CD).' })
            ]
          }),

          // ==========================================
          // 2. ARQUITETURA TÉCNICA PROPOSTA
          // ==========================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                text: '2. Arquitetura Técnica Proposta',
                bold: true,
                color: COLOR_SECONDARY,
                size: 28
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `A topologia foi concebida com base no projeto "${diagram.title}", estruturada em camadas bem delineadas para isolamento de tráfego, mitigação de ameaças, resiliência e alta elasticidade:`
              })
            ]
          }),

          // 2.1 Desenho da Arquitetura de Referência
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 100 },
            children: [
              new TextRun({
                text: '2.1 Desenho da Arquitetura de Referência',
                bold: true,
                color: COLOR_PRIMARY,
                size: 22
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: 'O diagrama visual a seguir consolida o desenho oficial da arquitetura de referência. Para garantir máxima clareza e integração documental, foram extraídos estritamente os componentes funcionais, zonas lógicas e fluxos de interconexão, com total transparência de fundo:'
              })
            ]
          }),

          // Visual Architecture Diagram Image (transparent background, components only)
          ...(archImage?.dataUrl
            ? (() => {
                try {
                  const imageBytes = base64ToUint8Array(archImage.dataUrl);
                  const targetWidth = 560;
                  const aspect =
                    archImage.width && archImage.height
                      ? archImage.width / archImage.height
                      : 1.6;
                  let targetHeight = Math.round(targetWidth / Math.max(0.4, aspect));
                  if (targetHeight > 420) {
                    targetHeight = 420;
                  }

                  return [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { before: 150, after: 120 },
                      children: [
                        new ImageRun({
                          type: 'png',
                          data: imageBytes,
                          transformation: {
                            width: targetWidth,
                            height: targetHeight
                          },
                          altText: {
                            title: 'Desenho da Arquitetura de Referência',
                            description: 'Componentes do desenho de arquitetura de referência sem fundo',
                            name: 'arquitetura-referencia.png'
                          }
                        })
                      ]
                    }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 250 },
                      children: [
                        new TextRun({
                          text: `Figura 1: Desenho da Arquitetura de Referência (${providerDisplay}) — ${diagram.nodes.length} nós e ${diagram.links.length} conexões mapeadas (sem fundo).`,
                          italics: true,
                          size: 18,
                          color: COLOR_MUTED
                        })
                      ]
                    })
                  ];
                } catch (e) {
                  console.error('Falha ao embutir imagem da arquitetura no docx:', e);
                  return [
                    new Paragraph({
                      spacing: { before: 100, after: 150 },
                      children: [
                        new TextRun({
                          text: `[Topologia da Arquitetura: Projeto "${diagram.title}" com ${diagram.nodes.length} nós ativos.]`,
                          italics: true,
                          color: COLOR_MUTED
                        })
                      ]
                    })
                  ];
                }
              })()
            : [
                new Paragraph({
                  spacing: { before: 100, after: 150 },
                  children: [
                    new TextRun({
                      text: `[Topologia da Arquitetura: Projeto "${diagram.title}" com ${diagram.nodes.length} nós ativos e ${diagram.containers.length} camadas de rede mapeadas.]`,
                      italics: true,
                      color: COLOR_MUTED
                    })
                  ]
                })
              ]),

          // 2.2 Camadas de Rede & Agrupamentos Lógicos
          ...(diagram.containers.length > 0
            ? [
                new Paragraph({
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 250, after: 100 },
                  children: [
                    new TextRun({
                      text: '2.2 Camadas de Rede e Agrupamentos Lógicos',
                      bold: true,
                      color: COLOR_PRIMARY,
                      size: 22
                    })
                  ]
                }),
                ...diagram.containers.map(
                  (c) =>
                    new Paragraph({
                      bullet: { level: 0 },
                      children: [
                        new TextRun({
                          text: `${c.name} [${c.type.toUpperCase()}] (${c.provider.toUpperCase()})${c.cidrBlock ? ` - Bloco CIDR: ${c.cidrBlock}` : ''}: `,
                          bold: true
                        }),
                        new TextRun({
                          text: c.isPublicSubnet
                            ? 'Sub-rede pública com entrada protegida via WAF e Load Balancer.'
                            : 'Zona privada isolada, sem exposição direta à Internet, acessível apenas via rotas autorizadas.'
                        })
                      ]
                    })
                )
              ]
            : []),

          // 2.3 Inventário de Recursos Dimensionados
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 250, after: 150 },
            children: [
              new TextRun({
                text: `2.3 Inventário de Recursos Dimensionados (${diagram.nodes.length} Componentes)`,
                bold: true,
                color: COLOR_PRIMARY,
                size: 22
              })
            ]
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // Header row
              new TableRow({
                tableHeader: true,
                children: [
                  new TableCell({
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Componente', bold: true, size: 18 })] })]
                  }),
                  new TableCell({
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Provedor', bold: true, size: 18 })] })]
                  }),
                  new TableCell({
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Categoria', bold: true, size: 18 })] })]
                  }),
                  new TableCell({
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Especificação / Sizing', bold: true, size: 18 })] })]
                  }),
                  new TableCell({
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Finalidade Técnica', bold: true, size: 18 })] })]
                  })
                ]
              }),
              // Data rows
              ...diagram.nodes.map((node, idx) => {
                const nodeCost = calculateNodeCost(node);
                return new TableRow({
                  children: [
                    new TableCell({
                      shading: idx % 2 === 1 ? { fill: COLOR_BG_ALT, type: ShadingType.CLEAR } : undefined,
                      borders: cellBorderThin,
                      children: [new Paragraph({ children: [new TextRun({ text: node.name, bold: true, size: 18 })] })]
                    }),
                    new TableCell({
                      shading: idx % 2 === 1 ? { fill: COLOR_BG_ALT, type: ShadingType.CLEAR } : undefined,
                      borders: cellBorderThin,
                      children: [new Paragraph({ children: [new TextRun({ text: node.provider.toUpperCase(), size: 18 })] })]
                    }),
                    new TableCell({
                      shading: idx % 2 === 1 ? { fill: COLOR_BG_ALT, type: ShadingType.CLEAR } : undefined,
                      borders: cellBorderThin,
                      children: [new Paragraph({ children: [new TextRun({ text: node.category, size: 18 })] })]
                    }),
                    new TableCell({
                      shading: idx % 2 === 1 ? { fill: COLOR_BG_ALT, type: ShadingType.CLEAR } : undefined,
                      borders: cellBorderThin,
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: node.specs.instanceType || nodeCost.details || `${node.specs.count || 1} un`,
                              size: 18
                            })
                          ]
                        })
                      ]
                    }),
                    new TableCell({
                      shading: idx % 2 === 1 ? { fill: COLOR_BG_ALT, type: ShadingType.CLEAR } : undefined,
                      borders: cellBorderThin,
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: node.notes || `${node.resourceType} na camada de ${node.category}`,
                              size: 18,
                              color: COLOR_MUTED
                            })
                          ]
                        })
                      ]
                    })
                  ]
                });
              })
            ]
          }),

          // Data Flow / Connections
          ...(diagram.links.length > 0
            ? [
                new Paragraph({
                  spacing: { before: 250, after: 100 },
                  children: [
                    new TextRun({
                      text: `Matriz de Conectividade e Protocolos (${diagram.links.length} Fluxos Interligados):`,
                      bold: true
                    })
                  ]
                }),
                ...diagram.links.slice(0, 10).map((link) => {
                  const sourceNode = diagram.nodes.find((n) => n.id === link.from)?.name || link.from;
                  const targetNode = diagram.nodes.find((n) => n.id === link.to)?.name || link.to;
                  return new Paragraph({
                    bullet: { level: 0 },
                    children: [
                      new TextRun({ text: `${sourceNode} ➔ ${targetNode}: `, bold: true }),
                      new TextRun({
                        text: `Protocolo ${link.protocol || 'TCP/HTTPS'} (${link.label || 'Tráfego Seguro Criptografado'})`
                      })
                    ]
                  });
                })
              ]
            : []),

          // ==========================================
          // 3. METODOLOGIA DE EXECUÇÃO & ROADMAP
          // ==========================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                text: isMigration
                  ? '3. Metodologia de Migração (Framework 7 Rs)'
                  : '3. Metodologia de Implementação & Fases de Entrega',
                bold: true,
                color: COLOR_SECONDARY,
                size: 28
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: isMigration
                  ? 'Nossa abordagem de migração segue o Cloud Adoption Framework e os princípios de Migração em Ondas (Wave-based Migration), garantindo previsibilidade, rollback facilitado e transparência:'
                  : 'A implementação será executada em sprints ágeis através de um pipeline estruturado de automação com validações contínuas de segurança e auditoria:'
              })
            ]
          }),

          // Phases Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: isMigration
              ? [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Fase 1: Discovery & Assessment', bold: true, size: 18 })] })]
                      }),
                      new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Inventário aprofundado dos servidores legados, mapeamento de dependências, categorização (7 Rs) e dimensionamento de capacidade (Right-Sizing).', size: 18 })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Fase 2: Landing Zone & Segurança', bold: true, size: 18 })] })]
                      }),
                      new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Provisionamento da Landing Zone alvo via Terraform: VPCs, subnets, rotas, túnel VPN/Direct Connect, IAM com MFA e políticas de governança.', size: 18 })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Fase 3: Migração Piloto / PoC', bold: true, size: 18 })] })]
                      }),
                      new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Migração teste de um workload não-produtivo para validação de latência, integridade de dados e calibração de ferramentas de replicação contínua.', size: 18 })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Fase 4: Migração em Ondas (Cutover)', bold: true, size: 18 })] })]
                      }),
                      new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Sincronização em tempo real de bancos de dados e volumes, virada de DNS planejada e cutover assistido com plano de rollback documentado.', size: 18 })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Fase 5: FinOps & Otimização', bold: true, size: 18 })] })]
                      }),
                      new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Revisão de custos (Savings Plans/Reserved Instances), ajuste fino de auto-scaling, observabilidade e handover técnico formal para a equipe.', size: 18 })] })]
                      })
                    ]
                  })
                ]
              : [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Fase 1: Fundação & Landing Zone', bold: true, size: 18 })] })]
                      }),
                      new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Construção da base de nuvem: VPCs, subnets públicas/privadas, Gateways NAT, estruturas de contas, IAM Zero-Trust e cofres de segredos (KMS).', size: 18 })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Fase 2: Infraestrutura Core & Dados', bold: true, size: 18 })] })]
                      }),
                      new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Provisionamento automatizado de bancos de dados gerenciados, buckets de armazenamento, mensageria e clusters elásticos de computação.', size: 18 })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Fase 3: Camada de Aplicação & CI/CD', bold: true, size: 18 })] })]
                      }),
                      new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Deploy dos microsserviços, configuração de ingress controllers, políticas de Auto-Scaling e pipelines de integração e entrega contínua.', size: 18 })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Fase 4: Observabilidade & Hardening', bold: true, size: 18 })] })]
                      }),
                      new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Dashboards unificados de métricas, telemetria de logs, rastreamento distribuído, alarmes com notificação e WAF ativo.', size: 18 })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 25, type: WidthType.PERCENTAGE },
                        shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Fase 5: Go-Live & Hypercare', bold: true, size: 18 })] })]
                      }),
                      new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        borders: cellBorderThin,
                        children: [new Paragraph({ children: [new TextRun({ text: 'Lançamento produtivo assistido (Hypercare) por 15 dias corridos para monitoramento proativo e garantia de estabilidade absoluta.', size: 18 })] })]
                      })
                    ]
                  })
                ]
          }),

          // ==========================================
          // 4. CRONOGRAMA & ENTREGÁVEIS
          // ==========================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                text: `4. Cronograma Estimado (${estimatedWeeks} Semanas)`,
                bold: true,
                color: COLOR_SECONDARY,
                size: 28
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `O projeto está dimensionado para uma duração de ${estimatedWeeks} semanas com entregas intermediárias contínuas:`
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Código IaC Completo: ', bold: true }),
              new TextRun({ text: 'Repositório Git contendo todos os módulos Terraform documentados e validados.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Documentação As-Built: ', bold: true }),
              new TextRun({ text: 'Diagramas de arquitetura atualizados, matriz de portas e IPs e diagramas lógicos.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Procedimentos Operacionais (Runbooks): ', bold: true }),
              new TextRun({ text: 'Guias passo a passo para rotinas de backup, restore, escalonamento e resposta a incidentes.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Sessão de Handover & Treinamento: ', bold: true }),
              new TextRun({ text: 'Workshop de 8 horas com a equipe interna do cliente para transferência completa de conhecimento.' })
            ]
          }),

          // ==========================================
          // 5. PROPOSTA COMERCIAL & INVESTIMENTO
          // ==========================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                text: '5. Proposta Comercial e Investimento',
                bold: true,
                color: COLOR_SECONDARY,
                size: 28
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Apresentamos a discriminação financeira completa, segregando o investimento único em serviços profissionais de consultoria e a estimativa de custos operacionais com provedores de nuvem (OPEX Cloud):'
              })
            ]
          }),

          // Commercial Pricing Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Item / Descrição do Serviço', bold: true, size: 20 })] })]
                  }),
                  new TableCell({
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Condição / Modalidade', bold: true, size: 20 })] })]
                  }),
                  new TableCell({
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Valor Estimado (BRL)', bold: true, size: 20 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorderThin,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: isMigration
                              ? 'Serviços Profissionais de Migração para Nuvem (End-to-End)'
                              : 'Serviços Profissionais de Implementação de Arquitetura Cloud (IaC)',
                            bold: true,
                            size: 19
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Engenharia de Cloud, Terraform, Hardening de Segurança, Testes e Operação Assistida (${estimatedWeeks} semanas de consultoria dedicada).`,
                                size: 16,
                                color: COLOR_MUTED
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Preço Fixo (Escopo Fechado)', size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `R$ ${projectValueBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                            bold: true,
                            size: 20,
                            color: COLOR_SECONDARY
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorderThin,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Estimativa de Consumo de Nuvem (OPEX Cloud)', bold: true, size: 19 }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: `Faturado diretamente pelo(s) provedor(es) (${providerDisplay}) com base nos ${diagram.nodes.length} nós dimensionados no diagrama.`,
                                size: 16,
                                color: COLOR_MUTED
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Mensal Estimado (Sob Demanda)', size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `~ US$ ${totalMonthlyUSD.toFixed(2)} /mês\n(aprox. R$ ${totalMonthlyBRL.toFixed(2)}/mês)`,
                            bold: true,
                            size: 18,
                            color: '059669' // Emerald
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorderThin,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Sustentação, FinOps & Suporte Contínuo (Opcional)', bold: true, size: 19 }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: 'Atendimento consultivo mensal, monitoramento proativo, otimização contínua de custos e suporte N3.',
                                size: 16,
                                color: COLOR_MUTED
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Recorrente Mensal (Contrato de 12 meses)', size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `R$ ${monthlySupportBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} /mês`,
                            bold: true,
                            size: 18
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [new TextRun({ text: 'Condições de Faturamento dos Serviços Profissionais:', bold: true })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: '30% na Assinatura do Contrato ', bold: true }),
              new TextRun({ text: '(Início dos trabalhos e setup da Landing Zone).' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: '35% na Conclusão da Fase 3 ', bold: true }),
              new TextRun({ text: '(Validação da infraestrutura core / PoC homologada).' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: '35% no Aceite Final e Go-Live ', bold: true }),
              new TextRun({ text: '(Entrega formal do repositório IaC, documentação As-Built e Handover).' })
            ]
          }),

          // ==========================================
          // 6. MATRIZ RACI DE RESPONSABILIDADES
          // ==========================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                text: '6. Matriz de Responsabilidades (RACI)',
                bold: true,
                color: COLOR_SECONDARY,
                size: 28
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Atividade / Marco do Projeto', bold: true, size: 18 })] })]
                  }),
                  new TableCell({
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'EdsInfoBR', bold: true, size: 18 })] })]
                  }),
                  new TableCell({
                    shading: { fill: COLOR_BG_HEADER, type: ShadingType.CLEAR },
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Cliente', bold: true, size: 18 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Criação e desenho da arquitetura técnica (IaC)', size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Responsável (R) / Aprovador (A)', bold: true, size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Consultado (C)', size: 18 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Fornecimento de acessos administrativos às contas cloud', size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Consultado (C)', size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Responsável (R) / Aprovador (A)', bold: true, size: 18 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Implementação de scripts Terraform e automações', size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Responsável (R) / Executor (E)', bold: true, size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Informado (I)', size: 18 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Homologação funcional das aplicações de negócio', size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Suporte (S)', size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Responsável (R) / Aprovador (A)', bold: true, size: 18 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Aprovação da janela de Cutover / Go-Live', size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Recomendação Técnica (C)', size: 18 })] })]
                  }),
                  new TableCell({
                    borders: cellBorderThin,
                    children: [new Paragraph({ children: [new TextRun({ text: 'Aprovador Final (A)', bold: true, size: 18 })] })]
                  })
                ]
              })
            ]
          }),

          // ==========================================
          // 7. PREMISSAS, EXCLUSÕES E ASSINATURAS
          // ==========================================
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 150 },
            children: [
              new TextRun({
                text: '7. Premissas, Exclusões e Formalização de Aceite',
                bold: true,
                color: COLOR_SECONDARY,
                size: 28
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Premissas Operacionais: ',
                bold: true
              }),
              new TextRun({
                text: 'O faturamento do consumo de nuvem ocorrerá diretamente entre a empresa contratante e o(s) provedor(es) (AWS, GCP, Azure, OCI). A consultoria atuará com privilégios estritos de mínimo privilégio (Principle of Least Privilege). Alterações substanciais no escopo de recursos além do inventariado nesta proposta estarão sujeitas a aditivo formal (Change Request).'
              })
            ]
          }),

          new Paragraph({ spacing: { before: 500, after: 300 }, children: [] }),

          // Signatures Section
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 48, type: WidthType.PERCENTAGE },
                    borders: cellBorderNone,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: '________________________________________________', color: COLOR_MUTED })]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: config.consultantCompany || 'EdsInfoBR Consultoria em Nuvem & IA',
                            bold: true,
                            size: 20
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `${config.consultantName || diagram.metadata?.author || 'Consultor Especialista'} — ${config.consultantRole || diagram.metadata?.role || 'Arquiteto Cloud'}`,
                            size: 18,
                            color: COLOR_MUTED
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: `Data: ____ / ____ / ${new Date().getFullYear()}`, size: 16, color: COLOR_MUTED })]
                      })
                    ]
                  }),
                  new TableCell({
                    width: { size: 4, type: WidthType.PERCENTAGE },
                    borders: cellBorderNone,
                    children: [new Paragraph({})]
                  }),
                  new TableCell({
                    width: { size: 48, type: WidthType.PERCENTAGE },
                    borders: cellBorderNone,
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: '________________________________________________', color: COLOR_MUTED })]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: config.clientCompany || 'EMPRESA CONTRATANTE (CLIENTE)',
                            bold: true,
                            size: 20
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `${config.clientName || 'Representante Legal'} — ${config.clientRole || 'Diretor de Tecnologia / Compras'}`,
                            size: 18,
                            color: COLOR_MUTED
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: `Data: ____ / ____ / ${new Date().getFullYear()}`, size: 16, color: COLOR_MUTED })]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }
    ]
  });

  return await Packer.toBlob(doc);
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
