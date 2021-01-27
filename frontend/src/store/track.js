import { fetch } from './csrf';

const ADD_TRACK = 'track/addTrack';
const CLEAR_TRACK = 'track/clearTrack';

const addTrack = (track) => {
    return {
        type: ADD_TRACK,
        payload: track,
    };
};

export const newTrack = (track) => async (dispatch) => {
    const { title, description, imageUrl, trackFile, userId, genreId } = track;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);
    formData.append("userId", userId);
    formData.append("genreId", genreId);

    if(trackFile) formData.append("audio", trackFile);

    for (let each of formData.entries()) {
        console.log(each[0], each[1]);
    }

    const res = await fetch('/api/tracks', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData,
    });

    dispatch(addTrack(res.data.track));
};

const initialState = { track: null };

export default function trackReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case ADD_TRACK:
            newState = Object.assign({}, state);
            newState.track = action.payload;
            return newState;
        case CLEAR_TRACK:
            newState = Object.assign({}, state);
            newState.track = null;
            return newState;
        default:
            return state;
    }
};
