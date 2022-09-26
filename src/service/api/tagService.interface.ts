import TagDTO from "../dto/tag.dto";
import TagWithCreatorDto from "../dto/tagWithCreator.dto";
import Tag from "../../dao/domain/tag.domain";
import TagSelectionDto from "../dto/tagSelection.dto";

interface TagService {
    createTag(tagData: Tag): Promise<TagDTO>
    getOneTag(tagId: string): Promise<TagWithCreatorDto>
    getAllTag(selectParams: { hasSortByOrder: boolean, hasSortByName: boolean, offset?: string, length?: string }): Promise<TagSelectionDto>
    putTag(tagData: Tag): Promise<TagWithCreatorDto>
    deleteTag(tagData: Tag): Promise<void>
}

export default TagService