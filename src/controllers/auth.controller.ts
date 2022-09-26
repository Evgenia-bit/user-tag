import {NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv'

import CommonAuthService from "../service/impl/auth.service";
import ApiError from '../errors/ApiError'

dotenv.config({path: ".env"});


class AuthController {
    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            ApiError.checkValidationErrors(req)
            const {email, password, nickname} = req.body
            const tokens = await CommonAuthService.signin({email, password, nickname})
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 50 * 1000, httpOnly: true})
            return res.json(tokens)
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            ApiError.checkValidationErrors(req)
            const {email, password} = req.body
            const tokens = await CommonAuthService.login({email, password})
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 50 * 1000, httpOnly: true})
            return res.json(tokens)
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            await CommonAuthService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({message: 'Вы успешно вышли из системы'})
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController();