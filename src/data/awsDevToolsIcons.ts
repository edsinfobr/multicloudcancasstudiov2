import { CloudIconDefinition } from '../types';

export const AWS_DEVTOOLS_ICONS: CloudIconDefinition[] = [
  // 1. Arch_AWS-CloudShell_48.png -> CloudShell
  {
    key: 'aws_cloudshell',
    name: 'CloudShell',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_cloudshell',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Browser-based pre-authenticated shell for managing AWS resources directly from the console',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Cloud in top-left background -->
      <path d="M 17 31 C 13.5 31 11.5 28 12.5 24.5 C 11.5 20.5 14.5 16 19.5 16.5 C 22 12.5 29.5 12.5 32.5 16 C 36 15 39.5 18 39.5 22.5 C 41.5 24.5 41.5 27 40 29" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      <!-- Terminal Window -->
      <rect x="22" y="27" width="31" height="23" rx="3" stroke="#FFFFFF" stroke-width="2.6" fill="#C925D1"/>
      <path d="M 28 34 L 35 38.5 L 28 43" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="39" y1="43" x2="47" y2="43" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
    </svg>`
  },

  // 2. Arch_AWS-CodeBuild_48.png -> CodeBuild
  {
    key: 'aws_codebuild',
    name: 'CodeBuild',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_codebuild_project',
    defaultSpecs: { computeType: 'BUILD_GENERAL1_SMALL', image: 'aws/codebuild/standard:7.0' },
    description: 'Continuous integration service compiling source code, running unit tests, and producing artifacts',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Crane Tower Legs & Top Arm -->
      <line x1="14" y1="18" x2="14" y2="52" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="24" y1="18" x2="24" y2="52" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="10" y1="18" x2="54" y2="18" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 14 18 L 19 11 L 24 18" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Lattice cross bars -->
      <path d="M 14 20 L 24 28 M 24 20 L 14 28 M 14 28 L 24 36 M 24 28 L 14 36 M 14 36 L 24 44 M 24 36 L 14 44 M 14 44 L 24 52 M 24 44 L 14 52" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Hoist Cable -->
      <line x1="40" y1="18" x2="40" y2="29" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Container Box with Code Brackets -->
      <rect x="29" y="29" width="22" height="17" rx="2" stroke="#FFFFFF" stroke-width="2.4" fill="#C925D1"/>
      <path d="M 34 35 L 32 37.5 L 34 40" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="40" y1="34" x2="38" y2="41" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <path d="M 44 35 L 46 37.5 L 44 40" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 3. Arch_AWS-CodeDeploy_48.png -> CodeDeploy
  {
    key: 'aws_codedeploy',
    name: 'CodeDeploy',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_codedeploy_app',
    defaultSpecs: { computePlatform: 'Server' },
    description: 'Automates code deployments to any instance, including EC2, ECS, and serverless Lambda',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Parachute Canopy -->
      <path d="M 13 29 C 13 14 51 14 51 29 C 46 26.5 41 26.5 37 29 C 33 26.5 27 26.5 23 29 C 19 26.5 15 26.5 13 29 Z" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
      <path d="M 32 14 C 27 18 24 24 23 29 M 32 14 C 37 18 40 24 41 29" stroke="#FFFFFF" stroke-width="1.8" fill="none"/>
      <!-- Suspension Strings -->
      <line x1="14" y1="29" x2="23" y2="39" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="23" y1="29" x2="27" y2="39" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="41" y1="29" x2="37" y2="39" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="50" y1="29" x2="41" y2="39" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Suspended Package with Code Icon -->
      <rect x="23" y="39" width="18" height="15" rx="2" stroke="#FFFFFF" stroke-width="2.4" fill="#C925D1"/>
      <path d="M 27 44.5 L 25 46.5 L 27 48.5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="32" y1="43.5" x2="30" y2="49.5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M 35 44.5 L 37 46.5 L 35 48.5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 4. Arch_AWS-Tools-and-SDKs_48.png -> Tools and SDKs
  {
    key: 'aws_tools_and_sdks',
    name: 'Tools and SDKs',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_tools_and_sdks',
    defaultSpecs: { language: 'TypeScript/Python/Go' },
    description: 'AWS SDKs, libraries, and developer tools for building and integrating cloud applications',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Outer Isometric 3D Cube -->
      <polygon points="32,12 50,22.5 32,33 14,22.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
      <path d="M 14 22.5 V 42.5 L 32 53 V 33" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
      <path d="M 50 22.5 V 42.5 L 32 53" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
      <!-- Inner Solid 3D Cube -->
      <polygon points="32,23 41,28.5 32,34 23,28.5" fill="#FFFFFF"/>
      <polygon points="23,28.5 32,34 32,44 23,38.5" fill="#FFFFFF" fill-opacity="0.8"/>
      <polygon points="41,28.5 32,34 32,44 41,38.5" fill="#FFFFFF" fill-opacity="0.6"/>
    </svg>`
  },

  // 5. Arch_Amazon-CodeCatalyst_48.png -> CodeCatalyst
  {
    key: 'aws_codecatalyst',
    name: 'CodeCatalyst',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_codecatalyst_project',
    defaultSpecs: { tier: 'Free' },
    description: 'Unified software development service with blueprints, automated CI/CD, and issue tracking',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- CodeCatalyst Emblem -->
      <path d="M 43 19 A 18 18 0 1 0 43 45" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M 38 24 A 11 11 0 1 0 38 40" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
      <line x1="32" y1="14" x2="32" y2="21" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="32" y1="43" x2="32" y2="50" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="14" y1="32" x2="21" y2="32" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 6. Arch_Amazon-Corretto_48.png -> Corretto
  {
    key: 'aws_corretto',
    name: 'Corretto',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_corretto',
    defaultSpecs: { version: 'Java 21 LTS' },
    description: 'No-cost, multiplatform, production-ready distribution of OpenJDK',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Coffee Cup -->
      <path d="M 19 32 H 45 V 43 C 45 47.5 19 47.5 19 43 Z" stroke="#FFFFFF" stroke-width="2.6" fill="none"/>
      <path d="M 15 50 C 15 53.5 49 53.5 49 50" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      <path d="M 19 35 C 13.5 35 13.5 42 19 42" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      <line x1="25" y1="37" x2="37" y2="37" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Sugar Cubes -->
      <rect x="25" y="15" width="7" height="7" rx="1.5" stroke="#FFFFFF" stroke-width="2.2" fill="none"/>
      <rect x="34" y="17" width="7" height="7" rx="1.5" stroke="#FFFFFF" stroke-width="2.2" fill="none"/>
      <rect x="29" y="23" width="7" height="7" rx="1.5" stroke="#FFFFFF" stroke-width="2.2" fill="none"/>
    </svg>`
  },

  // 7. Arch_AWS-Cloud9_48.png -> Cloud9
  {
    key: 'aws_cloud9',
    name: 'Cloud9',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_cloud9_environment_ec2',
    defaultSpecs: { instanceType: 't3.small', count: 1 },
    description: 'Cloud-based integrated development environment (IDE) for writing, running, and debugging code',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Cloud Outline -->
      <path d="M 14 45 H 50 C 53.5 45 56 42 56 38.5 C 56 34 52.5 30.5 48.5 29.5 C 49.5 26 48.5 22 45.5 20 C 41.5 17.5 37 19 36 21 C 33 13 23.5 11 17.5 15 C 12 18.5 9.5 23.5 10.5 29.5 C 6 30.5 4 34.5 4 38.5 C 4 43.5 8.5 45 14 45 Z" stroke="#FFFFFF" stroke-width="2.6" stroke-linejoin="round" fill="none"/>
      <!-- Number 9 -->
      <circle cx="30" cy="29" r="6" stroke="#FFFFFF" stroke-width="2.8" fill="none"/>
      <path d="M 36 29 V 39 C 36 42 33.5 44 30 44 C 27 44 25.5 42.5 25 41" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round"/>
    </svg>`
  },

  // 8. Arch_AWS-Cloud-Control-API_48.png -> Cloud Control API
  {
    key: 'aws_cloud_control_api',
    name: 'Cloud Control API',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_cloudcontrolapi_resource',
    defaultSpecs: { typeName: 'AWS::ECS::Cluster' },
    description: 'Standardized set of APIs to create, read, update, delete, and list cloud infrastructure resources',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Cloud Outline -->
      <path d="M 16 46 H 48 C 51 46 54 43 54 39.5 C 54 35 51 32 47 31 C 48 27.5 47 23.5 44 21.5 C 40 19 36 20.5 35 22 C 32 15 23.5 13 18 17 C 13 20 11 25 12 30.5 C 7.5 31.5 6 35.5 6 39.5 C 6 44 10 46 16 46 Z" stroke="#FFFFFF" stroke-width="2.6" stroke-linejoin="round" fill="none"/>
      <!-- Looped arrows -->
      <path d="M 23 31 C 19 31 19 25 23 25 H 39 M 35 21 L 40 25 L 35 29" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 41 33 C 45 33 45 39 41 39 H 25 M 29 35 L 24 39 L 29 43" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 9. Arch_AWS-Cloud-Development-Kit_48.png -> Cloud Development Kit
  {
    key: 'aws_cloud_development_kit',
    name: 'Cloud Development Kit',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_cdk',
    defaultSpecs: { framework: 'TypeScript CDK v2' },
    description: 'Open-source software framework to define cloud infrastructure using code and provision via CloudFormation',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Cloud in background -->
      <path d="M 15 36 C 11.5 36 9.5 33 10.5 29.5 C 9.5 25.5 12.5 21 17.5 21.5 C 20 17 27.5 17 30.5 20.5 C 34 19.5 37.5 22 37.5 26.5 C 40.5 27.5 42 30 42 33 C 42 36 39.5 38 37 38" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <!-- 3 Clustered Building Cubes -->
      <!-- Top cube -->
      <polygon points="32,23 40,27.5 32,32 24,27.5" stroke="#FFFFFF" stroke-width="2" fill="#C925D1"/>
      <polygon points="24,27.5 32,32 32,40 24,35.5" stroke="#FFFFFF" stroke-width="2" fill="#C925D1"/>
      <polygon points="40,27.5 32,32 32,40 40,35.5" stroke="#FFFFFF" stroke-width="2" fill="#C925D1"/>
      <!-- Left bottom cube -->
      <polygon points="23,33.5 31,38 23,42.5 15,38" stroke="#FFFFFF" stroke-width="2" fill="#C925D1"/>
      <polygon points="15,38 23,42.5 23,50.5 15,46" stroke="#FFFFFF" stroke-width="2" fill="#C925D1"/>
      <polygon points="31,38 23,42.5 23,50.5 31,46" stroke="#FFFFFF" stroke-width="2" fill="#C925D1"/>
      <!-- Right bottom cube -->
      <polygon points="41,33.5 49,38 41,42.5 33,38" stroke="#FFFFFF" stroke-width="2" fill="#C925D1"/>
      <polygon points="33,38 41,42.5 41,50.5 33,46" stroke="#FFFFFF" stroke-width="2" fill="#C925D1"/>
      <polygon points="49,38 41,42.5 41,50.5 49,46" stroke="#FFFFFF" stroke-width="2" fill="#C925D1"/>
    </svg>`
  },

  // 10. Arch_AWS-CodeArtifact_48.png -> CodeArtifact
  {
    key: 'aws_codeartifact',
    name: 'CodeArtifact',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_codeartifact_repository',
    defaultSpecs: { format: 'npm/maven/pypi' },
    description: 'Secure, scalable package management for npm, PyPI, Maven, and NuGet artifacts',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Hexagon -->
      <polygon points="32,19 44,26 44,40 32,47 20,40 20,26" stroke="#FFFFFF" stroke-width="2.6" fill="none"/>
      <!-- Code Brackets inside Hexagon -->
      <path d="M 27 30 L 24 33 L 27 36" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="33" y1="28" x2="31" y2="38" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M 37 30 L 40 33 L 37 36" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Bracket shapes on left and right -->
      <path d="M 15 23 L 11 25.5 V 40.5 L 15 43" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 49 23 L 53 25.5 V 40.5 L 49 43" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 11. Arch_AWS-CodeCommit_48.png -> CodeCommit
  {
    key: 'aws_codecommit',
    name: 'CodeCommit',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_codecommit_repository',
    defaultSpecs: { defaultBranch: 'main' },
    description: 'Scalable managed source control service hosting secure Git repositories',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Git Branch Nodes -->
      <line x1="19" y1="18" x2="19" y2="48" stroke="#FFFFFF" stroke-width="2.6"/>
      <circle cx="19" cy="18" r="3.5" stroke="#FFFFFF" stroke-width="2.5" fill="#C925D1"/>
      <circle cx="19" cy="33" r="3.5" stroke="#FFFFFF" stroke-width="2.5" fill="#C925D1"/>
      <circle cx="19" cy="48" r="3.5" stroke="#FFFFFF" stroke-width="2.5" fill="#C925D1"/>
      <!-- Branch Line & Node -->
      <path d="M 21 31 L 28 23" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M 25 21 L 30 21 L 30 26" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Code Document Sheet -->
      <path d="M 33 22 H 45 L 51 28 V 50 H 33 Z" stroke="#FFFFFF" stroke-width="2.5" fill="#C925D1"/>
      <polyline points="45,22 45,28 51,28" stroke="#FFFFFF" stroke-width="2.2" fill="none"/>
      <path d="M 38 37 L 36 39 L 38 41 M 42 35 L 40 43 M 45 37 L 47 39 L 45 41" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 12. Arch_AWS-CodePipeline_48.png -> CodePipeline
  {
    key: 'aws_codepipeline',
    name: 'CodePipeline',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_codepipeline',
    defaultSpecs: { stagesCount: 3 },
    description: 'Automated continuous delivery service for modeling, visualizing, and deploying pipeline workflows',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Hopper / Dispenser Cap -->
      <rect x="15" y="16" width="34" height="11" rx="3" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
      <line x1="23" y1="21.5" x2="33" y2="21.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Container Delivered Below -->
      <rect x="20" y="27" width="24" height="23" rx="2" stroke="#FFFFFF" stroke-width="2.5" fill="#C925D1"/>
      <!-- Code Brackets inside -->
      <path d="M 26 36.5 L 24 38.5 L 26 40.5" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="32" y1="35" x2="30" y2="42" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M 36 36.5 L 38 38.5 L 36 40.5" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 13. Arch_AWS-Command-Line-Interface_48.png -> Command Line Interface
  {
    key: 'aws_command_line_interface',
    name: 'Command Line Interface',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_cli',
    defaultSpecs: { version: 'AWS CLI v2' },
    description: 'Unified command-line tool to control and script multiple AWS services from terminal consoles',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Terminal Frame -->
      <rect x="12" y="14" width="40" height="36" rx="3" stroke="#FFFFFF" stroke-width="2.6" fill="none"/>
      <line x1="12" y1="23" x2="52" y2="23" stroke="#FFFFFF" stroke-width="2"/>
      <!-- 3 Header dots -->
      <circle cx="17.5" cy="18.5" r="1.5" fill="#FFFFFF"/>
      <circle cx="22.5" cy="18.5" r="1.5" fill="#FFFFFF"/>
      <circle cx="27.5" cy="18.5" r="1.5" fill="#FFFFFF"/>
      <!-- Terminal Prompt -->
      <path d="M 20 31 L 28 37 L 20 43" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="33" y1="43" x2="44" y2="43" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },

  // 14. Arch_AWS-Fault-Injection-Service_48.png -> Fault Injection Service
  {
    key: 'aws_fault_injection_service',
    name: 'Fault Injection Service',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_fis_experiment_template',
    defaultSpecs: { action: 'aws:ec2:stop-instances' },
    description: 'Managed chaos engineering service to run controlled fault injection experiments on AWS workloads',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Cloud Outline -->
      <path d="M 19 35 C 14.5 35 12.5 31 14 27 C 13 21 19 16 25 17.5 C 28 11.5 38 11.5 42 16.5 C 47 15.5 51 19.5 51 24.5 C 54.5 27.5 53.5 33 49 35" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <!-- Experiment particles -->
      <circle cx="34" cy="20" r="2.2" fill="#FFFFFF"/>
      <circle cx="25" cy="26" r="1.6" fill="#FFFFFF"/>
      <path d="M 41 22 L 46 27 M 46 22 L 41 27" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Test Tube -->
      <path d="M 23 35 H 35 M 25 35 V 47 C 25 51 33 51 33 47 V 35" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <line x1="28" y1="40" x2="31" y2="40" stroke="#FFFFFF" stroke-width="1.8"/>
      <line x1="28" y1="44" x2="31" y2="44" stroke="#FFFFFF" stroke-width="1.8"/>
    </svg>`
  },

  // 15. Arch_AWS-Infrastructure-Composer_48.png -> Infrastructure Composer
  {
    key: 'aws_infrastructure_composer',
    name: 'Infrastructure Composer',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_infrastructure_composer',
    defaultSpecs: { format: 'CloudFormation/SAM' },
    description: 'Visual builder to architect, configure, and compose serverless applications using IaC',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Network Nodes Matrix -->
      <circle cx="16" cy="20" r="3" stroke="#FFFFFF" stroke-width="2.2" fill="#C925D1"/>
      <circle cx="16" cy="44" r="3" stroke="#FFFFFF" stroke-width="2.2" fill="#C925D1"/>
      <circle cx="27" cy="32" r="3.5" stroke="#FFFFFF" stroke-width="2.5" fill="#FFFFFF"/>
      <circle cx="38" cy="20" r="3" stroke="#FFFFFF" stroke-width="2.2" fill="#C925D1"/>
      <circle cx="48" cy="20" r="3" stroke="#FFFFFF" stroke-width="2.2" fill="#C925D1"/>
      <circle cx="38" cy="32" r="3" stroke="#FFFFFF" stroke-width="2.2" fill="#C925D1"/>
      <circle cx="48" cy="32" r="3" stroke="#FFFFFF" stroke-width="2.2" fill="#C925D1"/>
      <circle cx="38" cy="44" r="3" stroke="#FFFFFF" stroke-width="2.2" fill="#C925D1"/>
      <circle cx="48" cy="44" r="3" stroke="#FFFFFF" stroke-width="2.2" fill="#C925D1"/>
      <!-- Connecting Network Lines -->
      <path d="M 18.5 22 L 24.5 30 M 18.5 42 L 24.5 34 M 30.5 32 H 35 M 41 20 H 45 M 41 32 H 45 M 41 44 H 45 M 29 29.5 L 35.5 22.5 M 29 34.5 L 35.5 41.5 M 38 23 V 29 M 38 35 V 41" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`
  },

  // 16. Arch_AWS-X-Ray_48.png -> X-Ray
  {
    key: 'aws_xray',
    name: 'X-Ray',
    provider: 'aws',
    category: 'devops',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_xray_sampling_rule',
    defaultSpecs: { priority: 1000, fixedRate: 0.05 },
    description: 'Distributed tracing system analyzing and debugging microservice requests across distributed architectures',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#C925D1"/>
      <!-- Cloud Outline -->
      <path d="M 16 38 C 11.5 38 9.5 33 11.5 29 C 10.5 23 16.5 18 22.5 20 C 26.5 13 37.5 13 41.5 18 C 47.5 17 51.5 21 51.5 27 C 54.5 31 53.5 37 48.5 39" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      <!-- Magnifier / Lens Circle -->
      <circle cx="35" cy="39" r="12" stroke="#FFFFFF" stroke-width="2.6" fill="#C925D1"/>
      <!-- Metrics Bar Chart -->
      <line x1="29" y1="44" x2="29" y2="39" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
      <line x1="35" y1="44" x2="35" y2="33" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
      <line x1="41" y1="44" x2="41" y2="36" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
    </svg>`
  }
];

