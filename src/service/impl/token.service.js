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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const token_dto_1 = __importDefault(require("../dto/token.dto"));
const token_dao_1 = __importDefault(require("../../dao/impl/token.dao"));
const user_dao_1 = __importDefault(require("../../dao/impl/user.dao"));
dotenv_1.default.config({ path: ".env" });
class CommonTokenService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        };
    }
    validateAccessToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    saveToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield token_dao_1.default.getTokenByUser(token.user);
            if (tokenData) {
                yield token_dao_1.default.updateToken(token);
            }
            else {
                yield token_dao_1.default.createToken(token);
            }
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw ApiError_1.default.notAuthorized();
            }
            const userData = this.validateRefreshToken(refreshToken);
            const tokenFromDB = yield token_dao_1.default.getTokenByToken(refreshToken);
            if (!userData || !tokenFromDB) {
                throw ApiError_1.default.notAuthorized();
            }
            const user = yield user_dao_1.default.getUserById(userData.uid);
            const tokens = commonTokenService.generateTokens({ uid: user.uid, email: user.email });
            yield commonTokenService.saveToken({ user: user.uid, refreshToken: tokens.refreshToken });
            return new token_dto_1.default(tokens);
        });
    }
}
const commonTokenService = new CommonTokenService();
exports.default = commonTokenService;
//# sourceMappingURL=token.service.js.map