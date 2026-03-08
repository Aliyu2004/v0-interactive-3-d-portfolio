import * as THREE from "three";

export interface Section {
  id: string;
  name: string;
  description: string;
  narration: string;
  progress: number; // 0 to 1
}

export const sections: Section[] = [
  {
    id: "welcome",
    name: "Welcome",
    description: "Enter the digital realm",
    narration: "Welcome to Aliyu's portfolio. Navigate through this immersive 3D world to discover his work and skills.",
    progress: 0,
  },
  {
    id: "about",
    name: "About",
    description: "Learn about Aliyu",
    narration: "Aliyu is a passionate web developer and AI enthusiast, specializing in creating innovative digital experiences.",
    progress: 0.15,
  },
  {
    id: "skills",
    name: "Skills",
    description: "Technical expertise",
    narration: "Here you can explore Aliyu's technical skills, ranging from front-end development to AI and machine learning.",
    progress: 0.35,
  },
  {
    id: "projects",
    name: "Projects",
    description: "Featured work",
    narration: "These are Aliyu's featured projects. Click on any building to learn more about each project.",
    progress: 0.55,
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Journey through time",
    narration: "Follow Aliyu's career journey from his beginnings in web development to his current expertise in AI.",
    progress: 0.75,
  },
  {
    id: "contact",
    name: "Contact",
    description: "Get in touch",
    narration: "Ready to work together? Use the contact form or social links to get in touch with Aliyu.",
    progress: 1,
  },
];

// Camera path waypoints
const waypoints = [
  new THREE.Vector3(0, 3, -5),      // Welcome
  new THREE.Vector3(0, 2.5, 2),     // About
  new THREE.Vector3(-2, 3, 6),      // Skills
  new THREE.Vector3(0, 4, 10),      // Projects
  new THREE.Vector3(2, 3, 15),      // Timeline
  new THREE.Vector3(0, 2.5, 20),    // Contact
];

// Create smooth camera path curve
export const cameraPath = new THREE.CatmullRomCurve3(waypoints, false, "catmullrom", 0.5);

// Look-at targets for each section
export const lookAtTargets = [
  new THREE.Vector3(0, 1, 0),       // Welcome - look at center
  new THREE.Vector3(0, 1.5, 5),     // About - look ahead
  new THREE.Vector3(0, 2, 8),       // Skills - look at skill area
  new THREE.Vector3(0, 2, 12),      // Projects - look at project buildings
  new THREE.Vector3(0, 1.5, 18),    // Timeline - look at timeline
  new THREE.Vector3(0, 1, 22),      // Contact - look at contact area
];

// Get section from progress
export function getSectionFromProgress(progress: number): Section {
  for (let i = sections.length - 1; i >= 0; i--) {
    if (progress >= sections[i].progress) {
      return sections[i];
    }
  }
  return sections[0];
}

// Get progress for section
export function getProgressForSection(sectionId: string): number {
  const section = sections.find(s => s.id === sectionId);
  return section?.progress ?? 0;
}

// Get next section
export function getNextSection(currentId: string): Section | null {
  const currentIndex = sections.findIndex(s => s.id === currentId);
  if (currentIndex < sections.length - 1) {
    return sections[currentIndex + 1];
  }
  return null;
}

// Get previous section
export function getPreviousSection(currentId: string): Section | null {
  const currentIndex = sections.findIndex(s => s.id === currentId);
  if (currentIndex > 0) {
    return sections[currentIndex - 1];
  }
  return null;
}
