import dotenv from "dotenv";

import UserTagDto from "../dto/userTag.dto";
import DBUserTagDAO from "../../dao/impl/userTag.dao";
import DBTagDAO from '../../dao/impl/tag.dao'
import UserTag from "../../dao/domain/userTag.domain";
import UserTagService from "../api/userTagService.interface";

dotenv.config({path: ".env"});


class CommonUserTagService implements UserTagService{
    async addTagToUser(uid: string, tags: string[]) {
        await DBUserTagDAO.addTagsToUser(uid, tags)
        const allTags = await DBUserTagDAO.getAllUserTagByUserId(uid)
        return new UserTagDto(allTags)
    }
    async deleteTagFromUser(userTag: UserTag) {
        await DBUserTagDAO.deleteTagToUser({user: userTag.user, tag: userTag.tag})
        const allTags = await DBUserTagDAO.getAllUserTagByUserId(userTag.user)
        return new UserTagDto(allTags)
    }
    async getCreatorTags(uid: string) {
        const creatorTags = await DBTagDAO.getTagsByCreator(uid)
        return new UserTagDto(creatorTags)
    }
}

export default new CommonUserTagService