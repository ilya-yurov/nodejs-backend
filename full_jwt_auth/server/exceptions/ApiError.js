class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    // static-функции можно использовать не создавая экземпляр класса
    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    // Указаны некорректные параметры, непройденная валидация и т.п.
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}

export default ApiError;
