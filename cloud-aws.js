// AWS exam-depth lessons: billing, pricing and support (Cloud Practitioner domain 4) and three
// Solutions Architect – Associate deep dives. Same shape as the other Cloud topics; their checks are
// quiz questions tagged CLF / SAA, so they also count towards those practice exams (awscerts.js maps
// these topics to exam domains). Facts checked on aws.amazon.com on 2026-10-12.
// Merged into CLOUD by extendTrack; where they sit in each path is set in cloud-zero.js / cloud-plan.js.

extendTrack(CLOUD, {
  topics: [
    {
      id: "billing", title: "Billing, pricing & support", short: "Bill", yt: "AWS pricing models billing support plans cloud practitioner",
      terms: [["On-Demand", "Paying the full hourly or per-second price with no commitment.", "fundamentals"],
        ["Savings Plans / Reserved Instances", "Discounts for committing to steady usage for 1 or 3 years."],
        ["Spot Instances", "Spare EC2 capacity at up to 90% off that AWS can take back with two minutes' warning."],
        ["Data transfer", "Moving data in or out of AWS; data coming in is generally free, data going out to the internet is charged."],
        ["Free Tier", "Free usage for new and existing accounts: sign-up credits, plus services with monthly free amounts.", "zero-cloud"],
        ["Consolidated billing", "One bill for every account in an AWS Organization, with usage added together for volume discounts."],
        ["Cost allocation tag", "A tag you switch on in Billing so costs can be grouped by it, such as project or team.", "operations"],
        ["Support plan", "What level of help you buy from AWS: how fast they respond and what extra guidance you get."],
        ["TAM", "Technical Account Manager: a named AWS expert who works with your company (Enterprise Support)."],
        ["Cloud Adoption Framework (CAF)", "AWS's guide to moving an organisation to the cloud, organised into six perspectives."]],
      body: `<p>In plain words: AWS charges for three main things: <b>compute</b> (servers and functions running), <b>storage</b> (data kept), and <b>data transfer out</b> (data leaving AWS). You choose how to pay for compute, you have tools to estimate, watch and analyse the bill, and you choose how much help you buy. The Cloud Practitioner exam gives this 12% of its questions, and every cloud job expects you to keep costs under control. The basics are in <button class="link-btn inline-link" data-trsel="cloud|operations">Observability, cost &amp; Well-Architected</button>.</p>
        <h3>Ways to pay for compute</h3>
        <ul><li><b>On-Demand:</b> full price, no commitment, start and stop any time. Good for short, unpredictable or new workloads.</li>
        <li><b>Savings Plans:</b> commit to spending a fixed amount per hour for 1 or 3 years, for up to 72% off. <i>Compute Savings Plans</i> apply across EC2, Fargate and Lambda, any region or instance family; <i>EC2 Instance Savings Plans</i> are cheaper but tied to one instance family in one region.</li>
        <li><b>Reserved Instances (RIs):</b> the older commitment model for one instance type, 1 or 3 years, also up to 72% off; you can pay all, part or nothing up front (more up front means a bigger discount). Reserved capacity also exists for RDS, ElastiCache, Redshift and others.</li>
        <li><b>Spot Instances:</b> up to 90% off, but AWS can reclaim them with two minutes' notice. Only for work that can be interrupted: batch jobs, testing, stateless workers.</li>
        <li><b>Dedicated Hosts</b> (a whole physical server for you, so you can use software licences tied to physical cores) and <b>Dedicated Instances</b> (your instances on hardware not shared with other customers) cost more and exist for licensing and compliance.</li></ul>
        <h3>Data transfer</h3>
        <p>Data coming <b>in</b> to AWS from the internet is generally free. Data going <b>out</b> to the internet is charged per gigabyte. Traffic between availability zones or regions is also charged; traffic inside one AZ over private IP addresses is generally free. A CDN like CloudFront often lowers the cost of serving data to users.</p>
        <h3>Tools for the bill</h3>
        <ul><li><b>AWS Pricing Calculator:</b> estimate the cost of something <i>before</i> you build it.</li>
        <li><b>Billing and Cost Management console:</b> your bills, payment and Free Tier usage.</li>
        <li><b>Cost Explorer:</b> graphs of past spending by service, account or tag, a forecast, and Savings Plans recommendations.</li>
        <li><b>AWS Budgets:</b> alerts (and optional actions) when actual or forecast spend crosses a threshold.</li>
        <li><b>Cost Anomaly Detection:</b> machine learning that flags unusual spending, such as a forgotten test cluster.</li>
        <li><b>Cost and Usage Report / Data Exports:</b> the most detailed line-by-line billing data, delivered to S3 for analysis.</li>
        <li><b>Cost allocation tags:</b> switch tags on in Billing so reports can group costs by team or project.</li>
        <li><b>Consolidated billing</b> with <b>AWS Organizations</b>: one bill for many accounts; usage is combined for volume discounts, and Savings Plans and RIs can be shared across accounts.</li></ul>
        <h3>Support plans</h3>
        <p>Every account has <b>Basic Support</b> for free: documentation, the re:Post community forum, the AWS Health Dashboard, and the core Trusted Advisor checks. The paid plans are changing: AWS is discontinuing Developer, Business and Enterprise On-Ramp on <b>January 1, 2027</b>. The plans after that:</p>
        <ul><li><b>Business Support+</b>, from $29 a month: 24/7 access to AWS experts and AI-assisted help, the full set of Trusted Advisor checks, and a response within 30 minutes for business-critical issues.</li>
        <li><b>Enterprise Support</b>: a <b>designated Technical Account Manager (TAM)</b>, a response within 15 minutes for business-critical issues, and Trusted Advisor Priority.</li>
        <li><b>Unified Operations</b>: for the largest customers, with a response within 5 minutes.</li></ul>
        <p>Exam questions written before 2027 may still name the older plans, so know the pattern: Developer (business-hours email), Business (24/7 phone and chat, full Trusted Advisor), Enterprise On-Ramp (a pool of TAMs) and Enterprise (a designated TAM).</p>
        <p><b>Trusted Advisor</b> checks your account against best practices in six categories: cost optimization, performance, security, fault tolerance, service limits and operational excellence. Basic Support gets the service-limit checks and a few key security checks, such as MFA on the root user and open security groups.</p>
        <h3>Other help</h3>
        <p><b>AWS Marketplace</b> sells third-party software that runs on AWS, billed on your AWS bill. The <b>AWS Partner Network</b> lists consulting and technology companies certified to help. <b>AWS Professional Services</b> is AWS's own consulting team. <b>re:Post</b> is the community Q&amp;A site.</p>
        <h3>The Cloud Adoption Framework</h3>
        <p>The AWS CAF groups what an organisation must get right to move to the cloud into six <b>perspectives</b>: <b>Business</b> (strategy and value), <b>People</b> (skills, culture and organisational change), <b>Governance</b> (risk, cost and programme management), <b>Platform</b> (architecture and infrastructure), <b>Security</b> and <b>Operations</b>. The first three are about the business; the last three are technical. Its journey has four phases: envision, align, launch and scale.</p>
        <h3>Worked example, step by step</h3>
        <p>A small company runs a website on 4 EC2 instances all year, a nightly batch job of about 2 hours, and a test environment used during office hours.</p>
        <ol><li>The 4 always-on web servers are steady: a <b>Compute Savings Plan</b> for 1 year cuts their cost a lot and still applies if they move to Fargate later.</li>
        <li>The nightly batch job can be restarted if interrupted: run it on <b>Spot</b>.</li>
        <li>The test environment is used about 50 hours a week: <b>On-Demand</b>, switched off at night by a schedule.</li>
        <li>Before buying anything, they model it in the <b>Pricing Calculator</b>, then set a <b>budget</b> with alerts at 80% and 100%, tag every resource with <code>project</code>, and switch that tag on as a cost allocation tag so <b>Cost Explorer</b> can show spending per project.</li></ol>`,
      map: [["Estimate before building", "AWS Pricing Calculator", "Azure pricing calculator"], ["Analyse past spend", "Cost Explorer", "Cost analysis (Cost Management)"], ["Alerts on spending", "AWS Budgets", "Cost Management budgets"], ["Discount for commitment", "Savings Plans / Reserved Instances", "Savings plans / Reservations"], ["Best-practice checks", "Trusted Advisor", "Azure Advisor"], ["Many accounts, one bill", "AWS Organizations (consolidated billing)", "Billing accounts / management groups"]],
      cards: [
        ["A job runs for 3 hours every night and can safely restart. Cheapest option?", "Spot Instances: up to 90% off, and an interruption only means the job reruns."],
        ["Which tool estimates cost before you build, and which analyses past spend?", "Pricing Calculator estimates; Cost Explorer analyses (and forecasts) what you've spent."],
        ["Which support plan includes a designated TAM?", "Enterprise Support."],
        ["Name the six CAF perspectives.", "Business, People, Governance, Platform, Security, Operations."],
      ],
    },
    {
      id: "netdeep", title: "AWS networking deep dive", short: "Net+", yt: "AWS VPC endpoints transit gateway direct connect route 53 routing policies",
      terms: [["VPC / subnet / route table", "Your private network / a slice of it in one AZ / the rules that say where traffic for each address range goes.", "networking"],
        ["NAT gateway", "Lets private subnets reach the internet outbound only; it lives in one AZ.", "networking"],
        ["VPC endpoint", "A private connection from your VPC to an AWS service, so traffic doesn't go over the internet."],
        ["PrivateLink", "The technology behind interface endpoints; it can also share your own service privately with other VPCs."],
        ["Peering / transitive", "A direct link between two VPCs / whether traffic can pass through one network to reach a third (peering can't)."],
        ["Transit Gateway", "A hub that connects many VPCs and on-premises networks, so each connects once instead of to every other."],
        ["Site-to-Site VPN / Direct Connect", "An encrypted tunnel to your data center over the internet / a dedicated private line to AWS."],
        ["Hosted zone / record", "Route 53's container for a domain's DNS settings / one entry in it, such as www pointing to a load balancer."],
        ["Health check", "Route 53 regularly testing an endpoint, so DNS can stop sending users to one that's down."],
        ["Anycast", "One IP address announced from many locations, so users reach the nearest one (used by Global Accelerator)."]],
      body: `<p>In plain words: the networking topic covered a single VPC. Real systems connect VPCs to each other, to AWS services and to company data centers, and send users to the nearest or healthiest copy of an app. Networking questions run through the whole Solutions Architect exam, mostly under secure and high-performing architectures. Revise <button class="link-btn inline-link" data-trsel="cloud|networking">Networking: VPC / VNet, DNS &amp; CDN</button> first.</p>
        <h3>Inside a VPC</h3>
        <ul><li>Each subnet has a <b>route table</b>. A public subnet's table sends <code>0.0.0.0/0</code> (all internet traffic) to an <b>internet gateway</b>; a private subnet's sends it to a <b>NAT gateway</b>. A NAT gateway lives in one AZ, so for high availability run <b>one per AZ</b>. For IPv6, an <b>egress-only internet gateway</b> does the same job as NAT.</li>
        <li><b>Security groups</b> are stateful and only <i>allow</i>; <b>network ACLs</b> are stateless, can also <i>deny</i> (useful to block one bad IP range), and need rules for return traffic on ephemeral ports (1024-65535).</li>
        <li><b>VPC Flow Logs</b> record which connections were accepted or rejected, which helps when something "can't connect".</li></ul>
        <h3>Reaching AWS services privately: VPC endpoints</h3>
        <ul><li><b>Gateway endpoints</b>: only for <b>S3 and DynamoDB</b>; free; work by adding a route to the route table. A favourite exam answer for "private instances must reach S3 without the internet or NAT costs".</li>
        <li><b>Interface endpoints</b> (PrivateLink): for most other services (SQS, Secrets Manager, ECR...); a network interface with a private IP in your subnet; billed per hour and per gigabyte.</li>
        <li>You can also offer <i>your own</i> service to other VPCs or accounts through PrivateLink, behind a Network Load Balancer, without peering the networks.</li></ul>
        <h3>Connecting VPCs</h3>
        <ul><li><b>VPC peering</b>: a private link between two VPCs (even across accounts and regions). Their address ranges must not overlap, and peering is <b>not transitive</b>: if A peers with B and B with C, A still can't reach C.</li>
        <li><b>Transit Gateway</b>: a regional hub. Every VPC and VPN attaches once, routing is transitive, and route tables on the hub control who can reach whom. Transit gateways in different regions can peer. The usual answer once you have more than a handful of VPCs.</li></ul>
        <h3>Connecting your data center</h3>
        <ul><li><b>Site-to-Site VPN</b>: an IPsec-encrypted tunnel over the internet to a virtual private gateway or Transit Gateway. Quick to set up (hours), cheap, but internet performance varies.</li>
        <li><b>Direct Connect</b>: a dedicated private connection from your data center (via a partner location) to AWS, with consistent bandwidth and latency. It takes weeks to set up and is <b>not encrypted by default</b>: add MACsec or run a VPN over it if you need encryption. A <b>Direct Connect gateway</b> lets one connection reach VPCs in many regions.</li>
        <li>For resilience, banks often use two Direct Connect links, or Direct Connect with a VPN as backup.</li></ul>
        <h3>Route 53 routing policies</h3>
        <p>Records include A (IPv4), AAAA (IPv6), CNAME (another name) and the AWS-specific <b>alias</b> record, which points to AWS resources like a load balancer or CloudFront, works at the top of a domain (example.com, not just www), and costs nothing for queries. <b>Private hosted zones</b> answer only inside your VPCs. How Route 53 chooses an answer:</p>
        <ul><li><b>Simple</b>: one answer. <b>Weighted</b>: split traffic by percentage (send 10% to a new version). <b>Latency-based</b>: the region with the lowest latency for that user. <b>Failover</b>: a primary, and a secondary used when the primary's <b>health check</b> fails. <b>Geolocation</b>: by the user's country or continent (for example, to keep EU users in the EU). <b>Geoproximity</b>: by distance, with a bias you can adjust. <b>Multivalue answer</b>: up to 8 healthy records at random. <b>IP-based</b>: by the user's IP range.</li></ul>
        <h3>Getting users there fast</h3>
        <ul><li><b>CloudFront</b> caches content at edge locations; origins can be S3 (kept private with origin access control), a load balancer, or any web server. Signed URLs or signed cookies restrict paid or private content.</li>
        <li><b>Global Accelerator</b> gives you two fixed <b>anycast</b> IP addresses that route users over the AWS network to the nearest healthy region. It doesn't cache; it suits non-HTTP traffic (games, VoIP), fixed IPs for allow-lists, and fast regional failover.</li>
        <li><b>Load balancers</b>: Application (layer 7, HTTP routing), Network (layer 4, millions of requests, static IPs) and <b>Gateway Load Balancer</b> (sends traffic through third-party firewall appliances).</li></ul>
        <h3>Worked example, step by step</h3>
        <p>A company runs an app in two AZs, keeps files in S3, has five VPCs (one per team) and a data center in Toronto.</p>
        <ol><li>Private app servers reach S3 through a <b>gateway endpoint</b>, so S3 traffic stays private and skips the NAT gateway's data charges.</li>
        <li>Each AZ gets its own <b>NAT gateway</b>, so losing one AZ doesn't cut the other's outbound access.</li>
        <li>The five VPCs and the data center all attach to one <b>Transit Gateway</b> instead of ten peering links.</li>
        <li>The data center connects with <b>Direct Connect</b> for steady performance, with a <b>Site-to-Site VPN</b> as backup.</li>
        <li><b>Route 53</b> uses a <b>failover</b> policy with health checks: if the main region's load balancer fails, users go to a standby region.</li></ol>`,
      map: [["Private access to storage", "S3 gateway endpoint", "Service endpoint / Private Endpoint"], ["Hub for many networks", "Transit Gateway", "Virtual WAN / hub VNet"], ["Dedicated private line", "Direct Connect", "ExpressRoute"], ["DNS routing by health or latency", "Route 53 routing policies", "Traffic Manager"], ["Fixed global IPs and fast failover", "Global Accelerator", "Front Door / cross-region Load Balancer"]],
      cards: [
        ["Private EC2 instances must reach S3 without the internet or NAT charges. What do you add?", "An S3 gateway endpoint (a route in the route table; free)."],
        ["A peers with B, B peers with C. Can A reach C?", "No: peering isn't transitive. Use a Transit Gateway or peer A and C directly."],
        ["Is Direct Connect encrypted?", "Not by default. Use MACsec or run a Site-to-Site VPN over it."],
        ["Which Route 53 policy sends 10% of users to a new version?", "Weighted routing."],
      ],
    },
    {
      id: "datadeep", title: "AWS storage, databases & caching deep dive", short: "Data+", yt: "S3 storage classes EBS volume types Aurora DynamoDB ElastiCache explained",
      terms: [["Object / block / file storage", "Files fetched by name (S3) / a disk for one server (EBS) / a shared network drive (EFS, FSx).", "storage"],
        ["Storage class", "An S3 price tier: cheaper to store, but with retrieval fees, minimum storage periods or slower access."],
        ["IOPS / throughput", "How many reads and writes a disk does per second / how many megabytes per second it moves."],
        ["Snapshot", "A point-in-time backup of a disk or database, stored in S3 behind the scenes.", "operations"],
        ["Replication (sync / async)", "Copying data to another place: synchronous waits until the copy is written (no data loss); asynchronous copies shortly after (can lag)."],
        ["Read replica / standby", "A copy that serves reads / a copy that only takes over on failure.", "databases"],
        ["Partition key / sort key / index", "DynamoDB's main lookup field / the field items are sorted by within a key / an extra way to query by other fields."],
        ["Cache hit / miss / TTL", "The answer was in the cache / it wasn't, so the database was asked / how long a cached answer is kept."]],
      body: `<p>In plain words: the exam gives you a workload ("millions of small reads", "archive for 7 years", "shared files for Windows servers") and asks for the cheapest or fastest storage or database that fits. This lesson lists the options it expects you to know and the clue words that point to each. Revise <button class="link-btn inline-link" data-trsel="cloud|storage">Storage</button> and <button class="link-btn inline-link" data-trsel="cloud|databases">Managed databases</button> first.</p>
        <h3>S3 storage classes</h3>
        <ul><li><b>S3 Standard</b>: frequently accessed data, at least three AZs. <b>S3 Intelligent-Tiering</b>: moves objects between tiers automatically when access patterns are unknown (a small monitoring fee per object, no retrieval fees).</li>
        <li><b>Standard-IA</b> (infrequent access) and <b>One Zone-IA</b> (one AZ only, cheaper, for data you could recreate): cheaper storage, a per-GB retrieval fee, 30-day minimum.</li>
        <li><b>Glacier Instant Retrieval</b> (milliseconds, accessed about once a quarter, 90-day minimum), <b>Glacier Flexible Retrieval</b> (minutes to hours, 90 days) and <b>Glacier Deep Archive</b> (the cheapest; up to 12 hours, or 48 for bulk; 180 days) are for archives.</li>
        <li><b>S3 Express One Zone</b>: single-digit-millisecond access in one AZ, for very high request rates.</li>
        <li>Also know: <b>lifecycle rules</b> (move or delete by age), <b>versioning</b>, <b>replication</b> (Cross-Region or Same-Region), <b>Object Lock</b> (write once, read many, for compliance), encryption (SSE-S3 is on by default; SSE-KMS when you need key control and audit), <b>multipart upload</b> for large files, and <b>Transfer Acceleration</b> for faster uploads from far away.</li></ul>
        <h3>Disks and file systems</h3>
        <ul><li><b>EBS</b> volumes live in one AZ. <b>gp3</b> is the general-purpose SSD (3,000 IOPS baseline; you can buy more IOPS and throughput separately); <b>io2 Block Express</b> is for the highest-IOPS databases and supports Multi-Attach; <b>st1</b> (throughput-optimized HDD) suits big sequential jobs like logs; <b>sc1</b> (cold HDD) is the cheapest. Snapshots are incremental and can be copied to other regions.</li>
        <li><b>Instance store</b>: very fast disks physically attached to the host, but the data is lost when the instance stops. Only for caches and scratch data.</li>
        <li><b>EFS</b>: a shared NFS file system for Linux, across AZs, that grows automatically. <b>FSx for Windows File Server</b>: SMB shares with Active Directory, for Windows. <b>FSx for Lustre</b>: high-performance computing and machine learning, often linked to S3. <b>FSx for NetApp ONTAP</b> and <b>FSx for OpenZFS</b>: familiar enterprise file systems for migrations.</li></ul>
        <h3>Relational databases</h3>
        <ul><li><b>RDS Multi-AZ</b>: a synchronous standby in another AZ with automatic failover (about a minute or two). A standard Multi-AZ standby can't serve reads; a <b>Multi-AZ DB cluster</b> has two standbys that can.</li>
        <li><b>Read replicas</b>: asynchronous copies (up to 15, in the same or another region) that scale reads and can be promoted. <b>RDS Proxy</b> pools connections, which helps Lambda functions that open many connections.</li>
        <li><b>Aurora</b>: AWS's MySQL- and PostgreSQL-compatible database. Its storage keeps six copies across three AZs and grows automatically; up to 15 low-lag replicas; <b>Aurora Serverless v2</b> scales capacity up and down automatically; <b>Aurora Global Database</b> replicates to other regions, typically in under a second, for disaster recovery.</li></ul>
        <h3>DynamoDB</h3>
        <ul><li>A serverless key-value and document database with single-digit-millisecond reads at any scale. Every item needs a <b>partition key</b>, optionally with a <b>sort key</b>. Choose a partition key with many distinct values so load spreads evenly.</li>
        <li><b>On-demand</b> capacity bills per request (unpredictable traffic); <b>provisioned</b> capacity with autoscaling is cheaper for steady traffic.</li>
        <li><b>Global secondary indexes</b> let you query by other fields. <b>DAX</b> is an in-memory cache in front of DynamoDB for microsecond reads. <b>Streams</b> send every change to Lambda; <b>global tables</b> replicate across regions with writes in each; <b>TTL</b> deletes expired items for free; <b>point-in-time recovery</b> restores to any second in the last 35 days.</li></ul>
        <h3>Caching</h3>
        <ul><li><b>ElastiCache</b> for Redis OSS or Valkey (rich data types, replication, persistence, often the answer for sessions and leaderboards) or Memcached (a simple, multi-threaded cache). <b>Lazy loading</b> fills the cache on a miss (data can be stale until the TTL ends); <b>write-through</b> updates the cache on every write (always fresh, but more writes).</li>
        <li><b>CloudFront</b> caches at the edge; <b>DAX</b> caches DynamoDB; <b>API Gateway caching</b> caches API responses.</li></ul>
        <h3>Clue words</h3>
        <table><tr><th>The question says</th><th>Think</th></tr>
        <tr><td>Unknown or changing access patterns</td><td>S3 Intelligent-Tiering</td></tr>
        <tr><td>Archive, rarely read, cheapest, hours are fine</td><td>Glacier Deep Archive</td></tr>
        <tr><td>Can't be deleted for N years, even by admins</td><td>S3 Object Lock (compliance mode)</td></tr>
        <tr><td>Shared file system for Linux across AZs</td><td>EFS</td></tr>
        <tr><td>Windows file shares with Active Directory</td><td>FSx for Windows File Server</td></tr>
        <tr><td>Survive an AZ failure, automatic failover</td><td>RDS Multi-AZ / Aurora</td></tr>
        <tr><td>Too many reads on the database</td><td>Read replicas or ElastiCache</td></tr>
        <tr><td>Microsecond reads from DynamoDB</td><td>DAX</td></tr>
        <tr><td>Disaster recovery for a relational DB in another region, RPO about a second</td><td>Aurora Global Database</td></tr></table>
        <h3>Worked example, step by step</h3>
        <p>A photo-sharing app stores uploads, user profiles and a "popular today" list.</p>
        <ol><li>Photos go to <b>S3 Standard</b>, served through <b>CloudFront</b>. A lifecycle rule moves photos older than 90 days to <b>Standard-IA</b>, and after two years to <b>Glacier Instant Retrieval</b>, because old photos are rarely viewed but must still load instantly.</li>
        <li>User profiles are looked up by user ID at huge scale: <b>DynamoDB</b> with <code>user_id</code> as the partition key, in on-demand mode.</li>
        <li>The "popular today" list is read millions of times: a sorted set in <b>ElastiCache for Redis</b>, refreshed every minute.</li>
        <li>Payments need transactions and joins: <b>Aurora PostgreSQL</b> with a replica in a second AZ.</li></ol>`,
      cards: [
        ["Data with unknown access patterns, no retrieval fees wanted. Which S3 class?", "S3 Intelligent-Tiering."],
        ["Which EBS volume type is the general-purpose default?", "gp3 (SSD, 3,000 IOPS baseline, with IOPS and throughput configurable separately)."],
        ["Windows servers need a shared drive with Active Directory. Which service?", "FSx for Windows File Server."],
        ["Multi-AZ vs read replica in one line?", "Multi-AZ is for failover (synchronous standby); read replicas scale reads (asynchronous)."],
      ],
    },
    {
      id: "secdeep", title: "AWS security services deep dive", short: "Sec+", yt: "AWS KMS Secrets Manager WAF Shield Cognito GuardDuty explained",
      terms: [["Encryption key / KMS", "The secret used to encrypt data / AWS's service that creates and guards keys.", "security"],
        ["Customer managed key", "A KMS key you create and control (who can use it, rotation, deletion), as opposed to one AWS manages for a service."],
        ["Envelope encryption", "Encrypting data with a data key, then encrypting that data key with a KMS key, so large data never has to go to KMS."],
        ["HSM", "Hardware security module: a tamper-resistant device that stores keys."],
        ["Certificate (TLS)", "The file that proves a website's identity and enables HTTPS.", "zero-internet"],
        ["Web ACL", "A set of WAF rules attached to a load balancer, CloudFront distribution or API."],
        ["User pool / identity pool", "Cognito's sign-up and sign-in directory for your app's users / the part that swaps a sign-in for temporary AWS credentials."],
        ["Trust policy / AssumeRole", "The part of a role saying who may use it / the call that gets temporary credentials for a role.", "iam"],
        ["Resource-based policy", "A policy attached to a resource (like an S3 bucket policy) saying who may use it, including other accounts."]],
      body: `<p>In plain words: AWS has a security service for almost every job: guarding keys, storing secrets, issuing certificates, filtering attacks, signing in your app's users, and detecting threats. Design Secure Architectures is the biggest Solutions Architect domain (30%), and most of its questions are "which service does this?". Revise <button class="link-btn inline-link" data-trsel="cloud|iam">Identity &amp; access</button> and <button class="link-btn inline-link" data-trsel="cloud|security">Security, keys &amp; secrets</button> first.</p>
        <h3>Keys: KMS and CloudHSM</h3>
        <ul><li><b>AWS KMS</b> creates and protects encryption keys; services like S3, EBS and RDS use it with one setting. <b>AWS managed keys</b> are created for a service and rotate yearly. <b>Customer managed keys</b> give you control: a <b>key policy</b> says who can use or manage the key, every use is logged in CloudTrail, and automatic rotation can be switched on (yearly by default, configurable).</li>
        <li>KMS uses <b>envelope encryption</b>: it encrypts a small data key, and the data key encrypts your data. <b>Multi-Region keys</b> let the same key decrypt in another region, which is useful for disaster recovery.</li>
        <li><b>CloudHSM</b>: dedicated, single-tenant hardware security modules you control. Choose it when rules require keys in your own FIPS 140 Level 3 hardware that even AWS can't access.</li></ul>
        <h3>Secrets and certificates</h3>
        <ul><li><b>Secrets Manager</b>: stores database passwords and API keys, with <b>automatic rotation</b> (built in for RDS, Redshift and DocumentDB; a Lambda function for anything else). <b>Systems Manager Parameter Store</b>: cheaper (standard parameters are free) and good for configuration and SecureString values, but has no built-in rotation.</li>
        <li><b>AWS Certificate Manager (ACM)</b>: free public TLS certificates that renew automatically, for load balancers, CloudFront and API Gateway. Certificates for CloudFront must be requested in <b>us-east-1</b>.</li></ul>
        <h3>Protecting the edge</h3>
        <ul><li><b>AWS WAF</b> filters web requests with rules in a <b>web ACL</b>: block SQL injection and cross-site scripting, block countries or IP ranges, and <b>rate-based rules</b> to limit how often one IP can call. Attach it to CloudFront, an Application Load Balancer, API Gateway, AppSync or Cognito. AWS Managed Rules give ready-made rule sets.</li>
        <li><b>Shield Standard</b>: automatic DDoS protection for everyone at no cost. <b>Shield Advanced</b>: paid; adds 24/7 access to the Shield Response Team, detailed attack reports, and cost protection if an attack makes your usage spike.</li>
        <li><b>Firewall Manager</b>: applies WAF, Shield and security group rules across every account in an organisation.</li></ul>
        <h3>Signing in your app's users: Cognito</h3>
        <ul><li><b>User pools</b>: sign-up, sign-in, MFA and social logins (Google, Apple), returning JSON Web Tokens (JWTs) your API can check, for example with an API Gateway authorizer.</li>
        <li><b>Identity pools</b>: exchange a sign-in (from a user pool or a social login) for <b>temporary AWS credentials</b>, so a mobile app can upload straight to S3 with limited permissions.</li></ul>
        <h3>Access across accounts</h3>
        <ul><li>The standard way: a <b>role</b> in account B whose <b>trust policy</b> allows account A; users in A call <code>sts:AssumeRole</code> and get temporary credentials. For a third party, add an <b>external ID</b> condition to prevent the "confused deputy" problem.</li>
        <li><b>Resource-based policies</b> (S3 bucket policies, KMS key policies, SQS queue policies) can grant another account access directly. <b>AWS RAM</b> (Resource Access Manager) shares resources such as subnets or Transit Gateways across accounts. <b>SCPs</b> set the maximum permissions for whole accounts (see <button class="link-btn inline-link" data-trsel="cloud|governance">Governance</button>).</li></ul>
        <h3>Detecting problems</h3>
        <table><tr><th>Service</th><th>What it does</th></tr>
        <tr><td>GuardDuty</td><td>Threat detection: analyses CloudTrail, VPC Flow Logs and DNS logs for things like crypto-mining or credentials used from strange places</td></tr>
        <tr><td>Inspector</td><td>Scans EC2 instances, container images and Lambda functions for known software vulnerabilities</td></tr>
        <tr><td>Macie</td><td>Finds sensitive data (like personal information) in S3</td></tr>
        <tr><td>Security Hub</td><td>Collects findings from the others in one place and checks against standards like CIS</td></tr>
        <tr><td>Detective</td><td>Helps investigate a finding: what happened, and what else it touched</td></tr>
        <tr><td>AWS Config</td><td>Records resource settings over time and checks them against rules ("is every bucket encrypted?")</td></tr>
        <tr><td>CloudTrail</td><td>Logs every API call: who did what, and when</td></tr></table>
        <h3>Worked example, step by step</h3>
        <p>A bank's mobile app lets customers upload documents. Requirements: users sign in with MFA, uploads go straight to S3, data is encrypted with a key the bank controls, and the API must survive attacks.</p>
        <ol><li>A <b>Cognito user pool</b> handles sign-up, sign-in and MFA; an <b>identity pool</b> gives each signed-in user temporary credentials that can only write to their own folder in the bucket.</li>
        <li>The bucket uses <b>SSE-KMS</b> with a <b>customer managed key</b>; its key policy lets only the app's roles use it, and every use is in CloudTrail.</li>
        <li>The API's database password lives in <b>Secrets Manager</b> with 30-day rotation.</li>
        <li><b>CloudFront</b> with an <b>ACM</b> certificate fronts the API; a <b>WAF</b> web ACL with AWS Managed Rules and a rate-based rule sits on it; <b>Shield Standard</b> is automatic.</li>
        <li><b>GuardDuty</b>, <b>Macie</b> (to spot personal data in the wrong place) and <b>Security Hub</b> are switched on for every account.</li></ol>`,
      map: [["Key management", "AWS KMS / CloudHSM", "Key Vault / Managed HSM"], ["Secrets with rotation", "Secrets Manager", "Key Vault secrets"], ["Free TLS certificates", "AWS Certificate Manager", "App Service / Front Door managed certificates"], ["Web application firewall", "AWS WAF", "Azure WAF"], ["App user sign-in", "Amazon Cognito", "Microsoft Entra External ID"], ["Threat detection", "GuardDuty", "Microsoft Defender for Cloud"]],
      cards: [
        ["Secrets Manager or Parameter Store for an RDS password that must rotate automatically?", "Secrets Manager: it has built-in rotation for RDS."],
        ["Which service finds personal data in S3 buckets?", "Amazon Macie."],
        ["Cognito user pool vs identity pool?", "User pools sign users in and issue tokens; identity pools exchange a sign-in for temporary AWS credentials."],
        ["A partner company needs access to one bucket in your account. Two ways?", "A role they can assume (with an external ID), or a bucket policy granting their account access."],
      ],
    },
  ],

  quiz: [
    // Billing, pricing & support (CLF domain 4; SAA cost-optimized)
    { id: "x67", tags: ["CLF"], topic: "billing", q: "A nightly batch job can be stopped and restarted without problems. Which EC2 pricing option is cheapest?", options: ["On-Demand", "Spot Instances", "Dedicated Hosts", "Reserved Instances for 3 years"], answer: 1, why: "Spot is up to 90% off On-Demand. Interruptions are acceptable here because the job can simply rerun." },
    { id: "x68", tags: [], topic: "billing", q: "Which tool estimates the monthly cost of an architecture before you build it?", options: ["Cost Explorer", "AWS Pricing Calculator", "AWS Budgets", "Trusted Advisor"], answer: 1, why: "The Pricing Calculator models costs in advance. Cost Explorer analyses spending you've already incurred." },
    { id: "x69", tags: ["SAA"], topic: "billing", q: "Two EC2 instances exchange a lot of data over private IP addresses. Which placement avoids data transfer charges between them?", options: ["Different regions", "Different availability zones in one region", "The same availability zone", "Different VPCs connected by peering"], answer: 2, why: "Traffic over private IPs inside one AZ is generally free; crossing AZs or regions is charged. Weigh that against the resilience of spreading across AZs." },
    { id: "x70", tags: [], topic: "billing", q: "Which AWS Support plan includes a designated Technical Account Manager?", options: ["Basic Support", "Business Support+", "Enterprise Support", "Every plan"], answer: 2, why: "Enterprise Support includes a designated TAM. Basic is free and Business Support+ adds 24/7 expert access, but neither has a TAM." },
    { id: "x71", tags: [], topic: "billing", q: "Which Cloud Adoption Framework perspective covers staff skills, culture and organisational change?", options: ["Platform", "People", "Operations", "Security"], answer: 1, why: "The People perspective is about the human side of the move: skills, culture and how teams are organised." },
    // Networking deep dive (SAA)
    { id: "x72", tags: [], topic: "netdeep", q: "Private EC2 instances must read from S3 without going over the internet and without NAT gateway data charges. What's the best solution?", options: ["An S3 gateway VPC endpoint", "A public IP on each instance", "An internet gateway on the private subnet", "VPC peering with S3"], answer: 0, why: "Gateway endpoints for S3 and DynamoDB add a route so traffic stays on the AWS network, and they're free." },
    { id: "x73", tags: ["SAA"], topic: "netdeep", q: "VPC A is peered with VPC B, and VPC B is peered with VPC C. Can instances in A reach C through B?", options: ["Yes, peering is transitive", "No, peering isn't transitive; use a Transit Gateway or peer A and C", "Only if they're in the same region", "Only for IPv6 traffic"], answer: 1, why: "Peering connects exactly two VPCs. A Transit Gateway gives transitive routing between many networks." },
    { id: "x74", tags: ["SAA"], topic: "netdeep", q: "A company needs a consistent, private, high-bandwidth connection from its data center to AWS. Which service?", options: ["Site-to-Site VPN", "AWS Direct Connect", "CloudFront", "Client VPN"], answer: 1, why: "Direct Connect is a dedicated line with consistent performance. A VPN runs over the internet, so performance varies." },
    { id: "x75", tags: ["SAA"], topic: "netdeep", q: "You want to send 10% of users to a new version of your site using DNS. Which Route 53 routing policy?", options: ["Simple", "Weighted", "Geolocation", "Multivalue answer"], answer: 1, why: "Weighted routing splits traffic between records by the weights you set." },
    { id: "x76", tags: ["SAA"], topic: "netdeep", q: "A multiplayer game uses UDP and needs fixed IP addresses and fast failover between regions. Which service fits best?", options: ["CloudFront", "AWS Global Accelerator", "An Application Load Balancer", "Route 53 simple routing"], answer: 1, why: "Global Accelerator provides static anycast IPs, supports TCP and UDP, and fails over between regions quickly. CloudFront is for cacheable HTTP content." },
    // Storage, databases & caching deep dive (SAA)
    { id: "x77", tags: ["CLF"], topic: "datadeep", q: "Objects have unpredictable access patterns and you don't want retrieval fees. Which S3 storage class?", options: ["S3 Standard-IA", "S3 Intelligent-Tiering", "S3 Glacier Deep Archive", "S3 One Zone-IA"], answer: 1, why: "Intelligent-Tiering moves objects between access tiers automatically, with no retrieval fees." },
    { id: "x78", tags: ["SAA"], topic: "datadeep", q: "Several Windows servers need a shared file system integrated with Active Directory. Which service?", options: ["Amazon EFS", "Amazon FSx for Windows File Server", "Amazon EBS Multi-Attach", "S3 with a mounted bucket"], answer: 1, why: "FSx for Windows File Server provides SMB shares with Active Directory integration. EFS is NFS for Linux." },
    { id: "x79", tags: [], topic: "datadeep", q: "A DynamoDB-backed app needs microsecond read latency for hot items without changing much code. What do you add?", options: ["ElastiCache for Memcached", "DynamoDB Accelerator (DAX)", "A read replica", "A larger partition key"], answer: 1, why: "DAX is an in-memory cache built for DynamoDB, using the same API, with microsecond reads." },
    { id: "x80", tags: ["SAA"], topic: "datadeep", q: "A relational database needs disaster recovery in another region with replication lag of about a second. Which option?", options: ["RDS Multi-AZ", "Aurora Global Database", "Nightly snapshots copied to the other region", "EBS snapshots"], answer: 1, why: "Aurora Global Database replicates storage to other regions, typically in under a second. Multi-AZ protects within one region." },
    // Security services deep dive (SAA)
    { id: "x81", tags: ["SAA"], topic: "secdeep", q: "An RDS database password must be rotated automatically every 30 days. Where should it be stored?", options: ["Systems Manager Parameter Store (standard)", "AWS Secrets Manager", "An environment variable", "An S3 object"], answer: 1, why: "Secrets Manager has built-in automatic rotation for RDS. Parameter Store has no built-in rotation." },
    { id: "x82", tags: ["SAA"], topic: "secdeep", q: "Which service discovers sensitive personal data stored in S3 buckets?", options: ["Amazon GuardDuty", "Amazon Macie", "Amazon Inspector", "AWS Config"], answer: 1, why: "Macie uses machine learning to find sensitive data such as personal information in S3. GuardDuty detects threats; Inspector finds software vulnerabilities." },
    { id: "x83", tags: [], topic: "secdeep", q: "A mobile app's signed-in users must upload files directly to S3 with temporary, limited AWS credentials. What provides those credentials?", options: ["A Cognito user pool", "A Cognito identity pool", "An IAM user per customer", "An access key in the app"], answer: 1, why: "Identity pools exchange a sign-in for temporary AWS credentials tied to an IAM role. User pools sign users in and issue tokens." },
    { id: "x84", tags: ["SAA"], topic: "secdeep", q: "An API is being hit by many requests from a few IP addresses. Which feature limits requests per IP?", options: ["A security group", "An AWS WAF rate-based rule", "Shield Standard", "A network ACL"], answer: 1, why: "WAF rate-based rules block an IP when it exceeds a request rate you set. Security groups and NACLs can't count requests." },
  ],

  glossary: [
    ["Consolidated billing", "One bill for every account in an AWS Organization, with usage combined for volume discounts."],
    ["Direct Connect", "A dedicated private network connection from a data center to AWS."],
    ["Gateway endpoint", "A free VPC endpoint for S3 and DynamoDB, added as a route in the route table."],
    ["Savings Plan", "A 1- or 3-year commitment to an hourly spend, in exchange for up to 72% off compute."],
    ["Transit Gateway", "A regional hub connecting many VPCs and on-premises networks with transitive routing."],
    ["Trusted Advisor", "AWS's best-practice checks: cost, performance, security, fault tolerance, service limits, operational excellence."],
  ],
});
