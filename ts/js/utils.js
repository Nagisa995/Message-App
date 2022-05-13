"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputValue = exports.clearInput = exports.serverAnswerIsValid = exports.notEmptyInput = exports.switchOptionalMenu = exports.querySelectorIDCall = exports.getCookieToken = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
function getCookieToken() {
    return js_cookie_1.default.get('token');
}
exports.getCookieToken = getCookieToken;
function querySelectorIDCall(selector) {
    const domElement = document.querySelector(`${selector}`);
    return domElement;
}
exports.querySelectorIDCall = querySelectorIDCall;
function switchOptionalMenu(menu) {
    const userOpensOptionalMenu = menu.classList.contains('hidden');
    if (userOpensOptionalMenu) {
        menu.classList.remove('hidden');
    }
    else {
        menu.classList.add('hidden');
    }
}
exports.switchOptionalMenu = switchOptionalMenu;
function notEmptyInput(value) {
    return value.split(' ').join('') !== '';
}
exports.notEmptyInput = notEmptyInput;
function serverAnswerIsValid(answerStatus) {
    return (answerStatus !== 404 && answerStatus !== 500);
}
exports.serverAnswerIsValid = serverAnswerIsValid;
function clearInput(input) {
    input.value = '';
}
exports.clearInput = clearInput;
function getInputValue(input) {
    return input.value;
}
exports.getInputValue = getInputValue;
