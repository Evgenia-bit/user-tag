/**
 * @openapi
 * components:
 *      schemas:
 *          UserTagInput:
 *              type: object
 *              properties:
 *                  tags:
 *                      type: array
 *                      default: [1,2]
 *          UserTagResponse:
 *              type: object
 *              properties:
 *                  tags:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Tag'
 *          NotFoundWhenAddingTagToUser:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Тега с id 1 не существует
 *                  errors:
 *                      type: array
 *                      default: []
 *          BadRequestWhenAddingTagToUser:
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
 *                              msg:
 *                                  type: string
 *                                  default: Поле tags должно быть массивом и не может быть пустым
 *                              param:
 *                                  type: string
 *                                  default: tags
 *                              location:
 *                                  type: string
 *                                  default: body
 *          DeleteUserTagResponse:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Произошла ошибка при валидации
 *
*/

type UserTag = {
    user: string
    tag: string
}
export default UserTag