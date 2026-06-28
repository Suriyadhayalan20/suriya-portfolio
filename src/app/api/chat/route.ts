import { NextResponse } from 'next/server';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const portfolioData = {
    name: "Suriya Dhayalan",
    location: "Chennai, India",
    experience: "2.5+ years as a Full-Stack MERN Developer",
    role: "MERN Stack Developer",
    resumeLink: "/Suriya_Resume.pdf",
    summary: "Full-Stack MERN Developer with 2.5+ years of experience building scalable web applications, AI-powered platforms, and enterprise solutions. Skilled in React.js, Next.js, TypeScript, Node.js, and MongoDB, with proven ability to own end-to-end product delivery — from design and development to deployment and production optimization.",
    skills: {
        frontend: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
        backend: ["Node.js", "Express.js", "REST APIs", "API Integration", "Authentication & Authorization"],
        database: ["MongoDB", "PostgreSQL", "Prisma"],
        ai: ["TensorFlow.js", "MediaPipe", "Deepfake Detection", "Computer Vision", "Socket.io", "Real-Time Analytics"]
    },
    projects: [
        { name: "ATNA Meeting Guardian", description: "Real-time AI meeting security platform with a Chrome Extension that detects deepfakes in live Google Meet sessions using TensorFlow.js + MediaPipe, with a Next.js + Socket.io dashboard." },
        { name: "Job Portal Web Application", description: "Full-stack recruitment platform (Next.js 14, TypeScript, MongoDB) with role-based access, NextAuth, Cloudinary resume uploads, and applicant tracking." },
        { name: "ATNA AI Corporate Website", description: "Atna AI's official corporate website built with Next.js, TypeScript, and Tailwind CSS — owned end to end from design to deployment." },
        { name: "GRB Corporate Website", description: "Responsive corporate website built with React.js + Tailwind CSS and SendGrid-powered contact/enquiry forms." }
    ],
    experienceHistory: [
        { company: "Atna AI", role: "MERN Stack Developer (Contract)", period: "Mar 2026 – Present" },
        { company: "Crayon Biz LLP", role: "Frontend Developer", period: "Dec 2025 – Feb 2026" },
        { company: "iSource ITES Pvt Ltd", role: "Junior Web Developer", period: "Nov 2023 – Nov 2025" }
    ],
    education: [
        { degree: "Bachelor of Computer Applications (BCA) — 80%", institution: "Kumararani Meena Muthiah College of Arts & Science", period: "2018 – 2021" },
        { degree: "Higher Secondary — 75%", institution: "Santhome Higher Secondary", period: "" },
        { degree: "MERN Stack Development Certification", institution: "Besant Technologies", period: "" }
    ],
    contact: {
        email: "suriyadhayalan2001@gmail.com",
        phone: "+91 7397288546",
        linkedin: "https://linkedin.com/in/suriyadhayalan",
        github: "https://github.com/Suriyadhayalan20"
    }
};

