import swaggerJsdoc from 'swagger-jsdoc'
const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'REST API Docs',
            version: "1.0.0"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas: {
                UnauthorizedResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: "string",
                            default: "Не авторизован"
                        },
                        errors: {
                            type: "array",
                            default: []
                        }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.ts", "./src/dao/domain/*.ts"]
}
const swaggerSpec = swaggerJsdoc(options)


export default swaggerSpec