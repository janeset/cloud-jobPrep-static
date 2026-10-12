// Hands-on skills cloud engineer interviews test: Linux, Bash, Python for automation and Terraform.
// Same shape as the other Cloud topics (terms, body, checks = quiz questions with this topic id).
// Merged into CLOUD by extendTrack; where they sit in each path is set in cloud-zero.js.
// body and code are template literals: Bash variables are written $name, never with braces.

extendTrack(CLOUD, {
  topics: [
    {
      id: "linux", title: "Linux command line essentials", short: "Linux", yt: "linux command line basics for beginners",
      terms: [["Linux / distribution", "Linux is the operating system most cloud servers run; a distribution (Ubuntu, Amazon Linux, Azure Linux) is one packaged version of it."],
        ["Terminal / shell / Bash", "The window you type commands in / the program that runs them / the most common shell.", "zero-cli"],
        ["Path", "Where a file lives: /home/sam/notes.txt starts from the top folder, /. A path without a leading / starts from the folder you're in."],
        ["Permissions", "Who may read (r), write (w) or execute (x) a file: its owner, its group, and everyone else."],
        ["root / sudo", "root is Linux's all-powerful user; sudo runs one command as root."],
        ["Process / PID", "A running program / the number Linux gives it."],
        ["Service / systemd", "A program that runs in the background all the time, like a web server / the part of Linux that starts and watches services."],
        ["Package manager", "The tool that installs software: apt on Ubuntu, dnf on Amazon Linux and Azure Linux."],
        ["SSH / key pair", "SSH is the encrypted way to log in to a remote Linux server; a key pair (a private and a public key file) replaces the password."],
        ["Log", "A text file (or stream) where programs write what they did and what went wrong."]],
      body: `<p>In plain words: almost every server in the cloud runs <b>Linux</b>, and you look after it by typing commands. You met the very first commands in <button class="link-btn inline-link" data-trsel="cloud|zero-cli">The command line for cloud labs</button>. This lesson adds the ones you'll use to look around a server, fix permissions, restart a broken service and find out why it broke. Interviews often ask exactly this: "the site is down, you're on the server, what do you type?"</p>
        <h3>Where to practise</h3>
        <p>[[AWS CloudShell|Azure Cloud Shell]] is a free Linux terminal in your browser: open it from the icon at the top of the console. Nothing you do there touches your servers.</p>
        <h3>Finding your way around</h3>
        <ul><li>The file system starts at <code>/</code>. Your files are in <code>/home/yourname</code> (written <code>~</code>), settings live in <code>/etc</code>, and logs in <code>/var/log</code>.</li>
        <li><code>ls -la</code> lists everything, including hidden files (names starting with a dot), with details. <code>cat</code> prints a file; <code>less</code> lets you scroll (press q to quit); <code>head</code> and <code>tail</code> show the first or last lines, and <code>tail -f</code> keeps showing new lines as they're written, which is perfect for watching a log.</li>
        <li><code>grep error app.log</code> prints only the lines containing "error". Add <code>-i</code> to ignore upper and lower case.</li></ul>
        <h3>Permissions</h3>
        <p><code>ls -l</code> shows a line like <code>-rwxr-x--- 1 sam devs 512 deploy.sh</code>. After the first character (<code>-</code> for a file, <code>d</code> for a folder) come three groups of three: what the <b>owner</b> (sam) can do (<code>rwx</code>: read, write, execute), what the <b>group</b> (devs) can do (<code>r-x</code>: read and execute, not write), and what <b>everyone else</b> can do (<code>---</code>: nothing).</p>
        <ul><li><code>chmod +x deploy.sh</code> lets the file be run as a program; <code>chmod 400 key.pem</code> makes a file readable only by you (SSH insists on this for private keys).</li>
        <li><code>chown sam file</code> changes the owner. Many admin commands need <b>root</b>: put <code>sudo</code> in front, as in <code>sudo systemctl restart nginx</code>. Use it for single commands, not as a habit.</li></ul>
        <h3>Programs, services and logs</h3>
        <ul><li><code>ps aux</code> lists running processes; <code>top</code> shows the busiest ones live (q to quit); <code>kill PID</code> asks a process to stop.</li>
        <li><code>systemctl status nginx</code> says whether a service is running and shows its last log lines; <code>sudo systemctl restart nginx</code> restarts it. <code>journalctl -u nginx -n 50</code> shows its last 50 log lines.</li>
        <li>Install software with the package manager: <code>sudo apt install nginx</code> on Ubuntu, <code>sudo dnf install nginx</code> on Amazon Linux or Azure Linux.</li></ul>
        <h3>Disk, memory and network checks</h3>
        <ul><li><code>df -h</code> shows how full each disk is; <code>du -sh /var/log/*</code> shows which folders are big; <code>free -h</code> shows memory.</li>
        <li><code>ss -tlnp</code> lists programs listening on network ports; <code>curl -I http://localhost</code> asks the local web server for a page and prints only the status line and headers (remember status codes from <button class="link-btn inline-link" data-trsel="cloud|zero-internet">How the internet works</button>).</li></ul>
        <h3>Logging in to a server</h3>
        <p><code>ssh -i key.pem ec2-user@203.0.113.10</code> logs in to the server at that IP address as ec2-user, using your private key. Never share or commit the private key. Many companies avoid opening SSH to the internet at all and use [[SSM Session Manager|Azure Bastion]] instead (see <button class="link-btn inline-link" data-trsel="cloud|networking">Networking</button>).</p>
        <h3>Worked example, step by step</h3>
        <p>The company website on a Linux VM has stopped answering. You're logged in. What do you type?</p>
        <ol><li><code>systemctl status nginx</code> says <i>failed</i>: the web server isn't running.</li>
        <li><code>journalctl -u nginx -n 20</code> shows why: <i>No space left on device</i>.</li>
        <li><code>df -h</code> confirms it: the main disk, <code>/</code>, is 100% full.</li>
        <li><code>sudo du -sh /var/log/*</code> finds the culprit: one application log has grown to 18 GB.</li>
        <li>You compress or remove the old log (after checking nobody needs it), then <code>sudo systemctl restart nginx</code>.</li>
        <li><code>curl -I http://localhost</code> prints <code>HTTP/1.1 200 OK</code>: the site is back. Afterwards you'd set up log rotation and a disk-space alarm so it can't happen again.</li></ol>`,
      task: {
        title: "Look around a Linux machine",
        intro: "Open AWS CloudShell or Azure Cloud Shell from the console (the >_ icon at the top). Both are Linux terminals that are free to use; these commands only read information.",
        steps: ["Type pwd and press Enter, then ls -la", "Type cat /etc/os-release to see which Linux distribution this is", "Type df -h ~ to see how much space your home folder has", "Type ps aux | head -5 to see the first few running processes"],
        expect: "cat /etc/os-release prints lines such as NAME= and VERSION= with the distribution's name (for example Amazon Linux or Azure Linux); df -h shows a size and how much is used.",
        hint: "If the terminal is still starting, wait for the prompt to appear. Type the commands exactly, including spaces; the | in the last one is the pipe key (Shift + backslash on most keyboards).",
        good: `$ cat /etc/os-release
NAME="Amazon Linux"
VERSION="2023"
...
$ df -h ~
Filesystem      Size  Used Avail Use% Mounted on
/dev/loop0      974M   24K  907M   1% /home/cloudshell-user`,
      },
      map: [["Linux terminal in the browser", "AWS CloudShell", "Azure Cloud Shell"], ["The provider's own Linux", "Amazon Linux", "Azure Linux"], ["Log in without opening SSH", "SSM Session Manager", "Azure Bastion"], ["SSH key for a new VM", "EC2 key pair", "SSH public key on the VM"]],
      code: [{ label: "Checking a sick web server", note: "The commands from the worked example, in order. Lines starting with # are comments explaining each step; sudo is only needed where you change something.", code: `systemctl status nginx              # is the service running?
journalctl -u nginx -n 20           # its last 20 log lines: why did it stop?
df -h                               # is a disk full?
sudo du -sh /var/log/*              # which logs are big?
free -h                             # is memory full?
ss -tlnp                            # what is listening on which port?
sudo systemctl restart nginx        # start it again
curl -I http://localhost            # does it answer now? (look for 200)` }],
      cards: [
        ["Which command shows how full the disks are?", "df -h (h means human-readable sizes like 18G)."],
        ["A service won't start. Where do you look first?", "systemctl status name, then journalctl -u name for its logs."],
        ["What does chmod 400 key.pem do, and why?", "Makes the key readable only by its owner; SSH refuses private keys other people could read."],
      ],
    },
    {
      id: "bash", title: "Bash scripting basics", short: "Bash", yt: "bash scripting tutorial for beginners",
      terms: [["Script", "A text file of commands that runs from top to bottom, so you don't have to type them each time."],
        ["Bash", "The shell most Linux servers use; a Bash script is a file of Bash commands.", "linux"],
        ["Shebang", "The first line, #!/usr/bin/env bash, which tells Linux which program runs the file."],
        ["Variable", "A name that holds a value: name=\"Sam\", used later as $name."],
        ["Argument", "A value typed after the script's name when you run it; inside the script the first is $1, the second $2."],
        ["Exit code", "The number every command finishes with: 0 means success, anything else means it failed."],
        ["Pipe ( | )", "Sends one command's output into the next command as its input."],
        ["Redirection ( > and >> )", "Sends output to a file instead of the screen: > replaces the file, >> adds to the end."],
        ["Loop / if", "A loop repeats commands for each item in a list; if runs commands only when a test passes."]],
      body: `<p>In plain words: a Bash script is a list of commands saved in a file. Anything you'd type more than twice, such as checking that five websites are up, cleaning old logs, or setting up a new server, becomes a script you can rerun, share and review. Cloud engineers write small scripts constantly, and interviews often include "write a script that...". You'll need the commands from <button class="link-btn inline-link" data-trsel="cloud|linux">Linux command line essentials</button>.</p>
        <p><b>Where to run it:</b> on a Mac or Linux, in Terminal; on Windows, use [[AWS CloudShell|Azure Cloud Shell]] (or Git Bash), because PowerShell is a different language.</p>
        <h3>Your first script</h3>
        <pre>#!/usr/bin/env bash
name="$1"
echo "Hello, $name"</pre>
        <ol><li>Create the file with <code>nano hello.sh</code>, type the three lines, then save (Ctrl+O, Enter) and quit (Ctrl+X).</li>
        <li><code>chmod +x hello.sh</code> lets it run as a program (you saw chmod in the Linux lesson).</li>
        <li><code>./hello.sh Sam</code> runs it. The <code>./</code> means "the file in this folder". Inside the script, <code>$1</code> holds the first argument, Sam, so it prints <code>Hello, Sam</code>.</li></ol>
        <h3>Variables and quoting</h3>
        <ul><li>Create a variable with <code>name="Sam"</code>: <b>no spaces</b> around the <code>=</code>. (<code>name = "Sam"</code> fails: Bash thinks <code>name</code> is a command.)</li>
        <li>Use it with <code>$name</code>, and wrap it in double quotes, <code>"$name"</code>, so a value with spaces (like a file called <i>my report.txt</i>) stays one value.</li>
        <li><code>today=$(date +%F)</code> stores a command's output, here today's date like 2026-10-12.</li></ul>
        <h3>Decisions and exit codes</h3>
        <p>Every command finishes with an <b>exit code</b>: 0 for success, anything else for failure. <code>if</code> runs on that:</p>
        <pre>if grep -q "ERROR" app.log; then
  echo "Errors found"
else
  echo "Log is clean"
fi</pre>
        <p><code>[ -f config.txt ]</code> tests whether a file exists; <code>[ "$count" -gt 10 ]</code> tests whether a number is greater than 10. <code>cmd1 &amp;&amp; cmd2</code> runs cmd2 only if cmd1 worked; <code>exit 1</code> ends a script and reports failure, which matters when a pipeline runs your script.</p>
        <h3>Loops, pipes and redirection</h3>
        <ul><li><code>for f in *.log; do gzip "$f"; done</code> runs gzip (compress) on every .log file in the folder.</li>
        <li><code>while read -r url; do ...; done &lt; urls.txt</code> runs once for each line of a file.</li>
        <li>A pipe chains commands: <code>grep ERROR app.log | sort | uniq -c</code> finds error lines, sorts them, and counts each distinct one.</li>
        <li><code>&gt; out.txt</code> writes output to a file (replacing it); <code>&gt;&gt; out.txt</code> adds to the end; <code>2&gt;&amp;1</code> sends error messages to the same place.</li></ul>
        <p><b>Safety line:</b> start serious scripts with <code>set -euo pipefail</code> under the shebang. It stops the script at the first failing command or unset variable instead of carrying on and doing damage.</p>
        <h3>Worked example, step by step</h3>
        <p>You want to check every morning that your team's websites are up. The script below reads addresses from <code>urls.txt</code>, one per line:</p>
        <ol><li><code>set -euo pipefail</code> makes it stop on mistakes. <code>failed=0</code> starts a counter.</li>
        <li><code>while read -r url</code> takes one address at a time.</li>
        <li><code>curl -s -o /dev/null -w "%{http_code}" "$url"</code> requests the page silently, throws the page away (<code>/dev/null</code> is Linux's bin) and prints only the status code, which <code>$( )</code> stores in <code>code</code>.</li>
        <li>If the code isn't 200, it prints DOWN and adds one to <code>failed</code>; otherwise it prints OK.</li>
        <li>At the end, <code>exit 1</code> if anything failed, so a scheduler or pipeline knows something is wrong.</li></ol>`,
      task: {
        title: "Write and run your first script",
        intro: "Use CloudShell / Cloud Shell, or Terminal on a Mac or Linux. This only creates one small file in your home folder.",
        steps: ["Type nano hello.sh to open an editor", "Type the three lines from \"Your first script\" above, then press Ctrl+O, Enter (save) and Ctrl+X (quit)", "Type chmod +x hello.sh", "Type ./hello.sh followed by a space and your name, for example ./hello.sh Sam"],
        expect: "The script prints Hello, followed by the name you typed, for example Hello, Sam.",
        hint: "Permission denied means the chmod step was missed. Hello, with no name means you didn't type a name after ./hello.sh. Check there are no spaces around the = in name=\"$1\".",
        good: `$ chmod +x hello.sh
$ ./hello.sh Sam
Hello, Sam`,
      },
      code: [{ label: "Check that websites are up (Bash)", note: "The worked example as a whole script. Put one address per line in urls.txt, make the script executable with chmod +x, then run ./check-sites.sh.", code: `#!/usr/bin/env bash
set -euo pipefail                 # stop on errors and unset variables

failed=0
while read -r url; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$code" != "200" ]; then
    echo "DOWN  $code  $url"
    failed=$((failed + 1))
  else
    echo "OK    $url"
  fi
done < urls.txt

if [ "$failed" -gt 0 ]; then
  exit 1                          # tell whoever ran it that something failed
fi` }],
      cards: [
        ["What does exit code 0 mean?", "The command or script succeeded. Anything else means it failed."],
        ["> or >> to add a line to the end of a log file?", ">> appends; > would replace the whole file."],
        ["Why write \"$file\" in quotes?", "So a file name with spaces stays one value instead of being split into several."],
      ],
    },
    {
      id: "python", title: "Python for cloud automation", short: "Py", yt: "boto3 python aws automation tutorial beginners",
      terms: [["Python", "A popular, readable programming language; the most common one for cloud automation and serverless functions."],
        ["Library / package / pip", "Ready-made code you can use / a library you install / the tool that installs packages (pip install boto3)."],
        ["JSON", "The text format cloud APIs speak: names and values in curly brackets, like {\"name\": \"web-1\"}."],
        ["List / dictionary", "Python's two main containers: a list holds items in order, [1, 2, 3]; a dictionary maps names to values, {\"owner\": \"sam\"}."],
        ["Function", "A named, reusable block of code that takes inputs and returns a result."],
        ["SDK", "Software development kit: a library for calling a provider's API from code. boto3 is AWS's Python SDK; Azure's is the Azure SDK for Python."],
        ["API call", "One request from your code to a cloud service, like \"list my VMs\".", "zero-accounts"],
        ["Pagination", "Getting a long list of results in pages, because an API returns only so many items per call."],
        ["Credentials", "Proof of who your script is; it should get them from your sign-in or a role, never from keys typed in the code.", "iam"]],
      body: `<p>In plain words: when a job is too big or too fiddly for a Bash one-liner, such as "find every server without an owner tag in every region and email the list", cloud engineers write a short Python script. Python reads like English, handles JSON easily, and both providers publish Python libraries for every service. It's also the most common language for <button class="link-btn inline-link" data-trsel="cloud|serverless">serverless functions</button>.</p>
        <h3>Running Python</h3>
        <p>CloudShell and Cloud Shell already have Python 3. Save code in a file such as <code>report.py</code> and run <code>python3 report.py</code>. Install a library with <code>pip install boto3</code> (AWS) or <code>pip install azure-identity azure-mgmt-compute</code> (Azure).</p>
        <h3>The Python you need first</h3>
        <ul><li><b>Variables, lists and dictionaries:</b> <code>tags = {"owner": "sam", "env": "dev"}</code>, then <code>tags["owner"]</code> is <code>"sam"</code>, and <code>tags.get("team")</code> is <code>None</code> (nothing) instead of an error.</li>
        <li><b>Loops and ifs:</b> <code>for vm in vms:</code> runs the indented lines once per item; <code>if "owner" not in tags:</code> tests something.</li>
        <li><b>Functions:</b> <code>def monthly(hourly): return hourly * 730</code> (a month is about 730 hours). Calling <code>monthly(0.02)</code> gives 14.6.</li>
        <li><b>JSON:</b> <code>json.loads(text)</code> turns JSON text into lists and dictionaries; <code>json.dumps(data)</code> turns them back into text.</li></ul>
        <h3>Calling the cloud</h3>
        <ul><li>An <b>SDK</b> wraps the provider's API: [[boto3.client("ec2").describe_instances() lists your EC2 instances|ComputeManagementClient(credential, subscription_id).virtual_machines.list_all() lists your VMs]]. The answer comes back as dictionaries and lists, exactly like parsed JSON.</li>
        <li><b>Credentials:</b> the SDK finds them by itself: from your CloudShell / Cloud Shell sign-in, your <code>aws configure sso</code> or <code>az login</code>, or the role or managed identity of the server or function it runs on. Never put access keys in a script.</li>
        <li><b>Pagination:</b> APIs return results in pages; use the SDK's paginator (AWS) or loop over the iterator (Azure) so you don't silently miss items past the first page.</li>
        <li><b>Errors:</b> wrap risky calls in <code>try: ... except ...:</code> so one failure (no permission in one region, say) is reported clearly instead of crashing the whole report.</li></ul>
        <h3>Worked example, step by step</h3>
        <p>Your manager asks: "which of our EC2 instances have no <code>owner</code> tag?" The script in the code box below:</p>
        <ol><li>Creates an EC2 client with <code>boto3.client("ec2")</code>. Credentials come from CloudShell.</li>
        <li>Uses a paginator, so every page of results is read, not just the first.</li>
        <li>Each page holds <i>reservations</i>, each with a list of <i>instances</i>. For each instance, it turns the tag list, <code>[{"Key": "owner", "Value": "sam"}]</code>, into a dictionary, <code>{"owner": "sam"}</code>, so it can look tags up by name.</li>
        <li>If <code>"owner"</code> isn't in that dictionary, it prints the instance ID.</li></ol>
        <p>The exercises below practise the same steps on sample data, right in your browser, with no cloud account needed.</p>`,
      map: [["Python SDK", "boto3", "Azure SDK for Python (azure-mgmt-*)"], ["Sign in for scripts on your computer", "aws configure sso", "az login + DefaultAzureCredential"], ["Credentials for code running in the cloud", "IAM role", "Managed identity"], ["Run Python without a server", "AWS Lambda", "Azure Functions"]],
      code: [{ label: "Find EC2 instances with no owner tag (Python, AWS)", note: "Run it in CloudShell with python3 untagged.py. It only reads: describe_instances lists instances and changes nothing. The paginator fetches every page of results.", code: `import boto3

ec2 = boto3.client("ec2", region_name="ca-central-1")
pages = ec2.get_paginator("describe_instances").paginate()

for page in pages:
    for reservation in page["Reservations"]:
        for instance in reservation["Instances"]:
            tags = {t["Key"]: t["Value"] for t in instance.get("Tags", [])}
            if "owner" not in tags:
                print(instance["InstanceId"], instance["InstanceType"])` },
        { label: "The same idea on Azure (Python)", note: "Install the two libraries first with pip. DefaultAzureCredential uses your az login or Cloud Shell sign-in; replace the subscription ID with yours.", code: `from azure.identity import DefaultAzureCredential
from azure.mgmt.compute import ComputeManagementClient

client = ComputeManagementClient(DefaultAzureCredential(), "<subscription-id>")

for vm in client.virtual_machines.list_all():
    if "owner" not in (vm.tags or {}):
        print(vm.name, vm.location)` }],
      exercises: [{
        prompt: "Write missing_owner(instances): instances is a list of dictionaries shaped like boto3's, e.g. {'InstanceId': 'i-1', 'Tags': [{'Key': 'owner', 'Value': 'sam'}]}. Some have no 'Tags' at all. Return the sorted list of InstanceIds that have no 'owner' tag.",
        starter: `def missing_owner(instances):
    pass
`,
        tests: `data = [
    {"InstanceId": "i-3", "Tags": [{"Key": "owner", "Value": "sam"}]},
    {"InstanceId": "i-2", "Tags": [{"Key": "env", "Value": "dev"}]},
    {"InstanceId": "i-1"},
]
assert missing_owner(data) == ["i-1", "i-2"]
assert missing_owner([]) == []`,
        hint: "Loop over the instances. instance.get(\"Tags\", []) gives an empty list when there are no tags. Build a set or dictionary of the tag Keys and check whether \"owner\" is in it. Sort at the end.",
        solution: `def missing_owner(instances):
    missing = []
    for instance in instances:
        keys = {t["Key"] for t in instance.get("Tags", [])}
        if "owner" not in keys:
            missing.append(instance["InstanceId"])
    return sorted(missing)`,
      }, {
        prompt: "Write monthly_costs(json_text): json_text is JSON text for a list like [{\"name\": \"web\", \"hourly\": 0.02}]. Return a dictionary from each name to its monthly cost (hourly * 730 hours), rounded to 2 decimal places.",
        starter: `import json

def monthly_costs(json_text):
    pass
`,
        tests: `text = '[{"name": "web", "hourly": 0.02}, {"name": "db", "hourly": 0.1}]'
assert monthly_costs(text) == {"web": 14.6, "db": 73.0}
assert monthly_costs("[]") == {}`,
        hint: "json.loads(json_text) gives a list of dictionaries. Loop over it and set result[item[\"name\"]] = round(item[\"hourly\"] * 730, 2).",
        solution: `import json

def monthly_costs(json_text):
    result = {}
    for item in json.loads(json_text):
        result[item["name"]] = round(item["hourly"] * 730, 2)
    return result`,
      }],
      cards: [
        ["Where should a Python script get its cloud credentials?", "From your sign-in (CloudShell, aws configure sso, az login) or the role / managed identity it runs as. Never from keys in the code."],
        ["Why use a paginator?", "APIs return results a page at a time; without paginating you silently miss everything after the first page."],
        ["What does json.loads do?", "Turns JSON text into Python lists and dictionaries."],
      ],
    },
    {
      id: "terraform", title: "Terraform basics", short: "TF", yt: "terraform tutorial for beginners",
      terms: [["Terraform", "A tool that creates and changes cloud resources from text files, for AWS, Azure and many others."],
        ["IaC", "Infrastructure as code: your cloud setup written in files you can review and rerun.", "devops"],
        ["HCL / .tf files", "HashiCorp Configuration Language, the format Terraform files are written in; they end in .tf."],
        ["Provider", "The plugin that teaches Terraform one platform's API: aws or azurerm."],
        ["Resource", "One thing Terraform manages, such as a bucket or a resource group."],
        ["Variable / output", "An input you can change without editing the code / a value Terraform prints after it runs."],
        ["Plan / apply / destroy", "Preview the changes / make them / delete everything this configuration created."],
        ["State", "Terraform's record of what it created and what it's called in the cloud, so it knows what to change next time."],
        ["Drift", "When someone changes a resource by hand, so the cloud no longer matches the files."]],
      body: `<p>In plain words: instead of clicking through the console, you describe what you want in a file ("a storage bucket called <i>sam-site</i>, tagged env=dev") and Terraform makes the cloud match. Run it again tomorrow and it changes only what's different. This lesson teaches the basics you need before the <button class="link-btn inline-link" data-trsel="cloud|devops">DevOps</button> topic and the network lab, which assume them.</p>
        <h3>The building blocks</h3>
        <ul><li><b>Provider:</b> tells Terraform which cloud, and which region, to talk to: [[provider "aws" { region = "ca-central-1" }|provider "azurerm" { features {} }]].</li>
        <li><b>Resource:</b> one thing to create. A resource block has a <i>type</i>, a local <i>name</i> you choose, and <i>arguments</i>: [[resource "aws_s3_bucket" "site" { bucket = "sam-site-2026" }|resource "azurerm_resource_group" "lab" { name = "rg-lab", location = "canadacentral" }]].</li>
        <li><b>References:</b> one resource can use another's values, written <code>type.name.attribute</code>, like <code>aws_vpc.main.id</code>. Terraform works out the right order from these links.</li>
        <li><b>Variables and outputs:</b> <code>variable "env" { default = "dev" }</code>, used as <code>var.env</code>; <code>output "bucket_name" { value = aws_s3_bucket.site.bucket }</code> prints a value after apply.</li></ul>
        <h3>The workflow</h3>
        <ol><li><code>terraform init</code>: once per folder; downloads the provider plugins.</li>
        <li><code>terraform plan</code>: shows what would change and changes nothing. Read it every time: <code>+</code> create, <code>~</code> change in place, <code>-</code> destroy, and <code>-/+</code> destroy and recreate (a "replace", which can mean downtime or lost data).</li>
        <li><code>terraform apply</code>: shows the plan again and asks you to type <code>yes</code>.</li>
        <li><code>terraform destroy</code>: deletes everything this folder created. Every lab ends with it.</li></ol>
        <h3>State</h3>
        <p>After apply, Terraform writes <code>terraform.tfstate</code>: the link between <code>aws_s3_bucket.site</code> in your file and the real bucket. Lose it, and Terraform forgets it created the bucket. Don't edit it by hand and don't commit it to Git (it can contain secrets). For a team, keep it in shared, locked storage, as the DevOps topic explains. If someone changes a resource by hand (<b>drift</b>), the next plan shows the difference.</p>
        <h3>Worked example, step by step</h3>
        <ol><li>In an empty folder you write <code>main.tf</code> with a provider block and one resource ([[an S3 bucket|a resource group]]) tagged <code>env = "dev"</code>.</li>
        <li><code>terraform init</code> downloads the provider: <i>Terraform has been successfully initialized!</i></li>
        <li><code>terraform plan</code>: <i>Plan: 1 to add, 0 to change, 0 to destroy.</i></li>
        <li><code>terraform apply</code>, then <code>yes</code>: <i>Apply complete! Resources: 1 added, 0 changed, 0 destroyed.</i> It now exists in the console.</li>
        <li>You change the tag to <code>env = "test"</code> and plan again: <code>~ tags</code>, <i>1 to change</i>, an in-place update. Apply.</li>
        <li><code>terraform destroy</code>, <code>yes</code>: <i>Destroy complete! Resources: 1 destroyed.</i></li></ol>`,
      task: {
        title: "Create one free resource with Terraform, then destroy it",
        intro: "Azure Cloud Shell has Terraform installed; on AWS, run terraform -version in CloudShell first, and if it isn't there, install it on your computer from developer.hashicorp.com/terraform/install. An empty Azure resource group is free, and an empty S3 bucket costs nothing.",
        steps: ["Make a folder and move into it: mkdir tf-first && cd tf-first", "Create main.tf with nano and type in the example from the code box below for your cloud (change the bucket name to something unique)", "Run terraform init, then terraform plan", "Run terraform apply and type yes", "Run terraform destroy and type yes"],
        expect: "apply ends with Apply complete! Resources: 1 added, 0 changed, 0 destroyed. and destroy ends with Destroy complete! Resources: 1 destroyed.",
        hint: "A bucket name that's already taken fails on apply: pick a more unique one. An error about credentials means you're not signed in: CloudShell and Cloud Shell sign you in automatically.",
        good: `$ terraform apply
...
Plan: 1 to add, 0 to change, 0 to destroy.
  Enter a value: yes
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.`,
      },
      code: [{ label: "main.tf: one tagged bucket (AWS)", note: "The terraform block says which provider plugin to download; the provider block picks the region; the resource block is the bucket itself. The output prints the bucket's name after apply.", code: `terraform {
  required_providers {
    aws = { source = "hashicorp/aws" }
  }
}

provider "aws" {
  region = "ca-central-1"
}

resource "aws_s3_bucket" "site" {
  bucket = "sam-site-2026-xyz"     # must be unique worldwide
  tags   = { env = "dev" }
}

output "bucket_name" {
  value = aws_s3_bucket.site.bucket
}` }, { label: "main.tf: one resource group (Azure)", note: "The same shape for Azure. features {} is required by the azurerm provider even when empty. A resource group is a free folder for Azure resources.", code: `terraform {
  required_providers {
    azurerm = { source = "hashicorp/azurerm" }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "lab" {
  name     = "rg-tf-first"
  location = "canadacentral"
  tags     = { env = "dev" }
}

output "group_id" {
  value = azurerm_resource_group.lab.id
}` }],
      cards: [
        ["What does a Terraform provider do?", "It's the plugin that talks to one platform's API (aws, azurerm), so Terraform can create resources there."],
        ["In a plan, what does -/+ mean?", "Destroy and recreate (replace): the resource is deleted and a new one made, which can mean downtime or data loss."],
        ["Why shouldn't terraform.tfstate go into Git?", "It can contain secrets, and the team needs one shared, locked copy, not copies in everyone's clone."],
      ],
    },
  ],

  quiz: [
    // Linux command line essentials
    { id: "x52", tags: [], topic: "linux", q: "Which command shows how full each disk is?", options: ["ls -la", "df -h", "ps aux", "chmod +x"], answer: 1, why: "df shows disk usage; -h prints sizes like 18G. du -sh shows which folders take the space." },
    { id: "x53", tags: [], topic: "linux", q: "A file shows -rwxr-x--- in ls -l. What can members of its group do?", options: ["Nothing", "Read and execute, but not change it", "Read, write and execute", "Only write"], answer: 1, why: "The three groups of three are owner (rwx), group (r-x) and everyone else (---). r-x means read and execute, no write." },
    { id: "x54", tags: [], topic: "linux", q: "The nginx service won't start. Which command shows its recent log messages?", options: ["journalctl -u nginx", "df -h", "cd /nginx", "sudo reboot"], answer: 0, why: "journalctl -u name shows a service's logs; systemctl status name shows its state and the last few lines." },
    { id: "x55", tags: [], topic: "linux", q: "In the task, what did cat /etc/os-release show?", options: ["Your AWS or Azure password", "The name and version of the Linux distribution", "A list of running programs", "Nothing: the file is empty"], answer: 1, why: "/etc/os-release describes the operating system: NAME= and VERSION= lines such as Amazon Linux 2023 or Azure Linux." },
    // Bash scripting basics
    { id: "x56", tags: [], topic: "bash", q: "What does exit code 0 mean?", options: ["The command failed", "The command succeeded", "The script is still running", "Zero files were found"], answer: 1, why: "By convention 0 means success and any other number means failure; if and && rely on this." },
    { id: "x57", tags: [], topic: "bash", q: "Why does name = \"Sam\" fail in Bash?", options: ["Names can't be capitalized", "There must be no spaces around =", "Bash has no variables", "Quotes aren't allowed"], answer: 1, why: "With spaces, Bash treats name as a command to run. Write name=\"Sam\"." },
    { id: "x58", tags: [], topic: "bash", q: "You want to add a line to the end of log.txt without deleting what's there. Which do you use?", options: ["echo \"done\" > log.txt", "echo \"done\" >> log.txt", "echo \"done\" | log.txt", "cat log.txt done"], answer: 1, why: ">> appends to the end; > replaces the whole file." },
    { id: "x59", tags: [], topic: "bash", q: "In the task you ran ./hello.sh Sam. Inside the script, what does $1 hold?", options: ["hello.sh", "Sam", "The number 1", "Nothing"], answer: 1, why: "$1 is the first argument typed after the script's name, so the script printed Hello, Sam." },
    // Python for cloud automation
    { id: "x60", tags: [], topic: "python", q: "What is boto3?", options: ["A Linux distribution", "AWS's software development kit (SDK) for Python", "A Terraform provider", "An Azure billing tool"], answer: 1, why: "boto3 is the library Python code uses to call AWS APIs. Azure's equivalent is the Azure SDK for Python." },
    { id: "x61", tags: [], topic: "python", q: "Where should an automation script get its cloud credentials?", options: ["Access keys typed into the script", "Your sign-in, or the role / managed identity it runs as", "A public GitHub repository", "The script's file name"], answer: 1, why: "SDKs find credentials themselves from your sign-in or the role they run as, so no key is ever written in code." },
    { id: "x62", tags: [], topic: "python", q: "Your script lists instances but only ever shows the first 1,000. What's the likely cause?", options: ["Python can't count past 1,000", "It reads only the first page of results instead of paginating", "The account is out of credits", "The region is wrong"], answer: 1, why: "APIs return results a page at a time. A paginator (or looping over the iterator) reads every page." },
    // Terraform basics
    { id: "x63", tags: [], topic: "terraform", q: "What does a Terraform provider do?", options: ["Pays your cloud bill", "Teaches Terraform one platform's API, such as aws or azurerm", "Stores your Git history", "Runs your web server"], answer: 1, why: "Providers are plugins that turn resource blocks into API calls for one platform; terraform init downloads them." },
    { id: "x64", tags: [], topic: "terraform", q: "In terraform plan output, what does -/+ next to a resource mean?", options: ["It will be created", "It will be changed in place", "It will be destroyed and recreated (replaced)", "Nothing will happen"], answer: 2, why: "+ creates, ~ updates in place, - destroys, and -/+ replaces, which can cause downtime or data loss, so read it carefully." },
    { id: "x65", tags: [], topic: "terraform", q: "Why shouldn't terraform.tfstate be committed to Git?", options: ["It's too small", "It can contain secrets, and a team needs one shared, locked copy", "Git can't store text files", "Terraform deletes it after every run"], answer: 1, why: "State maps your files to real resources and may include sensitive values; keep it in remote, locked storage." },
    { id: "x66", tags: [], topic: "terraform", q: "In the task, what did terraform apply print at the end?", options: ["Apply complete! Resources: 1 added, 0 changed, 0 destroyed.", "Destroy complete! Resources: 1 destroyed.", "Error: no providers", "Nothing"], answer: 0, why: "apply reports how many resources it added, changed and destroyed; destroy prints its own summary later." },
  ],

  glossary: [
    ["Bash", "The shell most Linux servers use, and the language of shell scripts."],
    ["boto3", "AWS's Python SDK: the library Python code uses to call AWS APIs."],
    ["Exit code", "The number a command finishes with: 0 for success, anything else for failure."],
    ["HCL", "HashiCorp Configuration Language, the format of Terraform's .tf files."],
    ["Linux distribution", "A packaged version of Linux, such as Ubuntu, Amazon Linux or Azure Linux."],
    ["Pagination", "Reading a long API result a page at a time."],
    ["SDK", "Software development kit: a library for calling a provider's API from code."],
    ["sudo", "Runs one command as root, Linux's all-powerful user."],
    ["systemd / systemctl", "The part of Linux that starts and watches services / the command that controls them."],
    ["Terraform provider", "The plugin that lets Terraform manage one platform, such as aws or azurerm."],
  ],
});
