export interface Skill {
  category: string;
  items: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
}

export interface Project {
  title: string;
  type: string;
  description: string;
  tags: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  featured: boolean;
}

export interface AboutData {
  name: string;
  title: string;
  description: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface PortfolioData {
  about: AboutData;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

export interface ApiResponse {
  success: boolean;
  data: PortfolioData;
}
