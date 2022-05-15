var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { serverURL, userNameURL, } from '../const';
import { getCookieToken } from '../utils';
export function sendPasswordOnEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return fetch(serverURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ email })
            });
        }
        catch (error) {
            throw error;
        }
    });
}
export function getUserName() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiToken = getCookieToken();
            return fetch(userNameURL, {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                }
            });
        }
        catch (error) {
            throw error;
        }
    });
}
