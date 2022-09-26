import express from 'express';
import UserTagController from '../controllers/userTag.controller'
import AuthMiddleware from "../middleware/auth.middleware";
import {body} from "express-validator";

const userTagRouter = express.Router();

/**
 *  @openapi
 * '/user/tag':
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User Tag
 *      summary: Добавление тегов пользователю
 *      requestBody:
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/UserTagInput'
 *      responses:
 *        200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserTagResponse'
 *        400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BadRequestWhenAddingTagToUser'
 *        404:
 *              description: Not Found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NotFoundWhenAddingTag'
 *        401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnauthorizedResponse'
 */

userTagRouter.post('/user/tag',
    AuthMiddleware,
    body('tags')
        .isArray({
            min: 1
        })
        .withMessage("Поле tags должно быть массивом и не может быть пустым"),
    UserTagController.addTagToUser)

/**
 *  @openapi
 * '/user/tag/{tagId}':
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User Tag
 *      summary: Удаление тегов у пользователя
 *      parameters:
 *          - in: path
 *            name: tagId
 *            type: integer
 *            default: 1
 *            required: true
 *            description: Id тега
 *      responses:
 *         200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserTagResponse'
 *         401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnauthorizedResponse'
 */
userTagRouter.delete('/user/tag/:id',
    AuthMiddleware,
    UserTagController.deleteTagFromUser)

/**
 *  @openapi
 * '/user/tag/my':
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User Tag
 *      summary: Получение тегов, которые создал пользователь
 *      responses:
 *         200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserTagResponse'
 *         401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnauthorizedResponse'
 */
userTagRouter.get('/user/tag/my',
    AuthMiddleware,
    UserTagController.getCreatorTags)


export default userTagRouter