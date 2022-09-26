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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const token_service_1 = __importDefault(require("./token.service"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const token_dto_1 = __importDefault(require("../dto/token.dto"));
const user_dao_1 = __importDefault(require("../../dao/impl/user.dao"));
const token_dao_1 = __importDefault(require("../../dao/impl/token.dao"));
class CommonAuthService {
    signin(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield user_dao_1.default.findDuplicateEmailsOrNicknames(userData);
            if (candidate) {
                throw ApiError_1.default.conflict('Пользователь с таким email и/или nickname уже существует');
            }
            const hashPassword = yield bcryptjs_1.default.hash(userData.password, 5);
            const uid = (0, uuid_1.v4)();
            yield user_dao_1.default.createUser({ uid, email: userData.email, password: hashPassword, nickname: userData.nickname });
            return yield this.getTokens({ uid, email: userData.email });
        });
    }
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_dao_1.default.getUserByEmail(userData.email);
            if (!user) {
                throw ApiError_1.default.notFound('Пользователь с таким email не найден');
            }
            const uid = user.uid;
            const password = user.password;
            const isPasswordsEqual = yield bcryptjs_1.default.compare(userData.password, password);
            if (!isPasswordsEqual) {
                throw ApiError_1.default.badRequest('Неверный пароль');
            }
            return yield this.getTokens({ uid, email: userData.email });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield token_dao_1.default.deleteToken(refreshToken);
        });
    }
    getTokens(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = token_service_1.default.generateTokens({ uid: userData.uid, email: userData.email });
            yield token_service_1.default.saveToken({ user: userData.uid, refreshToken: tokens.refreshToken });
            return new token_dto_1.default(tokens);
        });
    }
}
exports.default = new CommonAuthService();
//# sourceMappingURL=auth.service.js.map