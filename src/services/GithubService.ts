import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";
import AuthService from "./AuthService";
import LoadingService from './LoadingService';

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com';

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

// Configuración de Axios: Inyecta el token en cada petición automáticamente
githubApi.interceptors.request.use(config => {
    // activar spinner global en cada petición
    LoadingService.increment();
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
    return config;
}, error => {
    LoadingService.decrement();
    return Promise.reject(error);
});

// Manejo global de respuestas: si el token expira o es inválido, cerrar sesión y redirigir
githubApi.interceptors.response.use(
    response => {
        // respuesta recibida -> desactivar spinner
        LoadingService.decrement();
        return response;
    },
    error => {
        // en caso de error también desactivar
        LoadingService.decrement();
        if (error?.response?.status === 401) {
            AuthService.logout();
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// GET: Obtener repositorios
type GitHubRepo = {
    name: string;
    description: string | null;
    owner: { avatar_url?: string | null; login?: string | null };
    language?: string | null;
};

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await githubApi.get<GitHubRepo[]>(`/user/repos`, {
            params: { per_page: 100, sort: 'created', direction: 'desc', affiliation: 'owner' },
        });
        return response.data.map((repo) => ({
            name: repo.name,
            description: repo.description ?? null,
            imageUrl: repo.owner?.avatar_url ?? null,
            owner: repo.owner?.login ?? null,
            lenguaje: repo.language ?? null,
        }));
    } catch (err) {
        console.error("Error al obtener repositorios:", err);
        throw err;
    }
};

// GET: Información del usuario
export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const response = await githubApi.get(`/user`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo usuario:', error);
        return null;
    }
};

// POST: Crear repositorio
export const createRepository = async (repo: { name: string, description?: string }): Promise<void> => {
    try {
        await githubApi.post(`/user/repos`, repo);
    } catch (err) {
        console.error('Error creando repositorio:', err);
        throw err;
    }
};

// PATCH: Editar repositorio (Implementación nueva)
export const updateRepository = async (owner: string, oldName: string, newRepo: { name: string, description?: string }): Promise<void> => {
    try {
        await githubApi.patch(`/repos/${owner}/${oldName}`, newRepo);
    } catch (err) {
        console.error('Error actualizando repositorio:', err);
        throw err;
    }
};

// DELETE: Eliminar repositorio (Implementación nueva)
export const deleteRepository = async (owner: string, repoName: string): Promise<void> => {
    try {
        await githubApi.delete(`/repos/${owner}/${repoName}`);
    } catch (err) {
        console.error('Error eliminando repositorio:', err);
        throw err;
    }
};

// PUT alias (GitHub API uses PATCH for updates; este helper envuelve PATCH
export const putRepository = async (owner: string, oldName: string, newRepo: { name: string, description?: string }): Promise<void> => {
  return updateRepository(owner, oldName, newRepo);
};