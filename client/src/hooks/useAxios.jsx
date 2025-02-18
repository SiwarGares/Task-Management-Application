import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from 'context/authContext';

const useAxios = () => {
    const { token, logout } = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api', 
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Intercepteur pour ajouter le token dans les requêtes
    axiosInstance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Intercepteur pour gérer les erreurs globales
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                logout(); // Déconnecter l'utilisateur si le token est invalide
            }
            return Promise.reject(error);
        }
        
    );

    return axiosInstance;
};

export default useAxios;
