import { fetch } from './csrf';

const SET_USER = 'session/setUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const restoreUser = () => async (dispatch) => {
    const res = await fetch('/api/session');
    dispatch(setUser(res.data.user));
    return res;
}

const initialState = { user: null };

export default function playerReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        default:
            return state;
    };
};
