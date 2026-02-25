import { NextResponse } from 'next/server';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const portfolioData = {
    name: "Suriya Dhayalan",
    location: "Chennai, India",
    experience: "2.5+ years as a Frontend Engineer",
    role: "Frontend Engineer",
    resumeLink: "/Suriya_Resume.pdf",
    skills: [
        "React JS", "Next JS", "Tailwind CSS", "Redux", "JavaScript (ES6+)",
        "HTML5", "CSS3", "Bootstrap", "REST API Integration", "Node.js (Basics)",
        "Git", "GitHub", "Vercel", "Hostinger", "WordPress"
    ],
    projects: [
        { name: "Atna AI", link: "https://atna.ai/", description: "Product Interface using React/Next.js" },
        { name: "SolvStrat", link: "https://solvstrat.com/", description: "Corporate Website" },
        { name: "GRB", link: "https://grbdairyfood.com/", description: "Brand Website" },
        { name: "Billing Paradise", link: "https://www.billingparadise.com/", description: "Healthcare RCM Platform" },
        { name: "Whitespace Health", link: "https://whitespacehealth.com/", description: "Healthcare Platform" }
    ],
    qualification: {
        degree: "Bachelor of Computer Application (BCA)",
        college: "Kumararani Meena Muthiah College",
        score: "80%"
    },
    contact: {
        email: "suriyadhayalan2001@gmail.com",
        phone: "+91 7397288546",
        linkedin: "https://linkedin.com/in/suriyadhayalan"
    }
};

const getLocalResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Greeting
    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greeting")) {
        return "Hi there! I'm Suriya's AI assistant. I can help you with his resume, skills, projects, or contact information. What would you like to know?";
    }

    // Resume / CV
    if (q.includes("resume") || q.includes("cv") || q.includes("biodata") || q.includes("portfolio pdf")) {
        return `You can view or download Suriya's resume here: ${portfolioData.resumeLink}`;
    }

    // Skills
    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("know") || q.includes("framework") || q.includes("language")) {
        return `Suriya is highly skilled in: ${portfolioData.skills.join(", ")}. He specializes in building modern, responsive web applications using React and Next.js.`;
    }

    // Projects
    if (q.includes("project") || q.includes("work") || q.includes("build") || q.includes("develop") || q.includes("live link")) {
        const projectList = portfolioData.projects.map(p => `• ${p.name}: ${p.description}`).join("\n");
        return `Suriya has worked on several impressive projects:\n${projectList}\n\nYou can find the live links in the Projects section of this website!`;
    }

    // Experience
    if (q.includes("experience") || q.includes("job") || q.includes("company") || q.includes("career") || q.includes("years")) {
        return `Suriya has over ${portfolioData.experience}. He is currently working at Crayon Biz LLP and previously worked at iSource ITES Pvt Ltd. He has a strong track record of delivering pixel-perfect UIs.`;
    }

    // Contact
    if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire") || q.includes("message") || q.includes("call") || q.includes("phone")) {
        return `You can get in touch with Suriya via:\n📧 Email: ${portfolioData.contact.email}\n📞 Phone: ${portfolioData.contact.phone}\n🔗 LinkedIn: ${portfolioData.contact.linkedin}`;
    }

    // Qualification
    if (q.includes("qualification") || q.includes("college") || q.includes("degree") || q.includes("study") || q.includes("university")) {
        return `Suriya holds a ${portfolioData.qualification.degree} from ${portfolioData.qualification.college} with an impressive ${portfolioData.qualification.score} score.`;
    }

    // Salary / Availability (Common recruiter questions)
    if (q.includes("salary") || q.includes("notice") || q.includes("available") || q.includes("start")) {
        return "For questions regarding salary, notice period, or availability, please reach out directly to Suriya at suriyadhayalan2001@gmail.com. He'd be happy to discuss potential opportunities!";
    }

    // Identity
    if (q.includes("who are you") || q.includes("what is this") || q.includes("purpose") || q.includes("help")) {
        return "I am Suriya's digital assistant. I'm here to provide quick answers about his professional background, show you his projects, and share his contact details. You can even ask for his resume!";
    }

    // Location
    if (q.includes("where") || q.includes("location") || q.includes("city") || q.includes("country")) {
        return `Suriya is based in ${portfolioData.location}, but he is open to remote opportunities or discussing relocation.`;
    }

    // Default Fallback
    return "I'm not quite sure about that, but I'd love to tell you more about Suriya's React/Next.js skills, his experience at Crayon Biz LLP, or provide his resume. What else can I help you with?";
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

