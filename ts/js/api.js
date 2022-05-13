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
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketInit = exports.socket = exports.getMessageHistoryOnServer = exports.changeUserNameOnServer = exports.getUserName = exports.sendPasswordOnEmail = void 0;
const const_1 = require("./const");
const utils_1 = require("./utils");
function sendPasswordOnEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(const_1.serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ email })
        });
    });
}
exports.sendPasswordOnEmail = sendPasswordOnEmail;
function getUserName() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiToken = (0, utils_1.getCookieToken)();
        return fetch(const_1.userNameURL, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            }
        });
    });
}
exports.getUserName = getUserName;
function changeUserNameOnServer(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiToken = (0, utils_1.getCookieToken)();
        return fetch(const_1.serverURL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${apiToken}`,
            },
            body: JSON.stringify({ name })
        });
    });
}
exports.changeUserNameOnServer = changeUserNameOnServer;
function getMessageHistoryOnServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiToken = (0, utils_1.getCookieToken)();
        return fetch(const_1.messageHistory.url, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            }
        });
    });
}
exports.getMessageHistoryOnServer = getMessageHistoryOnServer;
exports.socket = socketInit();
function socketInit() {
    const apiToken = (0, utils_1.getCookieToken)();
    return exports.socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${apiToken}`);
}
exports.socketInit = socketInit;
