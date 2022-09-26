import User from '../../dao/domain/user.domain'
import TokenDTO from '../dto/token.dto'

interface AuthService {
    signin(userData: User): Promise<TokenDTO>,
    login(userData: User): Promise<TokenDTO>,
    logout(refreshToken: string): Promise<void>
}

export default AuthService