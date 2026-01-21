// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
  errors: ApiError[] | null;
}

export interface ApiError {
  field: string;
  message: string;
  code: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// User Types
export type UserRole = 'owner' | 'member';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  verified: boolean;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// Auth Types
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// Task Types
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  start_date: string | null;
  due_date: string | null;
  assigned_to: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  start_date?: string;
  due_date?: string;
  assigned_to?: string[];
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  start_date?: string;
  due_date?: string;
  assigned_to?: string[];
}

// Invitation Types
export interface Invitation {
  id: string;
  email: string;
  task_id: string;
  task_title?: string;
  invited_by: string;
  inviter_name?: string;
  accepted: boolean;
  expires_at: string;
  created_at: string;
}

export interface CreateInvitationPayload {
  email: string;
  task_id: string;
}

export interface AcceptInvitationPayload {
  token: string;
  first_name: string;
  last_name: string;
  password: string;
}

// Assignment Types
export interface Assignment {
  id: string;
  task_id: string;
  user_id: string;
}

export interface CreateAssignmentPayload {
  task_id: string;
  user_id: string;
}
