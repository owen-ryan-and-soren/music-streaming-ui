/**
 * @file reducers.js
 * @description there's a lot going on in here...
 */

function initialState() {
    return {
        open: false,
        isPlaying: false,
        audio: null,
        artists: null,
        albums: null,
        tracks: null,
        selectedItem: 'Default View',
        selectedAlbum: null,
        selectedArtist: null,
    };
}

function reducers(state, action) {
    switch (action.type) {
        case 'ARTISTS/SET_ALL':
            return {
                ...state,
                artists: action.payload.artists,
            };
        case 'SET_ALBUMS':
            return {
                ...state,
                albums: action.payload.albums,
            };
        case 'SET_TRACKS':
            return {
                ...state,
                tracks: action.payload.tracks,
            };
        case 'GET_TRACKS_BY_ALBUM_ID':
            return {
                ...state,
                tracks: action.payload.tracks,
            };
        case 'CLICK_ON_LIBRARY_ITEM':
            return {
                ...state,
                selectedItem: action.payload.title,
            };
        case 'CLICK_ON_ARTIST_ITEM':
            return {
                ...state,
                selectedArtist: action.payload.title,
            };
        case 'CLICK_ON_ALBUM_TILE':
            return {
                ...state,
                selectedAlbum: action.payload.title,
            };
        case 'CLICK_ON_ARTIST_VIEW_BACK_BUTTON':
            return {
                ...state,
                selectedArtist: action.payload.title,
            };
        case 'CLICK_ON_ALBUMS_VIEW_BACK_BUTTON':
            return {
                ...state,
                selectedAlbum: action.payload.title,
            };
        case 'CLICK_ON_ARTIST_NAME':
            return {
                ...state,
                selectedArtist: action.payload.title,
            };
        case 'GET_ALBUMS_BY_ARTIST_ID':
            return {
                ...state,
                albums: action.payload.albums,
            };
        case 'TOGGLE_DRAWER':
            return {
                ...state,
                open: !action.payload.open,
            };
        case 'PLAY_AUDIO':
            action.payload.audio?.play();
            return {
                ...state,
                isPlaying: action.payload.isPlaying,
            };
        case 'PAUSE_AUDIO':
            action.payload.audio?.pause();
            return {
                ...state,
                isPlaying: action.payload.isPlaying,
            };
        case 'SET_AUDIO':
            return {
                ...state,
                audio: action.payload.audio,
            };
        default:
            return state;
    }
}

export { initialState, reducers };
