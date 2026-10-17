export type CloudProvider = 'aws' | 'azure' | 'gcp' | 'oci' | 'generic';

export type ServiceCategory = 
  | 'compute' 
  | 'storage' 
  | 'database' 
  | 'networking' 
  | 'security' 
  | 'analytics' 
  | 'ai' 
  | 'container'
  | 'integration'
  | 'devops';

export interface ResourceSpecs {
  instanceType?: string;
  count?: number;
  storageGb?: number;
  transferGb?: number;
  hoursPerMonth?: number;
  region?: string;
  isPublic?: boolean;
  engine?: string;
  tier?: string;
  customPricePerHr?: number;
  minSize?: number;
  maxSize?: number;
  desiredCapacity?: number;
  desiredCount?: number;
  volumeType?: string;
  nodeType?: string;
  shardCount?: number;
  endpointType?: string;
  serviceName?: string;
  runtime?: string;
  memoryMb?: number;
  timeout?: number;
  ami?: string;
  virtualizationType?: string;
  targetFramework?: string;
  domain?: string;
  monitoring?: boolean;
  diagnosticProfile?: string;
  spotPrice?: string;
  platform?: string;
  deploymentPolicy?: string;
  architecture?: string;
  rootDeviceType?: string;
  extractionMode?: string;
  allocationStrategy?: string;
  environmentTier?: string;
  versionLabel?: string;
  insightType?: string;
  severity?: string;
  maxLabels?: number;
  minConfidence?: number;
  jobType?: string;
  persona?: string;
  autoMl?: boolean;
  dataset?: string;
  resolution?: string;
  executionRole?: string;
  volumeSizeGb?: number;
  trafficSamplingPercentage?: number;
  shadowVariant?: string;
  instanceCount?: number;
  documentType?: string;
  extractSignatures?: boolean;
  imageTag?: string;
  scanOnPush?: boolean;
  registryType?: string;
  replication?: boolean;
  containerPort?: number;
  memory?: number;
  cpu?: number | string;
  appName?: string;
  environment?: string;
  namespace?: string;
  dnsTtl?: number;
  launchType?: string;
  outpostArn?: string;
  clusterVersion?: string;
  minOcu?: number;
  maxOcu?: number;
  releaseLabel?: string;
  capacity?: number;
  glueVersion?: string;
  workerType?: string;
  [key: string]: any;
}

export type ContainerType =
  | 'vpc'
  | 'subnet'
  | 'region'
  | 'resource_group'
  | 'compartment'
  | 'cloud_group'
  | 'on_premise'
  | 'cluster'
  | 'app'
  | 'generic'
  | 'asg'
  | 'aws_account'
  | 'azure_subscription'
  | 'ai_stack'
  | 'custom';

export interface DiagramContainer {
  id: string;
  name: string;
  provider: CloudProvider;
  type: ContainerType;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  borderStyle?: 'dashed' | 'solid' | 'dotted';
  isPublicSubnet?: boolean;
  cidrBlock?: string;
  parentContainerId?: string;
}

export interface DiagramNode {
  id: string;
  name: string;
  provider: CloudProvider;
  category: ServiceCategory;
  iconKey: string;
  resourceType: string; // Terraform resource type e.g. aws_instance
  containerId?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  specs: ResourceSpecs;
  tags?: Record<string, string>;
  notes?: string;
}

export type LinkRoutingType = 'curved' | 'orthogonal' | 'straight' | 'arc';

export interface DiagramLink {
  id: string;
  from: string;
  to: string;
  label?: string;
  style?: 'solid' | 'dashed' | 'dotted';
  arrowHead?: 'end' | 'both' | 'start' | 'none';
  lineType?: LinkRoutingType;
  color?: string;
  strokeWidth?: number;
  protocol?: 'HTTP' | 'HTTPS' | 'TCP' | 'UDP' | 'gRPC' | 'SQL' | 'Peering' | 'Internal' | 'Docker' | 'Redis' | 'AMQP' | 'Kafka' | 'DynamoDB' | 'SQS' | 'SNS' | 'Custom';
  port?: number | string;
  controlPoint?: { x: number; y: number };
}

export interface DiagramMetadata {
  project?: string;
  author?: string;
  role?: string;
  company?: string;
  date?: string;
  tags?: string[];
  showOnCanvas?: boolean;
  x?: number;
  y?: number;
}

export interface DefaultStampPreferences {
  author?: string;
  role?: string;
  company?: string;
  showOnCanvas?: boolean;
}

export interface DiagramState {
  id: string;
  title: string;
  description: string;
  primaryProvider: CloudProvider;
  containers: DiagramContainer[];
  nodes: DiagramNode[];
  links: DiagramLink[];
  createdAt: string;
  updatedAt: string;
  metadata?: DiagramMetadata;
  version?: string;
}

export interface CloudIconDefinition {
  key: string;
  name: string;
  provider: CloudProvider;
  category: ServiceCategory;
  svg: string;
  defaultResourceType: string;
  defaultSpecs: ResourceSpecs;
  description: string;
  brandColor: string;
  aiGroup?: string;
}

export interface CostItem {
  nodeId: string;
  nodeName: string;
  provider: CloudProvider;
  category: ServiceCategory;
  serviceType: string;
  unitCostHr: number;
  monthlyCost: number;
  annualCost: number;
  details: string;
}

export interface MultiCloudCostComparison {
  awsMonthly: number;
  azureMonthly: number;
  gcpMonthly: number;
  ociMonthly: number;
}

export interface SecurityAuditResult {
  haScore: number;
  securityScore: number;
  costScore: number;
  overallRating: string;
  summary: string;
  securityFindings: string[];
  haRecommendations: string[];
  costSavingsTips: string[];
  suggestedAdditions?: string[];
}

export type ProposalType = 'implementation' | 'migration';

export interface ArchitectureImageAttachment {
  dataUrl: string;
  width?: number;
  height?: number;
}

export interface ProposalConfig {
  type: ProposalType;
  clientName: string;
  clientCompany: string;
  clientRole?: string;
  clientEmail?: string;
  consultantName: string;
  consultantCompany: string;
  consultantRole?: string;
  projectTitle: string;
  estimatedWeeks: number;
  projectBudgetBrl?: number;
  monthlySupportBudgetBrl?: number;
  slaTarget?: string;
  migrationStrategy?: 'rehost' | 'replatform' | 'refactor' | 'hybrid';
  scopeNotes?: string;
  architectureImage?: ArchitectureImageAttachment;
}

