var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DEFAULT_UI_ELEMENTS, } from '../const';
import { notEmptyInput, serverAnswerIsValid, clearInput, getInputValue, } from '../utils';
import { changeUserNameOnServer } from './api';
export function changeUserName() {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const newUserName = getInputValue(DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT);
            const newUserNameIsNotValid = !notEmptyInput(newUserName);
            if (newUserNameIsNotValid) {
                return;
            }
            const changeUserNameRequest = yield changeUserNameOnServer(newUserName);
            const changeUserNameRequestIsNotValid = !serverAnswerIsValid(changeUserNameRequest.status);
            if (!changeUserNameRequest.ok || changeUserNameRequestIsNotValid) {
                throw new Error('Nickname is not valid, try again later');
            }
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            clearInput(DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT);
        }
    });
}
