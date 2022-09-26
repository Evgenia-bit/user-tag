import TagWithCreatorDto from "./tagWithCreator.dto";

class TagSelectionDto {
    data: TagWithCreatorDto[]
    meta: {
        offset?: string,
        length?: string,
        quantity: string
    }
    constructor(data: TagWithCreatorDto[], meta: { offset?: string, length?: string, quantity: string}) {
        this.data = data
        this.meta = meta
    }
}

export default TagSelectionDto