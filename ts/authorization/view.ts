import {
    DEFAULT_UI_ELEMENTS,
} from '../const'

import {
    switchOptionalMenu,
} from '../utils'

export function autorisationEmailMenuOnUI():void {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_MENU);
}

export function autorisationPasswordMenuOnUI():void {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_MENU);
}