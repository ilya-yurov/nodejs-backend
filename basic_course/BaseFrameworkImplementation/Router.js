module.exports = class Router {
    constructor() {
        this.endpoints = {}
    }

    // По определенному пути и маршруту мы создаем обработчик, который должен принять от пользователя запрос и вернуть ответ
    request(method = "GET", path, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {}
        }

        // /users [GET, POST, PUT] /posts [GET, POST, PUT, DELETE]
        const endpoint = this.endpoints[path];

        if (endpoint[method]) {
            throw new Error(`[${method}] по адресу ${path} уже существует`)
        }

        endpoint[method] = handler;


    }

    get(path, handler) {
        this.request('GET', path, handler)
    }

    post(path, handler) {
        this.request('POST', path, handler)
    }

    put(path, handler) {
        this.request('PUT', path, handler)
    }

    delete(path, handler) {
        this.request('DELETE', path, handler)
    }
}
