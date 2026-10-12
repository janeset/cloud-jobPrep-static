// More Cloud learning: four new lessons, runnable Python exercises for existing lessons, a
// glossary, and extra interview/quiz questions. Merged into CLOUD by extendTrack (ai.js).
// Exercise code avoids backslashes (it lives in template literals).

extendTrack(CLOUD, {
  topics: [
    {
      id: "kubernetes", title: "Kubernetes essentials", short: "K8s",
      terms: [["Container / image", "An app packaged with everything it needs / the file it starts from.", "containers"],
        ["Kubernetes (K8s)", "An open-source system that runs containers across many machines and keeps them running the way you described."],
        ["Cluster / node", "The group of machines Kubernetes manages / one machine (usually a VM) in it."],
        ["Control plane", "The \"brain\" of the cluster that stores the desired state and decides where things run."],
        ["Declare / desired state", "You write down what you want (\"3 copies of the API\"), and Kubernetes keeps making reality match."],
        ["Manifest / YAML", "The file that declares what you want; YAML is the indented text format it's written in."],
        ["Replica", "One identical copy of a pod."],
        ["Rolling update", "Replacing old copies with new ones a few at a time, so the app never goes down."],
        ["Probe", "A regular check Kubernetes runs against a container, such as calling /health."],
        ["Base64", "A way of writing data as plain letters and numbers. It's an encoding, not encryption: anyone can decode it."],
        ["kubectl", "The command-line tool for talking to a Kubernetes cluster."]],
      body: `<p>In plain words: Kubernetes is a robot manager for containers. You tell it "run 3 copies of my API, each with this much memory, and keep them healthy", and it decides which machines to use, restarts copies that crash, and replaces them gradually when you ship a new version. If containers are new, read <button class="link-btn inline-link" data-trsel="cloud|containers">Containers &amp; Kubernetes</button> first. Interviews for platform, DevOps and backend roles expect this vocabulary.</p>
        <ul>
          <li><b>Cluster:</b> a <b>control plane</b> (the API server you talk to, the scheduler that places work, and etcd, its database) plus <b>worker nodes</b> that run your containers. [[Amazon EKS|AKS]] runs the control plane for you.</li>
          <li><b>Pod:</b> the smallest unit Kubernetes runs: one or more containers sharing a network address. Pods are disposable; never rely on one particular pod staying alive.</li>
          <li><b>Deployment:</b> says how many replicas of a pod to run, and performs rolling updates and rollbacks.</li>
          <li><b>Service:</b> a stable name and address that spreads traffic across the matching pods, even as pods come and go (ClusterIP for inside the cluster, LoadBalancer to expose it outside). <b>Ingress</b> routes web requests by host name or path to services.</li>
          <li><b>ConfigMap / Secret:</b> settings and sensitive values handed to containers as environment variables or files. Kubernetes Secrets are only base64-encoded, not encrypted, so pull real secrets from a vault ([[Secrets Manager|Key Vault]]).</li>
          <li><b>Probes:</b> <i>readiness</i> (is this pod ready to receive traffic?) and <i>liveness</i> (is it stuck and should be restarted?).</li>
          <li><b>Requests and limits</b> reserve and cap CPU and memory for each container; the scheduler places pods using the requests. The <b>Horizontal Pod Autoscaler</b> adds replicas when a metric such as CPU goes above a target.</li>
          <li><b>Namespaces</b> separate teams or environments in one cluster; <b>RBAC</b> (role-based access control) decides who can do what; <b>Helm</b> packages a set of manifests into a reusable "chart".</li></ul>
        <p><b>Example:</b> the manifest below declares a Deployment of 3 API pods and a Service in front of them. If a node dies, Kubernetes notices that only 2 pods are running and starts a third on another node. When you change the image tag to a new version and apply the file again, it replaces the pods one by one, sending traffic to each new pod only after its readiness probe passes.</p>`,
      map: [["Managed Kubernetes", "Amazon EKS", "Azure Kubernetes Service (AKS)"], ["Container registry", "Amazon ECR", "Azure Container Registry"], ["Pod identity to cloud APIs", "EKS Pod Identity / IRSA", "Microsoft Entra Workload ID"], ["Cluster autoscaling of nodes", "Cluster Autoscaler / Karpenter", "AKS cluster autoscaler"], ["HTTP ingress to the cluster", "AWS Load Balancer Controller (ALB)", "Application Gateway for Containers / ingress controller"]],
      code: [{ label: "A Deployment and a Service (YAML)", note: "A Kubernetes manifest in YAML (indentation matters). The first part asks for 3 replicas of the api container with CPU and memory limits and a readiness probe on /health; the part after --- is a Service that sends port 80 traffic to those pods.", code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels: { app: api }
  template:
    metadata:
      labels: { app: api }
    spec:
      containers:
        - name: api
          image: 123456789012.dkr.ecr.ca-central-1.amazonaws.com/api:1.4.2
          ports: [{ containerPort: 8000 }]
          resources:
            requests: { cpu: 250m, memory: 256Mi }
            limits: { cpu: 500m, memory: 512Mi }
          readinessProbe:
            httpGet: { path: /health, port: 8000 }
---
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector: { app: api }
  ports: [{ port: 80, targetPort: 8000 }]` }, { label: "Everyday kubectl", note: "The commands you'll type most. Each line is one command; the text after # explains it.", code: `kubectl apply -f api.yaml                 # create or update from the manifest
kubectl get pods -l app=api               # list pods with a label
kubectl describe pod <pod-name>           # events: why is it Pending / CrashLoopBackOff?
kubectl logs deploy/api --tail=50         # recent logs
kubectl rollout status deploy/api         # watch a rolling update
kubectl rollout undo deploy/api           # roll back to the previous version
kubectl scale deploy/api --replicas=5` }],
      exercises: [{
        prompt: "Write parse_cpu(q) and parse_memory(q) for Kubernetes quantities. CPU: '250m' (millicores) = 0.25, '2' = 2.0. Memory returns bytes: binary suffixes Ki, Mi, Gi (powers of 1024), decimal K, M, G (powers of 1000), or a plain number.",
        starter: `def parse_cpu(q):
    pass

def parse_memory(q):
    pass
`,
        tests: `assert parse_cpu("250m") == 0.25 and parse_cpu("2") == 2.0 and parse_cpu("1500m") == 1.5
assert parse_memory("256Mi") == 256 * 1024 ** 2
assert parse_memory("1Gi") == 1024 ** 3
assert parse_memory("500M") == 500_000_000
assert parse_memory("128Ki") == 131072
assert parse_memory("1000") == 1000`,
        hint: "CPU: if the text ends with 'm', drop the m, turn the rest into a number and divide by 1000; otherwise use float(q). Memory: check the two-letter suffixes (Ki, Mi, Gi) before the one-letter ones (K, M, G), then multiply the number by that suffix's size.",
        solution: `def parse_cpu(q):
    if q.endswith("m"):
        return int(q[:-1]) / 1000
    return float(q)

def parse_memory(q):
    sizes = {"Ki": 1024, "Mi": 1024 ** 2, "Gi": 1024 ** 3, "K": 1000, "M": 1000 ** 2, "G": 1000 ** 3}
    for suffix in ["Ki", "Mi", "Gi", "K", "M", "G"]:
        if q.endswith(suffix):
            return int(q[:-len(suffix)]) * sizes[suffix]
    return int(q)`,
      }, {
        prompt: "Write hpa_desired(current, metric, target, min_r, max_r): the Horizontal Pod Autoscaler's rule. desired = ceil(current * metric / target), clamped to [min_r, max_r]. If metric/target is within 10% of 1.0 (the default tolerance), keep current.",
        starter: `import math

def hpa_desired(current, metric, target, min_r, max_r):
    pass
`,
        tests: `assert hpa_desired(3, 90, 60, 1, 10) == 5
assert hpa_desired(4, 62, 60, 1, 10) == 4, "within tolerance: no change"
assert hpa_desired(10, 200, 50, 1, 12) == 12, "clamp to max"
assert hpa_desired(5, 10, 60, 2, 10) == 2, "clamp to min"`,
        hint: "Work out ratio = metric / target first. If abs(ratio - 1) <= 0.1, keep current; otherwise use math.ceil(current * ratio). Clamp last, with max(min_r, min(max_r, desired)).",
        solution: `import math

def hpa_desired(current, metric, target, min_r, max_r):
    ratio = metric / target
    if abs(ratio - 1.0) <= 0.1:
        desired = current
    else:
        desired = math.ceil(current * ratio)
    return max(min_r, min(max_r, desired))`,
      }],
      cards: [
        ["A pod is stuck in CrashLoopBackOff. How do you debug it?", "kubectl describe pod (events, exit codes), kubectl logs --previous (logs of the crashed container), then check config/secrets, probes that kill it too early, and resource limits (OOMKilled)."],
        ["Readiness vs liveness probe?", "Readiness decides whether a pod receives traffic (e.g. still warming up). Liveness decides whether to restart it (e.g. deadlocked). A wrong liveness probe causes restart loops."],
        ["Why set resource requests?", "The scheduler places pods by requests, and autoscaling and fair sharing depend on them. Without them, nodes get overcommitted and noisy neighbours starve each other."],
      ],
    },
    {
      id: "architecture", title: "Architecture patterns & disaster recovery", short: "Arch",
      terms: [["Architecture", "The overall shape of a system: which parts there are and how they connect."],
        ["Monolith / microservices", "One app that does everything / many small apps, each doing one job and talking over the network."],
        ["3-tier app", "The classic layout: a load balancer, app servers, and a database."],
        ["Retry with backoff", "Trying a failed call again, waiting a little longer each time."],
        ["Circuit breaker", "Stopping calls to a failing service for a while, so you fail fast instead of piling up waiting requests."],
        ["Graceful degradation", "Turning off a non-essential feature (like recommendations) rather than failing the whole page."],
        ["Availability", "The share of time a service works, such as 99.9% (about 8.8 hours of downtime a year)."],
        ["SLA", "The availability a provider promises, with credits if it misses.", "fundamentals"],
        ["Disaster recovery / RPO / RTO", "Getting service back after a big failure / how much data you can lose / how long you can be down.", "fundamentals"],
        ["Failover", "Switching to the standby copy, here in another region, when the main one fails."]],
      body: `<p>In plain words: architecture is choosing the shape of a system and planning for things to break. This topic covers the common shapes, the patterns that keep systems up, how to calculate availability, and how to recover when a whole region goes down.</p>
        <ul>
          <li><b>Monolith vs microservices:</b> start with a well-organized single app (a "modular monolith"), and split it into services when separate teams, very different scaling needs or release schedules demand it. Microservices add network calls, data spread across services and more to run.</li>
          <li><b>Common shapes:</b> the 3-tier web app; event-driven (services react to events on a shared bus, see <button class="link-btn inline-link" data-trsel="cloud|messaging">Messaging</button>); serverless (functions plus managed services); and data pipelines.</li>
          <li><b>Reliability patterns:</b> copies in several availability zones, timeouts, retries with backoff, circuit breakers, queues to absorb spikes, graceful degradation, and idempotent operations.</li>
          <li><b>Availability math:</b> when a request needs every component (<i>in series</i>), multiply their availabilities: two 99.9% services give about 99.8%. Redundant copies (<i>in parallel</i>) fail only if all fail: 1 - (1 - a)<sup>n</sup>. Compare the result with the SLA you need to offer.</li>
          <li><b>Disaster recovery strategies</b> (cheapest and slowest first):
            <table><tr><th>Strategy</th><th>What runs in the DR region</th><th>RPO / RTO</th></tr>
            <tr><td>Backup &amp; restore</td><td>Only backups</td><td>Hours</td></tr>
            <tr><td>Pilot light</td><td>Data replicated; core infrastructure off or minimal</td><td>Minutes to hours</td></tr>
            <tr><td>Warm standby</td><td>A scaled-down but working copy</td><td>Minutes</td></tr>
            <tr><td>Multi-site active/active</td><td>Full capacity serving traffic in both</td><td>Near zero</td></tr></table></li>
          <li>Choose by business impact: a bank's payment system justifies warm standby or active/active; an internal reporting tool may be fine with backup &amp; restore. <b>Test failover</b> regularly.</li></ul>
        <p><b>Example:</b> a payments API may lose at most 1 minute of data (RPO) and be down at most 15 minutes (RTO). Backup &amp; restore takes hours, so it's out. A warm standby fits: the database replicates continuously to a second region, a small copy of the app runs there, and DNS health checks switch users over within minutes.</p>`,
      map: [["DNS failover / global routing", "Route 53 health checks", "Traffic Manager / Front Door"], ["Cross-region storage copies", "S3 Cross-Region Replication", "Geo-redundant storage (GRS)"], ["Cross-region database", "Aurora Global Database", "Azure SQL failover groups"], ["Central backups", "AWS Backup", "Azure Backup"], ["DR orchestration for servers", "AWS Elastic Disaster Recovery", "Azure Site Recovery"]],
      exercises: [{
        prompt: "Write serial(avails) and parallel(avails). serial: probability every component is up (product). parallel: probability at least one redundant copy is up: 1 - product of (1 - a).",
        starter: `def serial(avails):
    pass

def parallel(avails):
    pass
`,
        tests: `assert abs(serial([0.99, 0.99]) - 0.9801) < 1e-9
assert abs(parallel([0.99, 0.99]) - 0.9999) < 1e-9
assert abs(serial([0.999, 0.999, 0.999]) - 0.997002999) < 1e-9
assert serial([]) == 1 and parallel([0.5]) == 0.5`,
        hint: "Start a result at 1 and multiply it by each value in a loop. For parallel, multiply together the chances that each copy is DOWN (1 - a), then subtract that from 1.",
        solution: `def serial(avails):
    result = 1
    for a in avails:
        result *= a
    return result

def parallel(avails):
    all_down = 1
    for a in avails:
        all_down *= 1 - a
    return 1 - all_down`,
      }, {
        prompt: "Write downtime_minutes(percent) returning the allowed downtime per year (365 days) for an availability percentage, e.g. 99.9 -> 525.6 minutes.",
        starter: `def downtime_minutes(percent):
    pass
`,
        tests: `assert abs(downtime_minutes(99.9) - 525.6) < 1e-6
assert abs(downtime_minutes(99.99) - 52.56) < 1e-6
assert downtime_minutes(100) == 0`,
        hint: "The fraction of time it's down is (100 - percent) / 100. A year has 365 * 24 * 60 minutes.",
        solution: `def downtime_minutes(percent):
    return (100 - percent) / 100 * 365 * 24 * 60`,
      }],
      cards: [
        ["Pilot light vs warm standby?", "Pilot light keeps data replicated with core infrastructure off or minimal, so you must start/scale it during a disaster. Warm standby runs a small working copy that only needs scaling up, so recovery is faster but costs more."],
        ["Your app calls three services each at 99.9%. What's the best-case availability of the request?", "About 99.7% (0.999 cubed), because they're in series; every dependency lowers availability unless you add redundancy or fallbacks."],
        ["When would you choose microservices?", "When independent teams need to deploy separately, parts have very different scaling needs, or failure isolation matters, and the team can handle the operational overhead."],
      ],
    },
    {
      id: "data", title: "Data & analytics", short: "Data",
      terms: [["Analytics", "Answering business questions from lots of data, like \"revenue by store last month\"."],
        ["Data lake", "A large collection of data files kept in object storage, raw and cleaned.", "storage"],
        ["CSV / JSON / Parquet", "File formats: CSV is a plain table of text, JSON is structured text, Parquet is a compressed format stored column by column."],
        ["Columnar", "Storing each column together, so a query that needs 3 columns out of 50 reads only those 3."],
        ["Partitioning", "Splitting data into folders by a value such as date, so a query can skip the folders it doesn't need."],
        ["ETL / ELT", "Extract, transform, load: copying data from where it's created, cleaning it, and loading it where it's analysed (ELT loads first, then cleans)."],
        ["SQL", "The standard language for asking questions of tables of data.", "databases"],
        ["Data warehouse", "A database built for big reports over lots of history."],
        ["Streaming", "A continuous flow of events processed as they arrive.", "messaging"],
        ["BI", "Business intelligence: dashboards and reports for non-technical people."]],
      body: `<p>In plain words: apps create data all day (sales, clicks, transactions). Analytics copies that data somewhere built for big questions, stores it efficiently, and puts the answers in dashboards. Good file formats and folder layouts make the same question run faster and cost far less.</p>
        <ul>
          <li><b>Data lake:</b> raw and processed files in object storage ([[Amazon S3|Azure Data Lake Storage Gen2]]), organized in zones such as raw, cleaned and curated.</li>
          <li><b>Formats:</b> columnar <b>Parquet</b> reads only the columns a query needs and compresses well; CSV and JSON are easy to make but slow and costly to query at scale.</li>
          <li><b>Partitioning:</b> folders like <code>sales/year=2026/month=10/</code> let query engines skip data they don't need. Pay-per-scan engines charge by the amount of data read, so partitioning and Parquet cut the cost directly.</li>
          <li><b>ETL / ELT:</b> [[AWS Glue|Azure Data Factory]] move and transform data; many teams do the transforming inside the warehouse with SQL, using a tool called dbt.</li>
          <li><b>Query and warehouse:</b> [[Amazon Athena|Synapse serverless SQL or Microsoft Fabric]] runs SQL directly on files in the lake and charges by data scanned; [[Amazon Redshift|Microsoft Fabric or Synapse]] (or Snowflake, on either cloud) serve heavy, repeated analytics.</li>
          <li><b>Streaming:</b> [[Kinesis|Event Hubs]] takes in events as they happen; tools such as Apache Flink or Azure Stream Analytics process them within seconds.</li>
          <li><b>BI and governance:</b> [[Amazon QuickSight|Power BI (very common at Canadian banks)]] for dashboards; a data catalog and permissions with [[Glue Data Catalog and Lake Formation|Microsoft Purview]].</li></ul>
        <p><b>Example:</b> a retailer's tills export a CSV of each day's sales. A nightly job checks and cleans the file and writes it as Parquet into <code>sales/year=2026/month=10/day=05/</code>. An analyst's query for October revenue by store reads only October's folders and only three columns, scanning a few megabytes instead of the whole history, and a Power BI dashboard shows the result every morning.</p>`,
      map: [["Data lake storage", "Amazon S3", "Azure Data Lake Storage Gen2"], ["ETL / pipelines", "AWS Glue", "Azure Data Factory"], ["Query files with SQL", "Amazon Athena", "Synapse serverless SQL / Fabric"], ["Data warehouse", "Amazon Redshift", "Microsoft Fabric / Synapse"], ["Streaming ingestion", "Kinesis Data Streams", "Azure Event Hubs"], ["BI dashboards", "Amazon QuickSight", "Power BI"], ["Data catalog & governance", "Glue Data Catalog / Lake Formation", "Microsoft Purview"]],
      code: [{ label: "Query partitioned Parquet with Athena (SQL)", note: "A SQL query. WHERE year and month match the partition folders, so Athena reads only October 2026; SUM adds up revenue for each store, and the top 10 stores are returned. Lines starting with -- are comments.", code: `-- Only the October 2026 partition and three columns are read,
-- so you pay for a tiny fraction of the table.
SELECT store_id, SUM(amount_cents) / 100.0 AS revenue
FROM sales
WHERE year = '2026' AND month = '10'
GROUP BY store_id
ORDER BY revenue DESC
LIMIT 10;` }],
      exercises: [{
        prompt: "Write partition_path(table, date_str) that turns '2026-10-05' into Hive-style partition folders: 'sales/year=2026/month=10/day=05/'.",
        starter: `def partition_path(table, date_str):
    pass
`,
        tests: `assert partition_path("sales", "2026-10-05") == "sales/year=2026/month=10/day=05/"
assert partition_path("clicks", "2025-01-31") == "clicks/year=2025/month=01/day=31/"`,
        hint: "date_str.split(\"-\") gives the year, month and day as text. Then build the string with an f-string.",
        solution: `def partition_path(table, date_str):
    year, month, day = date_str.split("-")
    return f"{table}/year={year}/month={month}/day={day}/"`,
      }, {
        prompt: "Write columnar_bytes(table_bytes, total_columns, needed_columns) estimating how many bytes a columnar scan reads if columns are equally sized (table_bytes * needed / total). Then compare to a full row-format scan.",
        starter: `def columnar_bytes(table_bytes, total_columns, needed_columns):
    pass
`,
        tests: `assert columnar_bytes(1_000_000_000, 50, 3) == 60_000_000
assert columnar_bytes(500, 10, 10) == 500`,
        hint: "Multiply first, then divide: table_bytes * needed_columns // total_columns keeps the answer a whole number.",
        solution: `def columnar_bytes(table_bytes, total_columns, needed_columns):
    return table_bytes * needed_columns // total_columns`,
      }],
      cards: [
        ["Why store analytics data as Parquet instead of CSV?", "Columnar layout reads only the needed columns, compresses better and keeps types, so queries are faster and cheaper, especially on pay-per-scan engines."],
        ["What does partitioning by date buy you?", "Queries filtered by date skip whole folders (partition pruning), scanning less data for lower cost and latency."],
        ["Why keep analytics off the production database?", "Heavy scans and aggregations compete with customer transactions; copy data to a lake/warehouse built for analytics."],
      ],
    },
    {
      id: "governance", title: "Governance, landing zones & migration", short: "Gov",
      terms: [["Governance", "The rules and controls that keep a company's cloud use safe, legal and affordable."],
        ["Account / subscription", "The container for cloud resources and their bill: AWS calls it an account, Azure a subscription."],
        ["Landing zone", "A ready-made, secure set of accounts or subscriptions that every new project starts in."],
        ["Guardrail", "A rule nobody in the account can break, even an administrator, such as \"no resources outside Canada\".", "iam"],
        ["Policy as code", "Writing those rules as files that are checked and enforced automatically."],
        ["SSO / identity federation", "Single sign-on: one company login that works in every account, because the accounts trust the company's identity system."],
        ["Tag", "A label on a resource, like owner=payments.", "operations"],
        ["Data residency", "Rules that some data must stay in one country.", "fundamentals"],
        ["Migration", "Moving existing applications from a company's own data center into the cloud."],
        ["Cloud-native", "Built to use cloud services (managed databases, serverless, autoscaling) rather than copied from a data center as-is."]],
      body: `<p>In plain words: a big company might have hundreds of teams using the cloud. Governance is how it keeps them all safe and within budget without slowing them down: a standard set of accounts, rules enforced automatically, and one company login. This topic also covers how companies move existing apps into the cloud.</p>
        <ul>
          <li><b>Landing zone:</b> [[AWS Organizations with organizational units (OUs), Control Tower and service control policy (SCP) guardrails|Azure management groups, a subscription per workload and environment, and Azure Policy, following the Cloud Adoption Framework]].</li>
          <li>Separate <b>production from non-production</b>, and keep central <b>logging/audit</b> and <b>security</b> accounts or subscriptions that project teams can't change.</li>
          <li><b>Identity federation:</b> one company identity (often Microsoft Entra ID, even at companies that mostly use AWS) with single sign-on into every account.</li>
          <li><b>Policy as code:</b> deny public storage, require encryption and tags, and restrict regions (for example, Canada only, for data residency).</li>
          <li><b>Tagging strategy:</b> owner, environment, cost-center and data-classification on every resource, enforced automatically.</li>
          <li><b>Migration strategies (the 7 Rs):</b> Retire (switch it off), Retain (leave it where it is), Rehost (move it as-is onto cloud VMs, "lift and shift"), Relocate (move a whole virtualized environment), Repurchase (switch to a SaaS product), Replatform (small changes, such as a managed database), Refactor (rebuild it cloud-native). Tools: [[AWS Application Migration Service|Azure Migrate]].</li></ul>
        <p><b>Example:</b> a bank's landing zone has separate production and development accounts for each team, a log-archive account nobody else can delete from, and a policy that blocks any resource outside the two Canadian regions. A new team gets its accounts in a day, already connected to the company login and already compliant.</p>`,
      map: [["Multi-account structure", "AWS Organizations (OUs)", "Management groups + subscriptions"], ["Landing zone automation", "AWS Control Tower", "Azure landing zone accelerators"], ["Preventive guardrails", "Service control policies", "Azure Policy (deny)"], ["Config compliance", "AWS Config rules", "Azure Policy compliance"], ["Migration tooling", "Application Migration Service", "Azure Migrate"], ["Adoption guidance", "AWS Cloud Adoption Framework", "Microsoft Cloud Adoption Framework"]],
      code: [{ label: "Azure Policy rule: deny resources without a cost-center tag (JSON)", note: "An Azure Policy definition in JSON. If a new resource has no cost-center tag, the effect deny blocks it from being created.", code: `{
  "mode": "Indexed",
  "policyRule": {
    "if": { "field": "tags['cost-center']", "exists": "false" },
    "then": { "effect": "deny" }
  }
}` }],
      exercises: [{
        prompt: "Write missing_tags(tags, required): return the sorted list of required tag keys that are missing or have an empty/whitespace value. Match keys case-insensitively.",
        starter: `def missing_tags(tags, required):
    pass
`,
        tests: `tags = {"Owner": "piper", "env": "prod", "cost-center": " "}
assert missing_tags(tags, ["owner", "env", "cost-center", "data-class"]) == ["cost-center", "data-class"]
assert missing_tags({}, ["a"]) == ["a"]
assert missing_tags({"A": "1"}, ["a"]) == []`,
        hint: "Make a lowercase copy of the tags first: {k.lower(): v for k, v in tags.items()}. A key is missing if it isn't there or its value.strip() is empty. Sort the result.",
        solution: `def missing_tags(tags, required):
    present = {k.lower(): v for k, v in tags.items()}
    missing = []
    for key in required:
        value = present.get(key.lower())
        if value is None or not str(value).strip():
            missing.append(key)
    return sorted(missing)`,
      }],
      cards: [
        ["Why separate production into its own account or subscription?", "It's the strongest isolation boundary: separate permissions, quotas, billing and blast radius, so a mistake or breach in dev can't touch production."],
        ["Rehost vs replatform vs refactor?", "Rehost moves as-is (fast, little benefit). Replatform makes small changes such as a managed database. Refactor re-architects for cloud-native benefits at the highest cost and effort."],
        ["How would you enforce 'data stays in Canada'?", "Policy as code that restricts allowed regions (SCPs / Azure Policy) to Canadian regions, plus monitoring for violations."],
      ],
    },
  ],

  exercises: {
    iam: [{
      prompt: "Write is_allowed(statements, action, resource) mimicking AWS evaluation: each statement is {'effect': 'Allow'|'Deny', 'actions': [...], 'resources': [...]} with * wildcards. An explicit Deny wins; otherwise any matching Allow allows; otherwise denied by default. Hint: fnmatch.fnmatchcase.",
      starter: `from fnmatch import fnmatchcase

def is_allowed(statements, action, resource):
    pass
`,
      tests: `policy = [
    {"effect": "Allow", "actions": ["s3:Get*", "s3:List*"], "resources": ["arn:aws:s3:::reports/*"]},
    {"effect": "Deny", "actions": ["s3:*"], "resources": ["arn:aws:s3:::reports/secret/*"]},
]
assert is_allowed(policy, "s3:GetObject", "arn:aws:s3:::reports/q3.pdf")
assert not is_allowed(policy, "s3:PutObject", "arn:aws:s3:::reports/q3.pdf"), "no allow: default deny"
assert not is_allowed(policy, "s3:GetObject", "arn:aws:s3:::reports/secret/keys.txt"), "explicit deny wins"
assert not is_allowed([], "s3:GetObject", "x")`,
      hint: "A statement matches when one of its action patterns matches the action AND one of its resource patterns matches the resource. Loop over the statements: return False straight away on a matching Deny, remember a matching Allow, and return what you remembered at the end.",
      solution: `from fnmatch import fnmatchcase

def matches(patterns, value):
    return any(fnmatchcase(value, p) for p in patterns)

def is_allowed(statements, action, resource):
    allowed = False
    for s in statements:
        if matches(s["actions"], action) and matches(s["resources"], resource):
            if s["effect"] == "Deny":
                return False
            allowed = True
    return allowed`,
    }],
    security: [{
      prompt: "Write risky_rules(rules): each rule is {'port': int, 'cidr': str}. Return the indexes of rules that open SSH/RDP or a database port (22, 3389, 3306, 5432, 1433, 6379, 27017) to the whole internet (0.0.0.0/0 or ::/0).",
      starter: `def risky_rules(rules):
    pass
`,
      tests: `rules = [{"port": 443, "cidr": "0.0.0.0/0"}, {"port": 22, "cidr": "0.0.0.0/0"},
         {"port": 5432, "cidr": "10.0.0.0/16"}, {"port": 3389, "cidr": "::/0"}]
assert risky_rules(rules) == [1, 3]
assert risky_rules([]) == []`,
      hint: "Put the risky ports in a set. Use enumerate(rules) to get each rule's index, and keep the index when the port is risky and the cidr is '0.0.0.0/0' or '::/0'.",
      solution: `RISKY_PORTS = {22, 3389, 3306, 5432, 1433, 6379, 27017}

def risky_rules(rules):
    return [i for i, r in enumerate(rules)
            if r["port"] in RISKY_PORTS and r["cidr"] in ("0.0.0.0/0", "::/0")]`,
    }],
    compute: [{
      prompt: "Write instances_needed(peak_rps, rps_per_instance, headroom, azs): instances to handle peak traffic plus headroom (e.g. 0.3 = 30%), at least one per AZ, rounded UP to a multiple of azs so each AZ gets the same number.",
      starter: `import math

def instances_needed(peak_rps, rps_per_instance, headroom, azs):
    pass
`,
      tests: `assert instances_needed(1000, 300, 0.3, 2) == 6
assert instances_needed(100, 300, 0.3, 2) == 2
assert instances_needed(900, 300, 0, 3) == 3
assert instances_needed(1000, 100, 0.5, 3) == 15`,
      hint: "Three steps: math.ceil(peak_rps * (1 + headroom) / rps_per_instance) instances for the load; at least azs of them; then round up to a multiple of azs with math.ceil(n / azs) * azs.",
      solution: `import math

def instances_needed(peak_rps, rps_per_instance, headroom, azs):
    needed = math.ceil(peak_rps * (1 + headroom) / rps_per_instance)
    needed = max(needed, azs)
    return math.ceil(needed / azs) * azs`,
    }],
    containers: [{
      prompt: "Write parse_image(ref) returning {'registry', 'repository', 'tag'}. The first path part is a registry if it contains '.' or ':' or is 'localhost'; otherwise the registry is 'docker.io'. The tag follows the last ':' after the last '/', defaulting to 'latest'.",
      starter: `def parse_image(ref):
    pass
`,
      tests: `assert parse_image("nginx") == {"registry": "docker.io", "repository": "nginx", "tag": "latest"}
assert parse_image("123456789012.dkr.ecr.ca-central-1.amazonaws.com/app:1.4.2") == {"registry": "123456789012.dkr.ecr.ca-central-1.amazonaws.com", "repository": "app", "tag": "1.4.2"}
assert parse_image("myacr.azurecr.io/team/api:2026.10") == {"registry": "myacr.azurecr.io", "repository": "team/api", "tag": "2026.10"}
assert parse_image("localhost:5000/tool") == {"registry": "localhost:5000", "repository": "tool", "tag": "latest"}`,
      hint: "Split on '/'. Only treat the first part as a registry when there's more than one part. Then look at the last path part: if it contains ':', split the rest once from the right with rsplit(':', 1).",
      solution: `def parse_image(ref):
    parts = ref.split("/")
    first = parts[0]
    if len(parts) > 1 and ("." in first or ":" in first or first == "localhost"):
        registry, rest = first, "/".join(parts[1:])
    else:
        registry, rest = "docker.io", ref
    if ":" in rest.split("/")[-1]:
        repository, tag = rest.rsplit(":", 1)
    else:
        repository, tag = rest, "latest"
    return {"registry": registry, "repository": repository, "tag": tag}`,
    }],
    storage: [{
      prompt: "Write lifecycle_tier(age_days, rules) where rules is a list of (min_age_days, tier). Return the tier of the rule with the largest min_age that age_days has reached.",
      starter: `def lifecycle_tier(age_days, rules):
    pass
`,
      tests: `rules = [(0, "hot"), (30, "cool"), (90, "cold"), (180, "archive")]
assert lifecycle_tier(5, rules) == "hot"
assert lifecycle_tier(30, rules) == "cool"
assert lifecycle_tier(120, rules) == "cold"
assert lifecycle_tier(999, list(reversed(rules))) == "archive", "rules may be in any order"`,
      hint: "Loop over the rules and keep the one with the biggest min_age that is still <= age_days. Don't assume the rules are sorted.",
      solution: `def lifecycle_tier(age_days, rules):
    best = None
    for min_age, tier in rules:
        if age_days >= min_age and (best is None or min_age > best[0]):
            best = (min_age, tier)
    return best[1]`,
    }],
    networking: [{
      prompt: "Write split_cidr(cidr, new_prefix) returning the subnets (as strings) when a network is divided into /new_prefix blocks, and usable_ips(cidr) for a cloud subnet: AWS and Azure both reserve 5 addresses per subnet. Hint: the ipaddress module.",
      starter: `import ipaddress

def split_cidr(cidr, new_prefix):
    pass

def usable_ips(cidr):
    pass
`,
      tests: `assert split_cidr("10.0.0.0/16", 18) == ["10.0.0.0/18", "10.0.64.0/18", "10.0.128.0/18", "10.0.192.0/18"]
assert usable_ips("10.0.1.0/24") == 251
assert usable_ips("10.0.0.0/28") == 11`,
      hint: "ipaddress.ip_network(cidr) gives a network object. Its .subnets(new_prefix=...) method splits it, and .num_addresses counts every address in it.",
      solution: `import ipaddress

def split_cidr(cidr, new_prefix):
    network = ipaddress.ip_network(cidr)
    return [str(s) for s in network.subnets(new_prefix=new_prefix)]

def usable_ips(cidr):
    return ipaddress.ip_network(cidr).num_addresses - 5`,
    }],
    messaging: [{
      prompt: "Write backoff_delays(base, factor, cap, attempts): the retry delays for exponential backoff, base * factor**i for i = 0..attempts-1, each capped at cap. (In production, add random jitter so clients don't retry in lockstep.)",
      starter: `def backoff_delays(base, factor, cap, attempts):
    pass
`,
      tests: `assert backoff_delays(0.5, 2, 30, 5) == [0.5, 1, 2, 4, 8]
assert backoff_delays(1, 3, 20, 5) == [1, 3, 9, 20, 20]
assert backoff_delays(1, 2, 10, 0) == []`,
      hint: "A list comprehension over range(attempts) does it in one line: min(base * factor ** i, cap) for each i.",
      solution: `def backoff_delays(base, factor, cap, attempts):
    return [min(base * factor ** i, cap) for i in range(attempts)]`,
    }],
    devops: [{
      prompt: "Write bump(version, part) for semantic versions 'MAJOR.MINOR.PATCH': 'major' -> 2.0.0, 'minor' -> 1.5.0, 'patch' -> 1.4.3 (from 1.4.2). Raise ValueError for an unknown part.",
      starter: `def bump(version, part):
    pass
`,
      tests: `assert bump("1.4.2", "patch") == "1.4.3"
assert bump("1.4.2", "minor") == "1.5.0"
assert bump("1.4.2", "major") == "2.0.0"
try:
    bump("1.0.0", "huge"); raise SystemExit("expected ValueError")
except ValueError:
    pass`,
      hint: "Split the version on '.' and turn each part into an int. Return a new string for each part name; for anything else, raise ValueError.",
      solution: `def bump(version, part):
    major, minor, patch = (int(x) for x in version.split("."))
    if part == "major":
        return f"{major + 1}.0.0"
    if part == "minor":
        return f"{major}.{minor + 1}.0"
    if part == "patch":
        return f"{major}.{minor}.{patch + 1}"
    raise ValueError("unknown part: " + part)`,
    }],
    operations: [{
      prompt: "Write crossed_thresholds(spend, budget, thresholds) returning the budget-alert thresholds (percentages) that current spend has reached.",
      starter: `def crossed_thresholds(spend, budget, thresholds):
    pass
`,
      tests: `assert crossed_thresholds(85, 100, [50, 80, 100]) == [50, 80]
assert crossed_thresholds(10, 100, [50, 80, 100]) == []
assert crossed_thresholds(100, 100, [50, 80, 100]) == [50, 80, 100]`,
      hint: "Turn spend into a percentage of the budget (spend / budget * 100), then keep each threshold that percentage has reached (>=).",
      solution: `def crossed_thresholds(spend, budget, thresholds):
    percent = spend / budget * 100
    return [t for t in thresholds if percent >= t]`,
    }],
  },

  groups: [
    ["Foundations", ["fundamentals", "iam", "security", "governance"]],
    ["Compute", ["compute", "containers", "kubernetes", "serverless"]],
    ["Data", ["storage", "databases", "data"]],
    ["Networking & integration", ["networking", "messaging"]],
    ["Operations & architecture", ["devops", "operations", "architecture"]],
  ],
  weeks: [
    { n: 1, title: "Cloud fundamentals, identity & governance", topics: ["fundamentals", "iam", "governance"], labs: [], goal: "Explain the shared responsibility model, set up accounts safely (MFA, budget alert), and describe a landing zone." },
    { n: 2, title: "Security & storage", topics: ["security", "storage"], labs: ["staticsite"], goal: "Host a static site on object storage behind a CDN with HTTPS." },
    { n: 3, title: "Compute & networking", topics: ["compute", "networking"], labs: [], goal: "Size an autoscaling tier and plan a VPC/VNet with public and private subnets." },
    { n: 4, title: "Containers, Kubernetes & serverless", topics: ["containers", "kubernetes", "serverless"], labs: ["serverlessapi"], goal: "Explain pods, deployments and services, and build a serverless REST API." },
    { n: 5, title: "Databases, analytics & messaging", topics: ["databases", "data", "messaging"], labs: [], goal: "Choose the right data store, design a partitioned data lake, and decouple services with queues." },
    { n: 6, title: "DevOps: IaC and CI/CD", topics: ["devops"], labs: ["containercicd", "terraformnet"], goal: "Deploy a container automatically from GitHub, with infrastructure in code." },
    { n: 7, title: "Operations, architecture & DR", topics: ["operations", "architecture"], labs: ["observability"], goal: "Add monitoring and cost guardrails, and pick a disaster-recovery strategy from RPO/RTO." },
    { n: 8, title: "Certification & interview sprint", topics: [], labs: [], goal: "Take full quizzes for your target exam, drill the question bank, and polish lab write-ups for your resume." },
  ],

  questions: [
    { id: "q25", topic: "kubernetes", q: "Explain pods, deployments and services to a teammate new to Kubernetes.", a: "A pod is one or more containers scheduled together with a shared IP. A deployment keeps N identical pods running and rolls out new versions gradually. A service gives those changing pods one stable name/IP and load-balances across them." },
    { id: "q26", topic: "kubernetes", q: "How does a rolling update avoid downtime, and how do you roll back?", a: "The deployment creates new pods and removes old ones gradually (maxSurge/maxUnavailable); readiness probes ensure only healthy pods get traffic. Roll back with kubectl rollout undo or by redeploying the previous image tag." },
    { id: "q27", topic: "kubernetes", q: "How should a pod access cloud resources such as S3 or Key Vault?", a: "With a workload identity (EKS Pod Identity/IRSA or Entra Workload ID) mapped to a least-privilege cloud role, never with keys stored in Kubernetes secrets." },
    { id: "q28", topic: "architecture", q: "Design disaster recovery for a payments API with an RPO of 1 minute and RTO of 15 minutes.", a: "Warm standby in a second region: continuous database replication (Aurora Global / SQL failover groups), infrastructure as code, a scaled-down app tier running, DNS/global load balancer failover with health checks, runbooks, and regular failover tests. Active/active if RTO must be near zero." },
    { id: "q29", topic: "architecture", q: "Monolith or microservices for a new product at a 10-person startup?", a: "Usually a modular monolith: one deployable with clear internal boundaries, simpler operations and faster iteration. Extract services later where scaling or team autonomy clearly justifies the overhead." },
    { id: "q30", topic: "architecture", q: "How do you calculate the availability of a system with dependencies?", a: "Multiply availabilities of components in series; for redundant components use 1 - product of their failure probabilities. Then reduce series dependencies or add redundancy/fallbacks where the number is too low." },
    { id: "q31", topic: "data", q: "Design a pipeline that turns daily transaction exports into dashboards.", a: "Land raw files in object storage, run a scheduled ETL job (Glue/Data Factory) that validates, cleans and writes partitioned Parquet to a curated zone, register tables in a catalog, query with Athena/serverless SQL or load to a warehouse, and build Power BI/QuickSight dashboards. Add data-quality checks and access controls." },
    { id: "q32", topic: "data", q: "Analysts complain Athena queries are slow and expensive. What do you change?", a: "Convert to Parquet, partition by common filters (date), compact small files, select only needed columns, and use the partitions in WHERE clauses; consider a warehouse for heavy repeated workloads." },
    { id: "q33", topic: "governance", q: "What is a landing zone and why do enterprises use one?", a: "A pre-configured multi-account/subscription foundation with identity, networking, logging, security and policy guardrails, so every new workload starts compliant and teams can move fast safely." },
    { id: "q34", topic: "governance", q: "A legacy on-prem app must move to the cloud in 3 months. Which migration strategy?", a: "Probably rehost (lift and shift) or light replatform (e.g. managed database) to meet the deadline, then modernize/refactor iteratively once it's running, rather than a risky big-bang rewrite." },
  ],

  quiz: [
    { id: "x32", tags: ["AZ-104"], topic: "kubernetes", q: "Which Kubernetes object gives a set of pods a stable network name and load-balances across them?", options: ["ConfigMap", "Service", "Namespace", "PersistentVolume"], answer: 1, why: "A Service selects pods by label and exposes them behind one stable virtual IP/DNS name." },
    { id: "x33", tags: [], topic: "kubernetes", q: "Which probe decides whether a pod should receive traffic?", options: ["Liveness", "Readiness", "Startup", "Heartbeat"], answer: 1, why: "Readiness gates traffic; liveness triggers restarts." },
    { id: "x34", tags: ["SAA", "CLF"], topic: "architecture", q: "Which DR strategy keeps a scaled-down but fully working copy running in another region?", options: ["Backup and restore", "Pilot light", "Warm standby", "Cold site"], answer: 2, why: "Warm standby runs a smaller working copy that's scaled up on failover." },
    { id: "x35", tags: ["SAA"], topic: "architecture", q: "Lowest-cost DR strategy, accepting hours of RTO:", options: ["Multi-site active/active", "Warm standby", "Backup and restore", "Pilot light"], answer: 2, why: "Backup and restore is cheapest but slowest to recover." },
    { id: "x36", tags: ["CLF", "AZ-900"], topic: "architecture", q: "Two services each 99% available, both required for a request. Overall availability is about:", options: ["99%", "98%", "99.99%", "100%"], answer: 1, why: "Series availability multiplies: 0.99 x 0.99 = 0.9801." },
    { id: "x37", tags: ["SAA"], topic: "data", q: "Which service runs SQL directly on files in S3 and charges by data scanned?", options: ["Amazon RDS", "Amazon Athena", "Amazon DynamoDB", "Amazon Neptune"], answer: 1, why: "Athena queries data in place and bills per bytes scanned." },
    { id: "x38", tags: ["SAA"], topic: "data", q: "Converting CSV to partitioned Parquet mainly:", options: ["Increases durability", "Reduces data scanned and query cost", "Encrypts the data", "Enables versioning"], answer: 1, why: "Columnar formats and partitions let engines read far less data." },
    { id: "x39", tags: ["AZ-900"], topic: "data", q: "Microsoft's BI and dashboarding tool commonly used at Canadian banks is:", options: ["Power BI", "Azure Monitor", "Azure Advisor", "Microsoft Purview"], answer: 0, why: "Power BI is Microsoft's business intelligence service." },
    { id: "x40", tags: ["AZ-900", "AZ-104"], topic: "governance", q: "In Azure, which feature organizes subscriptions into a hierarchy for policy and access?", options: ["Resource groups", "Management groups", "Availability sets", "Tags"], answer: 1, why: "Management groups sit above subscriptions; policies and RBAC applied there are inherited." },
    { id: "x41", tags: ["CLF", "SAA"], topic: "governance", q: "Which AWS feature sets permission guardrails across all accounts in an organization?", options: ["IAM groups", "Service control policies", "Security groups", "Bucket policies"], answer: 1, why: "SCPs in AWS Organizations limit the maximum permissions in member accounts." },
    { id: "x42", tags: ["CLF"], topic: "governance", q: "Moving an application to the cloud with no code changes is called:", options: ["Refactor", "Rehost (lift and shift)", "Repurchase", "Retire"], answer: 1, why: "Rehosting moves the app as-is, typically onto VMs." },
    { id: "x43", tags: ["SAA"], topic: "networking", q: "How many IP addresses does AWS reserve in every subnet?", options: ["2", "3", "5", "8"], answer: 2, why: "AWS reserves the first four and the last address of each subnet (Azure also reserves 5)." },
  ],

  certTopics: { clf: ["governance", "architecture"], saa: ["architecture", "data", "governance"], az900: ["governance", "data"], az104: ["kubernetes", "governance"] },

  videos: {
    kubernetes: [V("PziYflu8cB8", "Kubernetes Explained in 100 Seconds", "Fireship"), V("X48VuDVv0do", "Kubernetes Tutorial for Beginners (Full Course)", "TechWorld with Nana")],
    architecture: [V("B7IL7AuOxFQ", "Disaster Recovery on AWS: RPO, RTO & DR Strategies", "Peace Of Code")],
  },

  glossary: [
    ["Availability zone (AZ)", "One or more isolated data centers within a region, with independent power and networking."],
    ["Autoscaling", "Automatically adding or removing capacity based on metrics or schedules."],
    ["Blue/green deployment", "Running two production environments and switching traffic from old (blue) to new (green) all at once, with instant rollback."],
    ["Canary release", "Sending a small share of traffic to a new version first and increasing it while monitoring."],
    ["CDN", "Content delivery network: edge locations that cache content close to users (CloudFront, Front Door)."],
    ["CIDR", "Notation for IP ranges, e.g. 10.0.0.0/16 = 65,536 addresses."],
    ["Cold start", "Extra latency when a serverless platform starts a new instance of a function."],
    ["Container", "A packaged app with its dependencies that shares the host OS kernel."],
    ["Dead-letter queue", "Where messages go after repeatedly failing processing, for inspection and replay."],
    ["Egress", "Data transferred out of a cloud region or to the internet; usually billed."],
    ["IaaS / PaaS / SaaS", "Infrastructure, platform and software as a service: increasing levels of provider management."],
    ["IAM role / managed identity", "An identity that workloads assume to get temporary credentials, avoiding stored keys."],
    ["Idempotent", "Safe to run more than once with the same result; essential with retries and at-least-once delivery."],
    ["Infrastructure as code", "Defining cloud resources in version-controlled files (Terraform, CloudFormation, Bicep)."],
    ["Landing zone", "A pre-configured, governed multi-account/subscription foundation."],
    ["Least privilege", "Granting only the permissions required for a task."],
    ["Load balancer", "Distributes traffic across healthy targets; Layer 7 understands HTTP, Layer 4 handles TCP/UDP."],
    ["Multi-AZ", "Deploying redundant copies across availability zones to survive a data-center failure."],
    ["NAT gateway", "Lets resources in private subnets make outbound internet connections without being reachable from the internet."],
    ["OIDC federation", "Trusting an external identity provider (e.g. GitHub) to issue short-lived cloud credentials."],
    ["Pod", "The smallest deployable unit in Kubernetes: one or more containers sharing a network namespace."],
    ["Pre-signed URL / SAS", "A time-limited link granting access to a private object."],
    ["Private endpoint / PrivateLink", "Private network access to a managed service without traversing the internet."],
    ["Region", "A geographic area containing multiple availability zones."],
    ["RPO / RTO", "Recovery point objective (max data loss) and recovery time objective (max downtime)."],
    ["Security group / NSG", "Stateful firewall rules attached to resources (AWS) or subnets/NICs (Azure)."],
    ["Serverless", "Running code or services without managing servers, billed per use and scaling to zero."],
    ["Shared responsibility model", "The provider secures the cloud's infrastructure; the customer secures what they put in it."],
    ["Spot instance", "Spare capacity at a large discount that can be reclaimed with short notice."],
    ["Subnet", "A range of IP addresses within a VPC/VNet, public or private."],
    ["Terraform state", "Terraform's record of what it manages; keep it remote, locked and out of Git."],
    ["VPC / VNet", "Your logically isolated private network in AWS / Azure."],
    ["Well-Architected Framework", "Provider guidance for reviewing workloads by pillars like security, reliability and cost."],
  ],
});
