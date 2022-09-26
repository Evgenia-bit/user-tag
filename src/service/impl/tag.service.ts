import ApiError from '../../errors/ApiError'
import TagDTO from "../dto/tag.dto";
import Tag from "../../dao/domain/tag.domain";
import TagWithCreatorDto from "../dto/tagWithCreator.dto";
import TagSelectionDto from "../dto/tagSelection.dto";
import DBTagDAO from '../../dao/impl/tag.dao'
import DBUserDAO from '../../dao/impl/user.dao'
import TagService from "../api/tagService.interface";

class CommonTagService implements TagService {
    async createTag(tagData: Tag) {
        const existingTag = await DBTagDAO.getTagByName(tagData.name!)
        if (existingTag) {
            throw ApiError.conflict("Тег с таким именем уже существует")
        }

        const newTag = await DBTagDAO.createTag(tagData)
        return new TagDTO(newTag.id!, newTag.name!, newTag.sortOrder!)
    }

    async getOneTag(tagId: string) {
        const tag = await DBTagDAO.getTagWithCreator(tagId)
        if (!tag) {
            throw ApiError.notFound('Тег с таким id не существует')
        }

        return new TagWithCreatorDto({
            nickname: tag.userNickname,
            uid: tag.uid
        }, tag.name, tag.sortOrder)
    }

    async getAllTag(selectParams: { hasSortByOrder: boolean, hasSortByName: boolean, offset?: string, length?: string }) {
        const tags = await DBTagDAO.getSelectionTags(selectParams)
        const quantity = await DBTagDAO.getQuantityRows()

        const tagSelectionDTO = new TagSelectionDto([], {
            offset: selectParams.offset,
            length: selectParams.length,
            quantity: quantity
        })

        tags.forEach(tag => {
            tagSelectionDTO.data.push(new TagWithCreatorDto({
                nickname: tag.userNickname,
                uid: tag.uid
            }, tag.name, tag.sortOrder))
        })
        return tagSelectionDTO
    }

    async putTag(tagData: Tag) {
        const tag = await DBTagDAO.getTagById(tagData.id!)
        if (!tag) {
            throw ApiError.notFound('Тег с таким id не существует')
        }
        if (tag.creator !== tagData.creator) {
            throw ApiError.forbidden('Вы не можете изменить тег, созданный не вами')
        }

        const duplicateName = await DBTagDAO.getTagByName(tagData.name!)
        if (duplicateName && duplicateName.creator !== tagData.creator) {
            throw ApiError.conflict('Данное имя тега уже существует')
        }
        const updatedTag = await DBTagDAO.updateTag(tagData)

        const user = await DBUserDAO.getUserById(tagData.creator)

        return new TagWithCreatorDto({
            nickname: user.nickname!,
            uid: tagData.creator
        }, updatedTag.name, updatedTag.sortOrder)
    }

    async deleteTag(tagData: Tag) {
        const tag = await DBTagDAO.getTagById(tagData.id!)
        if (!tag) {
            throw ApiError.notFound('Тег с таким id не существует')
        }
        if (tag.creator !== tagData.creator) {
            throw ApiError.forbidden('Вы не можете удалить тег, созданный не вами')
        }
        await DBTagDAO.deleteTag(tagData.id!)
    }
}

export default new

CommonTagService()