import {QueryResult} from "pg";

import TagDAO from "../api/tagDAO.interface";
import pool from "../../db/pool";
import Tag from "../domain/tag.domain";
import TagWithCreator from "../domain/tagWithCreator.domain";


class DBTagDAO implements TagDAO {
    async createTag(tagData: Tag) {
        const newTag: QueryResult<Tag> = await pool.query(`INSERT INTO tag (name, creator, "sortOrder")
                                                           VALUES ('${tagData.name}', '${tagData.creator}',
                                                                   '${tagData.sortOrder}
                                                                   ') RETURNING *`)
        return newTag.rows[0]
    }

    async getTagById(id: string) {
        const tag: QueryResult<Tag> = await pool.query(`SELECT *
                                                        FROM tag
                                                        WHERE id = '${id}'`)
        return tag.rows[0]
    }

    async getTagsByCreator(uid: string) {
        const tags: QueryResult<Tag> = await pool.query(`SELECT tag.id, tag.name, tag."sortOrder"
                                                         FROM tag
                                                         WHERE "creator" = '${uid}'`)
        return tags.rows
    }

    async getTagByName(name: string) {
        const tag: QueryResult<Tag> = await pool.query(`SELECT *
                                                        FROM tag
                                                        WHERE "name" = '${name}'`)
        return tag.rows[0]
    }

    async getTagWithCreator(tagId: string) {
        const tag: QueryResult<TagWithCreator> = await pool.query(`SELECT tag.name,
                                                                          tag."sortOrder",
                                                                          "user".uid,
                                                                          "user".nickname as "userNickname"
                                                                   FROM tag
                                                                            JOIN "user" ON tag.creator = "user".uid
                                                                   WHERE "id" = '${tagId}'`)
        return tag.rows[0]
    }

    async getSelectionTags(selectParams: { hasSortByOrder: boolean, hasSortByName: boolean, offset?: string, length?: string }) {
        let oderBy = ''
        if (selectParams.hasSortByOrder && selectParams.hasSortByName) {
            oderBy = 'ORDER BY tag."sortOrder" , tag.name'
        } else if (selectParams.hasSortByOrder) {
            oderBy = 'ORDER BY tag."sortOrder"'
        } else if (selectParams.hasSortByName) {
            oderBy = 'ORDER BY tag.name'
        }

        const tags: QueryResult<TagWithCreator> = await pool.query(`SELECT tag.name,
                                                                           tag."sortOrder",
                                                                           "user".uid,
                                                                           "user".nickname as "userNickname"
                                                                    FROM tag
                                                                             JOIN "user" ON tag.creator = "user".uid ${oderBy}
                                                                    OFFSET $1 LIMIT $2`, [
            selectParams.offset,
            selectParams.length])
        return tags.rows
    }

    async getQuantityRows() {
        const quantity = await pool.query('SELECT COUNT(*) FROM tag')
        return quantity.rows[0].count
    }

    async updateTag(tagData: Tag) {
        const updatedTag = await pool.query(`UPDATE tag
                                             SET name       = (CASE WHEN '${tagData.name}' = 'undefined' THEN name ELSE '${tagData.name}' END),
                                                 "sortOrder"= (CASE WHEN '${tagData.sortOrder}' = 'undefined' THEN "sortOrder" ELSE '${tagData.sortOrder}' END)
                                             WHERE id = ${tagData.id} RETURNING *`)
        return updatedTag.rows[0]
    }

    async deleteTag(id: string) {
        await pool.query(`DELETE
                          FROM tag
                          WHERE id = '${id}'`)
    }
}

export default new DBTagDAO