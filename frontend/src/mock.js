// MOCKED data layer (frontend-only). Replace with backend API integration later.

export const mockProfile = {
  name: "Suprava Barik",
  title: "Full‑Stack IT Professional (.NET + AI)",
  // Optional: set to a real headshot URL later. Keep null for placeholder.
  imageUrl: null,
  headline: "Building Robust, Scalable, Intelligent and Distributed Systems.",
  subheadline:
    "A Full-Stack IT professional specializing in .Net, React, and AI platforms with LLM, RAG, MLOps.",
  trustBadges: [
    { label: "AI-first", value: "RAG • Agents • MLOps" },
    { label: "Stack", value: ".NET • Python • Cloud" },
    { label: "Focus", value: "Production-grade AI" },
  ],
  about:
    "I design and ship AI systems that are reliable in production — from RAG pipelines and evaluation to orchestration, monitoring, and scalable APIs. My work sits at the intersection of software engineering and applied ML, with a strong focus on measurable impact.",
  highlights: [
    "Generative AI & LLM systems (RAG, agents, evaluation)",
    "Productionization: deployment, observability, reliability, cost controls",
    "Cloud & platforms: Azure / GCP / WatsonX (adaptable)",
  ],
};

export const mockLinks = {
  email: "sbarikdotnetar1@gmail.com",
  linkedin: "https://www.linkedin.com/in/supravabarik",
  github: "https://github.com/bsuprava",
  projects: "https://www.mygreatlearning.com/eportfolio/suprava-barik",
  resume: "#",
};

export const mockSkills = [
  {
    category: "Generative AI & LLMs",
    items: [
      "RAG architectures",
      "LLM evaluation (offline + online)",
      "Prompt engineering (system design > prompt hacks)",
      "Fine-tuning (LoRA / PEFT — conceptual)",
    ],
  },
  {
    category: "Agentic AI",
    items: [
      "ReAct pattern",
      "Tool calling",
      "Multi-agent coordination",
      "LangChain / LangGraph (conceptual)",
    ],
  },
  {
    category: "MLOps & Platforms",
    items: [
      "CI/CD for ML",
      "Model monitoring & drift signals",
      "Docker & Kubernetes",
      "Vertex AI / Azure AI (adaptable)",
    ],
  },
  {
    category: "AI Tools",
    items: ["LLama", "SKLearn", "HuggingFace", "StreamLit", "Flask","Jupiter Notebook","Google Colab", "Kaggle"],
  },
  {
    category: "Cloud Services",
    items: ["OpenShift", "Azure App Service", "Azure Functions", "Azure Service Bus", "Azure CosmosDB"],
  },
  {
    category: "Programming",
    items: ["Python", ".NET", "SQL", "Web APIs", "TypeScript"],
  },
];

