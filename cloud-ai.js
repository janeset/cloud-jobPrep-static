// AI Practitioner (AIF-C01) lessons: AI and ML fundamentals; generative AI and Amazon Bedrock;
// responsible AI, security and governance. They follow the AIF-C01 exam guide, version 1.1
// (published 2026-04-30), including its agentic AI objectives. Checks are tagged AIF, so they also
// count towards the AIF practice exam (awscerts.js maps these topics to its domains).
// Merged into CLOUD by extendTrack; where they sit in each path is set in cloud-zero.js / cloud-plan.js.

extendTrack(CLOUD, {
  topics: [
    {
      id: "aifund", title: "AI and machine learning fundamentals", short: "AI", yt: "machine learning explained for beginners supervised unsupervised",
      terms: [["AI / ML / deep learning", "AI is any technique that makes computers act intelligently; ML is AI that learns patterns from data; deep learning is ML using many-layered neural networks."],
        ["Generative AI / agentic AI", "AI that creates new content (text, images, code) / AI that plans and takes actions with tools to reach a goal."],
        ["Model / algorithm", "A model is what learning produces: a function that turns inputs into predictions. An algorithm is the method used to learn it."],
        ["Training / inference", "Learning a model from data / using the trained model to make a prediction."],
        ["Features / labels", "The inputs a model learns from (age, amount, time) / the right answers it learns to predict (fraud or not)."],
        ["Supervised / unsupervised / reinforcement", "Learning from labelled examples / finding patterns in unlabelled data / learning by trial, error and rewards."],
        ["Regression / classification / clustering", "Predicting a number / predicting a category / grouping similar items without labels."],
        ["Overfitting / underfitting", "A model that memorised its training data and fails on new data / a model too simple to capture the pattern at all."],
        ["Precision / recall", "Of the items flagged, how many were right / of the items that should have been flagged, how many were found."],
        ["MLOps", "Running ML like software: repeatable pipelines, versioning, monitoring and retraining."]],
      body: `<p>In plain words: <b>machine learning</b> is a way to get a computer to do a task by showing it examples instead of writing rules. Show a model thousands of past transactions labelled "fraud" or "not fraud" and it learns the patterns, then flags new ones. This lesson covers the vocabulary and the AWS services for the first domain of the AI Practitioner exam (20% of it), which is about using AI, not building it.</p>
        <h3>The family tree</h3>
        <ul><li><b>Artificial intelligence</b> is the whole field. <b>Machine learning</b> is the part that learns from data. <b>Deep learning</b> is ML with <b>neural networks</b> of many layers, which powers image recognition, speech and language. <b>Generative AI</b> uses very large deep-learning models, called <b>foundation models</b>, to create text, images and code. <b>Agentic AI</b> puts those models in a loop where they plan steps and use tools (search, APIs, code) to finish a task.</li>
        <li>Common jobs: <b>computer vision</b> (understanding images), <b>natural language processing</b> or NLP (understanding text), speech recognition, recommendations, fraud detection and forecasting.</li></ul>
        <h3>How models learn</h3>
        <ul><li><b>Supervised learning</b> learns from labelled examples. <b>Regression</b> predicts a number (next month's sales); <b>classification</b> predicts a category (spam or not).</li>
        <li><b>Unsupervised learning</b> finds structure in unlabelled data, such as <b>clustering</b> customers into groups that behave alike.</li>
        <li><b>Reinforcement learning</b> learns by trying actions and receiving rewards, as in robotics or game playing. A variation, reinforcement learning from human feedback (RLHF), is used to make chat models helpful.</li>
        <li>Data comes in kinds: <b>labelled or unlabelled</b>; <b>structured</b> (tables, time series) or <b>unstructured</b> (text, images, audio).</li></ul>
        <h3>Using a trained model: inference</h3>
        <ul><li><b>Real-time</b>: an answer in milliseconds for each request (approve this card payment?). <b>Batch</b>: score a big file on a schedule (rate every customer overnight). <b>Asynchronous</b>: queue large or slow requests and collect results later. <b>Serverless</b>: no servers to manage, pay per use, good for spiky traffic.</li></ul>
        <h3>The ML lifecycle</h3>
        <ol><li>Define the business goal and how you'll measure success.</li>
        <li>Collect data, explore it, clean it and pick or create <b>features</b> (feature engineering).</li>
        <li><b>Train</b> a model and tune its settings (hyperparameters), then <b>evaluate</b> it on data it hasn't seen.</li>
        <li><b>Deploy</b> it, <b>monitor</b> it (real-world data drifts away from training data), and <b>retrain</b> when accuracy drops.</li></ol>
        <p><b>MLOps</b> makes this repeatable: automated pipelines, versioned data and models, experiments you can compare, and monitoring. On AWS, <b>Amazon SageMaker AI</b> covers the whole lifecycle for people who build their own models, and <b>SageMaker JumpStart</b> offers ready-made models to start from.</p>
        <h3>Is the model any good?</h3>
        <ul><li><b>Accuracy</b>: the share of all predictions that were right. It's misleading when one class is rare: if 1% of payments are fraud, a model that always says "not fraud" is 99% accurate and useless.</li>
        <li><b>Precision</b>: of the payments it flagged, how many really were fraud. <b>Recall</b>: of the real frauds, how many it caught. <b>F1 score</b> balances the two. A cancer screen wants high recall (miss nothing); a spam filter wants high precision (don't bin real email).</li>
        <li><b>Fit:</b> an <b>overfitted</b> model memorised its training data (high variance) and does badly on new data; an <b>underfitted</b> one is too simple (high bias) and does badly everywhere.</li>
        <li>Business metrics matter too: cost per user, development cost, customer feedback and return on investment (ROI).</li></ul>
        <h3>When not to use ML</h3>
        <p>If a simple rule gives the exact answer (calculate tax), if you need a guaranteed outcome rather than a prediction, if there's too little data, or if the cost outweighs the benefit, don't use ML. And choose a <b>traditional ML model</b> over a foundation model when regulators require you to explain each decision, or when latency and cost must be very low.</p>
        <h3>AWS AI services you call, without training anything</h3>
        <table><tr><th>Service</th><th>What it does</th></tr>
        <tr><td>Amazon Rekognition</td><td>Finds objects, faces and unsafe content in images and video</td></tr>
        <tr><td>Amazon Textract</td><td>Extracts text, tables and form fields from scanned documents</td></tr>
        <tr><td>Amazon Comprehend</td><td>Finds sentiment, key phrases, entities and personal data in text</td></tr>
        <tr><td>Amazon Transcribe / Polly</td><td>Speech to text / text to lifelike speech</td></tr>
        <tr><td>Amazon Translate</td><td>Translates text between languages</td></tr>
        <tr><td>Amazon Lex</td><td>Builds chatbots and voice bots (the technology behind Alexa)</td></tr>
        <tr><td>Amazon Personalize</td><td>Product and content recommendations</td></tr>
        <tr><td>Amazon SageMaker AI</td><td>Build, train and deploy your own models</td></tr></table>
        <h3>Worked example, step by step</h3>
        <p>An insurer wants to speed up claims. Paper forms arrive by email; customers phone in; some claims are fraudulent.</p>
        <ol><li>Scanned claim forms: <b>Textract</b> pulls out the fields, so nobody retypes them.</li>
        <li>Phone calls: <b>Transcribe</b> turns them into text; <b>Comprehend</b> flags angry customers for a callback.</li>
        <li>Fraud: a <b>supervised classification</b> model trained in <b>SageMaker AI</b> on past claims labelled fraud or not. Fraud is rare, so they judge it on <b>recall</b> (catch most fraud) and <b>precision</b> (don't annoy honest customers), not accuracy.</li>
        <li>Scoring: new claims are scored in <b>real time</b>; the whole book is re-scored in a nightly <b>batch</b>. The model is monitored and retrained each quarter.</li></ol>`,
      exercises: [{
        prompt: "Write metrics(tp, fp, fn, tn) returning a dictionary with accuracy, precision, recall and f1, each rounded to 3 decimals. tp = true positives (fraud caught), fp = false positives (honest flagged), fn = false negatives (fraud missed), tn = true negatives. If precision + recall is 0, f1 is 0.",
        starter: `def metrics(tp, fp, fn, tn):
    pass
`,
        tests: `m = metrics(80, 20, 20, 880)
assert m == {"accuracy": 0.96, "precision": 0.8, "recall": 0.8, "f1": 0.8}
m = metrics(0, 0, 10, 990)
assert m["accuracy"] == 0.99 and m["recall"] == 0.0 and m["f1"] == 0, "always saying 'not fraud' is 99% accurate but useless"`,
        hint: "accuracy = (tp + tn) / total. precision = tp / (tp + fp), recall = tp / (tp + fn); guard against dividing by zero. f1 = 2 * precision * recall / (precision + recall).",
        solution: `def metrics(tp, fp, fn, tn):
    total = tp + fp + fn + tn
    precision = tp / (tp + fp) if tp + fp else 0
    recall = tp / (tp + fn) if tp + fn else 0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0
    return {
        "accuracy": round((tp + tn) / total, 3),
        "precision": round(precision, 3),
        "recall": round(recall, 3),
        "f1": round(f1, 3),
    }`,
      }],
      cards: [
        ["Regression, classification or clustering: predicting next month's sales?", "Regression: the answer is a number."],
        ["Why is accuracy misleading for fraud detection?", "Fraud is rare, so a model that never flags fraud can still be about 99% accurate. Use precision and recall."],
        ["Which AWS service extracts tables and form fields from scanned documents?", "Amazon Textract."],
        ["Batch vs real-time inference?", "Batch scores a large set on a schedule; real-time answers each request within milliseconds."],
      ],
    },
    {
      id: "genai", title: "Generative AI & Amazon Bedrock", short: "GenAI", yt: "Amazon Bedrock explained RAG agents beginners",
      terms: [["Foundation model (FM) / LLM", "A very large model trained on huge amounts of data that can be adapted to many tasks / a foundation model for language."],
        ["Token", "A piece of text a model reads or writes, roughly three-quarters of a word; models are priced and limited by tokens."],
        ["Prompt / context window", "The instructions and information you send / how many tokens the model can consider at once."],
        ["Temperature", "An inference setting: low gives focused, repeatable answers; high gives more varied, creative ones."],
        ["Embedding / vector", "A list of numbers representing the meaning of a piece of text, so similar meanings have similar numbers."],
        ["Chunking", "Splitting documents into smaller pieces before embedding them."],
        ["RAG", "Retrieval Augmented Generation: look up relevant passages first, then give them to the model with the question, so answers are grounded in your documents."],
        ["Fine-tuning", "Further training a foundation model on your own labelled examples to adapt it to a task or domain."],
        ["Hallucination", "A confident answer that is false or made up."],
        ["Agent / MCP", "A model that plans and calls tools to finish a task / Model Context Protocol, an open standard for connecting agents to tools and data."]],
      body: `<p>In plain words: generative AI models write text, code and images from a <b>prompt</b>. On AWS the main way to use them is <b>Amazon Bedrock</b>: one API to many foundation models (Amazon Nova, Anthropic Claude, Meta Llama, Mistral and others), with no servers to run. Generative AI fundamentals (24%) and applications of foundation models (28%) make up over half the AI Practitioner exam. You'll need <button class="link-btn inline-link" data-trsel="cloud|aifund">AI and machine learning fundamentals</button> first.</p>
        <h3>How these models work</h3>
        <ul><li>Text is split into <b>tokens</b>. A <b>large language model</b>, built on the <b>transformer</b> architecture, predicts the next token again and again. <b>Multimodal</b> models also take or produce images, audio or video; <b>diffusion</b> models generate images by gradually removing noise.</li>
        <li>A foundation model's life: select data, <b>pre-train</b> it (very expensive), <b>fine-tune</b> it for tasks, <b>evaluate</b> it, deploy it, and improve it from feedback.</li>
        <li><b>Strengths:</b> adaptable, conversational, fast at producing content. <b>Weaknesses:</b> <b>hallucinations</b>, <b>nondeterminism</b> (the same prompt can give different answers), and it's hard to explain why it answered as it did.</li></ul>
        <h3>Inference settings and cost</h3>
        <ul><li><b>Temperature</b> (and top-p) control randomness: near 0 for facts and extraction, higher for brainstorming. <b>Maximum output length</b> caps the answer.</li>
        <li>Pricing is per token, input and output, so long prompts and long answers cost more and take longer. Bedrock offers <b>on-demand</b> (pay per token), <b>batch</b> (cheaper, not real-time) and <b>provisioned throughput</b> (reserved capacity for steady, high volume, and required for some custom models). <b>Prompt caching</b> cuts the cost of repeating the same long context.</li>
        <li><b>Choosing a model:</b> quality on your task, cost, latency, modality (text, images), languages, context window size, and whether it can be customised.</li></ul>
        <h3>Prompt engineering</h3>
        <ul><li>A good prompt gives <b>context</b>, a clear <b>instruction</b>, the <b>format</b> you want, and sometimes <b>negative prompts</b> (what to avoid).</li>
        <li><b>Zero-shot</b>: no examples. <b>One-shot / few-shot</b>: include one or a few examples of input and the desired output. <b>Chain-of-thought</b>: ask the model to reason step by step. <b>Prompt templates</b> reuse a tested structure; <b>Bedrock Prompt Management</b> stores, versions and tests prompts.</li>
        <li><b>Context engineering</b> is the wider job of deciding everything the model sees: instructions, retrieved documents, conversation history, tool results.</li>
        <li><b>Risks:</b> <b>prompt injection</b> or hijacking (text that overrides your instructions, even hidden inside a document), <b>jailbreaking</b> (tricking the model past its safety rules), <b>poisoning</b> (corrupted training or retrieval data), and <b>exposure</b> (leaking the system prompt or private data).</li></ul>
        <h3>Making a model know your data: from cheapest to most expensive</h3>
        <ol><li><b>Prompt engineering and in-context learning</b>: put instructions and examples in the prompt. No training.</li>
        <li><b>RAG</b>: chunk your documents, turn the chunks into <b>embeddings</b>, store them in a <b>vector database</b>; at question time, find the most similar chunks and add them to the prompt. Answers are grounded in your data, and new documents are used as soon as they're indexed. <b>Bedrock Knowledge Bases</b> manage this. Vector stores on AWS include <b>OpenSearch Service</b>, <b>Aurora</b> and <b>RDS for PostgreSQL</b> (with pgvector), and <b>Neptune</b>.</li>
        <li><b>Fine-tuning</b>: train further on your labelled examples to change the model's style or teach a task (instruction tuning, domain adaptation). <b>Continued pre-training</b> uses lots of unlabelled domain text. <b>Distillation</b> trains a smaller, cheaper model to copy a bigger one.</li>
        <li><b>Pre-training</b> your own model from scratch: by far the most data, time and money.</li></ol>
        <h3>Agents</h3>
        <p>An <b>agent</b> uses a model to plan, call <b>tools</b> (APIs, databases, code), keep <b>memory</b> between steps, and work towards a goal: "rebook my cancelled flight and email me the new ticket". <b>Multi-agent</b> systems split work between specialised agents coordinated by a supervisor. The <b>Model Context Protocol (MCP)</b> is an open standard for connecting agents to tools and data. On AWS: <b>Bedrock Agents</b>, <b>Amazon Bedrock AgentCore</b> (runtime, memory, identity, tool gateway and observability for running agents in production), and <b>Strands Agents</b> (an open-source SDK for building agents in code).</p>
        <h3>Other AWS generative AI services to recognise</h3>
        <ul><li><b>Amazon Nova</b>: Amazon's own foundation models, in Bedrock. <b>SageMaker JumpStart</b>: deploy and fine-tune open models in SageMaker.</li>
        <li><b>Amazon Q</b>: generative AI assistants for developers and businesses. <b>Amazon Quick</b>: an AI workspace for business users that brings together analytics dashboards, research and automation. <b>Kiro</b>: AWS's agentic coding tool (an IDE and CLI). <b>AWS Transform</b>: agents that help migrate and modernise applications.</li>
        <li>Why use managed services: a low barrier to entry, speed to market, and pay-per-use pricing, with AWS's security and compliance underneath.</li></ul>
        <h3>Evaluating a model or application</h3>
        <ul><li><b>Bedrock Model Evaluation</b> runs automatic tests on benchmark or your own datasets, with human reviewers, or with <b>LLM-as-a-judge</b> (another model scores the answers).</li>
        <li>Metrics: <b>ROUGE</b> (summaries: overlap with a reference), <b>BLEU</b> (translation), <b>BERTScore</b> (similarity of meaning). For RAG and agents, also check retrieval quality and task completion.</li>
        <li>Business metrics: task completion rate, user satisfaction, cost per interaction, conversion rate, ROI.</li></ul>
        <h3>Worked example, step by step</h3>
        <p>A bank wants a chatbot that answers employees' HR questions from 2,000 policy documents.</p>
        <ol><li>Fine-tuning would go out of date every time a policy changes, so they choose <b>RAG</b> with a <b>Bedrock Knowledge Base</b>: documents in S3 are chunked, embedded and stored in a vector store.</li>
        <li>For each question, the knowledge base retrieves the 5 most relevant chunks and sends them with the question to a model in Bedrock, at <b>temperature 0</b> for consistent answers, with an instruction to cite the policy and say "I don't know" if the answer isn't in the documents.</li>
        <li>They test it with <b>Bedrock Model Evaluation</b> on 200 real questions with known answers, and track cost per answer (tokens in and out).</li>
        <li>Next lesson: they add <b>Guardrails</b> to block off-topic questions and mask personal data.</li></ol>
        <p><b>Going further:</b> the Roles track's <button class="link-btn inline-link" data-trsel="roles|permrag">Permission-aware retrieval &amp; reranking</button> and <button class="link-btn inline-link" data-trsel="roles|entagents">Production agents</button> lessons go deeper for AI Cloud Engineer roles.</p>`,
      task: {
        title: "Change one setting and watch the answer change",
        intro: "In the AWS console, open Amazon Bedrock, then the Playground (chat). Pick an Amazon Nova model. A few short prompts cost a fraction of a cent; if the console asks you to enable model access first, follow its prompt. You can also do this on a free plan's credits.",
        steps: ["Type: Suggest a name for a coffee shop in Toronto. Answer with one name only.", "Set Temperature to 0 and run the same prompt three times", "Set Temperature to 1 and run it three times again", "Compare the six answers"],
        expect: "At temperature 0 the three answers are the same or nearly the same; at temperature 1 they vary from run to run.",
        hint: "The inference settings (temperature, top P, maximum length) are in a panel next to the chat; you may need to open it with a settings or configurations button. If the model isn't listed, try another Nova model or a different region.",
        good: `Temperature 0:  "Bean There"  /  "Bean There"  /  "Bean There"
Temperature 1:  "Maple Grind"  /  "Queen West Roasters"  /  "Bean There"`,
      },
      exercises: [{
        prompt: "Write call_cost(input_tokens, output_tokens, in_per_1k, out_per_1k): the cost in dollars of one model call, where prices are per 1,000 tokens. Then write monthly_cost(calls_per_day, input_tokens, output_tokens, in_per_1k, out_per_1k) for 30 days. Round both to 4 decimals.",
        starter: `def call_cost(input_tokens, output_tokens, in_per_1k, out_per_1k):
    pass

def monthly_cost(calls_per_day, input_tokens, output_tokens, in_per_1k, out_per_1k):
    pass
`,
        tests: `assert call_cost(2000, 500, 0.0008, 0.0032) == 0.0032
assert monthly_cost(1000, 2000, 500, 0.0008, 0.0032) == 96.0
assert call_cost(0, 0, 1, 1) == 0`,
        hint: "Each part is tokens / 1000 * price. Add input and output. For a month, multiply one call's cost by calls_per_day * 30, and round at the end.",
        solution: `def call_cost(input_tokens, output_tokens, in_per_1k, out_per_1k):
    cost = input_tokens / 1000 * in_per_1k + output_tokens / 1000 * out_per_1k
    return round(cost, 4)

def monthly_cost(calls_per_day, input_tokens, output_tokens, in_per_1k, out_per_1k):
    one = input_tokens / 1000 * in_per_1k + output_tokens / 1000 * out_per_1k
    return round(one * calls_per_day * 30, 4)`,
      }, {
        prompt: "Write chunk(words, size, overlap): split a list of words into chunks of at most `size` words, where each chunk starts `size - overlap` words after the previous one (overlap keeps context across chunk edges). Return a list of lists; stop once a chunk reaches the last word.",
        starter: `def chunk(words, size, overlap):
    pass
`,
        tests: `w = "a b c d e f g".split()
assert chunk(w, 3, 1) == [["a", "b", "c"], ["c", "d", "e"], ["e", "f", "g"]]
assert chunk(w, 4, 0) == [["a", "b", "c", "d"], ["e", "f", "g"]]
assert chunk([], 3, 1) == []`,
        hint: "Step through start positions 0, step, 2*step... where step = size - overlap. Take words[start:start + size]; stop after the chunk that includes the last word (start + size >= len(words)).",
        solution: `def chunk(words, size, overlap):
    chunks, step, start = [], size - overlap, 0
    while start < len(words):
        chunks.append(words[start:start + size])
        if start + size >= len(words):
            break
        start += step
    return chunks`,
      }],
      cards: [
        ["RAG or fine-tuning for answers from documents that change every week?", "RAG: new documents are used as soon as they're indexed, and answers can cite their sources. Fine-tuning would need retraining."],
        ["What does temperature control?", "Randomness: low for consistent, factual answers; high for varied, creative ones."],
        ["Zero-shot vs few-shot prompting?", "Zero-shot gives only instructions; few-shot also includes a few worked examples of input and output."],
        ["What is prompt injection?", "Text (sometimes hidden in a document or web page) that tries to override the application's instructions."],
      ],
    },
    {
      id: "airesp", title: "Responsible AI, security & governance", short: "RAI", yt: "responsible AI explained bias explainability guardrails",
      terms: [["Responsible AI", "Building AI that is fair, safe, accurate, explainable, private and well governed."],
        ["Bias / fairness", "Systematically worse results for some groups / making sure outcomes don't unfairly differ between groups."],
        ["Explainability / transparency", "Being able to say why a model gave a result / being open about how it was built, on what data, and its limits."],
        ["Guardrails", "Rules that filter what goes into and comes out of a model, such as blocked topics or masked personal data."],
        ["Grounding", "Tying answers to trusted sources (as in RAG) so they can be checked, which reduces hallucinations.", "genai"],
        ["Human-in-the-loop", "People review some of the model's outputs, especially uncertain or high-stakes ones."],
        ["Data lineage", "A record of where data came from and how it changed on the way into a model."],
        ["Shared responsibility", "AWS secures the infrastructure; you secure your data, access, prompts and use of the model.", "fundamentals"]],
      body: `<p>In plain words: an AI system can be unfair, leak private data, be tricked, or say false things with confidence. Responsible AI is the set of habits and tools that prevent that, and security and governance make sure the system follows the law and your company's rules. These are the last two domains of the AI Practitioner exam (14% each). They build on <button class="link-btn inline-link" data-trsel="cloud|genai">Generative AI &amp; Amazon Bedrock</button> and <button class="link-btn inline-link" data-trsel="cloud|secdeep">AWS security services</button>.</p>
        <h3>What responsible AI means</h3>
        <ul><li>The properties: <b>fairness</b> (no group treated worse), <b>inclusivity</b>, <b>robustness</b> (works on unusual inputs), <b>safety</b> (no harmful output), <b>veracity</b> (truthful), <b>explainability</b>, <b>privacy</b>, and <b>governance</b>.</li>
        <li><b>Data comes first:</b> a model learns whatever its data contains. Use diverse, balanced, representative, well-labelled, curated data. If a loan model's history under-approved one group, the model learns to do the same.</li>
        <li><b>Bias and variance:</b> high bias (underfitting) is wrong for everyone; high variance (overfitting) is unreliable on new data. Both can hit some groups harder, so check results per <b>subgroup</b>, audit labels, and have people review samples.</li>
        <li><b>Legal and business risks</b> of generative AI: intellectual-property claims over generated content, biased outputs, hallucinations that mislead customers, and lost trust.</li>
        <li>Choose models responsibly, too: a smaller model that's good enough uses less energy and money (sustainability).</li></ul>
        <h3>Explainable and transparent</h3>
        <ul><li>A simple model, like a decision tree, can be <b>explained</b> (this loan was refused because income &lt; X). A large neural network or foundation model is a black box, so there's a trade-off between <b>performance</b> and <b>interpretability</b>.</li>
        <li><b>SageMaker Clarify</b> detects bias in data and models and explains which features drove a prediction. <b>SageMaker Model Cards</b> document a model's purpose, training data, metrics and limits. <b>Bedrock Model Evaluation</b> compares models on quality and safety. Open-source models with published data and licences are more transparent.</li>
        <li><b>Human-centred design:</b> tell users when they're talking to AI, show sources, explain decisions in plain words, and give them a way to give feedback or ask for a human. <b>Amazon Augmented AI (A2I)</b> sends low-confidence predictions to human reviewers.</li></ul>
        <h3>Amazon Bedrock Guardrails</h3>
        <p>Guardrails apply the same safety rules to any model in Bedrock: <b>content filters</b> (hate, insults, sexual content, violence, misconduct, and prompt attacks), <b>denied topics</b> ("don't give investment advice"), <b>word filters</b>, <b>sensitive information filters</b> that block or mask personal data such as card numbers, <b>contextual grounding checks</b> that catch answers not supported by the retrieved sources, and <b>Automated Reasoning checks</b> that verify answers against rules you define.</p>
        <h3>Securing an AI system</h3>
        <ul><li><b>Shared responsibility</b> still applies: AWS secures the model service; you secure access, data, prompts and outputs.</li>
        <li><b>Access:</b> IAM roles with least privilege on which models and knowledge bases each app can call. For agents, <b>AgentCore Identity</b> manages who an agent acts as and what it can reach, and <b>Policy in AgentCore</b> limits which tools it may use.</li>
        <li><b>Data:</b> encryption at rest with KMS and in transit with TLS; <b>PrivateLink</b> so calls to Bedrock stay off the internet; <b>Macie</b> to find personal data in training or RAG documents. Bedrock doesn't use your prompts and outputs to train the base models.</li>
        <li><b>Threats specific to AI:</b> prompt injection, jailbreaks, data poisoning, data leakage in answers, and toxic output. Defend with guardrails, input and output filtering and validation, and least-privilege tools for agents.</li>
        <li><b>Hallucinations:</b> ground answers with RAG, run contextual grounding checks, validate outputs (for example, check that a cited policy exists), and use confidence scores to route uncertain answers to a person.</li>
        <li><b>Audit trail:</b> CloudTrail records API calls; Bedrock <b>model invocation logging</b> can save prompts and responses to CloudWatch Logs or S3 for review.</li></ul>
        <h3>Governance and compliance</h3>
        <ul><li><b>Know your data:</b> its lineage, a catalog of datasets, where it's stored (residency), how long it's kept (retention), and who can access it.</li>
        <li><b>AWS services that help:</b> <b>AWS Config</b> (resource settings and rules), <b>Amazon Inspector</b> (vulnerabilities), <b>AWS Artifact</b> (AWS's compliance reports), <b>CloudTrail</b> (who did what), <b>Trusted Advisor</b> (best-practice checks).</li>
        <li><b>Process:</b> written policies, regular reviews, team training, transparency standards, and frameworks such as AWS's <b>Generative AI Security Scoping Matrix</b>, which sorts use cases from using a consumer app to training your own model, each with different security responsibilities.</li></ul>
        <h3>Worked example, step by step</h3>
        <p>The bank's HR chatbot from the last lesson is going live.</p>
        <ol><li><b>Guardrails:</b> denied topics for legal and medical advice, a sensitive information filter that masks employee ID numbers and salaries, and a contextual grounding check so unsupported answers are blocked.</li>
        <li><b>Access:</b> the app's IAM role can call one model and one knowledge base, nothing else; calls go through <b>PrivateLink</b>; documents are encrypted with a customer managed KMS key.</li>
        <li><b>Data:</b> <b>Macie</b> scans the policy bucket and finds a spreadsheet of salaries that shouldn't be there; it's removed before indexing.</li>
        <li><b>Transparency:</b> the chat says it's an AI assistant, shows which policy each answer came from, and has a "this was wrong" button that sends the conversation to HR for review.</li>
        <li><b>Audit:</b> model invocation logging and CloudTrail are on; a <b>model card</b> records the model, data sources, test results and known limits; HR and security review it every quarter.</li></ol>`,
      cards: [
        ["Which Bedrock feature masks card numbers in a model's answers?", "Amazon Bedrock Guardrails (sensitive information filters)."],
        ["Which SageMaker feature detects bias and explains predictions?", "SageMaker Clarify."],
        ["Name three ways to reduce hallucinations.", "Ground answers with RAG, use contextual grounding checks (Guardrails), and validate outputs or send low-confidence answers to a human."],
        ["What's a SageMaker Model Card for?", "Documenting a model's purpose, training data, evaluation results and limits, for transparency and governance."],
      ],
    },
  ],

  quiz: [
    // AI and ML fundamentals (AIF domain 1)
    { id: "x85", tags: ["AIF"], topic: "aifund", q: "A model must predict next month's sales in dollars. Which kind of machine learning task is this?", options: ["Classification", "Regression", "Clustering", "Reinforcement learning"], answer: 1, why: "Predicting a number is regression. Classification predicts a category; clustering groups unlabelled data." },
    { id: "x86", tags: ["AIF"], topic: "aifund", q: "A fraud model flags 100 payments; 80 are really fraud. Which metric is 80%?", options: ["Recall", "Precision", "Accuracy", "F1 score"], answer: 1, why: "Precision is the share of flagged items that were truly positive: 80 of 100. Recall would be the share of all real fraud that was caught." },
    { id: "x87", tags: ["AIF"], topic: "aifund", q: "A company needs to extract tables and form fields from thousands of scanned invoices without building a model. Which service?", options: ["Amazon Comprehend", "Amazon Textract", "Amazon Rekognition", "Amazon Polly"], answer: 1, why: "Textract extracts text, tables and form data from documents. Comprehend analyses text you already have." },
    { id: "x88", tags: ["AIF"], topic: "aifund", q: "A model scores 99% on its training data but performs poorly on new data. What is this?", options: ["Underfitting", "Overfitting", "Data drift", "High precision"], answer: 1, why: "Overfitting (high variance) means the model memorised the training data instead of learning patterns that generalise." },
    // Generative AI & Amazon Bedrock (AIF domains 2-3)
    { id: "x89", tags: ["AIF"], topic: "genai", q: "A chatbot must answer from company documents that change weekly, citing its sources. What's the most suitable approach?", options: ["Pre-train a new model", "Fine-tune a model every week", "Retrieval Augmented Generation (RAG) with Bedrock Knowledge Bases", "Raise the temperature"], answer: 2, why: "RAG retrieves current documents at question time and can cite them; no retraining is needed when documents change." },
    { id: "x90", tags: ["AIF"], topic: "genai", q: "An application needs consistent, repeatable answers for data extraction. Which inference setting should be lowered?", options: ["Maximum tokens", "Temperature", "Number of chunks", "Context window"], answer: 1, why: "Lower temperature makes outputs more focused and deterministic; higher temperature adds variety." },
    { id: "x91", tags: ["AIF"], topic: "genai", q: "A prompt includes three examples of an input and the desired output before the real input. Which technique is this?", options: ["Zero-shot prompting", "Few-shot prompting", "Chain-of-thought prompting", "Fine-tuning"], answer: 1, why: "Few-shot prompting shows a few examples in the prompt. Nothing is trained, unlike fine-tuning." },
    { id: "x92", tags: ["AIF"], topic: "genai", q: "In the task, what happened when you ran the same prompt at temperature 0 and then at temperature 1?", options: ["Both gave identical answers every time", "Temperature 0 gave the same or nearly the same answer; temperature 1 varied", "Temperature 1 gave an error", "Temperature 0 gave longer answers"], answer: 1, why: "Low temperature picks the most likely tokens, so answers repeat; higher temperature samples more widely, so they vary." },
    { id: "x93", tags: ["AIF"], topic: "genai", q: "Which open standard lets AI agents connect to external tools and data sources?", options: ["Model Context Protocol (MCP)", "OAuth", "BLEU", "SQL"], answer: 0, why: "MCP standardises how agents discover and call tools and data. BLEU is a translation metric." },
    // Responsible AI, security & governance (AIF domains 4-5)
    { id: "x94", tags: ["AIF"], topic: "airesp", q: "A Bedrock application must block questions about investment advice and mask card numbers in responses. What should it use?", options: ["Amazon Macie", "Amazon Bedrock Guardrails", "AWS WAF", "SageMaker Model Cards"], answer: 1, why: "Guardrails provide denied topics and sensitive information filters for any model in Bedrock." },
    { id: "x95", tags: ["AIF"], topic: "airesp", q: "Which service detects bias in training data and explains which features drove a model's predictions?", options: ["SageMaker Clarify", "Amazon Inspector", "AWS Config", "Amazon Comprehend"], answer: 0, why: "SageMaker Clarify provides bias detection and feature-attribution explanations." },
    { id: "x96", tags: ["AIF"], topic: "airesp", q: "A document in a RAG knowledge base contains hidden text telling the model to ignore its instructions and reveal confidential data. What attack is this?", options: ["Data poisoning of the base model", "Prompt injection", "A DDoS attack", "Overfitting"], answer: 1, why: "Instructions smuggled into the model's input, including retrieved documents, are prompt injection. Defend with guardrails, filtering and least-privilege tools." },
    { id: "x97", tags: ["AIF"], topic: "airesp", q: "Which AWS service provides on-demand access to AWS's own compliance reports for auditors?", options: ["AWS Artifact", "AWS Config", "Amazon Macie", "AWS Audit Manager"], answer: 0, why: "AWS Artifact gives access to AWS's compliance reports, such as SOC and ISO, and agreements." },
  ],

  glossary: [
    ["Amazon Bedrock", "AWS's managed service for using foundation models from Amazon and other providers through one API."],
    ["Bedrock Guardrails", "Configurable safety filters for Bedrock: content filters, denied topics, sensitive-data masking and grounding checks."],
    ["Embedding", "A list of numbers representing the meaning of text or an image, used for similarity search."],
    ["Foundation model", "A large model trained on broad data that can be adapted to many tasks."],
    ["Inference", "Using a trained model to make a prediction or generate output."],
    ["RAG", "Retrieval Augmented Generation: retrieving relevant documents and adding them to the prompt so answers are grounded."],
    ["SageMaker AI", "AWS's service for building, training and deploying your own machine learning models."],
    ["Temperature", "A setting that controls how random a generative model's output is."],
  ],
});
