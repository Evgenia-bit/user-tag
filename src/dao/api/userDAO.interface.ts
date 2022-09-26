import User from "../domain/user.domain";

interface UserDAO {
    createUser(userData: User): Promise<User>,
    getUserById(uid: string): Promise<User>,
    getUserByEmail(email: string): Promise<User>,
    findDuplicateEmailsOrNicknames(userData: User): Promise<boolean>
    findDuplicateEmailsOrNicknamesById(userData: User): Promise<boolean>
    updateUser(userData: User): Promise<User>
    deleteUserById(uid: string): Promise<void>
}

export default UserDAO