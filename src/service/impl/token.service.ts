import jwt, {JwtPayload} from 'jsonwebtoken'
import dotenv from "dotenv";

import ApiError from "../../errors/ApiError";
import User from "../../dao/domain/user.domain";
import TokenDto from "../dto/token.dto";
import Token from "../../dao/domain/token.domain";
import DBTokenDAO from '../../dao/impl/token.dao'
import DBUserDAO from '../../dao/impl/user.dao'
import TokenService from "../api/tokenService.interface";

dotenv.config({path: ".env"});

class CommonTokenService  implements TokenService{
    generateTokens(payload: User) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: '30m'})
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET!,
            {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET!)
        } catch (e) {
            return null
        }
    }

    private validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JwtPayload
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(token: Token) {
        const tokenData = await DBTokenDAO.getTokenByUser(token.user)
        if (tokenData) {
            await DBTokenDAO.updateToken(token)
        } else {
            await DBTokenDAO.createToken(token)
        }
    }


    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.notAuthorized()
        }
        const userData = this.validateRefreshToken(refreshToken)
        const tokenFromDB = await DBTokenDAO.getTokenByToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw ApiError.notAuthorized()
        }
        const user = await DBUserDAO.getUserById(userData.uid)
        const tokens = commonTokenService.generateTokens({uid: user.uid, email: user.email})
        await commonTokenService.saveToken({user: user.uid!, refreshToken: tokens.refreshToken});
        return new TokenDto(tokens)
    }

}

const commonTokenService = new CommonTokenService()
export default commonTokenService