class TagWithCreatorDto {
    creator: {
        "nickname": string,
        "uid": string
    };
    name: string
    sortOrder: string
    constructor(creator: { "nickname": string, "uid": string }, name: string, sortOrder: string) {
        this.creator = creator
        this.name = name
        this.sortOrder = sortOrder
    }
}

export default TagWithCreatorDto