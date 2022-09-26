import Tag from "../domain/tag.domain";
import TagWithCreator from "../domain/tagWithCreator.domain";

interface TagDAO {
    createTag(tagData: Tag): Promise<Tag>
    getTagById(id: string): Promise<Tag>
    getTagsByCreator(uid: string): Promise<Tag[]>
    getTagByName(name: string): Promise<Tag>
    getTagWithCreator(tagId: string): Promise<TagWithCreator>
    getSelectionTags(selectParams: { hasSortByOrder: boolean, hasSortByName: boolean, offset?: string, length?: string }): Promise<TagWithCreator[]>
    getQuantityRows(): Promise<number>
    updateTag(tagData: Tag): Promise<Tag>
    deleteTag(id: string): Promise<void>
}

export default TagDAO