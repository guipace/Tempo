import { fetch } from './csrf';

const ADD_TRACK = 'track/addTrack';
const SELECT_TRACK = 'track/selectTrack';
const CLEAR_TRACK = 'track/clearTrack';

const addTrack = (track) => {
    return {
        type: ADD_TRACK,
        payload: track,
    };
};

const selectTrack = (track) => {
    return {
        type: SELECT_TRACK,
        payload: track,
    };
}

export const newTrack = (track) => async (dispatch) => {
    const { title, description, imageUrl, trackFile, userId, genreId } = track;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("imageUrl", imageUrl);
    formData.append("userId", userId);
    formData.append("genreId", genreId);

    if(trackFile) formData.append("audio", trackFile);

    const res = await fetch('/api/tracks', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData,
    });

    dispatch(addTrack(res.data.newTrack));

    return res.data.newTrack;
};

export const getTrack = (id) => async (dispatch) => {
    const res = await fetch(`/api/tracks/${id}`);

    dispatch(selectTrack(res.data.track));

    return res.data.track;
};

export const postComment = (trackId, comment) => async (dispatch) => {
    const res = await fetch(`/api/tracks/${trackId}/comment`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment),
    });

    dispatch(getTrack(trackId));

    return res.data.comment;
};

export const deleteComment = (trackId, commentId) => async (dispatch) => {

    const res = await fetch(`/api/tracks/${trackId}/${commentId}`, {
        method: 'DELETE'
    });

    dispatch(getTrack(trackId));

    return res.data.comment;
};

export const editComment = (trackId, commentId, content) => async (dispatch) => {

    const res = await fetch(`/api/tracks/${trackId}/${commentId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({content}),
    });

    dispatch(getTrack(trackId));

    return res.data.comment;
};

const initialState = { track: null };

export default function trackReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case ADD_TRACK:
            newState = Object.assign({}, state);
            newState.track = action.payload;
            return newState;
        case SELECT_TRACK:
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
