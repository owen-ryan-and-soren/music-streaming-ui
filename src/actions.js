/**
 * Here's an attempt at getting some actions going for reducers.
 * 
 * @note I think this is where we might want to make our API calls.
 * @todo Set up API calls and find a way to cashe the data on the first call ?
 */

import { artists } from './config/db';

// const yes = artists;


/* Test data */


/**
 * Sets the artists state to the provided array of artists.
 * @param {Object} artists An array of artist objects.
 * @returns {Object} An object with the artists as the payload.
 */
function setArtists(artists) {
    return {
        type: 'ARTISTS/SET_ALL',
        payload: {
            artists: artists,
            // artists: yes,
        }
    };
}


/**
 * Sets the albums state to include all albums from the provided array of
 * artists.
 * @param {Object} artists An array of artist objects.
 * @returns {Object} An object with an array of albums as the payload (after
 * adding the artist ID and name to each album object).
 */
function setAlbums(artists) {
    const allAlbums = artists?.flatMap(artist =>
        artist['Albums'].map(album => ({
            ...album,
            'Artist_ID': artist['ID'],
            'Artist_Name': artist['Name'],
        }))
    );

    return {
        type: 'SET_ALBUMS',
        payload: {
            albums: allAlbums,
        }
    };
}


/**
 * Sets the albums state to include only the albums from the provided array of
 * artists where the artist ID matches the provided artist ID.
 * @param {number} artistID The ID of the artist whose albums should be
 * returned.
 * @param {Object} artists An array of artist objects.
 * @returns {Object} An object with an array of albums as the payload.
 */
function get_albums_by_artist(artistID, artists) {
    const albums = artists.find(a => a['ID'] === artistID)['Albums'];

    return {
        type: 'GET_ALBUMS_BY_ARTIST_ID',
        payload: {
            albums: albums,
        }
    };
}

function setTracks(artists) {
    const allTracks = [];

    /* TODO: Use this for all tracks, use get_tracks_by_album
    (with artist and album id or just album id?) below.
    */

    artists?.forEach(artist => {
        artist['Albums'].forEach(album => {
            album['Tracks'].forEach(track => {
                allTracks.push({
                    ...track,
                    title: track['Title'],
                    artist: artist['Name'],
                    album: album['Title'],
                    duration: track['Length'],
                    // more track data ...
                });
            });
        });
    });

    return {
        type: 'SET_TRACKS',
        payload: {
            tracks: allTracks,
        }
    };
}


function get_tracks_by_album(albumID, artists) {

    let tracks = [];
    artists?.forEach(artist => {
        artist['Albums'].forEach(album => {
            if (album['ID'] === albumID) {
                album['Tracks'].forEach(track => {
                    tracks.push({
                        ...track,
                        title: track['Title'],
                        artist: artist['Name'],
                        album: album['Title'],
                        duration: track['Length'],
                    })
                })
            }
        });
    });

    console.log(`tracks: ${tracks}`);

    // const artist = artists.find(a => a['Albums'].find(b => b['ID'] === albumID));

    return {
        type: 'GET_TRACKS_BY_ALBUM_ID',
        payload: {
            tracks: tracks,
        }
    };
}


/* LibraryView actions */


function handleSelectedItem(title) {
    return {
        type: 'CLICK_ON_LIBRARY_ITEM',
        payload: {
            title: title,
        }
    };
}

function handleSelectedAlbum(title) {
    return {
        type: 'CLICK_ON_ALBUM_TILE',
        payload: {
            title: title,
        }
    };
}

/**
 * Used to set the selected artist (to display in ArtistView).
 * @param {string} title the name of the artist that was clicked on.
 * @returns {object} the action to be dispatched.
 */
function handleSelectedArtist(artistID) {
    return {
        type: 'CLICK_ON_ARTIST_ITEM',
        payload: {
            title: artistID,
        }
    };
}

function revisit_artists_view() {
    return {
        type: 'CLICK_ON_ARTIST_VIEW_BACK_BUTTON',
        payload: {
            title: null,
        }
    };
}

function revisit_albums_view() {
    return {
        type: 'CLICK_ON_ALBUMS_VIEW_BACK_BUTTON',
        payload: {
            title: null,
        }
    };
}

function handleArtistNameClick() {
    return {
        type: 'CLICK_ON_ARTIST_NAME',
        payload: {
            title: null,
        }
    };
}

function toggleDrawer(open) {
    return {
        type: 'TOGGLE_DRAWER',
        payload: {
            open: open,
        }
    };
}


/* AudioPlayer actions */


function setAudio(audio) {
    return {
        type: 'SET_AUDIO',
        payload: {
            audio: audio,
        }
    };
}

function playAudioAction() {
    return {
        type: 'PLAY_AUDIO',
        payload: {
            isPlaying: true,
        }
    };
}

function pauseAudioAction() {
    return {
        type: 'PAUSE_AUDIO',
        payload: {
            isPlaying: false,
        }
    };
}


export {
    /* Test data */
    setArtists,
    setAlbums,
    get_albums_by_artist,
    setTracks,
    get_tracks_by_album,

    /* LibraryView actions */
    toggleDrawer,
    handleSelectedItem,
    handleSelectedAlbum,
    handleSelectedArtist,
    revisit_albums_view,
    revisit_artists_view,

    /* AudioPlayer actions */
    setAudio,
    playAudioAction,
    pauseAudioAction,
};
