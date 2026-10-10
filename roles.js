// Roles: prep driven by real job postings for two role families. This file holds the parts that
// grow as postings are added: the role definitions, the shared skill catalog and the postings.
// Lessons, questions, quiz and projects live in roles-learn.js; the pages in roleview.js.
//
// Adding a posting: append to POSTINGS below with its role, then list the skill ids it asks for
// under `required` (must-haves and core duties) and `preferred` (nice-to-haves). Add a new skill
// to SKILLS only when no existing one fits, and a new lesson only for real gaps.
// A skill's `learn` entries are [trackId, topicId] pairs: "ai" / "cloud" tracks or "roles" lessons.

const ROLE_DEFS = [
  {
    id: "cloud", name: "Cloud Engineer", short: "Cloud",
    tagline: "Run secure, observable, automated infrastructure on Azure and AWS",
    baseline: ["cloud-fundamentals", "identity", "secrets", "networking", "containers", "kubernetes", "serverless", "iac", "cicd", "observability", "architecture", "governance"],
  },
  {
    id: "aicloud", name: "AI Cloud Engineer", short: "AI Cloud",
    tagline: "Platform and infrastructure for AI: model serving, GPUs, gateways and secure cloud AI services",
    baseline: ["cloud-ai", "llm-apis", "rag", "selfhost", "model-gateway", "gpu", "kubernetes", "iac", "cicd", "observability", "identity", "secrets", "llmops", "evals"],
  },
];

const SKILL_AREAS = ["AI systems", "Data & integration", "Cloud & platform", "Engineering practice"];

