import { NextResponse } from 'next/server';
import portfolio from '@/data/portfolio.json';

const { profile, skills, experience, projects, education } = portfolio;
const resumeLink = "/Suriya_Resume.pdf";

const getLocalResponse = (query: string): string => {
    const q = query.toLowerCase();
    const has = (...words: string[]) => words.some((w) => q.includes(w));
    // Whole-word match, so "ai" does not match "email" or "available".
    const hasWord = (...words: string[]) => words.some((w) => new RegExp(`\\b${w}\\b`).test(q));

    // Thanks
    if (has("thank", "thanks", "thx", "appreciate")) {
        return "Aw, you're so welcome! 😊 I really enjoyed chatting. If anything else about Suriya comes to mind — his AI projects, how he works, or how to reach him — I'm right here.";
    }

    // Greeting
    if (has("hello", "hi ", "hey", "greeting", "good morning", "good evening", "namaste") || q.trim() === "hi") {
        return "Hey there! 👋 So glad you stopped by. I'm here to chat about Suriya — his AI engineering work, the projects he's proud of, the tech he uses, or how to reach him. What are you curious about?";
    }

    // Who is Suriya / About
    if (has("about", "summary", "tell me about", "who is suriya", "who's suriya", "introduce", "background", "profile", "describe")) {
        return `Sure, happy to introduce him! 🙌 Suriya is an AI Engineer from ${profile.location} with ${profile.yearsOfExperience} years of experience in production Generative AI, Agentic AI, and Computer Vision. He specializes in autonomous multi-agent systems with LangGraph, enterprise RAG with ChromaDB and pgvector, real-time proctoring with OpenCV & MediaPipe, and automated LLMOps evals. Want to explore a specific project or skill?`;
    }

    // RAG / search / ChromaDB
    if (has("rag", "retrieval", "chroma", "chromadb", "embedding", "vector", "pgvector", "semantic", "ask ai")) {
        return "Suriya builds enterprise-grade RAG and vector retrieval systems! 🔎\n\n• SalesRocks Ask AI: contextual question-answering across calls, emails, leads, and deals using Gemini embeddings and PostgreSQL + pgvector with source citations.\n• ChromaDB vector storage: implemented in the Autonomous Research Agent and Electricity Assistant for rapid semantic retrieval, document ingestion, and tariff advisory.\n• Enterprise safety: PII masking before embedding, context window optimization, and semantic reranking.";
    }

    // Agents / LangGraph / tool calling / evals
    if (has("agent", "langgraph", "langraph", "tool call", "tool use", "function call", "do ai", "eval", "human in the loop", "approval", "multi-agent")) {
        return "Agentic AI is one of Suriya's primary specialties! 🛠️\n\n• LangGraph Multi-Agent Systems: built SalesRocks Do AI for autonomous CRM task planning and execution with strict human approval gates.\n• Autonomous AI Research Agent: orchestrates specialized LangGraph nodes (Planner, Web Researcher, Fact Checker, Writer) with dynamic web search and ChromaDB memory.\n• Vision Agent: multi-modal AI agent orchestrating 13 computer vision tools via LLM function calling.\n• Safe AI & Evals: dual Zod schema validation, audit logging, and automated test suites (32 known-answer + 10 system invariant checks).";
    }

    // Deepfake / computer vision / eye tracking
    if (has("deepfake", "tensorflow", "mediapipe", "meeting guardian", "computer vision", "vision", "proctor", "interview", "eye tracking", "lip-sync", "lip sync", "gaze", "yolo")) {
        return "Suriya has built advanced computer vision and interview proctoring systems! 🤖\n\n• Live Eye Tracking & Lip-Sync Detection: built with Python, OpenCV, and MediaPipe to track 3D iris gaze for look-away detection and phoneme-to-mouth synchronization, capturing automated video proof.\n• Meeting Bot — Deepfake Guardian: joins Google Meet, Teams, and Zoom interviews to catch synthetic faces, cloned voices, and liveness bypass tricks in real time.\n• Vision Agent: multi-modal AI assistant integrating 13 tools including YOLO11, RapidOCR, and OpenCV YuNet.";
    }

    // General AI / LLM
    if (hasWord("ai", "llm", "llms", "gpt", "gemini", "claude", "openai", "ml") || has("machine learning", "prompt", "artificial intelligence")) {
        const aiSkills = skills.categories.slice(0, 3).map(c => `• ${c.name} — ${c.items.join(", ")}`).join("\n");
        return `AI is Suriya's main focus 🤖. Here's what he works with:\n\n${aiSkills}\n\nHighlights: a RAG assistant, a tool-calling agent with human approval, LLM evals, AI call analysis with structured outputs, and real-time deepfake detection.`;
    }

    // Database & Vector Storage
    if (has("database", "mongo", "postgres", "sql", "data storage", "vector db", "chroma", "chromadb", "pgvector")) {
        return "For vector databases and data engineering, Suriya leverages ChromaDB, PostgreSQL + pgvector, MongoDB, and SQLAlchemy. 🗄️ ChromaDB and pgvector power his vector search, hybrid retrieval, and knowledge ingestion pipelines.";
    }

    // Skills / stack
    if (has("skill", "tech", "stack", "know", "framework", "language", "react", "next", "typescript", "python", "backend", "frontend", "node")) {
        const all = skills.categories.map(c => `• ${c.name} — ${c.items.join(", ")}`).join("\n");
        return `Great question! Here's what Suriya brings to the table:\n\n${all}`;
    }

    // Favourite tech / what do you love
    if (has("favourite", "favorite", "love", "enjoy", "passion", "like working", "prefer")) {
        return "Suriya lights up when he's building AI that people can trust ✨ — agents that ask before they act, RAG answers that cite their sources, and evals that catch mistakes early. He still enjoys the full-stack side too, because it lets him ship the whole thing, from the model call to the UI.";
    }

    // Projects
    if (has("project", "work", "built", "build", "develop", "live link", "portfolio piece", "made")) {
        const projectList = projects.map(p => `• ${p.title} — ${p.description}`).join("\n\n");
        return `Here are the projects he's proud of:\n\n${projectList}\n\nScroll down to the Projects section to see them up close. 🚀`;
    }

    // Experience
    if (has("experience", "job", "company", "career", "years", "worked", "employer", "currently")) {
        const history = experience.map(e => `• ${e.company} — ${e.role} (${e.period})`).join("\n");
        return `Suriya has ${profile.yearsOfExperience} years of experience:\n\n${history}\n\nRight now he is a Junior AI Engineer at Atna AI, building production-focused Generative AI, Agentic AI, and Computer Vision solutions. 📈`;
    }

    // Why hire / strengths
    if (has("why hire", "why should", "strength", "good fit", "best", "stand out", "value", "special")) {
        return "Here's the honest pitch 💪 — Suriya is an AI Engineer who ships real AI features, not demos. He has built RAG, tool-calling agents, LLM evals and computer vision in production. He designs AI to be safe: validated outputs, PII masking, audit logs, human approval and fallbacks. And with his full-stack background, he can own a feature end to end.";
    }

    // Soft skills / teamwork / how do you work
    if (has("team", "collaborat", "communicat", "soft skill", "how do you work", "work with", "personality", "attitude")) {
        return "Suriya's a team player at heart 🤝 — he works closely with designers and backend folks, asks questions early, and keeps communication clear. He takes ownership without being asked and stays calm under deadlines. Easy to work with, curious, and always learning.";
    }

    // Learning / future / goals
    if (has("learning", "currently learning", "future", "goal", "aspire", "ambition", "improve", "growing")) {
        return "He's always pushing boundaries! 🌱 Right now Suriya is diving deeper into advanced multi-agent systems with LangGraph, real-time multimodal reasoning, dynamic ChromaDB vector memory, and enterprise LLMOps.";
    }

    // Hobbies / fun / personal
    if (has("hobby", "hobbies", "fun", "free time", "outside work", "interest", "personal", "weekend")) {
        return "Outside of code, Suriya stays curious 🙂 — he loves exploring new AI tools, tinkering with side projects, and keeping up with what's happening in AI. For the deeper personal stuff, just reach out via the Contact section!";
    }

    // Contact / hire
    if (has("contact", "email", "reach", "hire", "message", "call", "phone", "connect", "linkedin", "github")) {
        return `Of course — Suriya would love to hear from you! 📬\n\n📧 Email: ${profile.social.email}\n📞 Phone: ${profile.social.phone}\n🔗 LinkedIn: ${profile.social.linkedin}\n💻 GitHub: ${profile.social.github}\n\nOr just drop a note in the Contact section below!`;
    }

    // Education / Qualification
    if (has("qualification", "college", "degree", "study", "university", "education", "graduate", "certification", "certificate", "course", "school")) {
        const edu = education.map(e => `• ${e.degree} — ${e.institution}${e.period ? ` (${e.period})` : ""}`).join("\n");
        return `Here's Suriya's academic side 🎓:\n\n${edu}\n\nMost of his AI skills come from building and shipping real projects.`;
    }

    // Resume / CV
    if (has("resume", "cv", "biodata", "portfolio pdf", "download")) {
        return `Absolutely! Here's Suriya's full resume: ${resumeLink} 📄`;
    }

    // Salary / Availability
    if (has("salary", "notice", "available", "availability", "start", "join", "relocate", "remote", "open to")) {
        return `Good news — Suriya is open to AI Engineer roles, including remote! 🌍 For availability, notice period, or compensation, please contact him at ${profile.social.email}.`;
    }

    // Identity
    if (has("who are you", "what is this", "what are you", "purpose", "what can you", "bot")) {
        return "I'm Suriya's friendly assistant 🤖. I can tell you about his AI projects, skills, experience and education, or share his resume and contact info. What would you like to know?";
    }

    // Location
    if (has("where", "location", "city", "country", "based", "live")) {
        return `Suriya is based in ${profile.location} 📍 — and open to remote work or relocating for the right opportunity.`;
    }

    // Age / very personal — deflect warmly
    if (has("age", "old", "married", "girlfriend", "salary expect", "religion", "caste")) {
        return "Ha, that's a bit personal for me to answer 😄 — but Suriya would be happy to chat directly. You can reach him through the Contact section!";
    }

    // Default Fallback
    return "Hmm, I'm not sure about that one 🤔 — but I can tell you about Suriya's AI projects (RAG assistant, AI agents, eye tracking & deepfake proctoring), his skills, his experience as a Junior AI Engineer at Atna AI, or share his resume. What sounds interesting?";
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "No messages provided" }, { status: 400 });
        }

        const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');

        if (!lastUserMessage) {
            return NextResponse.json({ role: 'assistant', content: "How can I help you today?" });
        }

        const responseContent = getLocalResponse(lastUserMessage.content);

        // Simulate a small delay for "thinking" feel
        await new Promise(resolve => setTimeout(resolve, 600));

        return NextResponse.json({
            role: 'assistant',
            content: responseContent
        });

    } catch (error: unknown) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
