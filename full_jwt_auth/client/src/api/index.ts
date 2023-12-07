import axios from 'axios';

// Создаем инстанс, чтобы не писать каждый раз адрес апи
const api = axios.create({
    // Для того, чтобы к каждому запросу куки цеплялись автоматически
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
})

// config - инстанс аксиоса, есть те же поля, типа baseUrl и т.д.
api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

    return config
})

export default api;
