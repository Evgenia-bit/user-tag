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
const user_dto_1 = __importDefault(require("../dto/user.dto"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const userWithTags_dto_1 = __importDefault(require("../dto/userWithTags.dto"));
const auth_service_1 = __importDefault(require("./auth.service"));
const user_dao_1 = __importDefault(require("../../dao/impl/user.dao"));
const tag_dao_1 = __importDefault(require("../../dao/impl/tag.dao"));
class CommonUserService {
    getUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_dao_1.default.getUserById(uid);
            const tags = yield tag_dao_1.default.getTagsByCreator(uid);
            const userDTO = new userWithTags_dto_1.default(user.email, user.nickname, tags);
            return userDTO;
        });
    }
    putUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const duplicate = yield user_dao_1.default.findDuplicateEmailsOrNicknamesById(userData);
            if (duplicate) {
                throw ApiError_1.default.conflict('Данный email и/или nickname уже существует');
            }
            const updatedUser = yield user_dao_1.default.updateUser(userData);
            return new user_dto_1.default(updatedUser.email, updatedUser.nickname);
        });
    }
    deleteUser(uid, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_dao_1.default.deleteUserById(uid);
            yield auth_service_1.default.logout(refreshToken);
        });
    }
}
exports.default = new CommonUserService();
//# sourceMappingURL=user.service.js.map