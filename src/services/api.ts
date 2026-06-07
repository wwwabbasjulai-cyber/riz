import type { Project, BlogPost, ContactRequest, SecurityConfig, SecurityLog } from '../types';

const BASE = '/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  auth: {
    login: (password: string, totpToken?: string) =>
      request<{ success: boolean }>('/auth/login', { method: 'POST', body: JSON.stringify({ password, totpToken }) }),
    logout: () => request<{ success: boolean }>('/auth/logout', { method: 'POST' }),
    me: () => request<{ isAdmin: boolean }>('/auth/me'),
  },

  projects: {
    list: () => request<Project[]>('/projects'),
    get: (id: string) => request<Project>(`/projects/${id}`),
    create: (data: Omit<Project, 'id'> & { id?: string }) =>
      request<Project>('/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Project>) =>
      request<Project>(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ success: boolean }>(`/projects/${id}`, { method: 'DELETE' }),
  },

  blog: {
    list: () => request<BlogPost[]>('/blog'),
    get: (id: string) => request<BlogPost>(`/blog/${id}`),
    create: (data: Omit<BlogPost, 'id'> & { id?: string }) =>
      request<BlogPost>('/blog', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ success: boolean }>(`/blog/${id}`, { method: 'DELETE' }),
  },

  contact: {
    submit: (data: { name: string; email: string; subject: string; message: string }) =>
      request<{ success: boolean; id: string }>('/contact', { method: 'POST', body: JSON.stringify(data) }),
    list: () => request<ContactRequest[]>('/contact'),
    patch: (id: string, data: { read?: boolean; responseNote?: string }) =>
      request<ContactRequest>(`/contact/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => request<{ success: boolean }>(`/contact/${id}`, { method: 'DELETE' }),
  },

  security: {
    getConfig: () => request<SecurityConfig>('/security/config'),
    updateConfig: (data: Partial<SecurityConfig>) =>
      request<SecurityConfig>('/security/config', { method: 'PUT', body: JSON.stringify(data) }),
    getLogs: () => request<SecurityLog[]>('/security/logs'),
    addLog: (data: Omit<SecurityLog, 'id' | 'date'>) =>
      request<SecurityLog>('/security/logs', { method: 'POST', body: JSON.stringify(data) }),
  },
};
