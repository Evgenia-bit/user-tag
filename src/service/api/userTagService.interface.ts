import UserTagDto from "../dto/userTag.dto";
import UserTag from "../../dao/domain/userTag.domain";

interface UserTagService {
    addTagToUser(uid: string, tags: string[]): Promise<UserTagDto>
    deleteTagFromUser(userTag: UserTag): Promise<UserTagDto>
    getCreatorTags(uid: string): Promise<UserTagDto>
}

export default UserTagService