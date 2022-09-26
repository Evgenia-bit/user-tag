import {NextFunction, Request, Response} from "express";

import ApiError from "../errors/ApiError";
import CommonTagService from "../service/impl/tag.service";


class TagController {
    async createTag(req: Request, res: Response, next: NextFunction) {
        try {
            ApiError.checkValidationErrors(req)
            let {name, sortOrder} = req.body
            const {uid} = res.locals.user
            if (typeof sortOrder === 'undefined') {
                sortOrder = 0
            }
            const tag = await CommonTagService.createTag({name, sortOrder, creator: uid})
            return res.json(tag)
        } catch (e) {
            next(e)
        }
    }

    async getOneTag(req: Request, res: Response, next: NextFunction) {
        try {
            const tagId = req.params.id
            const tag = await CommonTagService.getOneTag(tagId)
            return res.json(tag)
        } catch (e) {
            next(e)
        }
    }

    async getAllTag(req: Request, res: Response, next: NextFunction) {
        try {
            const offset = req.query.offset as string
            const length = req.query.length as string
            const hasSortByOrder = typeof req.query.sortByOrder !== 'undefined'
            const hasSortByName = typeof req.query.sortByName !== 'undefined'
            const tags = await CommonTagService.getAllTag({hasSortByOrder, hasSortByName, offset, length})
            return res.json(tags)
        } catch (e) {
            next(e)
        }
    }

    async putTag(req: Request, res: Response, next: NextFunction) {
        try {
            ApiError.checkValidationErrors(req)
            const tagId = req.params.id
            const {name, sortOrder} = req.body
            if (!name && !sortOrder) {
                throw ApiError.badRequest('Должно быть заполнено хотя бы одно поле')
            }
            const {uid} = res.locals.user
            const tag = await CommonTagService.putTag({id: tagId, name, sortOrder, creator: uid})
            return res.json(tag)
        } catch (e) {
            next(e)
        }
    }

    async deleteTag(req: Request, res: Response, next: NextFunction) {
        try {
            const tagId = req.params.id
            const {uid} = res.locals.user
            await CommonTagService.deleteTag({id: tagId, creator: uid})
            return res.json({message: 'Тег успешно удален'})
        } catch (e) {
            next(e)
        }
    }
}

export default new TagController();