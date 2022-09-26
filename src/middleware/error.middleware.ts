import {Response, Request, NextFunction} from 'express'
import ApiError from '../errors/ApiError'

function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    console.log(err)
    return res.status(500).json({message: `Непредвиденная ошибка! ${err.message}`})
}

export default errorMiddleware