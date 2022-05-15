var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { serverURL, } from '../const';
import { getCookieToken } from '../utils';
export function changeUserNameOnServer(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiToken = getCookieToken();
            return fetch(serverURL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${apiToken}`,
                },
                body: JSON.stringify({ name })
            });
        }
        catch (error) {
            throw error;
        }
    });
}
