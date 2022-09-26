import express from 'express';
import TokenController from '../controllers/token.controller'

const tokenRouter = express.Router();


/**
 *  @openapi
 * '/refresh':
 *  get:
 *      tags:
 *      - Token
 *      summary: Обновление токена
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Tokens'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnauthorizedResponse'
 */
tokenRouter.get('/refresh', TokenController.refresh)


export default tokenRouter