import { fetch } from './csrf';

const SET_GENRES = 'ui/setGenres';
const REMOVE_GENRES = 'ui/removeGenres';

const setGenres = (genres) => {
    return {
        type: SET_GENRES,
        payload: genres
    };
};

export const removeGenres = () => {
    return {
        type: REMOVE_GENRES,
    };
};

export const getGenres = () => async (dispatch) => {
    const res = await fetch('/api/genres')
    dispatch(setGenres(res.data.genres));
    return res;
};

const initialState = { genres: [] };

export default function uiReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case SET_GENRES:
            newState = Object.assign({}, state);
            newState.genres = action.payload;
            return newState;
        case REMOVE_GENRES:
            newState = Object.assign({}, state);
            newState.genres = [];
            return newState;
        default:
            return state;
    };
};
