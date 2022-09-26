import {QueryResult} from "pg";

import pool from "../../db/pool";
import UserTagDAO from "../api/userTagDAO.interface";
import ApiError from "../../errors/ApiError";
import UserTag from "../domain/userTag.domain";
import Tag from "../domain/tag.domain";

class DBUserTagDAO implements UserTagDAO {
    async addTagsToUser(uid: string, tags: string[]) {
        const allTags = await this.getAllTagsId()
        let allUserTags = await this.getAllUserTagByUserId(uid)

        let query = ''
        for await (const tagId of tags) {
            if (allTags.includes(tagId)) {
                if (!allUserTags.some(userTag => userTag.id === tagId)) {
                    query += `INSERT INTO usertag ("user", tag) VALUES ('${uid}', ${tagId}); `
                }
            } else {
                throw ApiError.notFound(`Тега с id ${tagId} не существует`)
            }
        }

        await this.doQueryInTransaction(query)
    }

    async doQueryInTransaction (sql: string) {
        await pool.query('BEGIN')

        try {
            await pool.query(sql)
            await pool.query('COMMIT')
        } catch (e) {
            await pool.query('ROLLBACK')
            throw e;
        }
    }

    private async getAllTagsId() {
        const tags: QueryResult<Tag> = await pool.query(`SELECT id
                                                         FROM tag`)
        return tags.rows.map(tag => tag.id)
    }


    async getAllUserTagByUserId(uid: string) {
        const allTags: QueryResult<Tag> = await pool.query(`SELECT tag.id, tag.name, tag."sortOrder"
                                                                FROM tag JOIN usertag ON tag.id = usertag.tag
                                                                WHERE usertag.user = '${uid}'`)
        return allTags.rows
    }


    async deleteTagToUser(userTag: UserTag) {
        await pool.query(`DELETE FROM usertag WHERE tag = ${userTag.tag}`)
    }
}

export default new DBUserTagDAO
