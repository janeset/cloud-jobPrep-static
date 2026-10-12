// The study plan and certifications for the Cloud track. Loaded after cloud-zero.js.
// The plan is a list of phases, each ending in an AWS exam. Weeks are sized for about 12 hours a
// week; Settings can change the pace (10 or 15), which stretches or shortens the calendar
// (trackWeek and the roadmap in trackview.js). `weeksIt` replaces a phase's weeks for people
// already in IT, who skip Cloud from zero. A week with no topics is exam prep, review, or a week
// whose lessons aren't written yet (`todo`, listed in TODO-content.md).
// Exam details last checked against aws.amazon.com/certification on 2026-10-12.

CLOUD.pace = 12; // hours a week the weeks are sized for
CLOUD.phases = [
  {
    id: "foundations", name: "Foundations",
    goal: "Get comfortable with computers, the internet, the command line and the AWS console, and open your account safely.",
    weeks: [
      { title: "Computers, the internet and the command line", topics: ["zero-computers", "zero-internet", "zero-cli"], labs: [], goal: "Understand servers, networks, IP addresses, DNS and HTTP, and run your first terminal commands." },
      { title: "The cloud, accounts and security", topics: ["zero-cloud", "zero-accounts"], labs: [], goal: "Explain what the cloud is, then open an AWS account on the Free plan with root MFA and a budget alert (Lesson 1's Try it)." },
      { title: "Linux and cloud fundamentals", topics: ["linux", "fundamentals"], labs: [], goal: "Find your way around a Linux machine, and explain regions, shared responsibility and pricing models." },
      { title: "Bash and identity", topics: ["bash", "iam"], labs: [], goal: "Write a small Bash script, and explain users, roles, policies and least privilege." },
    ],
    weeksIt: [
      { title: "Cloud fundamentals, identity and Linux", topics: ["fundamentals", "iam", "linux"], labs: [], goal: "Refresh shared responsibility, IAM roles and policies, and the Linux commands interviews ask about." },
      { title: "Bash and governance", topics: ["bash", "governance"], labs: [], goal: "Write a small Bash script, and describe a landing zone and guardrails." },
    ],
  },
  {
    id: "clf", name: "Cloud Practitioner", exam: "CLF-C02",
    goal: "Learn the core AWS services, security and pricing, build your first project, and pass AWS Certified Cloud Practitioner.",
    weeks: [
      { title: "Networking and security", topics: ["networking", "security"], labs: [], goal: "Sketch a VPC with public and private subnets, and keep secrets out of code." },
      { title: "Storage and compute", topics: ["storage", "compute"], labs: ["staticsite"], goal: "Host a static website on S3 behind CloudFront, and explain EC2, load balancers and autoscaling." },
      { title: "Databases, monitoring and cost", topics: ["databases", "operations", "billing"], labs: [], goal: "Pick the right database, set up monitoring and budgets, and choose pricing models and a support plan." },
      { title: "Cloud Practitioner review and exam", topics: [], labs: [], goal: "Take full CLF practice exams in AWS Certs, drill your weakest domain, then sit the exam.", exam: true },
    ],
  },
  {
    id: "aif", name: "AI Practitioner", exam: "AIF-C01",
    goal: "Learn how AI, machine learning and generative AI work on AWS, and pass AWS Certified AI Practitioner.",
    weeks: [
      { title: "AI and machine learning fundamentals", topics: ["aifund"], labs: [], goal: "Explain AI vs machine learning vs deep learning, training vs inference, precision vs recall, and the main AWS AI services." },
      { title: "Generative AI and Amazon Bedrock", topics: ["genai"], labs: [], goal: "Explain foundation models, tokens, prompts, RAG and agents, and try a model in the Bedrock playground." },
      { title: "Responsible AI, security and governance", topics: ["airesp"], labs: [], goal: "Describe bias, explainability, Guardrails, and how to secure and govern AI workloads on AWS." },
      { title: "AI Practitioner review and exam", topics: [], labs: [], goal: "Take full AIF practice exams in AWS Certs and AWS Skill Builder's official practice set, then sit the exam.", exam: true },
    ],
  },
  {
    id: "saa", name: "Solutions Architect – Associate", exam: "SAA-C03",
    goal: "Design resilient, secure, cost-effective systems on AWS, build three more projects, and pass Solutions Architect – Associate. This is the point to start applying for junior cloud roles.",
    weeks: [
      { title: "Containers and serverless", topics: ["containers", "serverless"], labs: [], goal: "Explain containers, ECS / Fargate and Lambda, and when to choose each." },
      { title: "Messaging and a serverless API", topics: ["messaging"], labs: ["serverlessapi"], goal: "Decouple services with SQS and SNS, and build a serverless REST API." },
      { title: "Python for automation", topics: ["python"], labs: [], goal: "Write Python scripts that call AWS with boto3." },
      { title: "Terraform and a production network", topics: ["terraform"], labs: ["terraformnet"], goal: "Build a multi-AZ VPC in Terraform with remote state." },
      { title: "Kubernetes", topics: ["kubernetes"], labs: [], goal: "Explain pods, deployments and services, and where EKS fits." },
      { title: "High availability and disaster recovery", topics: ["architecture"], labs: [], goal: "Calculate availability, and pick a DR strategy from RPO and RTO." },
      { title: "Data, governance and monitoring", topics: ["data", "governance"], labs: ["observability"], goal: "Describe a data lake and a landing zone, and add dashboards, alarms and budgets to a lab." },
      { title: "Deep dive: networking", topics: ["netdeep"], labs: [], goal: "VPC endpoints, Transit Gateway, Route 53 routing policies, and hybrid connections." },
      { title: "Deep dive: storage, databases and caching", topics: ["datadeep"], labs: [], goal: "S3 storage classes, EBS, EFS and FSx, Aurora, DynamoDB design and caching." },
      { title: "Deep dive: security services", topics: ["secdeep"], labs: [], goal: "KMS, Secrets Manager, ACM, WAF, Shield, Cognito, cross-account access and threat detection." },
      { title: "Practice exams and weak domains", topics: [], labs: [], goal: "Take timed SAA practice exams in AWS Certs and review every wrong answer." },
      { title: "Solutions Architect review and exam", topics: [], labs: [], goal: "One final timed practice exam, a light review, then sit the exam.", exam: true },
    ],
    weeksIt: null, // same weeks; governance moved to Foundations, so week 7 is data and monitoring only
  },
  {
    id: "dva", name: "Developer – Associate", exam: "DVA-C03",
    goal: "Build and deploy applications on AWS: serverless, DynamoDB, CI/CD and debugging. AWS is replacing DVA-C02 with DVA-C03; the details arrive on Oct 27, 2026.",
    weeks: [
      { title: "CI/CD and a container pipeline", topics: ["devops"], labs: ["containercicd"], goal: "Deploy a container automatically from GitHub with OIDC, no stored keys." },
      { title: "Lambda and API Gateway in depth", topics: [], labs: [], goal: "Versions and aliases, layers, concurrency, environment variables, and API Gateway stages and auth.", todo: "DVA: Lambda and API Gateway in depth" },
      { title: "DynamoDB for developers", topics: [], labs: [], goal: "Keys and indexes, queries vs scans, conditional writes, streams and TTL.", todo: "DVA: DynamoDB for developers" },
      { title: "Authentication with Cognito", topics: [], labs: [], goal: "User pools vs identity pools, tokens, and securing an API.", todo: "DVA: Cognito and application security" },
      { title: "Deployment: SAM, CDK and the Code services", topics: [], labs: [], goal: "SAM and CDK, CodeBuild, CodeDeploy, CodePipeline, and deployment strategies.", todo: "DVA: SAM, CDK and the Code services" },
      { title: "Troubleshooting and optimization", topics: [], labs: [], goal: "X-Ray tracing, CloudWatch Logs Insights, retries, and performance tuning.", todo: "DVA: troubleshooting and optimization" },
      { title: "Developer review and exam", topics: [], labs: [], goal: "Practice exams for the current version, a final review, then sit the exam.", exam: true },
    ],
  },
  {
    id: "sap", name: "Solutions Architect – Professional", exam: "SAP-C03",
    goal: "Design for large organisations: many accounts, hybrid networks, migrations, and cost at scale. AWS is replacing SAP-C02 with SAP-C03; the details arrive on Oct 27, 2026. It's best attempted with some real AWS work experience.",
    weeks: [
      { title: "Multi-account strategy", topics: [], labs: [], goal: "Organizations, OUs, SCPs, Control Tower and IAM Identity Center at scale.", todo: "SAP: multi-account strategy" },
      { title: "Hybrid and multi-VPC networking", topics: [], labs: [], goal: "Transit Gateway, Direct Connect, Site-to-Site VPN, PrivateLink and DNS across accounts.", todo: "SAP: hybrid and multi-VPC networking" },
      { title: "Security and governance at scale", topics: [], labs: [], goal: "Centralised logging, Security Hub, GuardDuty, Config and permission boundaries.", todo: "SAP: security and governance at scale" },
      { title: "Reliability and disaster recovery at scale", topics: [], labs: [], goal: "Multi-region designs, Aurora Global Database, Route 53 failover, and AWS Backup across accounts.", todo: "SAP: reliability and DR at scale" },
      { title: "Performance and data at scale", topics: [], labs: [], goal: "Caching layers, data lakes, streaming and choosing databases for large workloads.", todo: "SAP: performance and data at scale" },
      { title: "Cost optimization", topics: [], labs: [], goal: "Savings Plans, Spot, rightsizing, storage tiers and cost allocation across an organisation.", todo: "SAP: cost optimization" },
      { title: "Migration", topics: [], labs: [], goal: "The 7 Rs, Migration Hub, Application Migration Service, DMS and large data transfers.", todo: "SAP: migration and modernization" },
      { title: "Improving existing solutions", topics: [], labs: [], goal: "Read an existing architecture, find its weak points, and propose improvements.", todo: "SAP: continuous improvement" },
      { title: "Case studies, part 1", topics: [], labs: [], goal: "Work through long scenario questions: read for constraints first, eliminate wrong answers." },
      { title: "Case studies, part 2", topics: [], labs: [], goal: "More long scenarios, timed, with a written review of each mistake." },
      { title: "Practice exams and weak domains", topics: [], labs: [], goal: "Timed practice exams (the exam is long, so practise the stamina), then review weak domains." },
      { title: "Solutions Architect – Professional review and exam", topics: [], labs: [], goal: "A final review, rest, then sit the exam.", exam: true },
    ],
  },
];
// Already in IT: governance moves into Foundations, so the SAA "data and governance" week is data only.
CLOUD.phases[3].weeksIt = CLOUD.phases[3].weeks.map((w) => w.topics.includes("governance") ? Object.assign({}, w, { title: "Data and monitoring", topics: ["data"], goal: "Describe a data lake, and add dashboards, alarms and budgets to a lab." }) : w);