const SKILLS = [
  // AI systems
  { id: "llm-apis", area: "AI systems", name: "LLM APIs & model integration", learn: [["ai", "apis"], ["ai", "foundations"]] },
  { id: "prompting-context", area: "AI systems", name: "Prompt & context engineering", learn: [["ai", "prompting"], ["ai", "tokenization"]] },
  { id: "structured", area: "AI systems", name: "Structured outputs & validation", learn: [["ai", "structured"]] },
  { id: "rag", area: "AI systems", name: "RAG, embeddings & vector search", learn: [["ai", "embeddings"], ["ai", "vectorstores"], ["ai", "rag"]] },
  { id: "hybrid-rerank", area: "AI systems", name: "Hybrid retrieval & reranking", learn: [["roles", "permrag"], ["ai", "vectorstores"]] },
  { id: "perm-rag", area: "AI systems", name: "Permission-aware retrieval & enterprise search", learn: [["roles", "permrag"]] },
  { id: "agents", area: "AI systems", name: "Tool use & agent workflows", learn: [["ai", "tools"], ["ai", "agents"]] },
  { id: "agent-prod", area: "AI systems", name: "Production agents: memory, human review, failure handling", learn: [["roles", "entagents"]] },
  { id: "evals", area: "AI systems", name: "AI evaluation (automated & human)", learn: [["ai", "evals"]] },
  { id: "ai-safety", area: "AI systems", name: "AI security, guardrails & prompt-injection defence", learn: [["ai", "safety"], ["roles", "entagents"]] },
  { id: "selfhost", area: "AI systems", name: "Local / self-hosted model serving", learn: [["roles", "selfhost"]] },
  { id: "model-gateway", area: "AI systems", name: "Model gateways, routing & capacity testing", learn: [["roles", "selfhost"], ["ai", "llmops"]] },
  { id: "llmops", area: "AI systems", name: "LLMOps: cost, latency & caching", learn: [["ai", "llmops"]] },
  { id: "finetune", area: "AI systems", name: "Fine-tuning & model customization", learn: [["ai", "customization"]] },
  { id: "cloud-ai", area: "AI systems", name: "Managed cloud AI (Azure OpenAI / Foundry, Bedrock)", learn: [["ai", "cloudai"], ["roles", "gpucloud"]] },
  // Data & integration
  { id: "sql", area: "Data & integration", name: "SQL, schema design & safe migrations", learn: [["roles", "pgvector"], ["cloud", "databases"]] },
  { id: "pgvector", area: "Data & integration", name: "PostgreSQL + pgvector", learn: [["roles", "pgvector"]] },
  { id: "integration", area: "Data & integration", name: "REST, SOAP, GraphQL & event integration", learn: [["roles", "integration"], ["cloud", "messaging"]] },
  { id: "data-pipelines", area: "Data & integration", name: "Data pipelines, sync & indexing", learn: [["roles", "integration"], ["cloud", "data"]] },
  { id: "mfg", area: "Data & integration", name: "Manufacturing systems: CAD/PDM, PLM, ERP, MES", learn: [["roles", "mfgdata"]] },
  { id: "openusd", area: "Data & integration", name: "OpenUSD, Omniverse & digital twins", learn: [["roles", "mfgdata"]] },
  // Cloud & platform
  { id: "cloud-fundamentals", area: "Cloud & platform", name: "Cloud fundamentals (Azure & AWS)", learn: [["cloud", "fundamentals"]] },
  { id: "identity", area: "Cloud & platform", name: "Identity, auth & access control (Entra ID, OAuth)", learn: [["cloud", "iam"]] },
  { id: "secrets", area: "Cloud & platform", name: "Secrets & key management", learn: [["cloud", "security"]] },
  { id: "networking", area: "Cloud & platform", name: "Networking: VNet / VPC, DNS, private endpoints", learn: [["cloud", "networking"]] },
  { id: "containers", area: "Cloud & platform", name: "Containers & registries", learn: [["cloud", "containers"]] },
  { id: "kubernetes", area: "Cloud & platform", name: "Kubernetes", learn: [["cloud", "kubernetes"]] },
  { id: "openshift", area: "Cloud & platform", name: "Azure Red Hat OpenShift", learn: [["roles", "openshift"]] },
  { id: "serverless", area: "Cloud & platform", name: "Serverless & managed app platforms", learn: [["cloud", "serverless"]] },
  { id: "iac", area: "Cloud & platform", name: "Infrastructure as code (Terraform / Bicep)", learn: [["cloud", "devops"]] },
  { id: "cicd", area: "Cloud & platform", name: "CI/CD (Azure DevOps / GitHub Actions)", learn: [["roles", "azdevops"], ["cloud", "devops"]] },
  { id: "observability", area: "Cloud & platform", name: "Observability: logs, metrics, traces, alerts", learn: [["roles", "aiobs"], ["cloud", "operations"]] },
  { id: "gpu", area: "Cloud & platform", name: "GPU workloads & AI capacity planning", learn: [["roles", "gpucloud"], ["roles", "selfhost"]] },
  { id: "architecture", area: "Cloud & platform", name: "Architecture, reliability & disaster recovery", learn: [["cloud", "architecture"]] },
  { id: "governance", area: "Cloud & platform", name: "Governance, cost & landing zones", learn: [["cloud", "governance"], ["cloud", "operations"]] },
  // Engineering practice
  { id: "ai-frontend", area: "Engineering practice", name: "React + TypeScript frontends for AI", learn: [["roles", "aifrontend"]] },
  { id: "backend", area: "Engineering practice", name: "Backend APIs: Python + .NET/C# or Node.js", learn: [["roles", "aifrontend"], ["roles", "integration"]] },
  { id: "testing", area: "Engineering practice", name: "Automated testing: unit, integration, load, AI evals", learn: [["roles", "azdevops"], ["ai", "evals"]] },
  { id: "ai-coding", area: "Engineering practice", name: "AI coding assistants in daily work", learn: [["roles", "aicoding"]] },
  { id: "collaboration", area: "Engineering practice", name: "Design reviews, docs & evidence-based decisions", learn: [["roles", "behavioral"]] },
];

