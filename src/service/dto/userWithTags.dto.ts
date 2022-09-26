import Tag from "../../dao/domain/tag.domain";

class UserWithTagsDTO {
    email: string;
    nickname: string;
    tags: Tag[]
    constructor( email: string, nickname: string, tags: Tag[]) {
        this.email = email
        this.nickname = nickname
        this.tags = tags
    }
}


export default UserWithTagsDTO