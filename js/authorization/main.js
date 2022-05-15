var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getMessageHistory, } from '../message_history/main';
import { socket, } from '../socket/main';
import { DEFAULT_UI_ELEMENTS, } from '../const';
import { notEmptyInput, serverAnswerIsValid, clearInput, getInputValue, getCookieToken } from '../utils';
import { sendPasswordOnEmail, getUserName, } from './api';
import { autorisationEmailMenuOnUI, autorisationPasswordMenuOnUI, } from './view';
import Cookies from 'js-cookie';
export function sendPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const userEmail = getInputValue(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT);
            const passwordRequest = yield sendPasswordOnEmail(userEmail);
            const passwordRequestIsValid = yield serverAnswerIsValid(passwordRequest.status);
            if (passwordRequestIsValid) {
                autorisationEmailMenuOnUI();
                autorisationPasswordMenuOnUI();
            }
            else {
                throw new Error('The server could not provide information, please try again later');
            }
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            clearInput(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT);
        }
    });
}
export function savePasswordToken() {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const token = getInputValue(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT);
            const tokenIsNotValid = !notEmptyInput(token);
            if (tokenIsNotValid) {
                return;
            }
            Cookies.set('token', token, { expires: 7 });
            const userNameRequest = yield getUserName();
            const userNameRequestIsNotValid = !serverAnswerIsValid(userNameRequest.status);
            if (!userNameRequest.ok || userNameRequestIsNotValid) {
                Cookies.remove('token');
                throw new Error('Password is not valid, try again');
            }
            const userName = yield userNameRequest.json();
            Cookies.set('userEmail', userName.email);
            autorisationPasswordMenuOnUI();
            userAuthorizationPass();
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            clearInput(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT);
        }
    });
}
export function userAuthorizationPass() {
    const apiToken = getCookieToken();
    const isAuthorizedUser = Boolean(apiToken);
    if (isAuthorizedUser) {
        autorisationEmailMenuOnUI();
        getMessageHistory();
        socket.init();
    }
}
