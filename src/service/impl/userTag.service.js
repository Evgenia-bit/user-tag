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
const dotenv_1 = __importDefault(require("dotenv"));
const userTag_dto_1 = __importDefault(require("../dto/userTag.dto"));
const userTag_dao_1 = __importDefault(require("../../dao/impl/userTag.dao"));
const tag_dao_1 = __importDefault(require("../../dao/impl/tag.dao"));
dotenv_1.default.config({ path: ".env" });
class CommonUserTagService {
    addTagToUser(uid, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userTag_dao_1.default.addTagsToUser(uid, tags);
            const allTags = yield userTag_dao_1.default.getAllUserTagByUserId(uid);
            return new userTag_dto_1.default(allTags);
        });
    }
    deleteTagFromUser(userTag) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userTag_dao_1.default.deleteTagToUser({ user: userTag.user, tag: userTag.tag });
            const allTags = yield userTag_dao_1.default.getAllUserTagByUserId(userTag.user);
            return new userTag_dto_1.default(allTags);
        });
    }
    getCreatorTags(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const creatorTags = yield tag_dao_1.default.getTagsByCreator(uid);
            return new userTag_dto_1.default(creatorTags);
        });
    }
}
exports.default = new CommonUserTagService;
//# sourceMappingURL=userTag.service.js.map