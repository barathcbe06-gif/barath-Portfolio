export interface Project {
  id: string;
  missionNumber: string;
  title: string;
  codename: string;
  description: string;
  extendedDescription: string;
  technologies: string[];
  status: 'ACTIVE MISSION' | 'CORE SYSTEM' | 'CLASSIFIED' | 'DEPLOYED';
  githubUrl: string;
  liveUrl?: string;
  metrics: {
    accuracy?: string;
    impact?: string;
    stars?: number;
    forks?: number;
  };
  highlights: string[];
  color: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    category: string;
    description: string;
    tags: string[];
  }[];
}

export interface GitHubStats {
  username: string;
  name: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string;
  totalStars: number;
  totalForks: number;
  topLanguages: {
    name: string;
    percentage: number;
    color: string;
  }[];
  recentActivity: {
    repo: string;
    type: string;
    date: string;
    description: string;
  }[];
}
