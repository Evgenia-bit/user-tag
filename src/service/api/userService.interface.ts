import UserDto from "../dto/user.dto";
import User from "../../dao/domain/user.domain";

interface UserService {
    getUser(uid: string):  Promise<UserDto>
    putUser(userData: User): Promise<UserDto>
    deleteUser(uid: string, refreshToken:string): Promise<void>
}

export default UserService