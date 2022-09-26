class TagDTO   {
    id: string
    name: string
    sortOrder: string
    constructor( id: string, name: string, sortOrder: string ) {
        this.id = id
        this.name = name
        this.sortOrder = sortOrder
    }
}

export default TagDTO