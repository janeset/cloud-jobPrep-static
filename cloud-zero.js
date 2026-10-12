// "Cloud from zero": the beginner track, for people with no IT background. Five short lessons in
// plain language, each with a worked example, a guided task and checks. The checks are ordinary
// quiz questions (topic = the lesson id), so a lesson is complete when they're all answered right.
// Also sets the lesson order for each path (groups, and groupsNew when Home's level is "new").
// Merged into CLOUD by extendTrack (tracks.js). body is trusted HTML (written here).

const ZERO_IDS = ["zero-computers", "zero-internet", "zero-cli", "zero-cloud", "zero-accounts"];

extendTrack(CLOUD, {
  topics: [
    {
      id: "zero-computers", title: "Computers, servers and networks", short: "Z1", yt: "what is a server explained for beginners",
      body: `<p>Everything in cloud computing is built from three ideas: <b>computers</b>, <b>servers</b> and <b>networks</b>. This lesson explains each in plain words.</p>
        <h3>A computer</h3>
        <p>A computer is a machine that follows instructions. Every computer, from a phone to a giant machine in a data center, has the same four parts:</p>
        <ul><li><b>Processor (CPU)</b>: the part that does the work, one instruction after another, billions of times a second. Cloud providers sell it as <b>vCPUs</b> ("virtual CPUs"), a share of a real processor.</li>
        <li><b>Memory (RAM)</b>: fast, short-term space for whatever the computer is working on right now. It's emptied when the power goes off.</li>
        <li><b>Storage (disk)</b>: slower, long-term space for files. It keeps its contents when the power goes off.</li>
        <li><b>Operating system (OS)</b>: the main program that runs everything else, such as Windows, macOS or <b>Linux</b>. Most cloud servers run Linux.</li></ul>
        <h3>A server</h3>
        <p>A <b>server</b> is a computer whose job is to answer requests from other computers. When your phone shows your email, a server somewhere sent it. The computer asking is called the <b>client</b>; the computer answering is the <b>server</b>. Servers usually have no screen or keyboard, stay on day and night, and live in a <b>data center</b>: a building full of servers with backup power, cooling and security guards.</p>
        <h3>A network</h3>
        <p>A <b>network</b> is computers connected so they can send each other messages, by cable or by Wi-Fi. Your home Wi-Fi is a small network. The <b>internet</b> is a network of networks: millions of them joined together. The next lesson shows how a message finds its way across it.</p>
        <h3>Worked example, step by step</h3>
        <p>You open a photo that's backed up "in the cloud" on your phone. Here is what actually happens:</p>
        <ol><li>Your phone (the <b>client</b>) sends a request over your Wi-Fi network: "please send me photo 1234".</li>
        <li>The request travels across the internet to a <b>server</b> in a data center, perhaps hundreds of kilometres away.</li>
        <li>The server's <b>processor</b> runs the program that handles photo requests. It uses <b>memory</b> while it works and reads the photo from its <b>storage</b>.</li>
        <li>The server sends the photo back as a <b>response</b>. Your phone shows it.</li></ol>
        <p>Nothing magic happened: one computer asked, another answered. "The cloud" is a very large number of those answering computers, which you'll meet properly in <button class="link-btn inline-link" data-trsel="cloud|zero-cloud">What the cloud really is</button>.</p>`,
      // Optional and not checked: shown before the checks, never needed to complete the lesson.
      tryit: {
        title: "Open a free AWS account, safely",
        intro: "You'll need an account for the labs later. These three steps take about 20 minutes and follow AWS's own guides. The Free plan never charges you: it ends after six months or when the sign-up credits run out, and you can upgrade later.",
        steps: [
          { text: "Create an AWS account and choose the Free plan when asked for an account plan. You'll need an email address, a phone number and a payment card for identity checks.", link: "https://docs.aws.amazon.com/accounts/latest/reference/getting-started.html", label: "AWS guide: Sign up for AWS" },
          { text: "Turn on MFA for the root user (the email address you signed up with), using an authenticator app on your phone.", link: "https://docs.aws.amazon.com/IAM/latest/UserGuide/enable-virt-mfa-for-root.html", label: "AWS guide: Enable a virtual MFA device for the root user" },
          { text: "Create a monthly cost budget with an email alert, for example $10, using the simplified budget template.", link: "https://docs.aws.amazon.com/cost-management/latest/userguide/budget-templates.html", label: "AWS guide: Using a budget template" },
        ],
        plans: { link: "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html", label: "How the Free and Paid plans differ" },
      },
      cards: [
        ["What's the difference between memory (RAM) and storage?", "Memory is fast, short-term space that's emptied when the power goes off. Storage keeps files long-term, even without power."],
        ["Client or server: which one asks and which one answers?", "The client asks (sends a request); the server answers (sends a response)."],
      ],
    },
    {
      id: "zero-internet", title: "How the internet works: IP, DNS and HTTP", short: "Z2", yt: "how the internet works DNS HTTP explained for beginners",
      body: `<p>When you type a web address, your computer finds the right server, asks it for a page and gets an answer back, usually in well under a second. Four ideas make that work.</p>
        <h3>IP addresses: where a computer is</h3>
        <p>Every device on a network has an <b>IP address</b>, a number that says where it is, like a street address for computers. It looks like <code>93.184.215.14</code>: four numbers from 0 to 255, separated by dots.</p>
        <ul><li><b>Public</b> IP addresses can be reached from anywhere on the internet.</li>
        <li><b>Private</b> IP addresses only work inside one network. They start with <code>10.</code>, <code>192.168.</code> or <code>172.16.</code> to <code>172.31.</code>. Your laptop at home probably has one like <code>192.168.1.23</code>. Cloud networks use private addresses too, so remember this: it comes back in the networking lesson.</li></ul>
        <p>A <b>port</b> is a numbered door on a computer, so one server can run several services at once: web pages usually use port 443 (secure) or 80, and remote logins use port 22.</p>
        <h3>DNS: turning names into addresses</h3>
        <p>People remember names like <code>example.com</code>; computers need IP addresses. <b>DNS</b> (the Domain Name System) is the internet's phone book: you give it a name, it gives back the IP address.</p>
        <h3>HTTP: the request and the response</h3>
        <p><b>HTTP</b> is the language browsers and web servers speak. The browser sends a <b>request</b> ("GET me the page at /"), and the server sends a <b>response</b> with a <b>status code</b> and the content:</p>
        <ul><li><code>200</code> means OK, here it is. <code>301</code> means it moved. <code>404</code> means not found. <code>403</code> means you're not allowed. <code>500</code> means the server itself had an error.</li>
        <li><b>HTTPS</b> is HTTP with encryption (called <b>TLS</b>): nobody in between can read or change the messages. The padlock in the address bar means HTTPS.</li></ul>
        <h3>Latency: how long it takes</h3>
        <p><b>Latency</b> is the time a message takes to get there and back, usually measured in milliseconds (ms). A server in Toronto might answer someone in Toronto in 10 ms and someone in Sydney in 250 ms, because the message has further to travel. That's why cloud providers have data centers all over the world.</p>
        <h3>Worked example, step by step</h3>
        <p>You type <code>https://example.com</code> and press Enter:</p>
        <ol><li><b>DNS</b>: your computer asks a DNS server "what's the IP address of example.com?" and gets back something like <code>93.184.215.14</code>.</li>
        <li><b>Connect</b>: your browser connects to that IP address on port 443, and the two sides set up encryption (the S in HTTPS).</li>
        <li><b>Request</b>: the browser sends <code>GET /</code>, meaning "send me the home page".</li>
        <li><b>Response</b>: the server replies with status <code>200</code> and the page's content (HTML: text that describes the page).</li>
        <li><b>Show</b>: the browser draws the page. Images and styles on it each cause more requests, so one page can be dozens of request/response pairs.</li></ol>`,
      task: {
        title: "Watch a real request and response",
        intro: "Your browser has built-in developer tools that show every request a page makes. You'll look at one. Nothing here changes anything; it only shows you what's already happening.",
        steps: ["Open Chrome, Edge or Firefox and go to https://example.com", "Press F12 (on a Mac: Cmd+Option+I) to open the developer tools, then click the Network tab", "Reload the page (F5 or Cmd+R) so the tools record it", "Click the first row in the list, called example.com, and look at the Headers section"],
        expect: "A row named example.com, and under Headers a line Status Code with a number and a word next to it, plus a Remote Address (the server's IP address and port).",
        hint: "If the list is empty, keep the tools open and reload the page again: the Network tab only records requests made while it's open. If you can't find Headers, click the row's name first.",
        good: `Request URL:     https://example.com/
Request Method:  GET
Status Code:     200 OK
Remote Address:  93.184.215.14:443`,
      },
      cards: [
        ["What does DNS do?", "It turns a name like example.com into the IP address computers use to find the server."],
        ["What does status code 404 mean?", "Not found: the server is working, but there's nothing at that address."],
        ["What is latency?", "The time a message takes to get to a server and back, usually in milliseconds."],
      ],
    },
    {
      id: "zero-cli", title: "The command line for cloud labs", short: "Z3", yt: "command line basics for beginners cd ls",
      body: `<p>The labs ask you to type commands. The <b>command line</b> (also called the <b>terminal</b> or <b>shell</b>) is a window where you type an instruction, press Enter, and the computer runs it and prints the result. It looks old-fashioned, but it's how most cloud work gets done, because commands can be copied, repeated and saved.</p>
        <h3>Where to find a terminal</h3>
        <ul><li><b>Windows</b>: open <b>PowerShell</b> from the Start menu. <b>Mac</b>: open <b>Terminal</b> (press Cmd+Space and type Terminal). <b>Linux</b>: open Terminal.</li>
        <li><b>In the cloud</b>: <b>AWS CloudShell</b> and <b>Azure Cloud Shell</b> are terminals inside your browser, with the cloud tools already installed. You'll use them in the labs, so there's nothing to install.</li></ul>
        <h3>Reading the prompt</h3>
        <p>The terminal shows a <b>prompt</b> when it's waiting for you, ending in <code>$</code>, <code>%</code> or <code>&gt;</code>, often with the folder you're in, like <code>PS C:\\Users\\sam&gt;</code> or <code>sam@laptop ~ %</code>. You always type <i>after</i> the prompt. When examples in this app start with <code>$</code>, don't type the <code>$</code> itself.</p>
        <h3>The commands you need</h3>
        <ul><li><code>pwd</code>: "print working directory": shows which folder you're in now.</li>
        <li><code>ls</code>: lists the files and folders in the current folder.</li>
        <li><code>cd name</code>: "change directory": moves into a folder. <code>cd ..</code> goes up one level. <code>cd ~</code> goes to your home folder.</li>
        <li><code>mkdir name</code>: makes a new folder.</li>
        <li><code>cat file</code>: prints a file's contents.</li>
        <li><b>Editing a file</b>: <code>code file</code> opens it in Visual Studio Code if you have it, <code>notepad file</code> on Windows, or <code>nano file</code> on Mac, Linux and Cloud Shell (save with Ctrl+O and Enter, quit with Ctrl+X).</li></ul>
        <p>Commands often take <b>options</b> (also called <b>flags</b>) that start with dashes, like <code>ls -l</code> (a long, detailed list) or <code>aws s3 ls --region ca-central-1</code>. The words after a command are its <b>arguments</b>. Press the Up arrow to bring back the last command; press Tab to finish typing a file name.</p>
        <h3>When something goes wrong</h3>
        <p>Errors are normal and harmless here. Read the last line: <code>command not found</code> usually means a typo or a tool that isn't installed; <code>No such file or directory</code> means you're in a different folder than you think (run <code>pwd</code> and <code>ls</code> to check).</p>
        <h3>Worked example, step by step</h3>
        <pre>$ pwd
/home/sam
$ mkdir cloud-practice
$ cd cloud-practice
$ echo "my first file" &gt; note.txt
$ ls
note.txt
$ cat note.txt
my first file</pre>
        <ol><li><code>pwd</code> shows you're in your home folder, <code>/home/sam</code>.</li>
        <li><code>mkdir cloud-practice</code> makes a new, empty folder. It prints nothing: on the command line, no news is good news.</li>
        <li><code>cd cloud-practice</code> moves you into it.</li>
        <li><code>echo "my first file" &gt; note.txt</code>: <code>echo</code> prints text, and <code>&gt;</code> sends that text into a file instead of the screen, creating <code>note.txt</code>.</li>
        <li><code>ls</code> lists the folder: now it holds <code>note.txt</code>. <code>cat note.txt</code> prints what's inside.</li></ol>`,
      task: {
        title: "Make a folder and a file from the terminal",
        intro: "Open a terminal on your computer (PowerShell on Windows, Terminal on a Mac). These commands only create one small folder in your home folder.",
        steps: ["Type cd ~ and press Enter to go to your home folder", "Type mkdir cloud-practice and press Enter", "Type cd cloud-practice and press Enter", "Type echo hello > note.txt and press Enter", "Type ls and press Enter"],
        expect: "The last command lists one file: note.txt. On Windows PowerShell you'll see it in a small table with columns such as Mode, LastWriteTime, Length and Name.",
        hint: "If mkdir says the folder already exists, that's fine: you made it before, so carry on with cd. If ls shows nothing, run pwd to check you're inside cloud-practice.",
        good: `$ ls
note.txt`,
      },
      cards: [
        ["Which command shows the folder you're in?", "pwd (print working directory)."],
        ["What does cd .. do?", "Moves you up one folder level."],
        ["What's AWS CloudShell or Azure Cloud Shell?", "A terminal in your browser with the cloud tools already installed."],
      ],
    },
    {
      id: "zero-cloud", title: "What “the cloud” really is", short: "Z4", yt: "what is cloud computing explained simply",
      body: `<p><b>The cloud</b> means using computers in someone else's data center, over the internet, and paying only for what you use. The companies that rent them out are called <b>cloud providers</b>. The biggest are <b>Amazon Web Services (AWS)</b> and <b>Microsoft Azure</b>; Google Cloud is third. This app teaches AWS and Azure side by side.</p>
        <h3>Renting instead of buying</h3>
        <p>Before the cloud, a company that needed a server bought one, waited weeks for it to arrive, and kept it in a cupboard or rented space. If the business grew, they bought more; if it shrank, the servers sat idle but were already paid for. With the cloud you click a button (or run a command) and a server is ready in about a minute. When you're finished, you delete it and stop paying.</p>
        <ul><li><b>Pay as you go</b>: you're billed by the second, hour, gigabyte or request, like an electricity bill. The flip side: anything you <i>leave running</i> keeps costing money, even if nobody uses it.</li>
        <li><b>Free tier</b>: both providers let new accounts use small amounts of many services free, so learners can practise for little or nothing. Free tiers have limits, and some services are never free.</li>
        <li><b>Services</b>: providers don't only rent bare servers. They also run ready-made building blocks for you (databases, file storage, email sending and hundreds more), so you don't have to install and look after that software yourself. Each one is called a <b>service</b>, and each has a name, like Amazon S3 for storing files.</li></ul>
        <h3>Regions and availability zones</h3>
        <p>Providers have data centers all over the world, grouped into <b>regions</b>. A region is a geographic area, such as Montreal or Toronto, with its own name, like AWS <code>ca-central-1</code> or Azure <b>Canada Central</b>. You choose a region for everything you create. Pick one close to your users (lower latency) and, for many Canadian employers, one in Canada, because some data must stay in the country by law.</p>
        <p>Inside each region are several <b>availability zones</b> (AZs): separate data centers a few kilometres apart, with their own power and network. If one has a fire or power cut, the others keep running. Spreading your servers across two or more zones is how cloud apps stay up.</p>
        <h3>Worked example, step by step</h3>
        <p>A Toronto bakery wants an online ordering website.</p>
        <ol><li><b>The old way</b>: buy a $3,000 server, set it up, keep it in the back office. If it breaks on a Saturday, the website is down until someone fixes it.</li>
        <li><b>The cloud way</b>: rent a small server in the Canada Central region (Azure) or ca-central-1 (AWS) for roughly the price of a few coffees a month.</li>
        <li><b>Busy season</b>: before Christmas, orders triple. They add two more servers for December, then remove them in January and stop paying for them.</li>
        <li><b>Staying up</b>: they put servers in two availability zones, so a problem in one data center doesn't take the site down.</li>
        <li><b>Watching the bill</b>: they set a <b>budget alert</b>, an email the provider sends when spending passes an amount they choose. You'll set one up before every lab.</li></ol>`,
      map: [["The company you rent from", "Amazon Web Services", "Microsoft Azure"], ["A geographic area with data centers", "Region (e.g. ca-central-1)", "Region (e.g. Canada Central)"], ["A separate data center in a region", "Availability Zone", "Availability Zone"], ["Free amounts for new accounts", "AWS Free Tier", "Azure free account"], ["Spending email alerts", "AWS Budgets", "Cost Management budgets"]],
      cards: [
        ["What does pay as you go mean, and what's the catch?", "You pay only for what you use, like a utility bill. The catch: anything you leave running keeps costing money."],
        ["Region vs availability zone?", "A region is a geographic area (like Montreal). An availability zone is one of several separate data centers inside that region."],
      ],
    },
    {
      id: "zero-accounts", title: "Accounts, passwords and why security matters", short: "Z5", yt: "multi factor authentication explained simply",
      body: `<p>A cloud account is connected to your credit card and can create almost anything. That makes its password one of the most valuable things you own: if someone steals it, they can run up a huge bill or read your data. This lesson covers the basic habits that keep it safe, and leads into the next topic, <button class="link-btn inline-link" data-trsel="cloud|iam">Identity &amp; access (IAM)</button>.</p>
        <h3>Who are you, and what are you allowed to do?</h3>
        <ul><li><b>Authentication</b> answers "who are you?". Signing in with a password proves it's you.</li>
        <li><b>Authorization</b> answers "what are you allowed to do?". Being signed in to your work email doesn't let you read your manager's.</li>
        <li><b>Permissions</b> are the specific things an account may do, like "read files in this folder" or "create servers".</li></ul>
        <h3>Passwords and MFA</h3>
        <ul><li>Use a long, unique password for every account. A <b>password manager</b> (such as Bitwarden, 1Password or the one in your browser) creates and remembers them for you.</li>
        <li><b>MFA</b> (multi-factor authentication, also called two-step verification) asks for a second proof after your password: a code from an app on your phone, or a security key. Even if someone learns your password, they can't sign in without your phone.</li>
        <li><b>Phishing</b> is a fake email or website that tricks you into typing your password. Check the address bar before you sign in, and never sign in from a link in an unexpected email.</li></ul>
        <h3>The all-powerful account</h3>
        <p>When you open an AWS account, you get a <b>root user</b>: the email address you signed up with, which can do absolutely anything, including closing the account. Azure has <b>Global Administrator</b>. Professionals turn on MFA for that account, lock it away, and do everyday work from a separate account with fewer permissions. This idea, giving every person and program only the permissions it actually needs, is called <b>least privilege</b>.</p>
        <h3>Keys: passwords for programs</h3>
        <p>Programs and scripts also need to prove who they are. An <b>access key</b> or <b>API key</b> is a long secret string that works like a password for a program (an <b>API</b> is the way programs talk to a service). Keys are dangerous because they're easy to copy and paste somewhere public by mistake. Leaked cloud keys are found by attackers within minutes of being pushed to a public code website. The IAM lesson shows the safer way: short-lived credentials that expire on their own.</p>
        <h3>Worked example, step by step</h3>
        <p>Sam opens a new cloud account to practise for a job:</p>
        <ol><li>Sam signs up with a long password from a password manager.</li>
        <li>Sam turns on MFA for the root user / Global Administrator straight away, using an authenticator app.</li>
        <li>Sam creates a budget alert for $10, so a mistake can't quietly cost hundreds.</li>
        <li>Sam creates a separate everyday sign-in with only the permissions needed for the labs, and stops using the root account.</li>
        <li>For a script, Sam uses CloudShell, which signs in as Sam automatically, instead of copying access keys onto a laptop.</li></ol>`,
      task: {
        title: "Turn on MFA for your email",
        intro: "Your email account resets every other password you have, so it's the best place to practise. This uses your email provider's own security settings (for example myaccount.google.com/security or account.microsoft.com/security).",
        steps: ["Sign in to your email provider's account security page yourself (type the address; don't follow a link from an email)", "Find 2-Step Verification, Two-step verification or Multi-factor authentication", "Follow the steps to add an authenticator app or your phone", "Sign out and back in once to see the second step"],
        expect: "The security page shows 2-Step Verification (or Two-step verification) as On, and signing in now asks for a code or a phone prompt after your password.",
        hint: "The setting is usually under Security, then How you sign in. If it's already on, you're done: check that your recovery phone number and email are up to date.",
        good: `Security > How you sign in
  2-Step Verification ........ On since today
  Authenticator app .......... 1 app`,
      },
      cards: [
        ["Authentication vs authorization?", "Authentication proves who you are; authorization decides what you're allowed to do."],
        ["Why turn on MFA?", "A stolen password alone is no longer enough to sign in; the attacker would also need your phone or security key."],
        ["What is least privilege?", "Giving every person and program only the permissions it actually needs, nothing more."],
      ],
    },
  ],

  quiz: [
    // Computers, servers and networks
    { id: "z1", tags: [], topic: "zero-computers", q: "Which part of a computer keeps your files when the power is switched off?", options: ["Memory (RAM)", "Storage (disk)", "The processor (CPU)", "The network"], answer: 1, why: "Storage is long-term space that survives a power cut. Memory (RAM) is fast but emptied when the power goes off." },
    { id: "z2", tags: [], topic: "zero-computers", q: "Your phone asks for a photo and a computer in a data center sends it back. Which one is the server?", options: ["Your phone", "The computer in the data center", "Both", "Neither: it's the Wi-Fi router"], answer: 1, why: "The server is the computer that answers requests. Your phone, which asks, is the client." },
    { id: "z3", tags: [], topic: "zero-computers", q: "What is a data center?", options: ["A spreadsheet of company data", "A building full of servers with backup power, cooling and security", "The memory inside a laptop", "A website that stores passwords"], answer: 1, why: "Data centers are where servers live, with the power, cooling and physical security they need to run day and night." },
    { id: "z4", tags: [], topic: "zero-computers", q: "What is the internet?", options: ["One very large computer", "A network of networks joined together", "A program installed on your laptop", "Another name for Wi-Fi"], answer: 1, why: "The internet connects millions of separate networks so that any computer on it can send messages to any other." },
    // How the internet works
    { id: "z5", tags: [], topic: "zero-internet", q: "What does DNS do?", options: ["Encrypts web pages", "Turns a name like example.com into an IP address", "Stores your photos", "Speeds up your Wi-Fi"], answer: 1, why: "DNS is the internet's phone book: it turns names people remember into the IP addresses computers use." },
    { id: "z6", tags: [], topic: "zero-internet", q: "Which of these is a private IP address that only works inside one network?", options: ["93.184.215.14", "8.8.8.8", "10.0.1.25", "142.250.80.46"], answer: 2, why: "Addresses starting with 10., 192.168. or 172.16-31. are private. The others are public addresses reachable on the internet." },
    { id: "z7", tags: [], topic: "zero-internet", q: "In the task, the first request to example.com showed a status code. If the page loaded normally, what was it?", options: ["200 OK", "404 Not Found", "500 Internal Server Error", "403 Forbidden"], answer: 0, why: "200 means the request worked and the response contains the page. 404 is not found, 403 not allowed, 500 a server error." },
    { id: "z8", tags: [], topic: "zero-internet", q: "A server is in Toronto. Why does a user in Sydney see higher latency than a user in Toronto?", options: ["Sydney has slower computers", "The messages have much further to travel there and back", "HTTPS is switched off in Australia", "DNS doesn't work outside Canada"], answer: 1, why: "Latency is the round-trip time, and distance adds to it. That's why providers have regions around the world." },
    { id: "z9", tags: [], topic: "zero-internet", q: "What does the S in HTTPS add?", options: ["Speed", "Encryption, so nobody in between can read or change the messages", "Search", "A second server"], answer: 1, why: "HTTPS is HTTP over TLS encryption. The padlock in the address bar shows it's in use." },
    // The command line
    { id: "z10", tags: [], topic: "zero-cli", q: "You're not sure which folder your terminal is in. Which command tells you?", options: ["ls", "pwd", "cd", "mkdir"], answer: 1, why: "pwd prints the working directory: the folder you're in now. ls lists what's in it." },
    { id: "z11", tags: [], topic: "zero-cli", q: "What does cd cloud-practice do?", options: ["Deletes the cloud-practice folder", "Moves you into the cloud-practice folder", "Creates a file called cloud-practice", "Copies the folder to the cloud"], answer: 1, why: "cd changes directory. mkdir creates a folder; cd moves into it." },
    { id: "z12", tags: [], topic: "zero-cli", q: "In the task, what did ls list at the end?", options: ["Nothing at all", "note.txt", "An error: command not found", "Every file on the computer"], answer: 1, why: "echo hello > note.txt created note.txt inside cloud-practice, so ls in that folder lists it." },
    { id: "z13", tags: [], topic: "zero-cli", q: "The terminal prints \"No such file or directory\". What's the most likely cause?", options: ["The computer is broken", "You're in a different folder than you think, or the name is misspelt", "You need to buy a cloud account", "The internet is down"], answer: 1, why: "It means the name you gave doesn't exist where you are. Run pwd and ls to see where you are and what's there." },
    // What the cloud is
    { id: "z14", tags: [], topic: "zero-cloud", q: "Which best describes the cloud?", options: ["Storing data in the sky using satellites", "Renting computers and services in someone else's data centers over the internet, paying for what you use", "A kind of very fast laptop", "Free storage that never costs money"], answer: 1, why: "Cloud providers own the data centers; you rent what you need, when you need it, and pay as you go." },
    { id: "z15", tags: [], topic: "zero-cloud", q: "You created a server for a lab and forgot about it. What happens?", options: ["It switches off automatically after an hour", "It keeps running and keeps costing money until you delete it", "The provider deletes it the next day", "Nothing: servers are always free"], answer: 1, why: "Pay as you go cuts both ways: anything left running is billed. That's why every lab ends with a clean-up step." },
    { id: "z16", tags: [], topic: "zero-cloud", q: "A region contains several availability zones. What's an availability zone?", options: ["A country", "A separate data center within the region, with its own power and network", "A type of database", "A billing plan"], answer: 1, why: "Zones are isolated data centers a few kilometres apart. Running in two or more keeps an app up if one has a problem." },
    { id: "z17", tags: [], topic: "zero-cloud", q: "A Canadian bank's customer data must stay in Canada. What should they choose?", options: ["The cheapest region anywhere", "A Canadian region such as ca-central-1 or Canada Central", "Any region: data location doesn't matter", "A free tier"], answer: 1, why: "Choosing a region decides where the data is stored. Canadian regions keep it in the country." },
    // Accounts and security
    { id: "z18", tags: [], topic: "zero-accounts", q: "What does MFA add when you sign in?", options: ["A longer password", "A second proof, such as a code from your phone", "Faster sign-in", "A free trial"], answer: 1, why: "Multi-factor authentication asks for something you have (your phone or a key) as well as something you know (your password)." },
    { id: "z19", tags: [], topic: "zero-accounts", q: "Signing in proves who you are. What's the name for deciding what you're allowed to do?", options: ["Authentication", "Authorization", "Encryption", "Phishing"], answer: 1, why: "Authentication is who you are; authorization is what you may do." },
    { id: "z20", tags: [], topic: "zero-accounts", q: "Why do professionals avoid using the AWS root user or an Azure Global Administrator for everyday work?", options: ["It's slower", "It can do anything, so a mistake or a stolen password does the most damage", "It costs extra", "It can't create servers"], answer: 1, why: "Everyday work should use an account with only the permissions it needs: least privilege." },
    { id: "z21", tags: [], topic: "zero-accounts", q: "A teammate pastes a cloud access key into code they're about to share on a public website. What's the risk?", options: ["None: keys are public anyway", "Anyone who finds it can use the account as that program, for example to run up a bill", "The code will run more slowly", "The key will stop the website loading"], answer: 1, why: "An access key works like a password for a program. Leaked keys are found and abused within minutes." },
  ],

  glossary: [
    ["API", "The way programs talk to a service: a set of requests a program can send and the responses it gets back."],
    ["API key / access key", "A long secret string that works like a password for a program."],
    ["Client", "The computer or program that sends a request (your browser, your phone)."],
    ["Cloud provider", "A company that rents out computing over the internet, such as AWS or Microsoft Azure."],
    ["Command line / terminal", "A window where you type instructions for the computer to run."],
    ["Data center", "A building full of servers with backup power, cooling and physical security."],
    ["DNS", "Domain Name System: turns names like example.com into IP addresses."],
    ["Free tier", "Small amounts of cloud services that new accounts can use at no charge, within limits."],
    ["HTTP / HTTPS", "The request-and-response language of the web; HTTPS adds encryption (TLS)."],
    ["IP address", "A number that says where a device is on a network, like 10.0.1.25."],
    ["Latency", "How long a message takes to reach a server and come back, usually in milliseconds."],
    ["MFA", "Multi-factor authentication: a second proof, like a phone code, after your password."],
    ["Port", "A numbered door on a computer, so one server can offer several services (443 for HTTPS, 22 for SSH)."],
    ["Server", "A computer whose job is to answer requests from other computers."],
    ["SLA", "Service level agreement: the availability a provider promises for a service (such as 99.9%), with credits if it misses."],
    ["Status code", "The number in an HTTP response: 200 OK, 404 not found, 500 server error."],
  ],

  // Cloud from zero comes first in the sidebar. The rest keeps its original order for people
  // already in IT; groupsNew (below) is the beginner order.
  groups: [
    ["Cloud from zero", ZERO_IDS],
    ["Foundations", ["fundamentals", "iam", "security", "governance"]],
    ["Hands-on skills", ["linux", "bash", "python", "terraform"]],
    ["Compute", ["compute", "containers", "kubernetes", "serverless"]],
    ["Data", ["storage", "databases", "data"]],
    ["Networking & integration", ["networking", "messaging"]],
    ["Operations & architecture", ["devops", "operations", "billing", "architecture"]],
    ["Solutions Architect deep dives", ["netdeep", "datadeep", "secdeep"]],
  ],
});

