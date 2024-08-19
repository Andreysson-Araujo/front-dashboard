import axios from 'axios';

// Crie uma instância do Axios com as configurações padrão
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // URL base do backend
    timeout: 10000, // Tempo limite de 10 segundos para a requisição
});

export default api;