// Cloud > Certs: the AWS certifications on the plan, in order. `tag` links practice questions in the
// Quiz tab; ids clf and saa match saved statuses. Codes and dates change: each card links the official page.
CLOUD.certs = [
  { id: "clf", code: "CLF-C02", name: "AWS Certified Cloud Practitioner", provider: "AWS", level: "Foundational", tag: "CLF", link: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    facts: "90 minutes · 65 questions · USD 100",
    why: "Broad intro to AWS: cloud concepts, core services, security, billing and support. A quick first win, and the base for every other AWS exam.", topics: ["fundamentals", "iam", "security", "compute", "storage", "databases", "networking", "operations", "billing", "governance", "architecture"] },
  { id: "aif", code: "AIF-C01", name: "AWS Certified AI Practitioner", provider: "AWS", level: "Foundational", tag: "AIF", link: "https://aws.amazon.com/certification/certified-ai-practitioner/",
    facts: "90 minutes · 65 questions · USD 100",
    why: "AI, machine learning and generative AI on AWS: foundation models, Amazon Bedrock, responsible AI and AI security. Useful for the AI Cloud Engineer roles in the Roles tab.", topics: ["aifund", "genai", "airesp", "security", "data"] },
  { id: "saa", code: "SAA-C03", name: "AWS Certified Solutions Architect – Associate", provider: "AWS", level: "Associate", tag: "SAA", link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    facts: "130 minutes · 65 questions · USD 150",
    why: "The most requested AWS cert in job postings. Designing resilient, secure, cost-effective architectures; pairs well with system design interviews.", topics: ["iam", "networking", "netdeep", "security", "secdeep", "compute", "containers", "serverless", "storage", "databases", "datadeep", "messaging", "architecture", "data", "operations", "billing"] },
  { id: "dva", code: "DVA-C03", name: "AWS Certified Developer – Associate", provider: "AWS", level: "Associate", tag: "DVA", link: "https://aws.amazon.com/certification/certified-developer-associate/",
    facts: "Current version: 130 minutes · 65 questions · USD 150",
    why: "Building, deploying and debugging applications on AWS: Lambda, API Gateway, DynamoDB, Cognito, CI/CD and X-Ray.", topics: ["serverless", "databases", "iam", "security", "containers", "devops", "messaging", "python"],
    note: "AWS is replacing DVA-C02 with DVA-C03. Registration for DVA-C03 opens Oct 27, 2026, and the last day to take DVA-C02 is Nov 30, 2026. Courses and practice tests labelled DVA-C02 cover the old version." },
  { id: "sap", code: "SAP-C03", name: "AWS Certified Solutions Architect – Professional", provider: "AWS", level: "Professional", tag: "SAP", link: "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
    facts: "Current version: 180 minutes · 75 questions · USD 300",
    why: "Architecture for large organisations: multi-account strategy, hybrid networking, migration, and cost and reliability at scale. The hardest AWS exam; best with real AWS work experience.", topics: ["governance", "networking", "architecture", "security", "data", "operations"],
    note: "AWS is replacing SAP-C02 with SAP-C03. Registration for SAP-C03 opens Oct 27, 2026, and the last day to take SAP-C02 is Nov 16, 2026." },
];

