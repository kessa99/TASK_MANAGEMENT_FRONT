import { ApiResponse, AuthTokens, User, Task, CreateTaskPayload, UpdateTaskPayload, LoginPayload, RegisterPayload } from '@/types/api';

// URL de base de l'API
const API_BASE_URL = '/api';

// Récupère l'en-tête d'authentification
const getAuthHeader = (): HeadersInit => {
  const tokens = localStorage.getItem('taskmanager_tokens');
  if (tokens) {
    const parsed = JSON.parse(tokens);
    return { Authorization: `Bearer ${parsed.access_token}` };
  }
  return {};
};

// Wrapper générique pour les appels API
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      data: null,
      message: 'Erreur réseau',
      errors: [{ field: 'network', message: 'Impossible de se connecter au serveur', code: 'NETWORK_ERROR' }],
    };
  }
}

// API Authentification
export const authApi = {
  connexion: (payload: LoginPayload) =>
    apiFetch<AuthTokens>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  inscription: (payload: RegisterPayload) =>
    apiFetch<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  moi: () => apiFetch<User>('/auth/me'),

  deconnexion: () =>
    apiFetch<null>('/auth/logout', {
      method: 'POST',
    }),

  rafraichir: (refreshToken: string) =>
    apiFetch<AuthTokens>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    }),
};

// API Tâches
export const tachesApi = {
  obtenirTout: () => apiFetch<Task[]>('/tasks'),

  obtenirMesTaches: () => apiFetch<Task[]>('/tasks/my'),

  obtenirParId: (id: string) => apiFetch<Task>(`/tasks/${id}`),

  creer: (payload: CreateTaskPayload) =>
    apiFetch<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  mettreAJour: (id: string, payload: UpdateTaskPayload) =>
    apiFetch<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  supprimer: (id: string) =>
    apiFetch<null>(`/tasks/${id}`, {
      method: 'DELETE',
    }),
};

// API Utilisateurs
export const utilisateursApi = {
  obtenirMembres: () => apiFetch<User[]>('/users'),

  obtenirParId: (id: string) => apiFetch<User>(`/users/${id}`),

  verifier: (id: string) =>
    apiFetch<User>(`/users/${id}/verify`, {
      method: 'POST',
    }),
};
