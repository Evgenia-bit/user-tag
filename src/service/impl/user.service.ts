import User from '../../dao/domain/user.domain'
import UserDto from "../dto/user.dto";
import ApiError from '../../errors/ApiError'
import UserWithTagsDto from "../dto/userWithTags.dto";
import AuthService from "./auth.service";
import UserService from "../api/userService.interface";
import DBUserDAO from  '../../dao/impl/user.dao'
import DBTagDAO from '../../dao/impl/tag.dao'

class CommonUserService implements UserService{
    async getUser(uid: string) {
        const user = await DBUserDAO.getUserById(uid)
        const tags = await DBTagDAO.getTagsByCreator(uid)
        const userDTO = new UserWithTagsDto(user.email, user.nickname!, tags)
        return userDTO
    }

    async putUser(userData: User) {
        const duplicate = await DBUserDAO.findDuplicateEmailsOrNicknamesById(userData)
        if (duplicate) {
            throw ApiError.conflict('Данный email и/или nickname уже существует')
        }
        const updatedUser = await DBUserDAO.updateUser(userData)
        return new UserDto(updatedUser.email, updatedUser.nickname!)
    }

    async deleteUser(uid: string, refreshToken:string) {
        await DBUserDAO.deleteUserById(uid)
        await AuthService.logout(refreshToken)
    }
}

export default new CommonUserService()