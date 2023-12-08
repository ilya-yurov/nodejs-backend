import ApiError from '../exceptions/ApiError.js';
import TokenService from '../services/TokenService.js';

export default function AuthMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = TokenService.validateToken(token, true);

        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;

        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}