const getLocalResponse = (query: string): string => {
    const q = query.toLowerCase();
    const has = (...words: string[]) => words.some((w) => q.includes(w));

    // Thanks
    if (has("thank", "thanks", "thx", "appreciate")) {
        return "Aw, you're so welcome! 😊 I really enjoyed chatting. If anything else about Suriya comes to mind — his projects, how he works, or how to reach him — I'm right here.";
    }

    // Greeting
    if (has("hello", "hi ", "hey", "greeting", "good morning", "good evening", "namaste") || q.trim() === "hi") {
        return "Hey there! 👋 So glad you stopped by. I'm here to chat about Suriya — his story, the projects he's proud of, the tech he loves, or just what makes him tick. What are you curious about?";
    }

    // Who is Suriya / About
    if (has("about", "summary", "tell me about", "who is suriya", "who's suriya", "introduce", "background", "profile", "describe")) {
        return "Sure, happy to introduce him! 🙌 Suriya is a Full-Stack MERN Developer from Chennai with 2.5+ years of hands-on experience. He loves turning ideas into real, working products — from sleek responsive websites to AI-powered platforms like real-time deepfake detection. What he enjoys most is owning the whole journey: designing it, building it, shipping it, and watching people actually use it. Want me to tell you about a specific project or skill?";
    }

    // AI / Deepfake / Meeting Guardian
    if (has("ai", "deepfake", "tensorflow", "mediapipe", "meeting guardian", "computer vision", "machine learning", "real-time", "socket")) {
        return "Oh, this one's his favorite to talk about! 🤖 Suriya built ATNA Meeting Guardian — think of it as a security guard for live Google Meet calls. A Chrome Extension quietly watches participant video, and TensorFlow.js + MediaPipe models spot deepfakes, face swaps, and anything suspicious in real time. The risk scores stream live onto a Next.js dashboard through Socket.io. It's the kind of project where AI meets real-world trust, and he genuinely loves that space.";
    }

    // Database
    if (has("database", "mongo", "postgres", "prisma", "sql", "data storage")) {
        return `When it comes to data, Suriya's comfortable with ${portfolioData.skills.database.join(", ")}. He's shipped apps backed by MongoDB (with Mongoose) and relational setups using Prisma and PostgreSQL — so whether the data is flexible or strongly structured, he's got it covered. 🗄️`;
    }

    // Backend
    if (has("backend", "node", "express", "api", "server", "rest")) {
        return `On the backend, he's hands-on with ${portfolioData.skills.backend.join(", ")}. He builds clean REST APIs, sets up authentication & authorization, and wires in services like Cloudinary and SendGrid — basically all the plumbing that makes a product actually work behind the scenes. ⚙️`;
    }

    // Frontend / Skills
    if (has("frontend", "skill", "tech", "stack", "know", "framework", "language", "react", "next", "typescript", "tailwind")) {
        return `Great question! Here's what Suriya brings to the table:\n\n💻 Frontend — ${portfolioData.skills.frontend.join(", ")}\n⚙️ Backend — ${portfolioData.skills.backend.join(", ")}\n🗄️ Database — ${portfolioData.skills.database.join(", ")}\n🤖 AI & Real-Time — ${portfolioData.skills.ai.join(", ")}\n\nReact and Next.js are his bread and butter, but he genuinely enjoys picking up whatever a project needs.`;
    }

    // Favourite tech / what do you love
    if (has("favourite", "favorite", "love", "enjoy", "passion", "like working", "prefer")) {
        return "Honestly? Suriya lights up when he's working with React and Next.js — there's something satisfying about turning a Figma design into a pixel-perfect, buttery-smooth interface. Lately he's been really into the AI side of things too: real-time detection, computer vision, that kind of magic. He loves problems where good engineering makes people's lives a little safer or easier. ✨";
    }

    // Projects
    if (has("project", "work", "built", "build", "develop", "live link", "portfolio piece", "made")) {
        const projectList = portfolioData.projects.map(p => `• ${p.name} — ${p.description}`).join("\n\n");
        return `He's worked on some projects he's genuinely proud of:\n\n${projectList}\n\nScroll down to the Projects section to see them up close — there are screenshots and the full story for each. 🚀`;
    }

    // Experience
    if (has("experience", "job", "company", "career", "years", "worked", "employer", "currently")) {
        const history = portfolioData.experienceHistory.map(e => `• ${e.company} — ${e.role} (${e.period})`).join("\n");
        return `Suriya's been building for 2.5+ years now, and the journey looks like this:\n\n${history}\n\nRight now he's a MERN Stack Developer at Atna AI, building AI-powered recruitment and meeting-security products end to end. He's grown from crafting UIs into owning full products. 📈`;
    }

    // Why hire / strengths
    if (has("why hire", "why should", "strength", "good fit", "best", "stand out", "value", "special")) {
        return "Here's the honest pitch 💪 — Suriya owns things end to end. He doesn't just write code; he designs it, builds it, tests it, and ships it to production. He's delivered AI products (deepfake detection, recruitment platforms, Chrome Extensions), turns messy requirements and Figma files into clean, accessible UIs, and he's reliable when it counts. If you want someone curious, dependable, and comfortable across the whole stack, he's a great fit.";
    }

    // Soft skills / teamwork / how do you work
    if (has("team", "collaborat", "communicat", "soft skill", "how do you work", "work with", "personality", "attitude")) {
        return "Suriya's a team player at heart 🤝 — he works closely with designers and backend folks, asks questions early, and keeps communication clear so nothing gets lost. He's the kind of developer who cares about the people using the product, takes ownership without being asked, and stays calm under deadlines. Easy to work with, genuinely curious, and always learning.";
    }

    // Learning / future / goals
    if (has("learning", "currently learning", "future", "goal", "next", "aspire", "ambition", "improve", "growing")) {
        return "He's always got something on the go! 🌱 Lately Suriya's been going deeper into AI and real-time systems, scaling backend architecture, and sharpening his TypeScript and system-design skills. His big goal is to keep building products that blend great engineering with real impact — ideally in the AI and SaaS space.";
    }

    // Hobbies / fun / personal
    if (has("hobby", "hobbies", "fun", "free time", "outside work", "interest", "personal", "weekend")) {
        return "Outside of code, Suriya stays curious 🙂 — he loves exploring new tech, tinkering with side projects, and keeping up with what's happening in the AI world. He's the type who'll happily fall down a rabbit hole learning how something works. For the deeper personal stuff, he'd love to tell you himself — just reach out via the Contact section!";
    }

    // Contact / hire
    if (has("contact", "email", "reach", "hire", "message", "call", "phone", "connect", "linkedin", "github")) {
        return `Of course — Suriya would love to hear from you! 📬\n\n📧 Email: ${portfolioData.contact.email}\n📞 Phone: ${portfolioData.contact.phone}\n🔗 LinkedIn: ${portfolioData.contact.linkedin}\n💻 GitHub: ${portfolioData.contact.github}\n\nOr just drop a note in the Contact section below — he usually replies pretty quickly!`;
    }

    // Education / Qualification
    if (has("qualification", "college", "degree", "study", "university", "education", "graduate", "certification", "certificate", "course", "school")) {
        const edu = portfolioData.education.map(e => `• ${e.degree} — ${e.institution}${e.period ? ` (${e.period})` : ""}`).join("\n");
        return `Here's Suriya's academic side 🎓:\n\n${edu}\n\nHe topped his BCA with 80% and rounded it off with a MERN Stack certification — but honestly, most of his real learning has come from building and shipping projects.`;
    }

    // Resume / CV
    if (has("resume", "cv", "biodata", "portfolio pdf", "download")) {
        return `Absolutely! Here's Suriya's full resume — feel free to take a look or download it: ${portfolioData.resumeLink} 📄`;
    }

    // Salary / Availability
    if (has("salary", "notice", "available", "availability", "start", "join", "relocate", "remote", "open to")) {
        return "Good news — Suriya is open to new opportunities, including remote roles! 🌍 For the specifics like availability, notice period, or compensation, it's best to chat with him directly at suriyadhayalan2001@gmail.com. He's always happy to explore the right fit.";
    }

    // Identity
    if (has("who are you", "what is this", "what are you", "purpose", "what can you", "bot")) {
        return "I'm Suriya's friendly assistant 🤖 — kind of like his digital sidekick. I can chat with you about his projects, skills, experience, education, and what he's like to work with, or point you to his resume and contact info. So… what would you like to know about him?";
    }

    // Location
    if (has("where", "location", "city", "country", "based", "live")) {
        return `Suriya is based in ${portfolioData.location} 📍 — but he's totally open to remote work or relocating for the right opportunity.`;
    }

    // Age / very personal — deflect warmly
    if (has("age", "old", "married", "girlfriend", "salary expect", "religion", "caste")) {
        return "Ha, that's a bit personal for me to answer 😄 — but Suriya would be happy to chat about it directly. You can reach him through the Contact section. Meanwhile, I'm glad to tell you all about his work and skills!";
    }

    // Default Fallback
    return "Hmm, I'm not totally sure about that one 🤔 — but I'd love to tell you about Suriya's projects (like his AI Meeting Guardian), what it's like to work with him, his MERN skills, his journey at Atna AI, or share his resume. What sounds interesting?";
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

    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

