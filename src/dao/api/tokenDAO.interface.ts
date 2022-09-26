import Token from "../domain/token.domain";

interface TokenDAO {
    createToken(token: Token): Promise<void>
    getTokenByUser(uid: string): Promise<Token>
    getTokenByToken(refreshToken: string): Promise<Token>
    updateToken(token: Token): Promise<void>
    deleteToken(refreshToken: string): Promise<void>
}

export default TokenDAO