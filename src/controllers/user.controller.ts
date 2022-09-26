import {NextFunction, Request, Response} from "express";

import CommonUserService from "../service/impl/user.service";
import ApiError from "../errors/ApiError";

class UserController {
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {uid} = res.locals.user
            const user = await CommonUserService.getUser(uid)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async putUser(req: Request, res: Response, next: NextFunction) {
        try {
            ApiError.checkValidationErrors(req)
            const {email, password, nickname} = req.body
            const {uid} = res.locals.user
            const user = await CommonUserService.putUser({uid, email, password, nickname})
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {uid} = res.locals.user
            const {refreshToken} = req.cookies
            await CommonUserService.deleteUser(uid, refreshToken)
            res.clearCookie('refreshToken')
            return res.json({message: 'Пользователь удалён'})
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController();