import {NextFunction, Request, Response} from "express";
import {JwtPayload} from "jsonwebtoken";

import ApiError from "../errors/ApiError";
import TokenService from "../service/impl/token.service";


function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            throw ApiError.notAuthorized()
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            throw ApiError.notAuthorized()
        }

        const userData = TokenService.validateAccessToken(accessToken) as JwtPayload
        if (!userData) {
            throw ApiError.notAuthorized()
        }
        res.locals.user = userData
        next()
    } catch (e) {
        next(e)
    }

}

export default authMiddleware