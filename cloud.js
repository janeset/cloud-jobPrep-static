// Cloud Prep track: AWS + Azure side by side. Concepts are provider-neutral; each topic maps
// the concept to the AWS and Azure service names. body HTML is trusted (written here).
// Exam codes and service names change: the Certs tab tells learners to confirm on official pages.

const CLOUD = {
  id: "cloud", name: "Cloud Prep", short: "Cloud", tagline: "AWS + Azure for interviews, hands-on labs and certifications",
  labsName: "Labs",
  groups: [
    ["Foundations", ["fundamentals", "iam", "security"]],
    ["Compute", ["compute", "containers", "serverless"]],
    ["Data", ["storage", "databases"]],
    ["Networking & integration", ["networking", "messaging"]],
    ["Operations", ["devops", "operations"]],
  ],
  weeks: [
    { n: 1, title: "Cloud fundamentals & identity", topics: ["fundamentals", "iam"], labs: [], goal: "Explain the shared responsibility model and set up accounts safely (MFA, budget alert, no root/global-admin use)." },
    { n: 2, title: "Security & storage", topics: ["security", "storage"], labs: ["staticsite"], goal: "Host a static site on object storage behind a CDN with HTTPS." },
    { n: 3, title: "Compute & networking", topics: ["compute", "networking"], labs: [], goal: "Explain VPC/VNet design with public and private subnets." },
    { n: 4, title: "Containers & serverless", topics: ["containers", "serverless"], labs: ["serverlessapi"], goal: "Build a serverless REST API backed by a NoSQL table." },
    { n: 5, title: "Databases & messaging", topics: ["databases", "messaging"], labs: [], goal: "Choose the right database and decouple services with queues and events." },
    { n: 6, title: "DevOps: IaC and CI/CD", topics: ["devops"], labs: ["containercicd", "terraformnet"], goal: "Deploy a container automatically from GitHub, with infrastructure in code." },
    { n: 7, title: "Observability, cost & Well-Architected", topics: ["operations"], labs: ["observability"], goal: "Add monitoring, alerts and cost guardrails; reason with the Well-Architected pillars." },
    { n: 8, title: "Certification & interview sprint", topics: [], labs: [], goal: "Take full quizzes for your target exam, drill the question bank, and polish lab write-ups for your resume." },
  ],

  topics: [
    {
      id: "fundamentals", title: "Cloud fundamentals", short: "1",
      terms: [["Region / availability zone (AZ)", "A region is a geographic area with data centers; an AZ is one of several separate data centers inside it.", "zero-cloud"],
        ["Virtual machine (VM)", "A computer made in software: one physical server is split into several VMs, each with its own operating system."],
        ["IaaS / PaaS / SaaS", "How much the provider runs for you: infrastructure (bare VMs), a platform (you bring only your app), or finished software."],
        ["High availability (HA)", "Keeping a service running when one part fails, usually by running copies in several AZs."],
        ["Disaster recovery (DR)", "Getting a service back after a big failure, such as a whole region going down."],
        ["RPO / RTO", "Recovery point objective: how much recent data you can afford to lose. Recovery time objective: how long you can afford to be down."],
        ["SLA", "Service level agreement: the availability a provider promises for a service (for example 99.9% a month), with a refund credit if it misses."],
        ["CLI", "Command-line interface: a tool you use by typing commands in a terminal.", "zero-cli"]],
      body: `<p>In plain words: the cloud is renting computing like electricity. You pay for what you use, get new servers in minutes, and the provider runs the data centers. This topic covers the vocabulary every cloud job uses. If any of it is new, start with <button class="link-btn inline-link" data-trsel="cloud|zero-cloud">What the cloud really is</button>.</p>
        <ul>
          <li><b>Service models:</b> <b>IaaS</b> (infrastructure as a service) rents you virtual machines and networks, and you look after the operating system. <b>PaaS</b> (platform as a service) runs the operating system and runtime for you, so you only bring your app or data, as with a managed database. <b>SaaS</b> (software as a service) is finished software you just use, like Microsoft 365 or Gmail.</li>
          <li><b>Regions and availability zones:</b> spread your app across several AZs for high availability, and keep a copy in a second region for disaster recovery.</li>
          <li><b>Canadian regions</b> matter for <b>data residency</b>, the rule that some data must stay in Canada (banks, government, healthcare): [[AWS ca-central-1 (Montreal) and ca-west-1 (Calgary)|Azure Canada Central (Toronto) and Canada East (Quebec City)]].</li>
          <li><b>Shared responsibility:</b> the provider secures the cloud itself (buildings, hardware, and the <b>hypervisor</b>, the software that splits one server into VMs). You secure what you put <em>in</em> it: who can sign in, your data, your settings, and updates ("patches") to the operating system on your VMs. The more the provider manages (PaaS, SaaS), the less is left for you.</li>
          <li><b>Paying:</b> instead of buying servers up front (a capital expense), you pay monthly for what you use (an operating expense). <b>On-demand</b> is full price with no commitment. A one- or three-year <b>commitment</b> ([[Savings Plans or Reserved Instances|Reservations or Savings Plans]]) is cheaper. <b>Spot</b> rents the provider's spare capacity at a deep discount, but they can take it back at short notice.</li>
          <li><b>Key properties:</b> <b>elasticity</b> (grow and shrink with demand), <b>high availability</b>, <b>fault tolerance</b> (carry on through failures), and <b>disaster recovery</b>, measured by RPO and RTO. Providers state an <b>SLA</b> for each service, so you know what they promise.</li></ul>
        <p><b>Example:</b> a payroll app runs on VMs in two availability zones of Canada Central. If one zone loses power, the copy in the other keeps working (high availability). Every night its data is copied to Canada East, so even if all of Canada Central failed, at most a day of data would be lost (an RPO of 24 hours).</p>`,
      map: [["Geographic area", "Region", "Region"], ["Isolated data center(s)", "Availability Zone", "Availability Zone"], ["Account / billing boundary", "AWS account (Organizations)", "Subscription (Management groups)"], ["Grouping resources", "Tags, CloudFormation stacks", "Resource groups, tags"], ["Command line", "AWS CLI", "Azure CLI (az)"]],
      code: [{ label: "First commands (CLI)", note: "Typed in a terminal (or CloudShell / Cloud Shell, which are already signed in). The first lines sign the AWS CLI in and print which account you're using; the last two do the same for Azure. Lines starting with # are comments, not commands.", code: `# AWS: configure credentials, then confirm who you are
aws configure                      # or: aws configure sso
aws sts get-caller-identity

# Azure: sign in, then confirm the active subscription
az login
az account show --output table` }],
      cards: [
        ["Under shared responsibility, who patches the OS of a VM?", "You do. The provider secures the physical host and hypervisor; the guest OS, apps and data on an IaaS VM are yours. On PaaS/serverless, the provider patches the runtime."],
        ["High availability vs disaster recovery?", "HA keeps a service running through component failures (multiple AZs, health checks). DR restores service after a large-scale event (another region), measured by RPO and RTO."],
        ["Why might a Toronto bank insist on Canada Central or ca-central-1?", "Data residency and regulatory requirements: customer data must stay in Canada."],
      ],
    },
    {
      id: "iam", title: "Identity & access (IAM)", short: "2",
      terms: [["IAM", "Identity and access management: the service that decides who can sign in and what each identity may do."],
        ["Authentication / authorization", "Proving who you are / deciding what you're allowed to do.", "zero-accounts"],
        ["Least privilege", "Giving every person and program only the permissions it needs, nothing more.", "zero-accounts"],
        ["MFA", "Multi-factor authentication: a second proof, like a phone code, after the password.", "zero-accounts"],
        ["Policy", "A written list of permissions. In AWS it's a JSON document (a structured text format of names and values)."],
        ["IAM role / managed identity", "An identity a program or server uses to get short-lived credentials, so no password or key is stored with it."],
        ["Workload", "Any program running in the cloud: an app on a VM, a function, a container."],
        ["CI/CD", "Continuous integration / continuous delivery: automation that tests and deploys code every time it changes.", "devops"],
        ["OIDC federation", "Letting a trusted outside system (like GitHub) swap its own short-lived token for temporary cloud credentials."],
        ["RBAC / scope", "Role-based access control: giving a role (like Reader) to someone at a scope, the level it applies to (a subscription, a resource group or one resource)."]],
      body: `<p>In plain words: IAM controls <b>who</b> can do <b>what</b> to <b>which</b> resources. Most cloud breaches come from a leaked password or key, or from someone having far more permissions than they needed, not from broken encryption. That's why identity is called "the new perimeter". If sign-in, MFA or least privilege are new, read <button class="link-btn inline-link" data-trsel="cloud|zero-accounts">Accounts, passwords and why security matters</button> first.</p>
        <ul>
          <li><b>Authentication</b> proves who you are; <b>authorization</b> decides what you can do.</li>
          <li><b>Least privilege:</b> grant only the actions and resources needed, then tighten further. Give permissions to <b>groups</b> (like "developers") and <b>roles</b> rather than to one person at a time, so access is easy to review.</li>
          <li><b>Protect the top account:</b> MFA everywhere; don't use the [[AWS root user|Azure Global Administrator]] for daily work.</li>
          <li><b>Programs use roles, not keys:</b> a server or function gets [[an IAM role|a managed identity]] and receives short-lived credentials automatically. Deployment pipelines (CI/CD) should use <b>OIDC federation</b> instead of long-lived access keys pasted into settings.</li>
          <li><b>How each provider does it:</b> [[AWS IAM has users, groups, roles and JSON policies; if one policy allows an action and another explicitly denies it, the Deny always wins|Azure keeps identities in Microsoft Entra ID (formerly Azure Active Directory) and grants access with RBAC role assignments at a scope: management group, subscription, resource group or single resource]].</li>
          <li><b>Guardrails</b> are rules that limit what anyone can do across many accounts, even an administrator: [[service control policies (SCPs) in AWS Organizations|Azure Policy and management groups]].</li></ul>
        <p><b>Example:</b> a reporting app on a VM needs to read files from one storage bucket. Instead of putting a key in the app's settings, you give the VM [[an IAM role|a managed identity]] whose policy allows only "read" on that one bucket. If the app is ever hacked, the attacker can read those reports and nothing else, and there's no key to steal.</p>`,
      map: [["Identity directory / SSO", "IAM Identity Center", "Microsoft Entra ID"], ["Permissions", "IAM policies (JSON)", "Azure RBAC role assignments"], ["Identity for workloads", "IAM roles (instance profiles)", "Managed identities"], ["Org-wide guardrails", "Service control policies", "Azure Policy"], ["Temporary credentials", "STS AssumeRole", "Entra tokens"]],
      code: [{ label: "AWS policy: read-only access to one bucket", note: "A JSON policy. Effect says allow; Action lists the two read actions allowed (download a file, list the files); Resource names the one bucket (an ARN is AWS's full name for a resource). Anything not listed is denied.", code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::reports-bucket",
        "arn:aws:s3:::reports-bucket/*"
      ]
    }
  ]
}` }, { label: "Azure: give a group read access to one resource group", note: "One Azure CLI command (the backslashes continue it over several lines). It gives the built-in Reader role to a group, scoped to one resource group. Replace the <...> placeholders with your own IDs.", code: `az role assignment create \\
  --assignee-object-id <group-object-id> \\
  --assignee-principal-type Group \\
  --role "Reader" \\
  --scope /subscriptions/<sub-id>/resourceGroups/rg-reports` }],
      cards: [
        ["An app on a VM needs to read from object storage. How do you give it access?", "Attach an IAM role (AWS) or a managed identity (Azure) with least-privilege permissions. Never bake access keys into the code or the image."],
        ["In AWS, a policy allows an action and another denies it. What happens?", "An explicit Deny always wins over an Allow."],
        ["How should GitHub Actions deploy to the cloud without stored secrets?", "OIDC federation: the workflow exchanges a short-lived GitHub token for temporary cloud credentials via a trusted role or federated identity."],
      ],
    },
    {
      id: "security", title: "Security, keys & secrets", short: "3",
      terms: [["Encryption", "Scrambling data with a key so only someone with the key can read it."],
        ["In transit / at rest", "Data moving over a network / data sitting in storage."],
        ["TLS", "The encryption behind HTTPS.", "zero-internet"],
        ["Key", "The secret value used to encrypt and decrypt. Whoever controls the keys controls the data."],
        ["Secret", "Any value that must stay private: a database password, an API key, a certificate."],
        ["Rotation", "Replacing a secret or key with a new one on a schedule, so an old leaked copy stops working."],
        ["Git", "The tool developers use to save versions of code; code in Git is often shared, so secrets must never go there."],
        ["Audit log", "A record of who did what, and when, in your account."],
        ["WAF / DDoS", "A web application firewall blocks malicious web requests; a DDoS attack floods a site with traffic to knock it offline."],
        ["Subnet (private / public)", "A section of your cloud network; private ones can't be reached from the internet.", "networking"],
        ["Security group", "A firewall: rules on a resource saying which traffic, from where, on which port, may come in.", "networking"],
        ["0.0.0.0/0", "Network notation meaning \"every address on the internet\"."]],
      body: `<p>In plain words: protect data by scrambling it (encryption), keep passwords and keys out of your code, record everything that happens, and don't leave doors open to the internet.</p>
        <ul>
          <li><b>Encrypt in transit</b> (TLS everywhere) and <b>at rest</b> (usually on by default). When rules say your company must control the keys itself, use <b>customer-managed keys</b>.</li>
          <li><b>Key management:</b> [[AWS KMS (Key Management Service)|Azure Key Vault keys]] create and guard encryption keys. <b>Secrets</b> such as database passwords and API keys belong in [[AWS Secrets Manager (or Parameter Store)|Azure Key Vault secrets]], with rotation turned on. Never put secrets in code, in container images or in Git.</li>
          <li><b>Audit everything:</b> [[AWS CloudTrail|Azure Activity Log]] records every action: who did it, what, and when. Banks rely on these trails for investigations and audits.</li>
          <li><b>Threat detection and posture:</b> [[GuardDuty and Security Hub|Microsoft Defender for Cloud]] flag risky settings ("posture") and suspicious activity, like sign-ins from an unusual country.</li>
          <li><b>Edge protection:</b> a WAF ([[AWS WAF|Azure WAF]]) filters attacks hidden in web requests, and DDoS protection ([[AWS Shield|Azure DDoS Protection]]) absorbs floods of traffic.</li>
          <li><b>Network isolation:</b> keep apps and databases in <b>private subnets</b>, reach managed services through <b>private endpoints</b> (private network connections, explained in the networking topic), and never give a database a public address.</li>
          <li><b>Common mistakes:</b> storage buckets anyone can read, security groups that let the whole internet (<code>0.0.0.0/0</code>) reach remote-login ports (SSH, port 22; RDP, port 3389), permissions that are far too broad, and keys that are never rotated.</li></ul>
        <p><b>Example:</b> an app needs a database password. Instead of writing it in the code, you store it in [[Secrets Manager|Key Vault]]. The app's [[IAM role|managed identity]] is allowed to read only that one secret, the secret is rotated every 30 days, and every read shows up in [[CloudTrail|the Activity Log]]. If the code leaks, no password leaks with it.</p>`,
      map: [["Encryption keys", "AWS KMS", "Azure Key Vault (keys)"], ["Secrets storage", "Secrets Manager / Parameter Store", "Azure Key Vault (secrets)"], ["Audit log of API calls", "CloudTrail", "Activity Log"], ["Threat detection & posture", "GuardDuty, Security Hub", "Microsoft Defender for Cloud"], ["Web application firewall", "AWS WAF", "Azure WAF (Front Door / App Gateway)"]],
      code: [{ label: "Read a secret at runtime (Python, AWS)", note: "Python code using boto3, AWS's library for Python. It asks Secrets Manager for a secret by name and turns the JSON text into a Python dictionary. No password appears anywhere in the code.", code: `import json
import boto3

def get_db_credentials(secret_id="prod/app/db"):
    client = boto3.client("secretsmanager")
    secret = client.get_secret_value(SecretId=secret_id)
    return json.loads(secret["SecretString"])     # {"username": ..., "password": ...}

# The function's IAM role, not a stored key, grants secretsmanager:GetSecretValue.` }],
      cards: [
        ["Where should a database password live?", "In a secrets manager (Secrets Manager or Key Vault), fetched at runtime by an identity with least-privilege access, ideally rotated automatically."],
        ["What's the most common cloud data leak?", "Misconfiguration: publicly readable storage or overly permissive access, not broken encryption."],
        ["Why do auditors care about CloudTrail / Activity Log?", "They provide an immutable record of who changed what and when, which is essential for investigations and compliance."],
      ],
    },
    {
      id: "compute", title: "Compute: VMs & autoscaling", short: "4",
      terms: [["Virtual machine (VM) / instance", "A computer made in software that you rent by the second; AWS calls one an instance.", "fundamentals"],
        ["vCPU", "A virtual processor: a share of a real CPU.", "zero-computers"],
        ["GPU", "A processor built for graphics and AI work, much faster than a CPU at those jobs."],
        ["Image", "A saved copy of a configured disk (operating system plus software) that new VMs start from."],
        ["Metrics", "Numbers measured over time, like CPU use or requests per second."],
        ["Rightsizing", "Changing a server to the size it actually needs, based on its metrics."],
        ["Autoscaling", "Automatically adding servers when busy and removing them when quiet."],
        ["Stateless", "Keeping nothing important on the server itself, so any copy can be removed without losing data."],
        ["Load balancer", "A service that spreads incoming requests across several servers and skips unhealthy ones."],
        ["Layer 7 / Layer 4", "Layer 7 load balancers understand web requests (they can read the URL); Layer 4 ones just pass network connections through, very fast."],
        ["Spot", "Spare capacity at a big discount that the provider can take back at short notice.", "fundamentals"],
        ["Batch work", "Jobs that run on their own and finish, like processing last night's files, rather than serving users live."]],
      body: `<p>In plain words: a virtual machine is a rented computer. You pick its size, start it from an image, and pay while it runs. For a website you usually run several identical VMs behind a load balancer, and let autoscaling add or remove them as traffic changes.</p>
        <ul>
          <li><b>Virtual machines:</b> [[Amazon EC2|Azure Virtual Machines]]. Choose a size by vCPUs, memory, network speed and whether you need a GPU. Start small, then rightsize from the metrics.</li>
          <li><b>Images:</b> [[an AMI (Amazon Machine Image)|an Azure managed image]] captures a configured operating system, so new VMs start ready to serve.</li>
          <li><b>Autoscaling:</b> [[EC2 Auto Scaling groups|Virtual Machine Scale Sets]] add or remove VMs based on CPU use, number of requests or a schedule. Keep VMs <b>stateless</b>, so any one can be removed safely: put user sessions, uploads and data in shared services (a cache, a database, object storage).</li>
          <li><b>Load balancers:</b> Layer 7 for web traffic: it can route by URL path (send <code>/api</code> to one group of servers and <code>/images</code> to another) and handle HTTPS: [[Application Load Balancer (ALB)|Azure Application Gateway]]. Layer 4 for raw network connections at very high volume: [[Network Load Balancer (NLB)|Azure Load Balancer]].</li>
          <li><b>Cost:</b> Spot VMs for batch work that can survive interruption; commitments for the steady minimum you always need; switch off development VMs at night.</li>
          <li><b>When to choose VMs:</b> moving an existing app to the cloud without changing it, special operating system or licence needs, or when you need full control. Otherwise, containers or serverless (later topics) usually mean less to look after.</li></ul>
        <p><b>Example:</b> an online store gets 300 requests a second normally and 1,000 on Black Friday. It runs 2 VMs (one in each of two availability zones) behind a load balancer. Autoscaling watches CPU: above 60% it adds VMs, below 30% it removes them. Because the VMs are stateless, shoppers' carts live in a database, so removing a VM loses nothing.</p>`,
      map: [["Virtual machine", "EC2", "Azure Virtual Machines"], ["Machine image", "AMI", "Managed image / Compute Gallery"], ["Autoscaling group", "EC2 Auto Scaling group", "Virtual Machine Scale Sets"], ["HTTP (L7) load balancer", "Application Load Balancer", "Application Gateway"], ["TCP (L4) load balancer", "Network Load Balancer", "Azure Load Balancer"], ["Simple PaaS web hosting", "Elastic Beanstalk", "Azure App Service"]],
      code: [{ label: "List running VMs", note: "Two CLI commands that do the same thing: list your running VMs with their IDs and sizes, first on AWS, then on Azure. --query picks which fields to show; the output is a table.", code: `aws ec2 describe-instances \\
  --filters "Name=instance-state-name,Values=running" \\
  --query "Reservations[].Instances[].[InstanceId,InstanceType]" --output table

az vm list --show-details --query "[?powerState=='VM running'].{name:name, size:hardwareProfile.vmSize}" -o table` }],
      cards: [
        ["Why must instances in an autoscaling group be stateless?", "Instances are added and removed at any time; sessions, uploads and state must live in shared services (cache, database, object storage) or they're lost."],
        ["ALB/Application Gateway or NLB/Azure Load Balancer?", "Layer 7 for HTTP routing by path/host, TLS termination, WAF. Layer 4 for raw TCP/UDP, extreme throughput, or static IPs."],
        ["When are Spot VMs a good idea?", "Interruptible, fault-tolerant work: batch jobs, CI runners, stateless workers. Not for a single critical database."],
      ],
    },
    {
      id: "containers", title: "Containers & Kubernetes", short: "5",
      terms: [["Container", "An app packed together with everything it needs to run (libraries, settings), so it runs the same on any machine."],
        ["Dependencies", "Other software an app needs, such as libraries it imports."],
        ["Docker / Dockerfile", "Docker is the most common container tool; a Dockerfile is the text recipe it follows to build a container image."],
        ["Container image", "The packaged, ready-to-run file a container starts from."],
        ["Registry", "A store for container images, like a library you push images to and pull them from."],
        ["Orchestration", "Software that starts, watches, restarts and scales many containers for you."],
        ["Kubernetes", "The most widely used orchestration system; it has its own lesson.", "kubernetes"],
        ["Cluster", "A group of machines managed together to run containers."],
        ["Root user (in a container)", "The all-powerful account inside the container's operating system; running as it makes a break-in worse."],
        ["Environment variable", "A named setting given to a program when it starts, like DATABASE_URL."],
        ["Tag", "The label on an image version, like 1.4.2. The tag latest is reused for each new build, so it doesn't tell you which build you have."],
        ["Git SHA", "The unique ID Git gives every saved version of code, like 3f9a1c2."]],
      body: `<p>In plain words: a <b>container</b> is your app in a sealed box, with everything it needs inside. If it runs on your laptop, the same box runs the same way on a test server and in the cloud. That ends "but it works on my machine".</p>
        <ul>
          <li>You write a <code>Dockerfile</code>, build an <b>image</b> from it, and push the image to a <b>registry</b> ([[Amazon ECR|Azure Container Registry]]). Servers then pull the image and run it.</li>
          <li><b>Container vs VM:</b> a VM includes a whole operating system; a container shares the host machine's operating system and carries only the app and its dependencies, so it's much smaller and starts in seconds.</li>
          <li><b>Orchestration</b> runs many containers: decides which machine each one runs on, checks they're healthy, restarts failed ones, swaps in new versions gradually, and adds copies under load.</li>
          <li><b>Kubernetes</b> ([[Amazon EKS|Azure Kubernetes Service (AKS)]]) is the industry standard orchestrator. Powerful, but a lot to learn and run; see <button class="link-btn inline-link" data-trsel="cloud|kubernetes">Kubernetes essentials</button>.</li>
          <li><b>Simpler managed options:</b> [[Amazon ECS with Fargate|Azure Container Apps]] runs your containers without you managing any machines or a cluster. A great default for small teams.</li>
          <li><b>Good practice:</b> a small starting image, run as a normal user (not root), one main program per container, settings passed in as environment variables, scan images for known security holes, and tag each image with a version or Git SHA instead of <code>latest</code>.</li></ul>
        <p><b>Example:</b> a team's Python API is built into an image tagged <code>api:3f9a1c2</code> (the Git SHA of that version) and pushed to the registry. [[ECS on Fargate|Container Apps]] runs three copies of it. When a new version is pushed, the service starts the new containers, checks they're healthy, then stops the old ones, so users never see downtime. If the new version is broken, they redeploy <code>api:3f9a1c2</code>.</p>`,
      map: [["Container registry", "Amazon ECR", "Azure Container Registry"], ["Managed Kubernetes", "Amazon EKS", "Azure Kubernetes Service (AKS)"], ["Containers without a cluster", "ECS on Fargate, App Runner", "Azure Container Apps"], ["Single containers, quick", "ECS task / App Runner", "Azure Container Instances"]],
      code: [{ label: "Dockerfile for a small Python API", note: "Each line is one build step: start from a small Python image, copy in the list of libraries and install them, copy in the app, create a normal user and switch to it, then say which port the app listens on and the command that starts it.", code: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN useradd --create-home appuser
USER appuser                          # don't run as root
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]` }],
      cards: [
        ["Container vs VM?", "A VM virtualizes hardware and runs a full OS; a container shares the host kernel and packages only the app and its dependencies, so it starts in seconds and is much lighter."],
        ["Why might a team choose ECS Fargate or Container Apps over Kubernetes?", "Far less operational overhead (no cluster upgrades, node management or complex networking) when they don't need Kubernetes' flexibility."],
        ["Why avoid the 'latest' image tag in production?", "It's mutable, so you can't tell exactly what's running or roll back reliably. Tag images with the commit SHA or a version."],
      ],
    },
    {
      id: "serverless", title: "Serverless functions & APIs", short: "6",
      terms: [["Serverless", "Running code or services without managing any servers yourself: the provider runs them, scales them, and bills only for use."],
        ["Function", "A small piece of code that runs when something happens, then stops."],
        ["Event", "A message that something happened: a web request arrived, a file was uploaded, a timer went off."],
        ["Invocation", "One run of a function."],
        ["Scale to zero", "When nothing is happening, nothing runs and you pay nothing."],
        ["Cold start", "Extra delay the first time a function runs after a quiet spell, while the provider gets it ready."],
        ["Latency", "How long a request takes to come back.", "zero-internet"],
        ["API", "The set of requests a program accepts, like GET /orders.", "zero-accounts"],
        ["Throttling", "Limiting how many requests a caller can make per second, so nobody overloads the service."],
        ["Idempotent", "Safe to run twice with the same result: processing the same order twice still creates one order."]],
      body: `<p>In plain words: you hand the provider a function, and it runs your code each time an event happens, as many copies at once as needed. No servers to set up or patch, and when nothing happens you pay nothing. The provider still uses servers, you just never see them.</p>
        <ul>
          <li><b>Functions as a service:</b> [[AWS Lambda|Azure Functions]] run your code in response to events: a web request, a message on a queue, a file upload, a schedule. You pay per invocation and for how long it runs, and it scales to zero.</li>
          <li><b>Limits to know:</b> a maximum run time ([[a single Lambda invocation runs at most 15 minutes|Azure Functions on the Consumption plan time out after 5 minutes by default, 10 at most]]), caps on memory and CPU, and <b>cold starts</b>.</li>
          <li><b>API front doors:</b> [[Amazon API Gateway|Azure API Management]] sits in front of your functions and handles web addresses, sign-in checks, throttling and API keys.</li>
          <li><b>Workflows:</b> [[AWS Step Functions|Azure Durable Functions or Logic Apps]] chain several steps together, with automatic retries when a step fails.</li>
          <li><b>Great for:</b> traffic that is low or comes in bursts, small "glue" jobs between services, scheduled jobs and processing events. <b>Weaker for:</b> long-running jobs, steady heavy traffic (always-on containers can be cheaper), and requests that must always answer in a few milliseconds.</li>
          <li>Design functions to be <b>idempotent</b>, because most event sources may deliver the same event more than once.</li></ul>
        <p><b>Example:</b> when a user uploads a photo, the upload creates an event that runs a function. The function makes a thumbnail and saves it. On a quiet night it runs a handful of times and costs a fraction of a cent; on a busy day the provider runs hundreds of copies at once. If the same upload event arrives twice, the function just overwrites the same thumbnail (idempotent), so nothing is duplicated.</p>`,
      map: [["Functions", "AWS Lambda", "Azure Functions"], ["API front door", "Amazon API Gateway", "Azure API Management"], ["Workflow orchestration", "AWS Step Functions", "Durable Functions / Logic Apps"], ["Scheduled triggers", "EventBridge Scheduler", "Timer trigger"]],
      code: [{ label: "A Lambda handler behind API Gateway (Python)", note: "A whole Lambda function. AWS calls handler(event, context) for each request: it reads ?name= from the web address (or uses \"world\") and returns a status code, a header and a JSON body.", code: `import json

def handler(event, context):
    name = (event.get("queryStringParameters") or {}).get("name", "world")
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"message": f"Hello, {name}!"}),
    }` }],
      cards: [
        ["What is a cold start and how do you reduce it?", "Extra latency when the platform starts a new instance for your function. Reduce it with smaller packages, lighter runtimes, initializing clients outside the handler, or provisioned concurrency / premium plans."],
        ["When is serverless the wrong choice?", "Long-running work beyond time limits, steady heavy traffic where always-on containers are cheaper, or ultra-low-latency paths that can't tolerate cold starts."],
        ["Why must event handlers be idempotent?", "Most event sources deliver at least once, so the same event can arrive twice; processing it again must not double-charge or duplicate records."],
      ],
    },
    {
      id: "storage", title: "Storage: object, block & file", short: "7",
      terms: [["Object storage", "Storage for whole files (\"objects\"), each found by its name (\"key\") and fetched over HTTP."],
        ["Bucket / container", "The top-level folder you create in object storage: AWS calls it a bucket, Azure a container inside a storage account."],
        ["Block storage", "A virtual hard disk attached to one VM."],
        ["File storage", "A shared network drive that many machines can open at once."],
        ["Static website", "A site made only of files (HTML, images, styles) with no program running on the server."],
        ["Tier / storage class", "A price level: cheaper to store but slower or costlier to read, for data you rarely need."],
        ["Lifecycle rule", "A rule that moves or deletes files automatically after a number of days."],
        ["Versioning", "Keeping every old version of a file, so a deletion or overwrite can be undone."],
        ["Pre-signed URL / SAS", "A link that gives temporary access to one private file and stops working after a set time."],
        ["Durability", "How unlikely the provider is to lose your data (object storage is designed never to)."],
        ["CDN", "Content delivery network: copies of your files kept in locations near users, so they load fast.", "networking"]],
      body: `<p>In plain words: the cloud has three kinds of storage. <b>Object storage</b> holds files you fetch by name over the internet. <b>Block storage</b> is a hard disk for one VM. <b>File storage</b> is a shared drive. Most new apps use object storage for files.</p>
        <ul>
          <li><b>Object storage</b> ([[Amazon S3|Azure Blob Storage]]): almost unlimited files, each found by its key (its name) and fetched over HTTP. Use it for uploads, backups, static websites and data lakes.</li>
          <li><b>Block storage</b> ([[Amazon EBS|Azure Managed Disks]]): a disk attached to one VM, for its operating system or a database you run yourself.</li>
          <li><b>File storage</b> ([[Amazon EFS or FSx|Azure Files]]): a shared network drive many machines open at once.</li>
          <li><b>Tiers:</b> pay less for data you rarely read: [[S3 Standard, Standard-IA (infrequent access) and the Glacier classes|Blob Hot, Cool, Cold and Archive tiers]]. The coldest tier is cheapest to store but slow to get back: an archived blob or Glacier object must first be <b>rehydrated</b> (restored), which can take hours. <b>Lifecycle rules</b> move data down the tiers automatically.</li>
          <li><b>Protect data:</b> block public access by default, turn on versioning, and share a private file for a short time with a [[pre-signed URL|SAS (shared access signature) token]] instead of making it public.</li>
          <li><b>Durability vs availability:</b> object storage is designed to (almost) never lose data; for disaster recovery, also copy it to a second region.</li></ul>
        <p><b>Example:</b> a job-board app stores applicants' CVs in a private [[S3 bucket|Blob container]]. When a recruiter clicks "download", the app creates a link that works for 15 minutes. A lifecycle rule moves CVs older than 90 days to a cooler tier and deletes them after two years, so the bill stays small and old personal data doesn't pile up.</p>`,
      map: [["Object storage", "Amazon S3", "Azure Blob Storage"], ["VM disks", "Amazon EBS", "Azure Managed Disks"], ["Shared file system", "Amazon EFS / FSx", "Azure Files"], ["Archive tier", "S3 Glacier classes", "Blob Archive tier"], ["Temporary access link", "Pre-signed URL", "Shared access signature (SAS)"]],
      code: [{ label: "Upload a file and share it for 15 minutes (Python, AWS)", note: "Python with boto3: upload report.pdf to a bucket, then create a link to it that stops working after 900 seconds (15 minutes). The bucket itself stays private.", code: `import boto3

