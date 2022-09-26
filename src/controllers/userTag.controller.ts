import {NextFunction, Request, Response} from "express";

import CommonUserTagService from "../service/impl/userTag.service";
import ApiError from "../errors/ApiError";


class UserTagController {
    async addTagToUser(req: Request, res: Response, next: NextFunction) {
        try {
            ApiError.checkValidationErrors(req)
            const tags: string[] = req.body.tags
            const {uid} = res.locals.user
            const userTags = await CommonUserTagService.addTagToUser(uid, tags)
            return res.json(userTags)
        } catch (e) {
            next(e)
        }
    }

    async deleteTagFromUser(req: Request, res: Response, next: NextFunction) {
        try {
            const tagId = req.params.id
            const {uid} = res.locals.user
            const userTags = await CommonUserTagService.deleteTagFromUser({user: uid, tag: tagId})
            return res.json(userTags)
        } catch (e) {
            next(e)
        }
    }

    async getCreatorTags(req: Request, res: Response, next: NextFunction) {
        try {
            const {uid} = res.locals.user
            const creatorTags = await CommonUserTagService.getCreatorTags(uid)
            return res.json(creatorTags)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserTagController();