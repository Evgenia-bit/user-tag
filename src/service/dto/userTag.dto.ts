import Tag from "../../dao/domain/tag.domain";

class UserTagDto {
    tags: Tag[]
    constructor(tags: Tag[]) {
        this.tags = tags
    }
}

export default UserTagDto