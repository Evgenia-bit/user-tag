import express from 'express';
import UserController from '../controllers/user.controller'
import AuthMiddleware from "../middleware/auth.middleware";
import {body} from "express-validator";

const userRouter = express.Router();

/**
 *  @openapi
 * '/user':
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      summary: Получение пользователя
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserWithTags'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnauthorizedResponse'
 */

userRouter.get('/user',
    AuthMiddleware,
    UserController.getUser)

/**
 *  @openapi
 * '/user':
 *  put:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      summary: Изменение пользователя
 *      requestBody:
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/UserInputForRegistrationOrPut'
 *      responses:
 *         200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *         400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BadRequestWhenCreateOrUpdateUser'
 *         401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnauthorizedResponse'
 *         409:
 *              description: Conflict
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserConflict'
 */

userRouter.put('/user',
    AuthMiddleware,
    body('email')
        .optional()
        .isEmail()
        .withMessage("Некорректный email"),
    body('password')
        .optional()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
        })
        .withMessage("Пароль должен быть больше 8 и содержать по крайней мере одну заглавную букву, одну строчную букву и одну цифру"),
    body('nickname')
        .optional()
        .isString()
        .withMessage("Ник должен быть строкой"),
    UserController.putUser)

/**
 *  @openapi
 * '/user':
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - User
 *      summary: Удаление пользователя
 *      responses:
 *         200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserDeleteResponse'
 *         401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnauthorizedResponse'
 */

userRouter.delete('/user',
    AuthMiddleware,
    UserController.deleteUser)


export default userRouter