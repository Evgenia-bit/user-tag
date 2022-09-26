"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const tag_dto_1 = __importDefault(require("../dto/tag.dto"));
const tagWithCreator_dto_1 = __importDefault(require("../dto/tagWithCreator.dto"));
const tagSelection_dto_1 = __importDefault(require("../dto/tagSelection.dto"));
const tag_dao_1 = __importDefault(require("../../dao/impl/tag.dao"));
const user_dao_1 = __importDefault(require("../../dao/impl/user.dao"));
class CommonTagService {
    createTag(tagData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingTag = yield tag_dao_1.default.getTagByName(tagData.name);
            if (existingTag) {
                throw ApiError_1.default.conflict("Тег с таким именем уже существует");
            }
            const newTag = yield tag_dao_1.default.createTag(tagData);
            return new tag_dto_1.default(newTag.id, newTag.name, newTag.sortOrder);
        });
    }
    getOneTag(tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = yield tag_dao_1.default.getTagWithCreator(tagId);
            if (!tag) {
                throw ApiError_1.default.notFound('Тег с таким id не существует');
            }
            return new tagWithCreator_dto_1.default({
                nickname: tag.userNickname,
                uid: tag.uid
            }, tag.name, tag.sortOrder);
        });
    }
    getAllTag(selectParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = yield tag_dao_1.default.getSelectionTags(selectParams);
            const quantity = yield tag_dao_1.default.getQuantityRows();
            const tagSelectionDTO = new tagSelection_dto_1.default([], {
                offset: selectParams.offset,
                length: selectParams.length,
                quantity: quantity
            });
            tags.forEach(tag => {
                tagSelectionDTO.data.push(new tagWithCreator_dto_1.default({
                    nickname: tag.userNickname,
                    uid: tag.uid
                }, tag.name, tag.sortOrder));
            });
            return tagSelectionDTO;
        });
    }
    putTag(tagData) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = yield tag_dao_1.default.getTagById(tagData.id);
            if (!tag) {
                throw ApiError_1.default.notFound('Тег с таким id не существует');
            }
            if (tag.creator !== tagData.creator) {
                throw ApiError_1.default.forbidden('Вы не можете изменить тег, созданный не вами');
            }
            const duplicateName = yield tag_dao_1.default.getTagByName(tagData.name);
            if (duplicateName && duplicateName.creator !== tagData.creator) {
                throw ApiError_1.default.conflict('Данное имя тега уже существует');
            }
            const updatedTag = yield tag_dao_1.default.updateTag(tagData);
            const user = yield user_dao_1.default.getUserById(tagData.creator);
            return new tagWithCreator_dto_1.default({
                nickname: user.nickname,
                uid: tagData.creator
            }, updatedTag.name, updatedTag.sortOrder);
        });
    }
    deleteTag(tagData) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = yield tag_dao_1.default.getTagById(tagData.id);
            if (!tag) {
                throw ApiError_1.default.notFound('Тег с таким id не существует');
            }
            if (tag.creator !== tagData.creator) {
                throw ApiError_1.default.forbidden('Вы не можете удалить тег, созданный не вами');
            }
            yield tag_dao_1.default.deleteTag(tagData.id);
        });
    }
}
exports.default = new CommonTagService();
//# sourceMappingURL=tag.service.js.map