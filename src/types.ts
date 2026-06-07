/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string; // Base64 or elegant SVG placeholder
  tags: string[];
  client: string;
  date: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  compressedSize?: string;
  originalSize?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  socials: {
    github?: string;
    telegram?: string;
    email?: string;
  };
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  ip: string;
  responseNote?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  tags: string[];
}

export interface SecurityConfig {
  is2FAEnabled: boolean;
  twoFASecret: string;
  backupCodes: string[];
  lastLoginAttempts: number;
  adminPasswordHash: string; // Stored securely
}

export interface SecurityLog {
  id: string;
  action: string;
  details: string;
  date: string;
  status: 'success' | 'failed' | 'warning' | 'info';
}
