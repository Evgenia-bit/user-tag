import bcryptjs from 'bcryptjs'
import {v4} from "uuid";

import AuthService from "../api/authService.interface";
import User from '../../dao/domain/user.domain'
import TokenService from './token.service'
import ApiError from '../../errors/ApiError'
import TokenDto from "../dto/token.dto";
import DBUserDAO from '../../dao/impl/user.dao'
import DBTokenDAO from "../../dao/impl/token.dao";


class CommonAuthService implements AuthService {
    async signin(userData: User) {
        const candidate = await DBUserDAO.findDuplicateEmailsOrNicknames(userData)
        if (candidate) {
            throw ApiError.conflict('Пользователь с таким email и/или nickname уже существует')
        }
        const hashPassword = await bcryptjs.hash(userData.password!, 5)
        const uid = v4()
        await DBUserDAO.createUser({uid, email: userData.email, password: hashPassword, nickname: userData.nickname})
        return await this.getTokens({uid, email: userData.email})
    }

    async login(userData: User) {
        const user = await DBUserDAO.getUserByEmail(userData.email)
        if (!user) {
            throw ApiError.notFound('Пользователь с таким email не найден')
        }
        const uid = user.uid as string
        const password = user.password as string
        const isPasswordsEqual = await bcryptjs.compare(userData.password!, password)
        if (!isPasswordsEqual) {
            throw ApiError.badRequest('Неверный пароль')
        }
        return await this.getTokens({uid, email: userData.email})
    }

    async logout(refreshToken: string) {
        await DBTokenDAO.deleteToken(refreshToken)
    }

    private async getTokens(userData: User) {
        const tokens = TokenService.generateTokens({uid: userData.uid!, email: userData.email})
        await TokenService.saveToken({user: userData.uid!, refreshToken: tokens.refreshToken})
        return new TokenDto(tokens)
    }
}

export default new CommonAuthService()