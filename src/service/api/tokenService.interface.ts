import {JwtPayload} from 'jsonwebtoken'
import User from "../../dao/domain/user.domain";
import Token from "../../dao/domain/token.domain";
import TokenDto from "../dto/token.dto";

interface TokenService {
    generateTokens(payload: User): {accessToken: string, refreshToken: string}
    validateAccessToken(token: string): string | JwtPayload | null
    saveToken(token: Token): Promise<void>
    refreshToken(refreshToken: string): Promise<TokenDto>
}
export default TokenService