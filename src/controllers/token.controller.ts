import {NextFunction, Request, Response} from "express";
import CommonTokenService from "../service/impl/token.service";

class TokenController {
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const tokens = await CommonTokenService.refreshToken(refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 50 * 1000, httpOnly: true})
            return res.json(tokens)
        } catch (e) {
            next(e)
        }
    }
}

export default new TokenController()