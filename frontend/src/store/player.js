import { fetch } from './csrf';

const SET_TRACK = 'player/setTrack';
const UNLOAD_TRACK = 'player/unloadTrack';
const PLAY_TRACK = 'player/playAudioTrack';
const STOP_TRACK = 'player/stopTrack';

const setTrack = (track) => {
    return {
        type: SET_TRACK,
        payload: track,
    };
};

export const unloadTrack = () => {
    return {
        type: UNLOAD_TRACK,
    }
};

export const playAudioTrack = () => {
    return {
        type: PLAY_TRACK,
    }
};

export const stopTrack = () => {
    return {
        type: STOP_TRACK,
    }
};

export const playTrack = (id) => async (dispatch) => {
    const res = await fetch(`/api/tracks/${id}`);

    dispatch(setTrack(res.data.track));

    return res;
}

const initialState = { currentTrack: null, isPlaying: false };

export default function playerReducer(state = initialState, action) {
    let newState;

    switch(action.type) {
        case SET_TRACK:
            newState = Object.assign({}, state);
            newState.currentTrack = action.payload;
            return newState;
        case UNLOAD_TRACK:
            newState = Object.assign({}, state);
            newState.currentTrack = null;
            return newState;
        case PLAY_TRACK:
            newState = Object.assign({}, state);
            newState.isPlaying = true;
            return newState;
        case STOP_TRACK:
            newState = Object.assign({}, state);
            newState.isPlaying = false;
            return newState;
        default:
            return state;
    };
};
