/**
 * @openapi
 * components:
 *      schemas:
 *          Tokens:
 *              type: object
 *              properties:
 *                  accessToken:
 *                      type: string
 *                      default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkZWZlMzcwOS0zOTRjLTQwMjYtODUxNy05MmQ3NTNhYWEzNGQiLCJlbWFpbCI6ImV4YW1wbGVAZXhlLmNvbSIsImlhdCI6MTY2NDE3NzM0MywiZXhwIjoxNjY0MTc5MTQzfQ.bReBf-0ixn3U4rY4EZDTjh8BUWJwfuBmqgqRgtQYi9A
 *                  refreshToken:
 *                      type: string
 *                      default: yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkZWZlMzcwOS0zOTRjLTQwMjYtODUxNy05MmQ3NTNhYWEzNGQiLCJlbWFpbCI6ImV4YW1wbGVAZXhlLmNvbSIsImlhdCI6MTY2NDE3NzM0MywiZXhwIjoxNjY2NzY5MzQzfQ.AsH0jk3Gocl7C0BZFMTCmy-8OFNFQVQA4Pluyno54-U
 *                  expire:
 *                      type: string
 *                      default: 1800
 */

type Token =  {
    user: string
    refreshToken: string
}

export default Token