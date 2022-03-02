import * as types from './types';

const initialState = {
    email: '',
    password: '',
    ssid: ''
};

function reducer(state=initialState, action: {
    type: string;
    payload: typeof initialState;
}): typeof initialState {
    switch(action.type) {
        case types.LOGIN_IQOPTION: 
            const newState = action.payload;
            return newState;
            
        case types.LOGOUT_IQOPTION:
            return initialState;

        default:
            return state;
    }
}

export default reducer;