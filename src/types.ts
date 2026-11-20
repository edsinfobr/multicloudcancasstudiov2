export type CloudProvider = 'aws' | 'azure' | 'gcp' | 'oci' | 'magalu' | 'onprem' | 'c4' | 'archimate' | 'togaf' | 'generic';

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
  | 'c4_boundary_enterprise'
  | 'c4_boundary_system'
  | 'c4_boundary_container'
  | 'archimate_group'
  | 'archimate_plateau'
  | 'togaf_adm_phase'
  | 'custom';

export type LiveProvisioningStatus =
  | 'unprovisioned'
  | 'planned'
  | 'provisioning'
  | 'running'
  | 'stopped'
  | 'error'
  | 'destroyed';

export interface NodeLiveState {
  status: LiveProvisioningStatus;
  terraformAddress?: string;
  cloudResourceId?: string;
  publicIp?: string;
  privateIp?: string;
  endpoint?: string;
  region?: string;
  consoleUrl?: string;
  connectionId?: string;
  workspaceId?: string;
  lastSyncedAt?: string;
  details?: string;
}

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
  liveState?: NodeLiveState;
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
  liveState?: NodeLiveState;
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
  animated?: boolean;
  relationshipType?: string;
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
  animateConnections?: boolean;
  showConnectionLabels?: boolean;
  lastDeploymentId?: string;
  liveWorkspaceId?: string;
  activeFramework?: string;
  c4LevelFilter?: string;
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

export type RealCloudProvider = 'aws' | 'gcp' | 'azure' | 'oci';

export interface CloudConnectionProfile {
  id: string;
  userId?: string;
  label: string;
  provider: RealCloudProvider;
  region: string;
  accountHint: string; // e.g., AWS Account ID, GCP Project ID, Azure Subscription ID, OCI Tenancy OCID (masked/safe)
  status: 'connected' | 'disconnected' | 'error';
  hasActiveSession?: boolean; // true if server currently holds ephemeral secret in RAM
  lastTestedAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    projectId?: string;
    subscriptionId?: string;
    tenantId?: string;
    compartmentId?: string;
    tenancyOcid?: string;
    callerArn?: string;
    identityEmail?: string;
  };
}

export interface CloudCredentialInput {
  id?: string;
  label: string;
  provider: RealCloudProvider;
  region: string;
  // AWS
  awsAccessKeyId?: string;
  awsSecretAccessKey?: string;
  awsSessionToken?: string;
  // GCP
  gcpProjectId?: string;
  gcpServiceAccountJson?: string;
  // Azure
  azureTenantId?: string;
  azureClientId?: string;
  azureClientSecret?: string;
  azureSubscriptionId?: string;
  // OCI
  ociTenancyOcid?: string;
  ociUserOcid?: string;
  ociFingerprint?: string;
  ociPrivateKeyPem?: string;
  ociCompartmentId?: string;
}

export type TerraformJobAction =
  | 'init'
  | 'validate'
  | 'plan'
  | 'apply'
  | 'refresh'
  | 'destroy'
  | 'replace-target'
  | 'destroy-target';

export type TerraformJobStatus = 'queued' | 'running' | 'succeeded' | 'failed';

export interface TerraformPlanChange {
  address: string;
  type: string;
  name: string;
  actions: string[];
}

export interface TerraformPlanSummary {
  add: number;
  change: number;
  destroy: number;
  changes: TerraformPlanChange[];
}

export interface ProvisionedResourceInfo {
  address: string;
  type: string;
  name: string;
  provider: RealCloudProvider | string;
  cloudResourceId: string;
  status: LiveProvisioningStatus;
  publicIp?: string;
  privateIp?: string;
  endpoint?: string;
  region?: string;
  consoleUrl?: string;
  diagramElementId?: string;
  attributes?: Record<string, any>;
}

export interface TerraformJobRecord {
  jobId: string;
  workspaceId: string;
  connectionId?: string;
  action: TerraformJobAction;
  targetAddress?: string;
  status: TerraformJobStatus;
  startedAt: string;
  finishedAt?: string;
  exitCode?: number | null;
  logs: string[];
  planSummary?: TerraformPlanSummary;
  outputs?: Record<string, { value: any; type?: any }>;
  resources?: ProvisionedResourceInfo[];
  error?: string;
}

export interface DiscoveredCloudResource {
  id: string;
  name: string;
  provider: RealCloudProvider;
  service: string; // e.g., EC2, VPC, S3, RDS, GCE, GCS, Azure VM, VNet, OCI Compute, VCN
  resourceType: string; // Terraform type e.g. aws_instance
  iconKey: string;
  category: ServiceCategory;
  state: 'running' | 'stopped' | 'available' | 'terminated' | 'unknown';
  region: string;
  publicIp?: string;
  privateIp?: string;
  endpoint?: string;
  instanceType?: string;
  consoleUrl?: string;
  controllable: boolean;
  supportedActions: Array<'start' | 'stop' | 'reboot'>;
  rawMeta?: Record<string, any>;
}

export interface TerraformDeploymentRecord {
  id: string;
  userId?: string;
  architectureId: string;
  architectureTitle: string;
  workspaceId: string;
  connectionId?: string;
  provider: RealCloudProvider | 'multicloud';
  action: TerraformJobAction;
  status: TerraformJobStatus;
  summaryText: string;
  planSummary?: TerraformPlanSummary;
  outputs?: Record<string, any>;
  resourcesCount: number;
  createdAt: string;
  updatedAt: string;
}


