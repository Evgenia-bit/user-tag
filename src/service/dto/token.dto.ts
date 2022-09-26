class TokenDto {
    accessToken: string;
    refreshToken: string;
    expire: string = "1800"
    constructor( tokens: {accessToken: string, refreshToken: string} ) {
        this.accessToken = tokens.accessToken
        this.refreshToken = tokens.refreshToken
        this.expire = "1800"
    }
}

export default TokenDto