s3 = boto3.client("s3")
s3.upload_file("report.pdf", "reports-bucket", "2026/report.pdf")

url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": "reports-bucket", "Key": "2026/report.pdf"},
    ExpiresIn=900,                    # seconds
)
print(url)                            # anyone with this link can download until it expires` }],
      cards: [
        ["Object, block or file storage for user-uploaded photos?", "Object storage (S3 / Blob): cheap, durable, HTTP-accessible, and easy to put behind a CDN."],
        ["How do you let a user download a private file without making the bucket public?", "Generate a short-lived pre-signed URL (S3) or SAS token (Azure)."],
        ["How do you cut storage costs for old logs automatically?", "Lifecycle rules that move objects to cooler/archive tiers after N days and delete them after the retention period."],
      ],
    },
    {
      id: "databases", title: "Managed databases & caching", short: "8",
      terms: [["Database", "A program that stores data in an organized way and answers questions about it quickly."],
        ["Relational database / SQL", "Data kept in tables with rows and columns that link to each other; SQL is the language used to query it."],
        ["Managed database", "The provider installs, patches and backs up the database for you (a PaaS service).", "fundamentals"],
        ["Failover", "Automatically switching to a standby copy when the main one fails."],
        ["Standby / read replica", "A standby is a hidden copy ready to take over; a read replica is a copy that answers read-only queries to share the load."],
        ["NoSQL", "Databases that don't use linked tables, built for huge scale with simple lookups by key."],
        ["Partition key", "The field a NoSQL database uses to decide where each item is stored, such as customer_id."],
        ["Cache / Redis", "A very fast in-memory store for answers you need often; Redis is the most popular one."],
        ["Data warehouse", "A database built for big reports across lots of history, not for an app's day-to-day work."],
        ["Point-in-time restore", "Rolling a database back to how it was at any minute in the past few days."]],
      body: `<p>In plain words: a database stores your app's data and answers questions about it. In the cloud you rarely install one yourself: a <b>managed</b> database is patched, backed up and kept running by the provider, and you just use it.</p>
        <ul>
          <li><b>Managed relational:</b> [[Amazon RDS and Aurora|Azure SQL Database and Azure Database for PostgreSQL or MySQL]]. The provider handles updates, backups, failover and replicas.</li>
          <li><b>High availability:</b> keep a standby in another availability zone with automatic failover ([[RDS Multi-AZ|zone-redundant Azure SQL]]). <b>Read replicas</b> share out read traffic.</li>
          <li><b>NoSQL:</b> [[Amazon DynamoDB|Azure Cosmos DB, a globally distributed database]] for massive scale with simple lookups by key. Design the table around the questions your app asks, and choose the partition key carefully.</li>
          <li><b>Caching:</b> [[Amazon ElastiCache|Azure's managed Redis]] keeps popular answers in memory, taking load off the database.</li>
          <li><b>Analytics:</b> big reports run in a data warehouse such as [[Amazon Redshift|Microsoft Fabric or Synapse]], not on the database your app uses to serve customers.</li>
          <li><b>Backups:</b> automated backups plus point-in-time restore. Test restoring regularly: a backup you've never restored might not work.</li></ul>
        <p><b>Example:</b> an online shop keeps orders in a managed PostgreSQL database with a standby in a second zone. When the main database's zone has an outage, the provider fails over to the standby in about a minute. The product catalogue is read thousands of times a second, so it's cached in Redis, and the database only handles cache misses and new orders.</p>`,
      map: [["Managed SQL", "Amazon RDS / Aurora", "Azure SQL Database / Azure Database for PostgreSQL"], ["NoSQL key-value / document", "Amazon DynamoDB", "Azure Cosmos DB"], ["In-memory cache", "Amazon ElastiCache", "Azure managed Redis"], ["Data warehouse", "Amazon Redshift", "Microsoft Fabric / Synapse"]],
      code: [{ label: "DynamoDB: write and read by key (Python)", note: "Python with boto3: save one order item in the Orders table, then read it back using its key (the customer_id partition key plus the order_id sort key).", code: `import boto3

table = boto3.resource("dynamodb").Table("Orders")
table.put_item(Item={"customer_id": "c42", "order_id": "o1001", "total_cents": 2599})

resp = table.get_item(Key={"customer_id": "c42", "order_id": "o1001"})
print(resp.get("Item"))` }],
      cards: [
        ["Multi-AZ standby vs read replica?", "A Multi-AZ standby is for availability (automatic failover, not used for reads). A read replica is for scaling reads and can lag behind the primary."],
        ["When would you pick DynamoDB or Cosmos DB over a relational database?", "Huge scale with predictable key-based access, single-digit-millisecond latency, flexible schema, and no need for complex joins or multi-table transactions."],
        ["Why test restores?", "Backups can be incomplete, corrupted or misconfigured; only a successful restore proves you can recover within your RTO."],
      ],
    },
    {
      id: "networking", title: "Networking: VPC / VNet, DNS & CDN", short: "9",
      terms: [["IP address (private / public)", "A device's address on a network; private ones (10.x, 192.168.x) only work inside one network.", "zero-internet"],
        ["VPC / VNet", "Virtual private cloud (AWS) / virtual network (Azure): your own private network inside the provider's cloud."],
        ["CIDR", "A short way to write a range of IP addresses: 10.0.0.0/16 means every address starting 10.0 (65,536 of them). A bigger number after the slash means a smaller range: /24 is 256 addresses."],
        ["Subnet", "A slice of your VPC/VNet's address range, placed in one availability zone; public or private."],
        ["Internet gateway", "The door between a VPC and the internet, used by public subnets."],
        ["NAT gateway", "Lets servers in private subnets start connections out to the internet (for updates) while nobody on the internet can connect in."],
        ["Firewall / security group", "Rules saying which traffic may come in or go out: from which addresses, on which ports.", "zero-internet"],
        ["Stateful / stateless", "A stateful firewall remembers a connection and lets its replies back automatically; a stateless one checks every packet against the rules in both directions."],
        ["On-premises", "A company's own data center or office, as opposed to the cloud."],
        ["VPN", "An encrypted tunnel that joins two networks over the internet."],
        ["DNS", "Turns names into IP addresses.", "zero-internet"],
        ["CDN", "Content delivery network: servers near users that keep copies of your content so it loads fast."]],
      body: `<p>In plain words: a VPC or VNet is your company's own private network inside the cloud. You decide its address range, split it into subnets, and set rules for what may talk to what. If IP addresses, ports and DNS are new, read <button class="link-btn inline-link" data-trsel="cloud|zero-internet">How the internet works</button> first.</p>
        <ul>
          <li>A [[VPC|VNet]] has an IP range written in CIDR, like <code>10.0.0.0/16</code>, split into <b>subnets</b> such as <code>10.0.1.0/24</code> (256 addresses). The provider keeps 5 addresses in every subnet for itself, so a /24 leaves 251 for you.</li>
          <li><b>Public subnets</b> have a route to the internet gateway; put only internet-facing things there, like load balancers. <b>Private subnets</b> hold apps and databases. When private servers need to download updates, their traffic goes out through a <b>NAT gateway</b>, and nothing on the internet can start a connection back in.</li>
          <li><b>Firewalls:</b> [[security groups (stateful, attached to each resource) and network ACLs (stateless, per subnet)|Network Security Groups (NSGs), attached to subnets or network cards]].</li>
          <li><b>Connecting networks:</b> <b>peering</b> joins two VPCs/VNets; a <b>site-to-site VPN</b> joins your office network over the internet; [[AWS Direct Connect|Azure ExpressRoute]] is a dedicated private line from your data center that never crosses the public internet, common at banks.</li>
          <li><b>Private access to managed services:</b> [[PrivateLink / VPC endpoints|Private Endpoints]] let your servers reach services like storage or databases without going over the public internet.</li>
          <li><b>DNS and the edge:</b> [[Route 53|Azure DNS]] answers DNS lookups for your domain; a CDN ([[CloudFront|Azure Front Door]]) keeps copies of content near users and handles HTTPS.</li></ul>
        <p><b>Example, a typical layout:</b> a VPC <code>10.0.0.0/16</code> spread across two availability zones, with one public and one private subnet in each. The load balancer sits in the public subnets; the app servers and the database sit in the private ones. The security groups allow the internet to reach the load balancer on port 443, the load balancer to reach the app, and the app to reach the database, and nothing else. The database has no public address at all.</p>`,
      map: [["Private network", "VPC", "Virtual Network (VNet)"], ["Instance firewall", "Security group", "Network Security Group"], ["Outbound internet for private subnets", "NAT gateway", "NAT Gateway"], ["Private link to on-prem", "Direct Connect", "ExpressRoute"], ["Private access to PaaS", "PrivateLink / VPC endpoints", "Private Endpoint"], ["DNS", "Route 53", "Azure DNS"], ["CDN / global edge", "CloudFront", "Azure Front Door"]],
      code: [{ label: "Terraform: a VPC with a public and a private subnet (AWS)", note: "Terraform code. Each resource block creates one thing: the VPC with its address range, a public subnet, a private subnet, and an internet gateway. Values like aws_vpc.main.id link the pieces together.", code: `resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags       = { Name = "app-vpc" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ca-central-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "ca-central-1a"
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}` }],
      cards: [
        ["Your database is in a private subnet. How does it get OS updates?", "Outbound traffic goes through a NAT gateway in a public subnet; nothing on the internet can initiate a connection back in."],
        ["Security group vs network ACL?", "Security groups are stateful and attached to resources (return traffic is allowed automatically). NACLs are stateless subnet-level rules that need explicit inbound and outbound entries."],
        ["How does a bank connect its data center to Azure privately?", "ExpressRoute (or a site-to-site VPN for smaller needs); AWS's equivalent is Direct Connect."],
      ],
    },
    {
      id: "messaging", title: "Messaging, events & integration", short: "10",
      terms: [["Message", "A small piece of data one program sends another, like {\"order_id\": \"o1001\"}."],
        ["Queue", "A waiting line for messages: senders add to it, workers take from it at their own pace."],
        ["Producer / consumer", "The program that sends messages / the program that receives and processes them."],
        ["Decouple", "Connect two programs so that neither has to wait for, or even know about, the other."],
        ["Dead-letter queue", "Where a message goes after failing again and again, so someone can look at it."],
        ["Pub/sub and topics", "Publish/subscribe: one message sent to a topic is copied to every subscriber."],
        ["Event", "A message saying something happened, like OrderPlaced.", "serverless"],
        ["Streaming", "A continuous, ordered flow of many events per second, kept for a while so it can be re-read."],
        ["At-least-once delivery", "Every message is delivered, but occasionally more than once."],
        ["Idempotent", "Safe to process twice with the same result.", "serverless"]],
      body: `<p>In plain words: instead of one program calling another and waiting, it drops a message in a queue and carries on. Another program picks the message up when it's ready. If the second program is slow or down for a while, nothing is lost: the messages wait.</p>
        <ul>
          <li><b>Queues</b> ([[Amazon SQS|Azure Service Bus queues]]) decouple producers from consumers, smooth out sudden spikes, and retry failed messages, moving ones that keep failing to a dead-letter queue.</li>
          <li><b>Pub/sub</b> ([[Amazon SNS|Service Bus topics]]) "fans out" one message to many subscribers.</li>
          <li><b>Event routing</b> ([[Amazon EventBridge|Azure Event Grid]]) delivers events from cloud services and other software to the right place, using rules you set.</li>
          <li><b>Streaming</b> ([[Amazon Kinesis or managed Kafka (MSK)|Azure Event Hubs]]) handles huge, ordered flows of events, such as clicks or logs, for analytics.</li>
          <li><b>Choose by need:</b> sharing out work means a queue; telling many services about one thing means pub/sub; a high-volume stream you may want to replay means streaming.</li>
          <li>Expect <b>at-least-once</b> delivery: make consumers idempotent and keep an eye on dead-letter queues.</li></ul>
        <p><b>Example:</b> when a customer places an order, the order service publishes one <code>OrderPlaced</code> message to a topic and immediately tells the customer "thanks!". Three queues subscribe to the topic: email, inventory and analytics. If the email service is down for ten minutes, its messages wait in its queue and are sent when it comes back. Orders never slow down.</p>`,
      map: [["Queue", "Amazon SQS", "Service Bus queue / Storage queue"], ["Pub/sub topic", "Amazon SNS", "Service Bus topic"], ["Event router", "Amazon EventBridge", "Azure Event Grid"], ["Event streaming", "Kinesis / Amazon MSK", "Azure Event Hubs"]],
      code: [{ label: "Send and process queue messages (Python, AWS SQS)", note: "Python with boto3: find the orders queue, send one message, then receive up to 10 messages (waiting up to 20 seconds), process each one and delete it so it isn't delivered again. process() stands for your own code.", code: `import json
import boto3

sqs = boto3.client("sqs")
queue_url = sqs.get_queue_url(QueueName="orders")["QueueUrl"]

sqs.send_message(QueueUrl=queue_url, MessageBody=json.dumps({"order_id": "o1001"}))

resp = sqs.receive_message(QueueUrl=queue_url, MaxNumberOfMessages=10, WaitTimeSeconds=20)
for msg in resp.get("Messages", []):
    process(json.loads(msg["Body"]))                     # must be idempotent
    sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=msg["ReceiptHandle"])` }],
      cards: [
        ["Queue or topic for 'order placed' that email, inventory and analytics all need?", "A topic (pub/sub): each subscriber gets its own copy, often each feeding its own queue."],
        ["What happens to a message that keeps failing?", "After the maximum receive count it moves to a dead-letter queue for inspection and replay."],
        ["Why does SQS use a visibility timeout?", "A received message is hidden from other consumers while one processes it; if not deleted in time, it reappears for retry."],
      ],
    },
    {
      id: "devops", title: "DevOps: infrastructure as code & CI/CD", short: "11",
      terms: [["IaC (infrastructure as code)", "Describing your cloud resources in text files that a tool reads to create them, instead of clicking in a web console."],
        ["Terraform", "The most popular IaC tool; it works with AWS, Azure and many others."],
        ["Git / repository / pull request", "Git saves versions of files; a repository is a project's folder of files and history; a pull request asks teammates to review a change before it's merged."],
        ["State (Terraform)", "Terraform's record of what it has created, so it knows what to change next time."],
        ["CI/CD", "Continuous integration (every change is automatically tested) and continuous delivery (every passing change is automatically deployed)."],
        ["Pipeline", "The automated sequence of steps (test, build, deploy) that runs on every change."],
        ["Environment", "A separate copy of the system: dev for building, staging for final testing, prod (production) for real users."],
        ["Deploy / rollback", "Putting a new version live / going back to the previous version."],
        ["Blue/green and canary", "Two ways to release safely: switch all traffic to a fresh copy at once (blue/green), or send a small share of users first (canary)."],
        ["OIDC", "A way for the pipeline to get short-lived cloud credentials without a stored key.", "iam"]],
      body: `<p>In plain words: <b>IaC</b> means your cloud setup lives in text files, so it can be reviewed, versioned and recreated exactly. <b>CI/CD</b> means a robot tests and deploys every change, so releases are small, frequent and boring.</p>
        <ul>
          <li><b>Infrastructure as code:</b> define resources in files, review them in pull requests, and apply them the same way every time. <b>Terraform</b> works across clouds; the native options are [[AWS CloudFormation or CDK|Azure Bicep or ARM templates]].</li>
          <li><b>The Terraform workflow:</b> <code>terraform init</code> (set up), <code>terraform plan</code> (preview exactly what will be created, changed or destroyed), <code>terraform apply</code> (do it). Keep the <b>state</b> file in shared, locked storage ([[an S3 bucket|an Azure Storage account]]), never in Git, because it can contain secrets and two people applying at once would corrupt it.</li>
          <li><b>CI/CD:</b> every push runs the tests, builds the app or container image, and deploys it through environments: dev, then staging, then production. Common tools: GitHub Actions, [[AWS CodePipeline|Azure DevOps Pipelines]], GitLab.</li>
          <li><b>Release strategies:</b> <b>rolling</b> (replace servers a few at a time), <b>blue/green</b> (bring up a full new copy, then switch all traffic to it; switch back to undo), and <b>canary</b> (send 5% of users to the new version first and watch the error rate). Always have a rollback plan.</li>
          <li><b>Security in pipelines:</b> OIDC instead of stored keys, scan for accidentally committed secrets and for known security holes in libraries and images, and give the deploy identity only the permissions it needs. Automated tests are the gate: a change that fails them never reaches production.</li></ul>
        <p><b>Example:</b> a developer changes the app and opens a pull request. The pipeline runs the tests and shows the <code>terraform plan</code> output; a teammate reviews both. On merge, the pipeline builds image <code>app:&lt;git-sha&gt;</code>, deploys it to staging, runs smoke tests, then releases it to production as a canary. When the error rate stays flat for 15 minutes, all traffic moves over.</p>`,
      map: [["Native IaC", "CloudFormation / CDK", "Bicep / ARM templates"], ["Multi-cloud IaC", "Terraform", "Terraform"], ["CI/CD service", "CodePipeline / CodeBuild", "Azure DevOps Pipelines"], ["Popular CI/CD (either)", "GitHub Actions", "GitHub Actions"]],
      code: [{ label: "GitHub Actions: test, build, push to Amazon ECR with OIDC", note: "A GitHub Actions workflow file (YAML). On every push to main it runs these steps in order: get the code, install libraries and run the tests, sign in to AWS with OIDC (no stored key), sign in to the registry, then build and push the image tagged with the commit's SHA.", code: `name: deploy
on:
  push:
    branches: [main]
permissions:
  id-token: write                 # needed for OIDC
  contents: read
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt && pytest
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-deploy
          aws-region: ca-central-1
      - uses: aws-actions/amazon-ecr-login@v2
        id: ecr
      - run: |
          docker build -t \${{ steps.ecr.outputs.registry }}/app:\${{ github.sha }} .
          docker push \${{ steps.ecr.outputs.registry }}/app:\${{ github.sha }}` }],
      cards: [
        ["Why keep Terraform state remote and locked?", "So the whole team shares one source of truth and two applies can't run at once and corrupt it. State can also contain secrets, so it must not live in Git."],
        ["Blue/green vs canary?", "Blue/green flips all traffic from the old environment to a full new one (instant rollback by flipping back). Canary shifts a small percentage first and grows it while watching metrics."],
        ["What does 'terraform plan' protect you from?", "Surprises: it shows exactly what will be created, changed or destroyed before you apply, and is ideal to review in a pull request."],
      ],
    },
    {
      id: "operations", title: "Observability, cost & Well-Architected", short: "12",
      terms: [["Observability", "Being able to tell what your system is doing, and why, from the data it produces."],
        ["Metrics / logs / traces", "Numbers over time (CPU, requests per second) / lines of text the app writes as it works / the path of one request through every service."],
        ["Alarm / alert", "A rule that notifies someone (by email or phone) when a metric crosses a line."],
        ["Latency and p95 / p99", "How long requests take; p95 is the time 95% of requests beat, so it shows the slow experience averages hide.", "zero-internet"],
        ["Saturation", "How full a resource is: CPU at 95%, a queue growing faster than it drains."],
        ["Budget alert", "An email from the provider when spending passes an amount you set.", "zero-cloud"],
        ["Tag", "A label (key and value) on a resource, like team=payments, used to sort costs and find owners."],
        ["Egress", "Data sent out of the cloud to the internet or another region; usually charged per gigabyte."],
        ["Snapshot", "A saved copy of a disk at a moment in time; it keeps costing money until deleted."],
        ["Well-Architected Framework", "Each provider's checklist of good design, grouped into pillars such as security and cost."]],
      body: `<p>In plain words: once something is running, you need to know when it's slow or broken before users tell you, and you need to keep the bill under control. This topic covers both, and the checklist providers use to judge a good design.</p>
        <ul>
          <li><b>Monitoring:</b> [[Amazon CloudWatch (metrics, logs, alarms) and AWS X-Ray (traces)|Azure Monitor with Log Analytics (logs) and Application Insights (app performance and traces)]]. Alert on what users feel: the error rate, latency (p95/p99), and saturation.</li>
          <li><b>Cost control:</b> budgets with alerts ([[AWS Budgets|Azure Cost Management budgets]]) from day one; tag every resource (team, environment, cost-center); rightsize; delete idle resources; commit to a discount for steady load. Watch the silent cost traps: NAT gateways (billed every hour), egress, idle databases and forgotten snapshots.</li>
          <li><b>Well-Architected:</b> [[AWS Well-Architected has six pillars: operational excellence, security, reliability, performance efficiency, cost optimization and sustainability|the Azure Well-Architected Framework has five pillars: reliability, security, cost optimization, operational excellence and performance efficiency]].</li>
          <li>In design interviews, walking through the pillars shows structured thinking: "For reliability I'd run in two availability zones; for cost I'd autoscale and buy a savings plan for the steady minimum..."</li></ul>
        <p><b>Example:</b> an API's dashboard shows requests per second, error rate and p95 latency. An alarm emails the on-call engineer if errors pass 2% for five minutes. Every resource is tagged <code>team=orders</code>, so the monthly cost report shows exactly what the orders team spends, and a budget alert at 80% caught a forgotten test database last month.</p>`,
      map: [["Metrics, logs, alarms", "Amazon CloudWatch", "Azure Monitor / Log Analytics"], ["App performance & tracing", "AWS X-Ray", "Application Insights"], ["Budgets & cost analysis", "AWS Budgets / Cost Explorer", "Cost Management + Billing"], ["Best-practice review", "Well-Architected Tool, Trusted Advisor", "Azure Advisor, Well-Architected review"]],
      code: [{ label: "A monthly budget alert (AWS CLI)", note: "One AWS CLI command (split over lines with backslashes): create a $20 monthly cost budget that emails you when actual spending passes 80%. Replace the account ID and email with your own.", code: `aws budgets create-budget --account-id 123456789012 \\
  --budget '{"BudgetName":"monthly-cap","BudgetLimit":{"Amount":"20","Unit":"USD"},"TimeUnit":"MONTHLY","BudgetType":"COST"}' \\
  --notifications-with-subscribers '[{"Notification":{"NotificationType":"ACTUAL","ComparisonOperator":"GREATER_THAN","Threshold":80},"Subscribers":[{"SubscriptionType":"EMAIL","Address":"you@example.com"}]}]'` }],
      cards: [
        ["Name three hidden cloud cost traps.", "NAT gateway hourly and data charges, data transfer out (egress), and idle resources such as stopped-but-attached disks, unused IPs, old snapshots or oversized databases."],
        ["Which metrics would you alert on for a web API?", "Error rate, latency percentiles (p95/p99), traffic, and saturation (CPU, memory, queue depth): the 'golden signals'."],
        ["Name the AWS Well-Architected pillars.", "Operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability."],
      ],
    },
  ],

  questions: [
    { id: "q1", topic: "fundamentals", q: "Explain the shared responsibility model with an example.", a: "The provider secures the infrastructure (data centers, hardware, hypervisor, managed service internals); the customer secures what they configure: identities, data, network rules, and the OS on VMs. Example: with EC2 you patch the OS; with Lambda the provider patches the runtime but you still own your code, permissions and data." },
    { id: "q2", topic: "fundamentals", q: "How would you design for high availability vs disaster recovery?", a: "HA: run across multiple availability zones behind a load balancer with health checks and a multi-AZ database. DR: replicate data and infrastructure-as-code to another region, choose a strategy by RPO/RTO (backup-restore, pilot light, warm standby, active-active), and test failover." },
    { id: "q3", topic: "iam", q: "What does least privilege mean in practice?", a: "Grant only the specific actions on the specific resources a person or workload needs, scoped as narrowly as possible, using roles/groups instead of individual grants, reviewing access regularly, and removing unused permissions." },
    { id: "q4", topic: "iam", q: "How do you avoid long-lived credentials in applications and pipelines?", a: "Use IAM roles / managed identities for workloads, OIDC federation for CI/CD, and SSO with temporary credentials for humans. Remaining secrets go in a secrets manager with rotation." },
    { id: "q5", topic: "security", q: "A storage bucket with customer data was found public. What do you do?", a: "Immediately block public access, then review access logs (CloudTrail / storage logs) to see what was read, rotate any exposed secrets, notify security/compliance (privacy obligations may apply), find the root cause, and add guardrails: account-level public-access blocks, policy-as-code checks, alerts." },
    { id: "q6", topic: "security", q: "How do you manage encryption keys and secrets?", a: "Keys in KMS / Key Vault (customer-managed when compliance requires), secrets in Secrets Manager / Key Vault, access granted to specific identities, rotation enabled, and all access audited. Nothing in code, images or Git." },
    { id: "q7", topic: "compute", q: "How would you make a web app on VMs scale automatically?", a: "Bake an image or use startup scripts, put instances in an Auto Scaling group / VM Scale Set across AZs behind a load balancer with health checks, scale on CPU or request count, and keep the app stateless (sessions in Redis or the database, files in object storage)." },
    { id: "q8", topic: "containers", q: "Kubernetes vs a managed container service like ECS Fargate or Azure Container Apps?", a: "Kubernetes offers maximum flexibility, portability and ecosystem but needs real operational expertise. Managed services run containers with far less overhead. For a small team or simple services start managed; choose Kubernetes when you need its features or already have platform expertise." },
    { id: "q9", topic: "containers", q: "What makes a good production container image?", a: "Small, pinned base image; dependencies installed in a cached layer; non-root user; no secrets baked in; health check; config from environment; scanned for vulnerabilities; tagged immutably with a version or commit SHA." },
    { id: "q10", topic: "serverless", q: "When would you choose serverless functions over containers?", a: "Event-driven or spiky workloads, glue code, scheduled tasks, and quick APIs with low or variable traffic. Choose containers for long-running processes, steady high traffic, special runtimes, or strict latency requirements." },
    { id: "q11", topic: "serverless", q: "How do you handle a slow third-party call inside a Lambda behind API Gateway?", a: "Don't make the client wait: accept the request, put a message on a queue, return 202 Accepted with a job ID, process asynchronously, and let the client poll or receive a webhook. Add timeouts and retries with backoff." },
    { id: "q12", topic: "storage", q: "Design storage for user-uploaded documents in a banking app.", a: "Object storage in a Canadian region with public access blocked, encryption (customer-managed keys if required), versioning, lifecycle rules for retention, uploads via pre-signed URLs or SAS directly from the client, malware scanning on upload, access logs, and least-privilege access for the app identity." },
    { id: "q13", topic: "databases", q: "How do you choose between RDS/Azure SQL and DynamoDB/Cosmos DB?", a: "Relational when you need transactions across tables, joins, flexible queries and strong consistency (most business apps). NoSQL when access patterns are simple and known, scale is huge, and you want predictable low latency with horizontal scaling." },
    { id: "q14", topic: "databases", q: "Your relational database CPU is at 90% from read traffic. Options?", a: "Add a cache for hot reads, add read replicas, optimize slow queries and indexes, then scale up the instance. Check whether some reads can be served by an analytics store instead." },
    { id: "q15", topic: "networking", q: "Walk through a typical secure VPC/VNet layout for a 3-tier app.", a: "Across two or more AZs: public subnets with only the load balancer (and NAT gateway); private app subnets with the compute; private data subnets with the database. Security groups allow LB to app and app to DB only; private endpoints for managed services; no SSH from the internet (use SSM Session Manager / Azure Bastion)." },
    { id: "q16", topic: "networking", q: "What happens when a user types your domain into a browser?", a: "DNS (Route 53 / Azure DNS) resolves the name, often to a CDN edge (CloudFront / Front Door) which serves cached content or forwards to the origin load balancer over TLS, which routes to healthy app instances in private subnets, which query the database." },
    { id: "q17", topic: "messaging", q: "How would you decouple an order service from email and inventory processing?", a: "Publish an OrderPlaced event to a topic or event bus; each consumer (email, inventory, analytics) gets its own queue subscribed to it, processes idempotently, and failed messages land in a dead-letter queue. The order API stays fast and services fail independently." },
    { id: "q18", topic: "devops", q: "Why infrastructure as code, and how do you manage changes safely?", a: "Repeatable, reviewable, versioned environments with no click-ops drift. Changes go through pull requests that show the plan output, automated checks (formatting, policy, security scanning), apply from CI with a least-privilege role, and remote locked state." },
    { id: "q19", topic: "devops", q: "Describe a CI/CD pipeline you'd set up for a containerized service.", a: "On pull request: lint, unit tests, build image, scan. On merge to main: build and tag with the commit SHA, push to the registry, deploy to staging, run smoke/integration tests, then a canary or blue/green to production with automatic rollback on alarms. OIDC for cloud access." },
    { id: "q20", topic: "operations", q: "How do you keep a cloud bill under control?", a: "Budgets and alerts from day one, mandatory tags for ownership, regular cost reviews, rightsizing, autoscaling and schedules for non-prod, commitments for steady baseline, storage lifecycle policies, and watching egress and NAT costs." },
    { id: "q21", topic: "operations", q: "An API's p99 latency doubled after a deploy. How do you investigate?", a: "Check dashboards and traces to find which dependency or endpoint slowed; compare with the deploy timeline; look at errors, saturation and DB metrics; roll back if user impact is significant, then root-cause with traces/logs, and add a regression test or alert." },
    { id: "q22", topic: "fundamentals", q: "AWS or Azure: how do you answer 'which cloud do you know?'", a: "Be honest about depth, then show the concepts transfer: 'I've built X on AWS; the Azure equivalents are Y. The fundamentals (identity, networking, compute choices, IaC) are the same, and I pick up service specifics quickly.'" },
    { id: "q23", topic: "security", q: "How would you secure a public web API end to end?", a: "TLS, WAF and DDoS protection at the edge, authentication (OAuth2/OIDC tokens) and authorization in the app, rate limiting at the gateway, input validation, least-privilege identities to backends, private networking for data stores, secrets in a vault, and logging/alerting on suspicious activity." },
    { id: "q24", topic: "storage", q: "How do you protect against accidental deletion of important files?", a: "Versioning, soft delete, object lock / immutable storage for compliance data, cross-region replication for DR, restricted delete permissions, and backups with tested restores." },
  ],

  quiz: [
    { id: "x1", tags: ["CLF", "AZ-900"], topic: "fundamentals", q: "Under the shared responsibility model, who is responsible for patching the guest OS on a virtual machine?", options: ["The cloud provider", "The customer", "Both equally", "Neither: it's automatic"], answer: 1, why: "IaaS VMs leave the guest OS to the customer. The provider handles physical hardware and the hypervisor." },
    { id: "x2", tags: ["CLF", "AZ-900"], topic: "fundamentals", q: "Which pricing option gives the deepest discount but can be interrupted with short notice?", options: ["On-demand", "Reserved / savings plan", "Spot", "Dedicated host"], answer: 2, why: "Spot uses spare capacity at large discounts and can be reclaimed by the provider." },
    { id: "x3", tags: ["CLF", "AZ-900", "SAA"], topic: "fundamentals", q: "To keep running if one data center fails, you should deploy across multiple:", options: ["Regions only", "Availability zones", "Edge locations", "Accounts"], answer: 1, why: "Availability zones are isolated data centers within a region and protect against a single facility failure." },
    { id: "x4", tags: ["CLF", "SAA"], topic: "iam", q: "An EC2 instance needs to read from S3. What's the recommended approach?", options: ["Store access keys in the code", "Attach an IAM role to the instance", "Make the bucket public", "Use the root user's keys"], answer: 1, why: "IAM roles provide temporary credentials automatically; nothing long-lived is stored on the instance." },
    { id: "x5", tags: ["AZ-900", "AZ-104"], topic: "iam", q: "In Azure, where do users and groups for sign-in live?", options: ["Azure Policy", "Microsoft Entra ID", "Azure Monitor", "Key Vault"], answer: 1, why: "Microsoft Entra ID (formerly Azure Active Directory) is Azure's identity service." },
    { id: "x6", tags: ["AZ-900", "AZ-104"], topic: "iam", q: "Which Azure feature grants a group the Reader role on a resource group?", options: ["Azure Policy", "Resource locks", "Azure RBAC role assignment", "Management group tags"], answer: 2, why: "RBAC role assignments grant permissions to a principal at a scope. Azure Policy enforces rules on resources rather than granting access." },
    { id: "x7", tags: ["CLF", "SAA"], topic: "iam", q: "In an AWS policy evaluation, an explicit Deny and an explicit Allow both match. The result is:", options: ["Allow", "Deny", "Whichever was attached last", "An error"], answer: 1, why: "An explicit Deny always overrides any Allow." },
    { id: "x8", tags: ["CLF", "AZ-900"], topic: "security", q: "Which service records API calls made in your AWS account for auditing?", options: ["CloudWatch", "CloudTrail", "AWS Config", "Inspector"], answer: 1, why: "CloudTrail logs who made which API call, when and from where." },
    { id: "x9", tags: ["AZ-900", "AZ-104"], topic: "security", q: "Where should an Azure app store a database connection secret?", options: ["App source code", "Azure Key Vault", "A blob in a public container", "Environment variable in the repository"], answer: 1, why: "Key Vault stores secrets securely; the app reads them with a managed identity." },
    { id: "x10", tags: ["SAA"], topic: "compute", q: "Which load balancer routes HTTP requests by URL path (e.g. /api vs /images)?", options: ["Network Load Balancer", "Application Load Balancer", "Gateway Load Balancer", "Classic DNS round robin"], answer: 1, why: "Layer 7 load balancers (ALB, Azure Application Gateway) understand HTTP and can route by path and host." },
    { id: "x11", tags: ["AZ-104"], topic: "compute", q: "Azure's equivalent of an EC2 Auto Scaling group is:", options: ["Availability set", "Virtual Machine Scale Sets", "Azure Batch only", "App Service plan"], answer: 1, why: "Virtual Machine Scale Sets manage a group of identical, autoscaling VMs." },
    { id: "x12", tags: ["CLF", "SAA"], topic: "containers", q: "Which lets you run containers on AWS without managing servers or a cluster's nodes?", options: ["EC2", "ECS with Fargate", "EBS", "Lightsail"], answer: 1, why: "Fargate is serverless compute for containers: you define tasks, AWS runs them." },
    { id: "x13", tags: ["AZ-900"], topic: "containers", q: "Which Azure service is managed Kubernetes?", options: ["Azure Container Instances", "Azure Kubernetes Service (AKS)", "Azure Functions", "Azure Batch"], answer: 1, why: "AKS is Azure's managed Kubernetes service." },
    { id: "x14", tags: ["CLF", "SAA"], topic: "serverless", q: "What's the maximum execution time of a single AWS Lambda invocation?", options: ["1 minute", "5 minutes", "15 minutes", "Unlimited"], answer: 2, why: "Lambda invocations time out at a maximum of 15 minutes. Longer work belongs in containers, Step Functions or batch." },
    { id: "x15", tags: ["AZ-900"], topic: "serverless", q: "An Azure service that runs code in response to events and bills per execution is:", options: ["Azure Functions", "Azure VMs", "Azure DevTest Labs", "Azure Bastion"], answer: 0, why: "Azure Functions is Azure's serverless functions service." },
    { id: "x16", tags: ["CLF", "SAA"], topic: "storage", q: "Which storage type is best for user-uploaded images served to a website?", options: ["Amazon EBS", "Amazon S3", "Instance store", "Amazon EFS"], answer: 1, why: "Object storage like S3 is durable, cheap, HTTP-accessible and easy to put behind a CDN." },
    { id: "x17", tags: ["AZ-900", "AZ-104"], topic: "storage", q: "Which Azure Blob tier has the lowest storage cost but requires rehydration before reading?", options: ["Hot", "Cool", "Cold", "Archive"], answer: 3, why: "Archive is cheapest to store, but blobs are offline and must be rehydrated (taking hours) before access." },
    { id: "x18", tags: ["SAA"], topic: "storage", q: "How do you give a user temporary download access to a private S3 object?", options: ["Make the object public for an hour", "Generate a pre-signed URL", "Email the IAM user's keys", "Use a bucket ACL for everyone"], answer: 1, why: "Pre-signed URLs grant time-limited access to a specific object without changing its permissions." },
    { id: "x19", tags: ["SAA"], topic: "databases", q: "An RDS database must survive an availability zone failure with automatic failover. Use:", options: ["A read replica", "Multi-AZ deployment", "A larger instance", "Manual snapshots"], answer: 1, why: "Multi-AZ keeps a synchronous standby in another AZ and fails over automatically." },
    { id: "x20", tags: ["AZ-900"], topic: "databases", q: "Which is a globally distributed, multi-model NoSQL database on Azure?", options: ["Azure SQL Database", "Azure Cosmos DB", "Azure Database for MySQL", "Azure Synapse"], answer: 1, why: "Cosmos DB is Azure's globally distributed NoSQL database." },
    { id: "x21", tags: ["SAA"], topic: "networking", q: "Instances in a private subnet need to download updates from the internet. What do you add?", options: ["An internet gateway on the private subnet", "A NAT gateway in a public subnet", "Public IPs on each instance", "A VPC peering connection"], answer: 1, why: "A NAT gateway allows outbound-only internet access for private subnets." },
    { id: "x22", tags: ["SAA"], topic: "networking", q: "Security groups are:", options: ["Stateless, subnet-level", "Stateful, attached to resources", "Only for IPv6", "A DNS feature"], answer: 1, why: "Security groups are stateful and attached to network interfaces; network ACLs are stateless and subnet-level." },
    { id: "x23", tags: ["AZ-900", "AZ-104"], topic: "networking", q: "Which provides a private, dedicated connection from on-premises to Azure?", options: ["Azure VPN Gateway over the internet", "ExpressRoute", "Azure Front Door", "Azure DNS"], answer: 1, why: "ExpressRoute is a private connection via a connectivity provider, not over the public internet." },
    { id: "x24", tags: ["CLF", "AZ-900"], topic: "networking", q: "A CDN improves performance mainly by:", options: ["Encrypting the database", "Caching content at edge locations near users", "Adding more CPUs to the origin", "Compressing the VPC"], answer: 1, why: "CDNs (CloudFront, Front Door) serve cached content from locations close to users." },
    { id: "x25", tags: ["SAA"], topic: "messaging", q: "Decouple a web tier from a slow image-processing worker so requests return quickly:", options: ["Call the worker synchronously", "Put jobs on an SQS queue", "Increase the web tier timeout", "Use a bigger EC2 instance"], answer: 1, why: "A queue lets the web tier accept work immediately while workers process at their own pace with retries." },
    { id: "x26", tags: ["SAA"], topic: "messaging", q: "One event must be delivered to email, analytics and inventory services. Use:", options: ["A single SQS queue", "SNS topic (fan-out) with subscribers", "A cron job", "An S3 bucket"], answer: 1, why: "Pub/sub fans one message out to multiple subscribers, often each backed by its own queue." },
    { id: "x27", tags: ["AZ-104"], topic: "devops", q: "Azure's native, declarative infrastructure-as-code language is:", options: ["Bicep", "PowerShell only", "YAML pipelines", "Kusto"], answer: 0, why: "Bicep (which compiles to ARM templates) is Azure's native IaC language." },
    { id: "x28", tags: ["CLF", "SAA"], topic: "devops", q: "AWS's native infrastructure-as-code service is:", options: ["CloudTrail", "CloudFormation", "CloudWatch", "Config"], answer: 1, why: "CloudFormation provisions resources from templates; the CDK generates CloudFormation from code." },
    { id: "x29", tags: ["CLF", "AZ-900"], topic: "operations", q: "You want an email when monthly spend passes 80% of a limit. Use:", options: ["A budget with an alert", "Cost allocation tags only", "A support plan", "Reserved instances"], answer: 0, why: "AWS Budgets / Azure Cost Management budgets send alerts at thresholds you set." },
    { id: "x30", tags: ["CLF", "SAA"], topic: "operations", q: "Which is NOT a pillar of the AWS Well-Architected Framework?", options: ["Reliability", "Cost optimization", "Sustainability", "Marketing"], answer: 3, why: "The six pillars are operational excellence, security, reliability, performance efficiency, cost optimization and sustainability." },
    { id: "x31", tags: ["AZ-900", "AZ-104"], topic: "operations", q: "Which Azure service collects metrics and logs and provides alerting?", options: ["Azure Monitor", "Azure Advisor", "Azure Arc", "Azure Policy"], answer: 0, why: "Azure Monitor (with Log Analytics and Application Insights) handles metrics, logs and alerts." },
    // Added so every topic has at least three checks (a topic is complete when its checks are all right).
    // No CLF / SAA tags, so the AWS Certs practice-exam pools stay as they were.
    { id: "x44", tags: ["AZ-900"], topic: "security", q: "Where should an app's database password be kept?", options: ["In the source code, so it's always available", "In a secrets manager such as Secrets Manager or Key Vault, read at runtime by the app's identity", "In a public storage bucket", "In the README file"], answer: 1, why: "A secrets manager keeps the password encrypted, controls who can read it, logs every read and can rotate it. Code is copied and shared, so secrets in code leak." },
    { id: "x45", tags: [], topic: "compute", q: "Why should the VMs in an autoscaling group be stateless?", options: ["Stateless VMs are cheaper per hour", "Any VM can be removed at any time, so nothing important may live only on one VM", "Load balancers only work with Windows", "Stateless VMs don't need an operating system"], answer: 1, why: "Autoscaling adds and removes VMs as traffic changes. Sessions, uploads and data must live in shared services, or they're lost when a VM is removed." },
    { id: "x46", tags: ["AZ-900"], topic: "containers", q: "What's the main difference between a container and a virtual machine?", options: ["A container includes a full operating system; a VM doesn't", "A container shares the host's operating system and carries only the app and its dependencies, so it's smaller and starts faster", "Containers only run on Azure", "There's no difference"], answer: 1, why: "A VM virtualizes a whole computer, including its OS. A container packages just the app and what it needs, sharing the host's OS kernel." },
    { id: "x47", tags: [], topic: "serverless", q: "Why should a function that processes queue messages be idempotent?", options: ["To make it run faster", "Because the same message can be delivered more than once, and processing it twice must not duplicate anything", "Because functions can only run once", "To avoid cold starts"], answer: 1, why: "Most event sources deliver at least once. An idempotent handler gives the same result whether a message arrives once or twice." },
    { id: "x48", tags: ["AZ-900"], topic: "databases", q: "Your database is overloaded by the same popular product pages being read again and again. What helps most, quickly?", options: ["A cache such as Redis in front of the database", "Deleting old orders", "Turning off backups", "Moving the database to a public subnet"], answer: 0, why: "A cache answers repeated reads from memory, so the database only handles misses and writes. Read replicas are the other common answer." },
    { id: "x49", tags: [], topic: "messaging", q: "A message keeps failing to process. Where does it end up after the maximum number of attempts?", options: ["It's deleted silently", "In a dead-letter queue, where it can be inspected and replayed", "It's emailed to the customer", "It blocks the whole queue forever"], answer: 1, why: "A dead-letter queue collects messages that failed repeatedly, so they don't block others and someone can investigate." },
    { id: "x50", tags: [], topic: "devops", q: "What does terraform plan do?", options: ["Deletes everything Terraform created", "Shows exactly what would be created, changed or destroyed, without changing anything", "Installs Terraform", "Deploys the app"], answer: 1, why: "plan is a preview. Teams review its output in a pull request before running apply." },
    { id: "x51", tags: [], topic: "kubernetes", q: "In Kubernetes, what is a pod?", options: ["A physical server", "The smallest unit Kubernetes runs: one or more containers sharing a network address", "A container registry", "A kind of load balancer"], answer: 1, why: "Kubernetes schedules pods, not bare containers. A deployment keeps the right number of pods running." },
  ],

  // Each step says what to do, what you should see when it worked, a hint, and what good looks
  // like. `old` is the step's index before steps were added, so saved ticks move with it
  // (migrateCloud in trackview.js). Every lab starts with a budget and ends with a clean-up step.
  labs: [
    {
      id: "staticsite", title: "Static website with HTTPS and a CDN", level: "Beginner", time: "2-3 hours", stack: ["S3 + CloudFront", "or Azure Storage static website + Front Door"],
      goal: "Host your portfolio (or this prep app!) on object storage behind a CDN with HTTPS and a custom domain.",
      costs: "Object storage and CDN traffic (pennies for a personal site). A custom domain costs about $15-20 a year if you buy one. Azure Front Door has a monthly base fee of roughly $35, so on Azure, if you only want the free option, skip the CDN step and use the storage account's own static website address.",
      free: "S3 and CloudFront are covered by the AWS Free Tier at this size. Azure Storage static websites cost cents a month.",
      steps: [
        { old: 0, do: "Set a budget alert of $10 and turn on MFA for your account before creating anything", see: "The budget is listed with an email alert, and signing in asks for an MFA code.", hint: "AWS: Billing and Cost Management > Budgets > Create budget > use a template (Monthly cost budget). Azure: Cost Management > Budgets > Add. MFA: AWS IAM > Security recommendations; Azure: Microsoft Entra ID > Security > Authentication methods.", good: `# AWS console: Budgets
monthly-cap   Budgeted $10.00   Actual $0.00   Alert at 80% -> you@example.com
# Azure portal: Cost Management > Budgets
monthly-cap   $10   Monthly   Alerts: 80% (Actual)` },
        { old: 1, do: "Create a bucket (AWS) or storage account (Azure) in a Canadian region, and keep public access blocked", see: "The new bucket or storage account appears in the list in ca-central-1 / Canada Central, with access shown as not public.", hint: "Bucket and storage account names must be unique worldwide: add your initials and a number. Keep \"Block all public access\" ticked; the CDN will read the files privately.", good: `$ aws s3 mb s3://sam-portfolio-2026 --region ca-central-1
make_bucket: sam-portfolio-2026
$ az storage account create -n samportfolio2026 -g rg-portfolio -l canadacentral --sku Standard_LRS` },
        { old: 2, do: "Upload the site files from your computer or Cloud Shell", see: "Listing the bucket or container shows index.html and your other files.", hint: "Run the command from the folder that contains index.html (use pwd and ls to check). On Azure, first run az storage blob service-properties update --account-name <name> --static-website --index-document index.html to create the $web container.", good: `$ aws s3 sync . s3://sam-portfolio-2026
upload: ./index.html to s3://sam-portfolio-2026/index.html
$ az storage blob upload-batch -s . -d '$web' --account-name samportfolio2026` },
        { old: 3, do: "Create a CDN in front of the storage: CloudFront with origin access control (AWS), or Front Door (Azure)", see: "The CDN shows status Deployed / Enabled and gives you an address such as d123abc.cloudfront.net; opening it shows your site.", hint: "On AWS, choose the bucket as the origin, pick \"Origin access control\", and let CloudFront update the bucket policy. Set the default root object to index.html. It can take 5-15 minutes to deploy.", good: `Distribution  d123abc.cloudfront.net   Status: Enabled   Last modified: Deployed
$ curl -I https://d123abc.cloudfront.net
HTTP/2 200` },
        { old: 4, do: "Make sure the site is served over HTTPS with a certificate", see: "The browser shows a padlock and the address starts with https://.", hint: "The CDN's own address already has HTTPS. For your own domain, request a free certificate: ACM in the us-east-1 region for CloudFront (it must be that region), or a Front Door managed certificate.", good: `$ curl -I https://www.example.com
HTTP/2 200
# Browser: padlock icon > Connection is secure` },
        { old: 5, do: "Optional: point a custom domain at the CDN with a DNS record", see: "Your domain opens the same site with HTTPS.", hint: "Create a CNAME (or an alias record in Route 53) from www.yourdomain to the CDN address. DNS changes can take a few minutes to an hour to appear.", good: `$ nslookup www.example.com
www.example.com  canonical name = d123abc.cloudfront.net` },
        { old: 6, do: "Write a short README with a diagram (browser > CDN > storage) and the monthly cost", see: "A README that someone else could follow to rebuild the site.", hint: "A hand-drawn diagram photo or a draw.io sketch is fine. Get the cost from Cost Explorer / Cost analysis after a few days.", good: `## Architecture
Browser -> CloudFront (HTTPS) -> S3 bucket (private, OAC)
## Cost
About $0.50 / month at current traffic` },
        { old: 7, do: "Clean up: delete the CDN, then empty and delete the bucket or storage account (or keep the site if you want it, since it costs pennies), and check the budget shows no surprises", see: "The resources no longer appear in the console, and Billing shows no new charges after a day.", hint: "Disable a CloudFront distribution and wait for it to finish before deleting it. A bucket must be empty before it can be deleted: aws s3 rb s3://name --force empties and deletes it. On Azure, deleting the resource group deletes everything in it.", good: `$ aws s3 rb s3://sam-portfolio-2026 --force
remove_bucket: sam-portfolio-2026
$ az group delete -n rg-portfolio --yes` },
      ],
      resume: "Deployed a static website on AWS S3 and CloudFront with HTTPS, private origin access and a custom domain, scripted with the AWS CLI.",
      stretch: ["Define everything in Terraform", "Add a GitHub Actions workflow that syncs on every push and invalidates the CDN cache"],
    },
    {
      id: "serverlessapi", title: "Serverless REST API", level: "Intermediate", time: "4-6 hours", stack: ["API Gateway + Lambda + DynamoDB", "or Azure Functions + Cosmos DB"],
      goal: "Build a small CRUD API (create, read, update, delete), for example a job-application tracker, with serverless functions and a NoSQL table.",
      costs: "Function runs, API requests and table reads/writes. At practice traffic these are fractions of a cent; costs only grow if something calls your API in a loop.",
      free: "Lambda, API Gateway and DynamoDB on-demand all have free-tier allowances; Azure Functions (Consumption plan) and Cosmos DB's free tier cover this lab.",
      steps: [
        { do: "Check your budget alert exists (or create one for $10) before you start", see: "A monthly budget with an email alert is listed.", hint: "AWS: Billing and Cost Management > Budgets. Azure: Cost Management > Budgets.", good: `monthly-cap   Budgeted $10.00   Alert at 80%` },
        { old: 0, do: "Design the API: the routes (POST / GET / PUT / DELETE /applications) and the table's partition key", see: "A short written list of routes and an example item, with the key you'll look items up by.", hint: "Ask: \"what will I look items up by?\". For one user's applications, the partition key could be user_id and the sort key application_id.", good: `POST   /applications          create
GET    /applications/{id}     read one
PUT    /applications/{id}     update
DELETE /applications/{id}     delete
Item: {"user_id": "u1", "application_id": "a42", "company": "Clio", "status": "Applied"}` },
        { old: 1, do: "Create the table: DynamoDB in on-demand mode, or Cosmos DB in serverless mode", see: "The table shows status Active (AWS) or the container appears in Data Explorer (Azure).", hint: "On-demand / serverless means you pay per request and nothing when idle. Use the partition key from your design.", good: `$ aws dynamodb create-table --table-name applications \\
    --attribute-definitions AttributeName=user_id,AttributeType=S AttributeName=application_id,AttributeType=S \\
    --key-schema AttributeName=user_id,KeyType=HASH AttributeName=application_id,KeyType=RANGE \\
    --billing-mode PAY_PER_REQUEST
"TableStatus": "CREATING"   (Active a few seconds later)` },
        { old: 2, do: "Write the function in Python: check the input and return proper status codes (201 created, 400 bad input, 404 not found)", see: "Calling the function with a test event in the console returns statusCode 201 for good input and 400 for missing fields.", hint: "Start from the Lambda handler in the Serverless topic. Return a dict with statusCode, headers and a JSON body.", good: `Test event result:
{"statusCode": 201, "body": "{\\"application_id\\": \\"a42\\"}"}` },
        { old: 3, do: "Give the function least-privilege access to only that table ([[an IAM role|a managed identity]])", see: "The function's permissions list only the table actions it uses, on only that table.", hint: "On AWS, edit the execution role's policy: dynamodb:GetItem, PutItem, UpdateItem, DeleteItem, Query on the table's ARN only. On Azure, give the function's managed identity the Cosmos DB Built-in Data Contributor role on that account.", good: `"Action": ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:UpdateItem", "dynamodb:DeleteItem", "dynamodb:Query"],
"Resource": "arn:aws:dynamodb:ca-central-1:123456789012:table/applications"` },
        { old: 4, do: "Expose it through API Gateway (AWS) or an HTTP trigger (Azure), and test it with curl or Postman", see: "A POST returns 201 and a GET for the same id returns the item.", hint: "curl is a command-line tool for sending web requests. If you get 403 or 500, check the function's logs first.", good: `$ curl -X POST https://abc123.execute-api.ca-central-1.amazonaws.com/applications \\
    -d '{"company": "Clio", "status": "Applied"}'
{"application_id": "a42"}     # HTTP 201` },
        { old: 5, do: "Add authentication (Cognito or Entra ID, or an API key at minimum) and throttling", see: "A request without credentials gets 401 or 403; a request with them works.", hint: "API keys plus a usage plan are the quickest start on API Gateway; Azure Functions has function keys. Throttling limits requests per second per caller.", good: `$ curl -i https://.../applications
HTTP/2 401   {"message": "Unauthorized"}` },
        { old: 6, do: "Add structured logs and an alarm on errors", see: "Logs show one JSON line per request, and an alarm in state OK that would email you on errors.", hint: "Structured logs are JSON lines you can search. Create a CloudWatch alarm on the function's Errors metric, or an Azure Monitor alert on failed requests.", good: `{"level": "info", "route": "POST /applications", "status": 201, "ms": 38}
Alarm: api-errors   State: OK   Errors >= 1 for 5 minutes -> email` },
        { old: 7, do: "Write tests for the handler and a README with the architecture", see: "Running pytest shows all tests passing.", hint: "Test the handler as a plain Python function: pass it a fake event dict and check the status code.", good: `$ pytest
....                                   [100%]
4 passed in 0.12s` },
        { do: "Clean up: delete the API, the function and the table (or the resource group on Azure)", see: "None of the resources appear in the console any more.", hint: "On Azure, everything for the lab should be in one resource group, so one delete removes it all. On AWS, also delete the function's log group in CloudWatch.", good: `$ aws dynamodb delete-table --table-name applications
$ aws lambda delete-function --function-name applications-api
$ az group delete -n rg-serverless-lab --yes` },
      ],
      resume: "Built a serverless REST API with AWS Lambda (Python), API Gateway and DynamoDB, with least-privilege IAM, authentication, throttling, automated tests and CloudWatch alarms.",
      stretch: ["Deploy with AWS SAM / Terraform / Bicep", "Process new records asynchronously with a queue"],
    },
    {
      id: "containercicd", title: "Containerized app with CI/CD", level: "Intermediate", time: "5-8 hours", stack: ["Docker + ECR + ECS Fargate", "or ACR + Azure Container Apps", "GitHub Actions"],
      goal: "Containerize a small web app and deploy it automatically on every push to main.",
      costs: "Load balancers and always-running containers bill every hour, even with no traffic (an AWS Application Load Balancer is roughly $20 a month on its own). The container registry charges for stored images.",
      free: "GitHub Actions is free for public repositories. Azure Container Apps can scale to zero and has a monthly free allowance; ECS Fargate has no free tier, so tear down on the same day.",
      steps: [
        { do: "Check your budget alert exists (or create one for $10) before you start", see: "A monthly budget with an email alert is listed.", hint: "AWS: Billing and Cost Management > Budgets. Azure: Cost Management > Budgets.", good: `monthly-cap   Budgeted $10.00   Alert at 80%` },
        { old: 0, do: "Write a Dockerfile (slim starting image, non-root user) and run the container on your computer", see: "docker run starts the app and http://localhost:8000 answers in your browser.", hint: "Install Docker Desktop first. Start from the Dockerfile in the Containers topic. -p 8000:8000 connects your computer's port 8000 to the container's.", good: `$ docker build -t app:dev .
$ docker run --rm -p 8000:8000 app:dev
[INFO] Listening at: http://0.0.0.0:8000` },
        { old: 1, do: "Create a registry (ECR / ACR) and push the image tagged with the Git SHA", see: "The registry lists your image with a tag like 3f9a1c2.", hint: "git rev-parse --short HEAD prints the current Git SHA. Sign Docker in to the registry first (aws ecr get-login-password ... | docker login, or az acr login).", good: `$ docker tag app:dev 123456789012.dkr.ecr.ca-central-1.amazonaws.com/app:3f9a1c2
$ docker push 123456789012.dkr.ecr.ca-central-1.amazonaws.com/app:3f9a1c2
3f9a1c2: digest: sha256:... size: 1789` },
        { old: 2, do: "Deploy it to ECS Fargate behind a load balancer, or to Azure Container Apps with ingress turned on", see: "The service shows a running task / revision, and its public address returns your app.", hint: "Container Apps gives you a URL straight away. On ECS, the service's target group must show the task as healthy before the load balancer sends it traffic.", good: `$ az containerapp up -n app -g rg-cicd-lab --image myacr.azurecr.io/app:3f9a1c2 --ingress external --target-port 8000
Your container app app has been created and deployed!  https://app.<random>.canadacentral.azurecontainerapps.io` },
        { old: 3, do: "Set up OIDC between GitHub and your cloud, so the pipeline needs no stored access keys", see: "A role (AWS) or federated credential (Azure) that trusts your repository, and no access keys saved in GitHub secrets.", hint: "AWS: add GitHub as an identity provider in IAM (token.actions.githubusercontent.com), then a role that trusts your repo. Azure: an app registration with a federated credential for your repo and branch.", good: `Trust policy condition:
"token.actions.githubusercontent.com:sub": "repo:sam/app:ref:refs/heads/main"` },
        { old: 4, do: "Create a GitHub Actions workflow: test, build, scan, push, deploy", see: "On the Actions tab, a push to main shows a green run with every step ticked.", hint: "Start from the workflow in the DevOps topic. If a step fails, open it: the last red lines say why.", good: `deploy  #12  main  ✓ test  ✓ build  ✓ scan  ✓ push  ✓ deploy   2m 41s` },
        { old: 5, do: "Add a health check endpoint and confirm a new deploy causes no downtime", see: "While a deploy runs, a loop of requests keeps getting 200 responses.", hint: "A health check is a URL like /health that returns 200 when the app is ready. Run the curl loop in one terminal while you push a change.", good: `$ while true; do curl -s -o /dev/null -w "%{http_code} " https://.../health; sleep 1; done
200 200 200 200 200 200 200 200` },
        { old: 6, do: "Document the pipeline with a diagram and screenshots", see: "A README showing push > test > build > push image > deploy.", hint: "A screenshot of a green Actions run and the running service is great evidence for interviews.", good: `git push -> GitHub Actions (test, build, scan) -> ECR -> ECS Fargate (rolling deploy)` },
        { old: 7, do: "Clean up: delete the service and load balancer (AWS) or the resource group (Azure), and delete old images from the registry", see: "No running services, load balancers or registries remain, and the next day's bill shows no new hourly charges.", hint: "On AWS, set the service's desired count to 0, delete the service, then the load balancer and target group, then the ECR repository. On Azure, delete the lab's resource group.", good: `$ aws ecs delete-service --cluster lab --service app --force
$ aws elbv2 delete-load-balancer --load-balancer-arn arn:aws:elasticloadbalancing:...
$ az group delete -n rg-cicd-lab --yes` },
      ],
      resume: "Containerized a Python web app and built a GitHub Actions pipeline that tests, scans and deploys to AWS ECS Fargate using OIDC (no long-lived credentials).",
      stretch: ["Add a staging environment with manual approval for production", "Canary deploys with automatic rollback on alarms"],
    },
    {
      id: "terraformnet", title: "Network & infrastructure as code", level: "Intermediate", time: "4-6 hours", stack: ["Terraform", "AWS VPC or Azure VNet"],
      goal: "Build a production-style network in Terraform: public and private subnets across two zones, with no SSH exposed.",
      costs: "A NAT gateway bills every hour even when idle (about $1-2 a day each on AWS, plus data charges). The small VM and the Bastion host (Azure) also bill by the hour. The network itself, subnets and security groups are free.",
      free: "A t3.micro / B1s VM is in the free tier for new accounts, but NAT gateways and Azure Bastion are not. Do this lab in one sitting and destroy it the same day.",
      steps: [
        { do: "Check your budget alert exists (or create one for $10) before you start", see: "A monthly budget with an email alert is listed.", hint: "AWS: Billing and Cost Management > Budgets. Azure: Cost Management > Budgets.", good: `monthly-cap   Budgeted $10.00   Alert at 80%` },
        { old: 0, do: "Set up remote Terraform state with locking ([[an S3 bucket|an Azure Storage account]])", see: "terraform init says the backend was configured successfully.", hint: "Create the state bucket or storage account by hand first (it can't be managed by the same config). Recent Terraform versions lock S3 state with use_lockfile = true.", good: `$ terraform init
Successfully configured the backend "s3"!
Terraform has been successfully initialized!` },
        { old: 1, do: "Create a VPC/VNet with public and private subnets in two availability zones", see: "terraform plan lists the network and four subnets to add; after apply they appear in the console.", hint: "Start from the Terraform in the Networking topic and add a second public and private subnet in another zone (for example ca-central-1b). Give each subnet its own CIDR range: 10.0.1.0/24, 10.0.2.0/24, 10.0.3.0/24, 10.0.4.0/24.", good: `Plan: 5 to add, 0 to change, 0 to destroy.
aws_vpc.main: Creation complete after 2s [id=vpc-0abc...]` },
        { old: 2, do: "Add routing: an internet gateway for the public subnets, a NAT gateway for the private ones", see: "The public route table sends 0.0.0.0/0 to the internet gateway; the private route table sends 0.0.0.0/0 to the NAT gateway.", hint: "The NAT gateway lives in a public subnet and needs an Elastic IP (AWS). On Azure, attach a NAT Gateway resource to the private subnets.", good: `Route table rt-private:  10.0.0.0/16 -> local   0.0.0.0/0 -> nat-0def...
Route table rt-public:   10.0.0.0/16 -> local   0.0.0.0/0 -> igw-0123...` },
        { old: 3, do: "Launch a small VM in a private subnet that you can reach only through SSM Session Manager (AWS) or Azure Bastion", see: "You get a shell on the VM through Session Manager or Bastion, and the VM has no public IP address and no inbound SSH rule.", hint: "On AWS, the VM needs an IAM role with the AmazonSSMManagedInstanceCore policy, and outbound internet through the NAT. If it doesn't appear in Session Manager, wait a few minutes and check the role.", good: `$ aws ssm start-session --target i-0abc123
Starting session with SessionId: sam-0a1b2c3
sh-5.2$ curl -s https://checkip.amazonaws.com    # works outbound via NAT` },
        { old: 4, do: "Use variables and outputs, then run terraform fmt and terraform validate", see: "fmt prints nothing (or the files it tidied) and validate says the configuration is valid.", hint: "Variables replace hard-coded values like the region; outputs print useful IDs after apply.", good: `$ terraform fmt
$ terraform validate
Success! The configuration is valid.` },
        { old: 5, do: "Open a pull request that shows terraform plan before applying a change", see: "The pull request contains the plan output (pasted or added by CI) and is reviewed before apply.", hint: "Make a small change, such as adding a tag, so the plan is easy to read.", good: `~ resource "aws_subnet" "private" {
    ~ tags = { + "env" = "lab" }
  }
Plan: 0 to add, 1 to change, 0 to destroy.` },
        { old: 6, do: "Clean up: run terraform destroy and confirm everything is gone", see: "Destroy complete, and the NAT gateway, VM and network no longer appear in the console.", hint: "Type yes when asked. If destroy fails on a dependency, run it again; delete the state bucket by hand last, if you no longer need it.", good: `$ terraform destroy
Plan: 0 to add, 0 to change, 14 to destroy.
Destroy complete! Resources: 14 destroyed.` },
      ],
      resume: "Provisioned a multi-AZ AWS VPC with public/private subnets, NAT and private compute using Terraform with remote locked state and plan reviews in pull requests.",
      stretch: ["Turn the network into a reusable Terraform module", "Add policy checks (tflint / Checkov) in CI"],
    },
    {
      id: "observability", title: "Monitoring, alerts & cost guardrails", level: "Beginner", time: "2-4 hours", stack: ["CloudWatch + SNS + Budgets", "or Azure Monitor + Action groups + Cost Management"],
      goal: "Add production-grade visibility to one of your labs: dashboards, alerts, log queries and budget controls.",
      costs: "A few alarms, dashboards and email notifications are free or cents; log storage is billed per gigabyte, and the resources from the lab you're monitoring keep billing while they run.",
      free: "CloudWatch includes 10 alarms and 3 dashboards free; Azure Monitor's basic metrics and alert rules are mostly free. Budgets are free.",
      steps: [
        { old: 4, do: "Set monthly budget alerts at 50%, 80% and 100% first", see: "One budget with three alert thresholds, all sending to your email.", hint: "AWS: Budgets > your budget > Alerts. Azure: Cost Management > Budgets > Alert conditions.", good: `monthly-cap   $10   Alerts: 50% / 80% / 100% (Actual) -> you@example.com` },
        { old: 0, do: "Create a dashboard with request count, error rate and latency for your API", see: "A dashboard with three graphs that move when you send requests.", hint: "Send a few requests with curl while the dashboard is open, then refresh it after a minute or two: metrics arrive with a small delay.", good: `Dashboard: api-health
[Requests / min]  [Error rate %]  [Latency p95 ms]` },
        { old: 1, do: "Add an alarm on errors and on p95 latency that emails you", see: "Two alarms in state OK; you've confirmed the email subscription.", hint: "AWS sends a confirmation email for SNS subscriptions: click the link, or alerts won't arrive. Azure uses an action group with your email.", good: `api-errors     OK   Errors >= 1 for 5 min      -> sns:alerts
api-latency    OK   p95 > 1000 ms for 10 min   -> sns:alerts` },
        { old: 2, do: "Write a log query that finds the slowest requests (CloudWatch Logs Insights or KQL in Log Analytics)", see: "A table of the slowest requests, slowest first.", hint: "KQL is the query language of Azure's Log Analytics. Start with the example and change the field names to match your logs.", good: `fields @timestamp, route, ms
| sort ms desc
| limit 10` },
        { old: 3, do: "Tag every resource with project, env and owner, then filter costs by tag", see: "The cost report grouped by the project tag shows your lab's spend.", hint: "On AWS, turn on the tags as cost allocation tags in Billing first; they appear in Cost Explorer within about a day.", good: `Cost Explorer > Group by: Tag "project"
project=serverless-lab   $0.42` },
        { old: 5, do: "Write a one-page runbook: what each alert means and the first steps to take", see: "A document someone else could follow when an alert fires at 3 a.m.", hint: "For each alarm: what it means, how to check (dashboard, log query), and the first fix to try (roll back, scale up).", good: `api-errors fired:
1. Open dashboard api-health: which route?
2. Run the slow/error log query for the last 30 min
3. If it started at a deploy, roll back` },
        { do: "Clean up: delete the dashboard and alarms you no longer need (keep the budget), and clean up the lab you were monitoring", see: "Only the budget remains; nothing else from the lab is listed.", hint: "Budgets are free and worth keeping on your account permanently.", good: `$ aws cloudwatch delete-alarms --alarm-names api-errors api-latency
$ aws cloudwatch delete-dashboards --dashboard-names api-health` },
      ],
      resume: "Implemented monitoring for a serverless API with CloudWatch dashboards, latency/error alarms, Logs Insights queries, cost tagging and budget alerts, documented in an on-call runbook.",
      stretch: ["Add distributed tracing (X-Ray / Application Insights)", "Run a small load test and watch the dashboard react"],
    },
  ],
  certs: [
    { id: "clf", code: "CLF-C02", name: "AWS Certified Cloud Practitioner", provider: "AWS", level: "Foundational", tag: "CLF", link: "https://aws.amazon.com/certification/",
      why: "Broad, non-technical-to-light-technical intro to AWS: cloud concepts, core services, security, billing. A quick first win if your target employers use AWS.", topics: ["fundamentals", "iam", "security", "compute", "storage", "databases", "operations"] },
    { id: "saa", code: "SAA-C03", name: "AWS Certified Solutions Architect - Associate", provider: "AWS", level: "Associate", tag: "SAA", link: "https://aws.amazon.com/certification/",
      why: "The most requested AWS cert in job postings. Designing resilient, secure, cost-effective architectures; pairs perfectly with system design interviews.", topics: ["iam", "compute", "containers", "serverless", "storage", "databases", "networking", "messaging", "operations"] },
    { id: "az900", code: "AZ-900", name: "Microsoft Certified: Azure Fundamentals", provider: "Azure", level: "Fundamentals", tag: "AZ-900", link: "https://learn.microsoft.com/credentials/",
      why: "Azure's entry cert: cloud concepts, core Azure services, identity, governance and cost. Good signal for banks and insurers, which lean Azure.", topics: ["fundamentals", "iam", "security", "compute", "storage", "networking", "operations"] },
    { id: "az104", code: "AZ-104", name: "Microsoft Certified: Azure Administrator Associate", provider: "Azure", level: "Associate", tag: "AZ-104", link: "https://learn.microsoft.com/credentials/",
      why: "Hands-on Azure administration: identities, governance, storage, compute, virtual networking and monitoring. Strong for platform/DevOps-leaning roles.", topics: ["iam", "compute", "containers", "storage", "networking", "devops", "operations"] },
  ],

  videos: {
    courses: [V("NhDYbskXRgc", "AWS Cloud Practitioner (CLF-C02) - Full Course", "freeCodeCamp.org"), V("c3Cn4xYfxJY", "AWS Solutions Architect Associate (SAA-C03) - Full Course", "freeCodeCamp.org"),
      V("NKEFWyqJ5XA", "Azure Fundamentals (AZ-900) - Full Course", "freeCodeCamp.org"), V("10PbGbTUSAg", "Azure Administrator (AZ-104) - Full Course", "freeCodeCamp.org")],
    fundamentals: [V("JIbIYCM48to", "Top 50+ AWS Services Explained in 10 Minutes", "Fireship")],
    containers: [V("Gjnup-PuquQ", "Docker in 100 Seconds", "Fireship"), V("PziYflu8cB8", "Kubernetes Explained in 100 Seconds", "Fireship"), V("3c-iBn73dDE", "Docker Tutorial for Beginners (Full Course)", "TechWorld with Nana"), V("X48VuDVv0do", "Kubernetes Tutorial for Beginners (Full Course)", "TechWorld with Nana")],
    devops: [V("tomUWcQ0P3k", "Terraform in 100 Seconds", "Fireship"), V("scEDHsr3APg", "DevOps CI/CD Explained in 100 Seconds", "Fireship"), V("7xngnjfIlK4", "Complete Terraform Course", "DevOps Directive")],
  },
};
