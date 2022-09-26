import express from 'express';
import AuthController from '../controllers/auth.controller'
import {body} from 'express-validator'
import AuthMiddleware from "../middleware/auth.middleware";

const authRouter = express.Router();

/**
 * @openapi
 * '/signin':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Регистрация пользователя
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserInputForRegistrationOrPut'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tokens'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/BadRequestWhenCreateOrUpdateUser'
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/UserConflict'
 */

authRouter.post('/signin',
    body('email')
        .notEmpty()
        .withMessage("Поле email обязательно для заполнения")
        .isEmail()
        .withMessage("Некорректный email"),
    body('password')
        .notEmpty()
        .withMessage("Поле password обязательно для заполнения")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
        })
        .withMessage("Пароль должен быть больше 8 и содержать по крайней мере одну заглавную букву, одну строчную букву и одну цифру"),
    body('nickname')
        .notEmpty()
        .withMessage("Поле nickname обязательно для заполнения"),
    AuthController.signin)

/**
 * @openapi
 * '/login':
 *  post:
 *      tags:
 *      - Auth
 *      summary: Авторизация пользователя
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Tokens'
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BadRequestWhenLoginUser'
 *          404:
 *              description: Not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NotFoundUser'
 *
 */

authRouter
    .post('/login',
        body('email')
            .notEmpty()
            .withMessage("Поле email обязательно для заполнения"),
        body('password')
            .notEmpty()
            .withMessage("Поле password обязательно для заполнения"),
        AuthController.login)

/**
 *  @openapi
 * '/logout':
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *      - Auth
 *      summary: Выход пользователя из системы
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  default: Вы успешно вышли из системы
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnauthorizedResponse'
 */

authRouter.post('/logout',
    AuthMiddleware,
    AuthController.logout)

export default authRouter
