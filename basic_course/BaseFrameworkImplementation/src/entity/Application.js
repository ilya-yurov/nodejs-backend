const http = require('http');
const EventEmitter = require('events');

module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    use(middlewares) {
        middlewares.forEach(middleware => this.middlewares.push(middleware));
    }

    listen(port, callback) {
        this.server.listen(port, callback)
    }

    // Структура эндпоинта
    // endpoint = {
    //     '/users' : {
    //         'GET': handler
    //     }
    // }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];

            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method]

                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    handler(req, res);
                })
            })
        })
    }

    _createServer() {
        return http.createServer((req, res) => {
            this.middlewares.forEach(middleware => middleware(req, res));

            req.on('end', () => {
                const isEmitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res);

                if (!isEmitted) {
                    res.end()
                }
            })
        });
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`
    }
}
