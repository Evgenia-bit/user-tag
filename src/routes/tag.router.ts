import express from 'express';
import TagController from '../controllers/tag.controller'
import {body} from 'express-validator'
import authMiddleware from "../middleware/auth.middleware";

const tagRouter = express.Router();

/**
 *  @openapi
 * '/tag':
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Tag
 *      summary: Создание тега
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateAndPutTagInput'
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Tag'
 *          409:
 *              description: Conflict
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ConflictTag'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnauthorizedResponse'
 */

tagRouter.post('/tag',
    authMiddleware,
    body('name')
        .notEmpty()
        .withMessage("Поле name обязательно для заполнения")
        .isLength({max: 40})
        .withMessage("Поле name должно иметь длину не более 40 символов"),
    TagController.createTag)

/**
 *  @openapi
 * '/tag/{tagId}':
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Tag
 *      summary: Получение тега
 *      parameters:
 *          - in: path
 *            name: tagId
 *            type: integer
 *            default: 1
 *            required: true
 *            description: Id тега
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TagWithCreator'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnauthorizedResponse'
 *          404:
 *              description: Not Found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/NotFoundTag'
 *
 */

tagRouter.get('/tag/:id',
    authMiddleware,
    TagController.getOneTag)

/**
 *  @openapi
 * '/tag':
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Tag
 *      summary: Получение тегов по определенным параметрам
 *      parameters:
 *        - in: query
 *          name: sortByOrder
 *          type: string
 *          required: false
 *          description: 'Указывает, что теги нужно сортировать по порядковому номеру'
 *        - in: query
 *          name: sortByName
 *          type: string
 *          required: false
 *          description: 'Указывает, что теги нужно сортировать по имени'
 *        - in: query
 *          name: offset
 *          type: integer
 *          default: 10
 *          required: false
 *          description: 'Указывает, с какого элемента начинать выборку'
 *        - in: query
 *          name: length
 *          type: integer
 *          default: 10
 *          required: false
 *          description: 'Указывает, сколько элементов должно быть в выборке'
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SelectionTags'
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UnauthorizedResponse'
 */

tagRouter.get('/tag',
    authMiddleware,
    TagController.getAllTag)

/**
 *  @openapi
 * '/tag/{tagId}':
 *  put:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Tag
 *      summary: Изменение тега
 *      parameters:
 *          - in: path
 *            name: tagId
 *            type: integer
 *            default: 1
 *            required: true
 *            description: Id тега
 *      requestBody:
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/CreateAndPutTagInput'
 *      responses:
 *           200:
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/TagWithCreator'
 *           400:
 *                description: Bad Request
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/BagRequestWhenUpdatingTag'
 *           401:
 *                description: Unauthorized
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/UnauthorizedResponse'
 *           403:
 *                description: Forbidden
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/ForbiddenWhenUpdatingTag'
 *           404:
 *                description: Not Found
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/NotFoundTag'
 *           409:
 *                description: Conflict
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/ConflictTag'
 */

tagRouter.put('/tag/:id',
    authMiddleware,
    body('name')
        .optional()
        .isLength({max: 40})
        .withMessage("Поле name должно иметь длину не более 40 символов"),
    TagController.putTag)

/**
 *  @openapi
 * '/tag/{tagId}':
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Tag
 *      summary: Удаление тега
 *      parameters:
 *          - in: path
 *            name: tagId
 *            type: integer
 *            default: 1
 *            required: true
 *            description: Id тега
 *      responses:
 *           200:
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/DeletedTagResponse'
 *           401:
 *                description: Unauthorized
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/UnauthorizedResponse'
 *           403:
 *                description: Forbidden
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/ForbiddenWhenDeletingTag'
 *           404:
 *                description: Not Found
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/NotFoundTag'
 */

tagRouter.delete('/tag/:id',
    authMiddleware,
    TagController.deleteTag)



export default tagRouter