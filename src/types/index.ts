export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  githubUrl: string
  liveUrl?: string
  category: 'backend' | 'frontend'
}

export interface SkillGroup {
  category: string
  skills: string[]
  color: 'green' | 'cyan'
}

export interface LearningItem {
  id: string
  title: string
  subtitle: string
  status: 'in-progress' | 'completed'
}

export interface NavLink {
  label: string
  href: string
}

export interface ContactForm {
  name: string
  email: string
  message: string
}

export interface ContactErrors {
  name?: string
  email?: string
  message?: string
}

export interface TerminalWindowProps {
  title: string
  children: React.ReactNode
  accentColor?: 'green' | 'cyan'
}

export interface TypewriterResult {
  text: string
  isTyping: boolean
}

export interface PersonalInfo {
  name: string
  handle: string
  roles: string[]
  bio: string
  email: string
  github: string
  linkedin: string
  location: string
}