// Words and phrases that signal each skill in a posting's text. The in-app "Add posting" form uses
// them to suggest skills (you confirm each one); search uses them too. Lowercase; short terms
// match whole words only.
const SKILL_KEYWORDS = {
  "llm-apis": ["llm", "large language model", "openai", "gpt", "claude", "anthropic", "gemini", "llama", "generative ai", "genai", "gen ai", "foundation model"],
  "prompting-context": ["prompt engineering", "prompting", "prompt design", "context engineering", "few-shot", "chain-of-thought"],
  "structured": ["structured output", "json schema", "function calling", "pydantic", "output validation"],
  "rag": ["rag", "retrieval-augmented", "retrieval augmented", "embeddings", "vector database", "vector search", "vector store", "semantic search", "pinecone", "weaviate", "qdrant", "chroma", "faiss", "milvus"],
  "hybrid-rerank": ["hybrid search", "hybrid retrieval", "reranking", "re-ranking", "reranker", "bm25", "elasticsearch", "opensearch"],
  "perm-rag": ["enterprise search", "permission-aware", "document-level security", "access control lists", "acl"],
  "agents": ["agent", "agents", "agentic", "tool use", "tool calling", "langchain", "langgraph", "llamaindex", "semantic kernel", "autogen", "crewai", "mcp", "model context protocol"],
  "agent-prod": ["human-in-the-loop", "human in the loop", "agent memory", "multi-agent", "orchestration", "workflow automation"],
  "evals": ["evaluation", "evals", "eval framework", "llm-as-a-judge", "benchmark", "red teaming", "ragas", "model quality"],
  "ai-safety": ["guardrails", "prompt injection", "responsible ai", "ai safety", "ai security", "content safety", "pii", "hallucination"],
  "selfhost": ["self-hosted", "on-prem", "on-premises", "vllm", "ollama", "tgi", "triton", "hugging face", "huggingface", "open-source models", "open-weight", "local models"],
  "model-gateway": ["model gateway", "ai gateway", "litellm", "load testing", "capacity testing", "model routing", "rate limiting"],
  "llmops": ["llmops", "mlops", "latency", "token cost", "caching", "model monitoring", "mlflow", "weights & biases"],
  "finetune": ["fine-tuning", "fine tuning", "fine-tune", "lora", "peft", "rlhf", "model training", "pytorch", "tensorflow"],
  "cloud-ai": ["azure openai", "ai foundry", "azure ai", "bedrock", "sagemaker", "vertex ai", "cognitive services", "azure machine learning"],
  "sql": ["sql", "postgresql", "postgres", "mysql", "sql server", "schema design", "database migrations", "relational database"],
  "pgvector": ["pgvector"],
  "integration": ["rest api", "restful", "soap", "graphql", "grpc", "webhooks", "event-driven", "kafka", "service bus", "event hub", "rabbitmq", "integration", "apis"],
  "data-pipelines": ["data pipeline", "etl", "elt", "data ingestion", "airflow", "databricks", "spark", "data factory", "dbt", "snowflake", "indexing"],
  "mfg": ["manufacturing", "cad", "pdm", "plm", "erp", "mes", "bom", "solidworks", "sap"],
  "openusd": ["openusd", "omniverse", "digital twin"],
  "cloud-fundamentals": ["cloud", "azure", "aws", "gcp", "google cloud", "amazon web services"],
  "identity": ["entra", "azure ad", "active directory", "oauth", "oidc", "openid", "saml", "sso", "rbac", "iam", "authentication", "authorization"],
  "secrets": ["key vault", "secrets manager", "secrets management", "kms", "hashicorp vault", "encryption"],
  "networking": ["vnet", "vpc", "networking", "dns", "private endpoint", "private link", "load balancer", "firewall", "subnets", "tcp/ip"],
  "containers": ["docker", "container", "containers", "containerization", "acr", "ecr", "container registry"],
  "kubernetes": ["kubernetes", "k8s", "aks", "eks", "gke", "helm"],
  "openshift": ["openshift", "aro", "red hat"],
  "serverless": ["serverless", "azure functions", "lambda", "app service", "container apps", "fargate", "cloud run"],
  "iac": ["terraform", "bicep", "arm templates", "cloudformation", "pulumi", "infrastructure as code", "iac", "ansible"],
  "cicd": ["ci/cd", "cicd", "continuous integration", "continuous delivery", "azure devops", "github actions", "gitlab", "jenkins", "pipelines", "devops"],
  "observability": ["observability", "monitoring", "logging", "tracing", "opentelemetry", "prometheus", "grafana", "datadog", "application insights", "azure monitor", "cloudwatch", "splunk"],
  "gpu": ["gpu", "gpus", "cuda", "nvidia", "a100", "h100", "capacity planning", "inference infrastructure"],
  "architecture": ["architecture", "high availability", "disaster recovery", "scalability", "reliability", "well-architected", "distributed systems", "system design"],
  "governance": ["governance", "landing zone", "finops", "cost optimization", "azure policy", "compliance", "soc 2", "iso 27001"],
  "ai-frontend": ["react", "typescript", "next.js", "nextjs", "frontend", "front-end", "angular", "vue"],
  "backend": ["python", "c#", ".net", "node.js", "nodejs", "fastapi", "django", "flask", "java", "spring", "golang", "backend", "back-end", "microservices"],
  "testing": ["testing", "unit tests", "integration tests", "pytest", "test automation", "tdd", "load testing", "qa"],
  "ai-coding": ["copilot", "cursor", "claude code", "codex", "ai coding", "ai-assisted development", "ai assistants"],
  "collaboration": ["documentation", "design reviews", "stakeholders", "cross-functional", "mentoring", "communication skills", "collaborate", "agile", "scrum"],
};

const POSTINGS = [
];
