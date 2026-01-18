import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";
import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
//const GITHUB_API_TOKEN = `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`;

const githubApi= axios.create({
    baseURL: GITHUB_API_URL,
    
});

githubApi.interceptors.request.use(config => {
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
 try{  
    const response = await githubApi.get(`/user/repos`, {
        
        params: {
            per_page: 100,
            sort: 'created',
            direction: 'desc',
            affiliation: 'owner',
        },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reposData: RepositoryItem[] = response.data.map((repo: any) => ({
        name: repo.name,
        description: repo.description? repo.description : null,
        imageUrl: repo.owner.avatar_url || null,
        owner: repo.owner.login || null,
        language: repo.language || null,
         }));
    return reposData;

   } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    try {
          const response = await githubApi.post(`/user/repos`, {
            name: repo.name,
            description: repo.description,
            private: false // or based on some logic
          });
          console.log("Repository created:", response.data); 
            
        }catch (error) {
        console.error("Error creating repository:", error);
    }
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const response = await githubApi.get(`/user`);
        return response.data ;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    } 
};