import axios from 'axios';
import AuthResponse from "entity/response/AuthResponse";
import {REFRESH_URL} from "constant/api";
import {UNAUTHORIZED_STATUS} from "constant/errors";

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

// use принимает 2 колбэка, первый - если все прошло ок (onFulfilled), второй - если ошибка (onRejected)
// тут мы реализовали интерсептор на ответ сервера, если получаем 401, то делаем запрос на обновление токена
// затем повторяем исходный запрос
api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    // Делаем проверку на статус, и что запрос еще не был обработан
    if (error.response.status === UNAUTHORIZED_STATUS && error.config && !error.config._isRetry) {
        // Помечаем этот запрос как выполнившийся
        originalRequest._isRetry = true;

        try {
            const response = await axios.get<AuthResponse>(REFRESH_URL, {
                withCredentials: true,
            })

            localStorage.setItem('token', response.data.accessToken);

            return api.request(originalRequest);
        } catch {
            console.log('Пользователь не авторизован');
        }
    }

    throw error;
})

export default api;
