import { portfolioData } from "./portfolio-data";

export interface KnowledgeItem {
  question: string;
  answer: string;
  keywords: string[];
}

export const aiKnowledge: KnowledgeItem[] = [
  // Personal Information
  {
    question: "What is your name?",
    answer: `My name is ${portfolioData.personal.name}. I'm a web developer and AI enthusiast based in Nigeria.`,
    keywords: ["name", "who", "call", "aliyu", "yunus", "muhammad"],
  },
  {
    question: "How can I contact you?",
    answer: `You can reach me via email at ${portfolioData.personal.email}, by phone at ${portfolioData.personal.phone}, or through WhatsApp. You can also use the contact form in the Contact section.`,
    keywords: ["contact", "email", "phone", "reach", "call", "message", "whatsapp"],
  },
  {
    question: "Where are you located?",
    answer: `I'm based in ${portfolioData.personal.location}. I work remotely and am available for projects worldwide.`,
    keywords: ["location", "where", "based", "country", "nigeria", "live"],
  },
  
  // Skills
  {
    question: "What are your skills?",
    answer: `I specialize in: ${portfolioData.skills.map(s => s.name).join(", ")}. My strongest areas are JavaScript, React, and Chatbot Development.`,
    keywords: ["skills", "know", "technologies", "tech", "stack", "programming", "languages"],
  },
  {
    question: "What programming languages do you know?",
    answer: "I'm proficient in JavaScript, TypeScript, Python, and various web technologies including React, Next.js, Node.js, and Three.js for 3D web development.",
    keywords: ["programming", "languages", "code", "coding", "javascript", "python", "typescript"],
  },
  {
    question: "Do you know AI or machine learning?",
    answer: "Yes! I specialize in AI integration and chatbot development. I've built multiple AI-powered applications including business chatbots and FAQ systems using NLP and machine learning techniques.",
    keywords: ["ai", "artificial", "intelligence", "machine", "learning", "ml", "nlp", "chatbot"],
  },
  
  // Projects
  {
    question: "What projects have you worked on?",
    answer: `I've worked on several notable projects: 1) ${portfolioData.projects[0].title} - ${portfolioData.projects[0].subtitle}, 2) ${portfolioData.projects[1].title} - ${portfolioData.projects[1].subtitle}, and 3) ${portfolioData.projects[2].title} - ${portfolioData.projects[2].subtitle}. Click on the project buildings to learn more!`,
    keywords: ["projects", "work", "portfolio", "built", "created", "developed", "made"],
  },
  {
    question: "Tell me about the Zaifat Treats chatbot",
    answer: portfolioData.projects[0].description,
    keywords: ["zaifat", "treats", "business", "assistant", "food", "bot"],
  },
  {
    question: "Tell me about the LiveChat bot",
    answer: portfolioData.projects[1].description,
    keywords: ["livechat", "live", "chat", "customer", "support", "realtime"],
  },
  {
    question: "Tell me about the University FAQ chatbot",
    answer: portfolioData.projects[2].description,
    keywords: ["university", "faq", "education", "school", "students", "academic"],
  },
  
  // Services
  {
    question: "What services do you offer?",
    answer: "I offer web development services including: Full-stack web applications, AI-powered chatbots, Interactive 3D web experiences, Custom business automation solutions, and Technical consulting.",
    keywords: ["services", "offer", "provide", "hire", "work", "help", "build"],
  },
  {
    question: "Are you available for hire?",
    answer: "Yes, I'm available for freelance projects and collaborations! Feel free to reach out through the contact form or via email to discuss your project requirements.",
    keywords: ["hire", "available", "freelance", "work", "job", "project", "collaboration"],
  },
  
  // About
  {
    question: "Tell me about yourself",
    answer: portfolioData.about.description,
    keywords: ["about", "yourself", "background", "who", "introduce", "introduction"],
  },
  {
    question: "What do you specialize in?",
    answer: `I specialize in ${portfolioData.about.highlights.join(", ")}. I'm particularly passionate about creating AI-powered solutions and immersive web experiences.`,
    keywords: ["specialize", "focus", "expert", "specialty", "best", "main"],
  },
  
  // Experience
  {
    question: "What is your experience?",
    answer: `I started my web development journey in 2021 and have been continuously growing since then. In 2022, I mastered full-stack development. In 2023, I became a chatbot specialist, developing solutions for various clients. Now in 2024, I'm expanding into advanced AI integration and 3D web experiences.`,
    keywords: ["experience", "history", "background", "timeline", "career", "journey", "years"],
  },
  
  // Fun & Misc
  {
    question: "Hello",
    answer: "Hello! Welcome to Aliyu's portfolio. I'm an AI assistant here to help you learn more about Aliyu and his work. Feel free to ask me anything!",
    keywords: ["hello", "hi", "hey", "greetings", "sup", "welcome"],
  },
  {
    question: "How does this website work?",
    answer: "This is an immersive 3D portfolio built with React Three Fiber. You can navigate through the world using scroll or the navigation buttons to explore different sections. Click on project buildings to see details, and use this chat to ask questions!",
    keywords: ["website", "work", "navigate", "use", "how", "3d", "portfolio"],
  },
  {
    question: "What makes you different?",
    answer: "What sets me apart is my unique combination of web development skills and AI expertise. I don't just build websites - I create intelligent, interactive experiences. This portfolio itself showcases that with its immersive 3D environment and AI assistant!",
    keywords: ["different", "unique", "special", "stand", "apart", "why"],
  },
];

// Helper to generate HTML snippets
export const codeSnippets: Record<string, string> = {
  button: `<button class="btn">Click me</button>`,
  card: `<div class="card">
  <h3>Title</h3>
  <p>Content goes here</p>
</div>`,
  form: `<form action="/submit" method="POST">
  <input type="text" name="name" placeholder="Your name">
  <input type="email" name="email" placeholder="Your email">
  <button type="submit">Submit</button>
</form>`,
  navbar: `<nav class="navbar">
  <a href="/" class="logo">Logo</a>
  <ul class="nav-links">
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`,
};