// Cloud > Other certifications: Azure and Google Cloud, for reference. Not part of the plan.
// ids az900 and az104 match statuses saved when these were on the Certs tab.
CLOUD.otherCerts = [
  { id: "az900", code: "AZ-900", name: "Microsoft Certified: Azure Fundamentals", provider: "Azure", level: "Fundamentals", tag: "AZ-900", link: "https://learn.microsoft.com/credentials/certifications/azure-fundamentals/",
    facts: "45 minutes",
    why: "Azure's entry cert: cloud concepts, Azure architecture and services, and management and governance. Good signal for banks and insurers, which lean Azure.",
    assessed: ["Describe cloud concepts", "Describe Azure architecture and services", "Describe Azure management and governance"],
    after: "Your Cloud Practitioner study covers most of it: learn the Azure names alongside (set Following to Azure or both).", topics: ["fundamentals", "iam", "security", "compute", "storage", "networking", "operations", "governance"] },
  { id: "az104", code: "AZ-104", name: "Microsoft Certified: Azure Administrator Associate", provider: "Azure", level: "Associate", tag: "AZ-104", link: "https://learn.microsoft.com/credentials/certifications/azure-administrator/",
    facts: "100 minutes · renew yearly (free online assessment)",
    why: "Hands-on Azure administration. Strong for platform and operations roles at Azure-heavy employers.",
    assessed: ["Manage Azure identities and governance", "Implement and manage storage", "Deploy and manage Azure compute resources", "Implement and manage virtual networking", "Monitor and maintain Azure resources"],
    after: "Best after Solutions Architect – Associate; expect to practise in the Azure portal, Azure CLI, PowerShell and Bicep.", topics: ["iam", "governance", "storage", "compute", "containers", "networking", "operations"] },
  { id: "az305", code: "AZ-305", name: "Microsoft Certified: Azure Solutions Architect Expert", provider: "Azure", level: "Expert", tag: "AZ-305", link: "https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/",
    facts: "Requires AZ-104 first",
    why: "Azure's architect cert: designing identity, data, business continuity and infrastructure solutions. The Azure counterpart to the AWS architect certs.",
    assessed: ["Design identity, governance, and monitoring solutions", "Design data storage solutions", "Design business continuity solutions", "Design infrastructure solutions"],
    after: "You must hold the Azure Administrator Associate (AZ-104) before this counts.", topics: ["iam", "governance", "operations", "databases", "storage", "architecture", "networking", "compute"] },
  { id: "gcdl", code: "Cloud Digital Leader", name: "Google Cloud Certified: Cloud Digital Leader", provider: "Google Cloud", level: "Foundational", link: "https://cloud.google.com/learn/certification/cloud-digital-leader",
    facts: "90 minutes · 50-60 questions · USD 99 · valid 3 years",
    why: "Google Cloud's entry cert, aimed at understanding what the cloud and Google's services do for a business rather than hands-on skills.",
    assessed: ["Digital transformation with Google Cloud", "Exploring data transformation with Google Cloud", "Innovating with Google Cloud artificial intelligence", "Modernizing infrastructure and applications with Google Cloud", "Trust and security with Google Cloud", "Scaling with Google Cloud operations"],
    after: "Your Cloud Practitioner and AI Practitioner study covers the ideas; learn Google's service names.", topics: ["fundamentals", "data", "security", "operations"] },
  { id: "gace", code: "Associate Cloud Engineer", name: "Google Cloud Certified: Associate Cloud Engineer", provider: "Google Cloud", level: "Associate", link: "https://cloud.google.com/learn/certification/cloud-engineer",
    facts: "2 hours · 50-60 questions · USD 125 · valid 3 years · Google recommends 6+ months hands-on",
    why: "Hands-on Google Cloud: deploying, running and securing projects. The Google counterpart to the AWS associate certs.",
    assessed: ["Set up a cloud solution environment", "Plan and implement a cloud solution", "Ensure the successful operation of a cloud solution", "Configure access and security"],
    after: "Best after Solutions Architect – Associate; most concepts carry over, but practise in the Google Cloud console and gcloud CLI.", topics: ["iam", "compute", "containers", "storage", "networking", "operations"] },
  { id: "gpca", code: "Professional Cloud Architect", name: "Google Cloud Certified: Professional Cloud Architect", provider: "Google Cloud", level: "Professional", link: "https://cloud.google.com/learn/certification/cloud-architect",
    facts: "2 hours · 50-60 questions, including 2 case studies · USD 200 · valid 2 years · Google recommends 3+ years in industry, 1+ on Google Cloud",
    why: "Designing and managing Google Cloud solutions, with case studies. The Google counterpart to the AWS Professional architect cert.",
    assessed: ["Design and plan a cloud solution architecture", "Manage and provision the cloud solution infrastructure", "Design for security and compliance", "Analyze and optimize technical and business processes", "Manage implementations of cloud architecture", "Ensure solution and operations excellence"],
    after: "Best after one of the architect certs and real project experience.", topics: ["architecture", "governance", "security", "networking", "operations"] },
];
