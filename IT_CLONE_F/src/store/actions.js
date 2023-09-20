// action - customization reducer
export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';
export const loginSuccess = (token) => ({
    type: 'LOGIN_SUCCESS',
    payload: token
});
export const setUserId = (userId) => {
    return {
        type: 'SET_USER_ID',
        payload: userId
    };
};
