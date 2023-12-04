import ApiError from '../exceptions/ApiError.js';

export default function ErrorMiddleware(err, req, res, next) {
    // TODO: Нужно подумать куда логи с ошибками складывать
    console.log(err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        });
    }

    return res.status(500).json({
        message: 'Непредвиденная ошибка',
    });
}
