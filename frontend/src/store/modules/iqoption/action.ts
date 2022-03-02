import * as types from './types';

export function loginIqoption(payload: { email: string, password: string, ssid: string }): {
    type: string;
    payload: typeof payload
} {
    return {
        type: types.LOGIN_IQOPTION,
        payload
    }
}

export function logoutIqoption(): { type: string } {
    return {
        type: types.LOGOUT_IQOPTION
    };
}