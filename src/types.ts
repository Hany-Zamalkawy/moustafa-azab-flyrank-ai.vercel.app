export interface Skill {
  name: string;
  category: "Languages" | "Frameworks" | "Cloud/DevOps" | "Databases";
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  bullets: string[];
  skillsUsed?: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Frontend" | "Full-Stack" | "Data & AI" | "Web Design";
  skills: string[];
  link?: string;
  github?: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  category: "Full-Stack" | "Data Engineering" | "Python & Architecture" | "AI & Cloud";
  description: string;
  deliverables: string[];
  techStack: string[];
  icon: string;
}

export interface Profile {
  name: string;
  role: string;
  mission: string;
  focus: string[];
  bio: string;
  heroBio?: string;
}
