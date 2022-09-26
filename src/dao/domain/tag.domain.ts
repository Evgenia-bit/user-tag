/**
 * @openapi
 * components:
 *      schemas:
 *          CreateAndPutTagInput:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      default: example
 *                  sortOrder:
 *                      type: string
 *                      default: 0
 *          Tag:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      default: 1
 *                  name:
 *                      type: string
 *                      default: example
 *                  sortOrder:
 *                      type: string
 *                      default: 0
 *          TagWithCreator:
 *              type: object
 *              properties:
 *                  creator:
 *                      type: object
 *                      properties:
 *                          nickname:
 *                              type: string
 *                              default: nickname
 *                          uid:
 *                              type: string
 *                              default: exam-pl-eUID
 *                  name:
 *                      type: string
 *                      default: example
 *                  sortOrder:
 *                      type: string
 *                      default: 0
 *          ConflictTag:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Тег с таким именем уже существует
 *                  errors:
 *                      type: array
 *                      default: []
 *          NotFoundTag:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Тег с таким id не существует
 *                  errors:
 *                      type: array
 *                      default: []
 *          SelectionTags:
 *              type: object
 *              properties:
 *                  data:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/TagWithCreator'
 *                  meta:
 *                      type: object
 *                      properties:
 *                          offset:
 *                              type: integer
 *                              default: 10
 *                          length:
 *                              type: integer
 *                              default: 10
 *                          quantity:
 *                              type: integer
 *                              default: 100
 *          BagRequestWhenUpdatingTag:
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
 *                                  default: exampleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
 *                              msg:
 *                                  type: string
 *                                  default: Поле name должно иметь длину не более 40 символов
 *                              param:
 *                                  type: string
 *                                  default: name
 *                              location:
 *                                  type: string
 *                                  default: body
 *          ForbiddenWhenUpdatingTag:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Вы не можете изменить тег, созданный не вами
 *                  errors:
 *                      type: array
 *                      default: []
 *          DeletedTagResponse:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Тег успешно удален
 *          ForbiddenWhenDeletingTag:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      default: Вы не можете удалить тег, созданный не вами
 *                  errors:
 *                      type: array
 *                      default: []
 */

type Tag  = {
    id?: string
    name?: string
    creator: string
    sortOrder?: string
}

export default Tag