export const mockProjects = [
  {
    id: "medical-assistant-rag",
    title: "Medical Assistant",
    tagline: "Clinician-focused Q&A over internal medical knowledge.",
    problem:
      "Clinicians need fast, trustworthy answers grounded in internal guidelines and published evidence — without hallucinations.",
    architecture: [
      "RAG pipeline with chunking + semantic retrieval",
      "Guardrails: citation-required answers + refusal policies",
      "Evaluation harness for factuality, relevance, and latency",
    ],
    tools: [
      "Vector DB",
      "Embeddings",
      "LLM orchestration",
      "FastAPI",
      "Azure/GCP (deploy)",
    ],
    outcome: [
      "Reduced time-to-answer for common questions",
      "Improved confidence via traceable citations",
      "Operational metrics for latency & answer quality",
    ],
    impactSnapshot: "Citations-first RAG with evaluation built-in",
  },
  {
    id: "tourism-mlops",
    title: "Tourism Package Prediction",
    tagline: "MLOps pipeline for demand prediction with CI/CD.",
    problem:
      "Business teams needed consistent, deployable forecasting with repeatable training, testing, and monitoring.",
    architecture: [
      "Feature pipeline + training workflow",
      "Automated model validation gates",
      "Deployment with monitoring & rollback strategy",
    ],
    tools: ["Pandas", "Scikit-learn", "CI/CD", "Docker", "Model monitoring"],
    outcome: [
      "Repeatable training runs and environment parity",
      "Safer releases using validation thresholds",
      "Monitoring dashboards for model health",
    ],
    impactSnapshot: "Production MLOps with gated releases",
  },
  {
    id: "agentic-research",
    title: "Agentic Research Assistant",
    tagline: "Autonomous research workflows with tool calling.",
    problem:
      "Research tasks are slow because synthesis requires searching, filtering, summarizing, and cross-checking across sources.",
    architecture: [
      "Planner/Executor loop with tool calling",
      "Structured notes + citations",
      "Multi-step evaluation: coverage, faithfulness, and verbosity",
    ],
    tools: ["Agents", "Tool calling", "RAG", "Structured outputs", "Eval"],
    outcome: [
      "Faster synthesis with transparent steps",
      "Reduced missed sources via iterative refinement",
      "Traceable outputs for stakeholder review",
    ],
    impactSnapshot: "Tool-augmented agent with traceable reasoning",
  },
  {
    id: "helmet-detection",
    title: "Safety Helmet Detection",
    tagline: "Computer vision safety compliance at scale.",
    problem:
      "Worksites need automated detection of PPE compliance while minimizing false positives.",
    architecture: [
      "Object detection model + inference pipeline",
      "Edge-friendly deployment option",
      "Feedback loop to improve hard examples",
    ],
    tools: ["Computer Vision", "Model serving", "Data labeling", "Monitoring"],
    outcome: [
      "Reduced manual checks",
      "Actionable alerts with confidence scores",
      "Operational process for continuous improvement",
    ],
    impactSnapshot: "CV inference pipeline with feedback loop",
  },
];

export const mockExperience = [
  {
    id: "exp-1",
    company: "Sample AI Platform Team",
    role: "AI Engineer (GenAI Platforms)",
    period: "2023 — Present",
    bullets: [
      "Built RAG services with evaluation and monitoring to reduce regressions.",
      "Designed LLM orchestration patterns (tool calling, structured outputs) for reliability.",
      "Partnered with product & security teams on governance and cost controls.",
    ],
  },
  {
    id: "exp-2",
    company: "Sample Enterprise (.NET)",
    role: "Full‑Stack Developer (.NET)",
    period: "2020 — 2023",
    bullets: [
      "Shipped scalable APIs and data pipelines with strong observability.",
      "Modernized services toward containerized deployments.",
      "Collaborated cross-functionally to deliver measurable business outcomes.",
    ],
  },
];

export const mockCertifications = [
  {
    id: "cert-ai",
    name: "Post Graduate Program in Artificial Intelligence and Machine Learning",
    issuer: "Greate Learning-University of Austin",
    year: "2025",
  },
  {
    id: "cert-netang",
    name: "Microsoft .NET Full-Stack + Angular",
    issuer: "IBM",
    year: "2024",
  },
  {
    id: "cert-bankdomain",
    name: "Banking Industry Domain Knowledge Certification",
    issuer: "IBM",
    year: "2023",
  },
  {
    id: "cert-az900",
    name: "Microsoft Azure Fundamentals (AZ‑900)",
    issuer: "Microsoft",
    year: "2022",
  }
];

export const mockBlogPosts = [
  {
    id: "blog-rag-eval",
    title: "RAG System Design: Retrieval, Grounding, and Evaluation",
    tags: ["RAG", "Evaluation", "LLMs"],
    readTime: "7 min",
    status: "Coming soon",
  },
  {
    id: "blog-agentic",
    title: "Agentic AI Patterns: ReAct, Tool Calling, and Multi-Agent Flows",
    tags: ["Agents", "Tool calling"],
    readTime: "6 min",
    status: "Coming soon",
  },
  {
    id: "blog-mlops",
    title: "MLOps for GenAI: Monitoring, Cost Controls, and Safe Deployments",
    tags: ["MLOps", "Observability"],
    readTime: "8 min",
    status: "Coming soon",
  },
];

export function loadLocalJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveLocalJSON(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
