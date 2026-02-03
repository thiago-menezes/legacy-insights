import { IntegrationType } from '../integrations';

export interface ProjectMember {
  id: number;
  documentId: string;
  role: 'admin' | 'editor' | 'viewer';
  user?: {
    id: number;
    username: string;
    email: string;
  } | null;
}

export interface StrapiProject {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  workspace?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
  };
  integrations?: {
    id: number;
    documentId: string;
    name: string;
    type: IntegrationType;
    status: 'connected' | 'disconnected' | 'token_expired';
  }[];
  projectMembers?: ProjectMember[];
}

export interface ProjectResponse {
  data: StrapiProject[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SingleProjectResponse {
  data: StrapiProject;
}

export interface ProjectCreateInput {
  name: string;
  slug: string;
  description?: string;
  workspace: number | string;
}
