import {QueryResult} from "pg";
import UserDAO from "../api/userDAO.interface";
import pool from "../../db/pool";
import User from "../domain/user.domain";


class DBUserDAO implements UserDAO {
    async createUser(userData: User) {
        const newUser: QueryResult<User> = await pool.query(`INSERT INTO "user"
                                                             VALUES ('${userData.uid}', '${userData.email}',
                                                                     '${userData.password}', '${userData.nickname}
                                                                     ') RETURNING *`)
        return newUser.rows[0]
    }

    async getUserById(uid: string) {
        const user: QueryResult<User> = await pool.query(`SELECT *
                                                          FROM "user"
                                                          WHERE uid = '${uid}'`)
        return user.rows[0]
    }

    async getUserByEmail(email: string) {
        const user: QueryResult<User> = await pool.query(`SELECT *
                                                          FROM "user"
                                                          WHERE email = '${email}'`)
        return user.rows[0]
    }

    async findDuplicateEmailsOrNicknames(userData: User) {
        const duplicate = await pool.query(`SELECT EXISTS(SELECT *
                                                          FROM "user"
                                                          WHERE email = '${userData.email}'
                                                             OR nickname = '${userData.nickname}')`)
        return duplicate.rows[0].exists
    }

    async findDuplicateEmailsOrNicknamesById(userData: User) {
        const duplicate = await pool.query(`SELECT EXISTS(SELECT *
                                                          FROM "user"
                                                          WHERE (email = '${userData.email}' OR nickname = '${userData.nickname}')
                                                            AND uid <> '${userData.uid}')`)
        return duplicate.rows[0].exists
    }

    async updateUser(userData: User) {
        const updatedUser: QueryResult<User> = await pool.query(`UPDATE "user"
                                                                 SET email    = (CASE WHEN '${userData.email}' = 'undefined' THEN email ELSE '${userData.email}' END),
                                                                     password = (CASE WHEN '${userData.password}' = 'undefined' THEN password ELSE '${userData.password}' END),
                                                                     nickname = (CASE WHEN '${userData.nickname}' = 'undefined' THEN nickname ELSE '${userData.nickname}' END)
                                                                 WHERE uid = '${userData.uid}' RETURNING *`)
        return updatedUser.rows[0]
    }

    async deleteUserById(uid: string) {
        await pool.query(`DELETE
                          FROM "user"
                          WHERE uid = '${uid}'`)
    }
}

export default new DBUserDAO()