import UserTag from "../domain/userTag.domain";
import Tag from "../domain/tag.domain";

interface UserTagDAO {
    addTagsToUser(uid: string, tags: string[]): Promise<void>
    getAllUserTagByUserId(uid: string): Promise<Tag[]>
    deleteTagToUser(userTag: UserTag): Promise<void>
}

export default UserTagDAO