// The beginner order builds on itself: networking comes before the topics that use subnets and
// load balancers (security, compute, databases, containers), and the enterprise topics (data
// platforms, DR, landing zones) come last.
CLOUD.zero = ZERO_IDS;
// Short or old Learn addresses that obviously mean a lesson (#/cloud/learn/k8s). Ids, the `short`
// names and title slugs also work (resolveTopic in trackview.js).
CLOUD.aliases = {
  zero: "zero-computers", basics: "zero-computers", start: "zero-computers", internet: "zero-internet", dns: "zero-internet", http: "zero-internet",
  cli: "zero-cli", terminal: "zero-cli", "command-line": "zero-cli", cloud: "zero-cloud", "what-is-cloud": "zero-cloud", accounts: "zero-accounts", passwords: "zero-accounts", mfa: "zero-accounts",
  identity: "iam", secrets: "security", vm: "compute", vms: "compute", ec2: "compute", docker: "containers", lambda: "serverless", functions: "serverless",
  s3: "storage", blob: "storage", db: "databases", database: "databases", sql: "databases", network: "networking", vpc: "networking", vnet: "networking",
  queues: "messaging", events: "messaging", iac: "devops", cicd: "devops", hcl: "terraform", shell: "bash", scripting: "bash", boto3: "python", ssh: "linux", "ci-cd": "devops", monitoring: "operations", observability: "operations",
  cost: "billing", pricing: "billing", support: "billing", caf: "billing", dr: "architecture", "disaster-recovery": "architecture", analytics: "data", "landing-zone": "governance", migration: "governance",
};
CLOUD.groupsNew = [
  ["Cloud from zero", ZERO_IDS],
  ["Foundations", ["fundamentals", "linux", "bash", "iam"]],
  ["Core AWS services", ["networking", "security", "storage", "compute", "databases", "operations", "billing"]],
  ["Building on AWS", ["containers", "serverless", "messaging", "python", "terraform", "kubernetes"]],
  ["Architecture", ["architecture", "data", "governance"]],
  ["Solutions Architect deep dives", ["netdeep", "datadeep", "secdeep"]],
  ["Delivery", ["devops"]],
];
// The plan (phases and weeks) is in cloud-plan.js.
