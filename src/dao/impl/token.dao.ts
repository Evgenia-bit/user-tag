import {QueryResult} from "pg";

import TokenDAO from "../api/tokenDAO.interface";
import pool from "../../db/pool";
import Token from "../domain/token.domain";

class DBTokenDAO implements TokenDAO {
    async createToken(token: Token) {
        await pool.query(`INSERT INTO token
                          VALUES ('${token.user}', '${token.refreshToken}')`)
    }

    async getTokenByUser(uid: string) {
        const token: QueryResult<Token> = await pool.query(`SELECT *
                                                            FROM token
                                                            WHERE "user" = '${uid}'`)
        return token.rows[0]
    }

    async getTokenByToken(refreshToken: string) {
        const token: QueryResult<Token> = await pool.query(`SELECT *
                                                            FROM token
                                                            WHERE "refreshToken" = '${refreshToken}'`)
        return token.rows[0]
    }

    async updateToken(token: Token) {
        await pool.query(`UPDATE token
                          SET "refreshToken" = '${token.refreshToken}'
                          WHERE "user" = '${token.user}'`)
    }

    async deleteToken(refreshToken: string) {
        await pool.query(`DELETE
                          FROM token
                          WHERE "refreshToken" = '${refreshToken}'`)
    }
}

export default new DBTokenDAO