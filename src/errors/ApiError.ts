import {validationResult} from "express-validator";
import {Request} from "express";


class ApiError extends Error {
    status: number;
    errors: any[]

    constructor(status: number, message: string, errors: any[] = []) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static badRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors)
    }

    static notAuthorized() {
        return new ApiError(401, 'Не авторизован')
    }

    static forbidden(message: string) {
        return new ApiError(403, message)
    }

    static notFound(message: string) {
        return new ApiError(404, message)
    }

    static conflict(message: string) {
        return new ApiError(409, message)
    }

    static checkValidationErrors(req: Request) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw ApiError.badRequest("Произошла ошибка при валидации", errors.array())
        }
    }
}

export default ApiError