export const portfolioData = {
  personal: {
    name: "Aliyu Yunus Muhammad",
    title: "Web Developer & AI Enthusiast",
    location: "Nigeria",
    email: "aliyuyunusmuhammad39@gmail.com",
    phone: "+2349132474502",
    profileImage: "/images/profile.jpg",
    resumeUrl: "/cv/resume.pdf",
  },
  
  about: {
    headline: "Building the Future of Web",
    description: `I'm a passionate web developer specializing in creating immersive digital experiences. 
    With expertise in modern web technologies and AI integration, I build solutions that push the boundaries 
    of what's possible on the web. My focus is on creating beautiful, functional, and innovative applications 
    that make a real impact.`,
    highlights: [
      "Full-stack web development",
      "AI-powered applications",
      "Interactive 3D experiences",
      "Chatbot development",
    ],
  },
  
  skills: [
    { name: "JavaScript", level: 95, category: "frontend" },
    { name: "TypeScript", level: 90, category: "frontend" },
    { name: "React", level: 92, category: "frontend" },
    { name: "Next.js", level: 88, category: "frontend" },
    { name: "Three.js", level: 75, category: "frontend" },
    { name: "Node.js", level: 85, category: "backend" },
    { name: "Python", level: 80, category: "backend" },
    { name: "AI/ML Integration", level: 78, category: "ai" },
    { name: "Chatbot Development", level: 90, category: "ai" },
    { name: "HTML/CSS", level: 95, category: "frontend" },
    { name: "Tailwind CSS", level: 90, category: "frontend" },
    { name: "Git", level: 85, category: "tools" },
  ],
  
  projects: [
    {
      id: "zaifat-chatbot",
      title: "Business Assistant Chatbot",
      subtitle: "Zaifat Treats",
      description: `An intelligent business assistant chatbot developed for Zaifat Treats, 
      a food business. The bot handles customer inquiries, provides menu information, 
      processes orders, and offers personalized recommendations. Built with modern NLP 
      techniques to understand natural language and provide helpful responses.`,
      technologies: ["Python", "NLP", "Telegram API", "AI"],
      link: "https://t.me/ZaifatTreatsBot",
      color: "#00f0ff",
      position: { x: -3, z: 5 },
    },
    {
      id: "livechat-bot",
      title: "LiveChat Bot",
      subtitle: "Real-time Customer Support",
      description: `A sophisticated live chat bot system designed for real-time customer 
      support and engagement. Features include automated responses, conversation routing, 
      sentiment analysis, and seamless handoff to human agents when needed. Helps businesses 
      provide 24/7 customer service with intelligent automation.`,
      technologies: ["Node.js", "WebSocket", "AI", "React"],
      link: "#",
      color: "#ff00ff",
      position: { x: 0, z: 8 },
    },
    {
      id: "university-faq",
      title: "University FAQ Chatbot",
      subtitle: "Educational Assistant",
      description: `An AI-powered FAQ chatbot for educational institutions. Helps students 
      and prospective applicants get instant answers to common questions about admissions, 
      courses, schedules, and campus facilities. Reduces the workload on administrative 
      staff while providing accurate information 24/7.`,
      technologies: ["Python", "Machine Learning", "Web API", "NLP"],
      link: "#",
      color: "#8b5cf6",
      position: { x: 3, z: 11 },
    },
  ],
  
  timeline: [
    {
      year: "2024",
      title: "Advanced AI Integration",
      description: "Expanded into AI-powered applications and 3D web experiences",
    },
    {
      year: "2023",
      title: "Chatbot Specialist",
      description: "Developed multiple business chatbots for various clients",
    },
    {
      year: "2022",
      title: "Full-Stack Development",
      description: "Mastered full-stack web development with React and Node.js",
    },
    {
      year: "2021",
      title: "Started Web Development",
      description: "Began journey in web development with HTML, CSS, and JavaScript",
    },
  ],
  
  social: {
    twitter: "https://x.com/aleeyou_q?s=21",
    whatsapp: "https://wa.me/2349132474502",
    email: "mailto:aliyuyunusmuhammad39@gmail.com",
  },
  
  formspree: "https://formspree.io/f/xaqpnbva",
};

export type PortfolioData = typeof portfolioData;
