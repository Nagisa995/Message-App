import {
    DEFAULT_UI_ELEMENTS,
} from '../const'

import {
    switchOptionalMenu,
} from '../utils'

export function settingsMenuOnUI():void {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.SETTINGS_MENU);
}