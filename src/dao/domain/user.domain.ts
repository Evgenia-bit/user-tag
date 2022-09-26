/**
 * @openapi
 * components:
 *      schemas:
 *          UserInputForRegistrationOrPut:
 *              type: object
 *              required:
 *                  -email
 *                  -nickname
 *                  -password
 *              properties:
 *                  email:
 *                      type: string
 *                      default: example@exe.com
 *                  nickname:
 *                      type: string
 *                      default: nickname
 *                  password:
 *                      type: string
 *                      default: qwerTY123
 *          User:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      default: example@exe.com
 *                  password:
 *                      type: string
 *                      default: qwerTY123
 *          UserWithTags:
 *              type: object
 *              properties:
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  default: example
 *                              sortOrder:
 *                                  type: string
 *                                  default: 0
 *          BadRequestWhenCreateOrUpdateUser:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Произошла ошибка при валидации
 *                  errors:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              value:
 *                                  type: string
 *                                  default: invalid_password
 *                              msg:
 *                                  type: string
 *                                  default: Пароль должен быть больше 8 и содержать по крайней мере одну заглавную букву, одну строчную букву и одну цифру
 *                              param:
 *                                  type: string
 *                                  default: password
 *                              location:
 *                                  type: string
 *                                  default: body
 *          UserConflict:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Пользователь с таким email и/или nickname уже существует
 *                  errors:
 *                      type: array
 *                      default: []
 *          BadRequestWhenLoginUser:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Неверный пароль
 *                  errors:
 *                      type: array
 *                      default: []
 *          NotFoundUser:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Пользователь с таким email не найден
 *                  errors:
 *                      type: array
 *                      default: []
 *          UserDeleteResponse:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Пользователь удалён
 */

type User = {
    uid?: string
    email: string
    password?: string
    nickname?: string
}

export default User
