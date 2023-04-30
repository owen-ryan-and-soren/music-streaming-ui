import React, { createContext, useState } from 'react';

import { Box, Stack } from '@mui/material';

import MainDrawer from './components/menu/MainDrawer';
import PlaybackControls from './components/player/PlaybackControls';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from './config/color_palette';

import './App.css';

const DEBUG = false;


export default function App() {

    function logoutAction() {
        console.log('logout');
    }






    /***************/
    /* AudioPlayer */
    /***************/

    const apiPlayCallString = 'http://localhost:8444/api/v1/play/'

    /* Note: If no media data is available, HTMLMediaElement.duration will
    return NaN. */
    const [volume, setVolume] = useState(100);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [message, setMessage] = useState("");

    const [queue, setQueue] = useState([]);
    const [queueHeadIdx, setQueueHeadIdx] = useState(null);

    const [audioPlayer, setAudioPlayer] = useState(() => {
        console.log('hey');
        let audioPlayer = new Audio();

        //https://stackoverflow.com/questions/64474338/audio-player-returns-uncaught-in-promise-domexception-the-element-has-no-su
        audioPlayer.crossOrigin = "anonymous";

        setQueue([
            {
                trackTitle: 'Greetings',
                albumTitle: 'Achievement',
                artistName: 'pilotredsun',
                fileLocation: 'greetings.mp3'
            },
            {
                trackTitle: 'Blueberry Hill Single Version',
                albumTitle: "Louis Armstrong's Greatest Hits",
                artistName: 'Louis Armstrong',
                fileLocation: '17_Blueberry_Hill_Single_Version.m4a'
            },
            {
                trackTitle: 'Red Moon - For Storm Station Act 3',
                albumTitle: 'Sonic After the Sequel Original Sound Track',
                artistName: 'Funk Fiction',
                fileLocation: 'Red_Moon.mp3'
            },
            {
                trackTitle: 'Cyclic',
                albumTitle: 'Album',
                artistName: 'FreakyBro',
                fileLocation: 'FreakyBro-Cyclic.flac'
            }
        ]);
        setQueueHeadIdx(0);
        audioPlayer.src = apiPlayCallString + 'greetings.mp3';


        /*
        audioPlayer.ontimeupdate = function () {
            setCurrentTime(audioPlayer.currentTime);
        };
        */
        
        /*
        setInterval(() => {
            setCurrentTime(audioPlayer.currentTime);
            console.log("yo");
        },20);
        */

        
        const updatePlaybar = () => {
            setCurrentTime(audioPlayer.currentTime);
            // console.log("DLKFJSDLKFJFLKDSJ");

            //https://stackoverflow.com/questions/34656758/setinterval-with-random-time-in-javascript
            let rand = Math.floor(Math.random() * (510 - 110 + 1) + 110); //Generate Random number between 0 and 1000
            // console.log('Wait for ' + rand + ' seconds');
            setTimeout(updatePlaybar, rand);
        }
        

        updatePlaybar();

        audioPlayer.oncanplay = function () {
            setDuration(audioPlayer.duration);
        }

        audioPlayer.onpause = function () {
            setPaused(true);
        }

        audioPlayer.onplay = function () {
            setPaused(false);
        }

        return audioPlayer;
    });

    

    audioPlayer.onended = function () {
        if (queueHeadIdx !== queue.length - 1) {
            console.log(queue);
            audioPlayer.src = apiPlayCallString + queue[queueHeadIdx + 1].fileLocation;
            audioPlayer.play();
            setCurrentTime(audioPlayer.currentTime);
            setQueueHeadIdx(currIdx => ++currIdx);
        }
    }

    const playOrPauseAudio = () => {
        if (paused === false) {
            audioPlayer.pause();
        }
        else {
            audioPlayer.play();
        }
    }

    const changeVolume = (newVolume) => {
        setVolume(newVolume);
        audioPlayer.volume = newVolume / 100;
    }

    const movePlayPosition = (newPlayPosition) => {
        if (newPlayPosition === 100) {
            newPlayPosition = 99.7;
        }
        audioPlayer.currentTime = newPlayPosition / 100 * duration;
        setCurrentTime(audioPlayer.currentTime);
    }

    const skipPlayback = (skipAmount) => {
        console.log(audioPlayer.currentTime);
        audioPlayer.currentTime = audioPlayer.currentTime + skipAmount;
        setCurrentTime(audioPlayer.currentTime);
        console.log(audioPlayer.currentTime);
    }

    const skipBack = () => {
        if (Math.floor(audioPlayer.currentTime) < 3 && queueHeadIdx !== 0) {
            audioPlayer.src = apiPlayCallString + queue[queueHeadIdx - 1].fileLocation;
            if (!paused) {
                audioPlayer.play();
            }
            setCurrentTime(audioPlayer.currentTime);
            setQueueHeadIdx(currIdx => --currIdx);
        }
        else {
            audioPlayer.currentTime = 0;
            setCurrentTime(audioPlayer.currentTime);
            audioPlayer.play();
        }
    }

    const skipForward = () => {
        if (queueHeadIdx === queue.length - 1) {
            audioPlayer.currentTime = audioPlayer.duration;
            setCurrentTime(audioPlayer.currentTime);
        }
        else {
            audioPlayer.src = apiPlayCallString + queue[queueHeadIdx + 1].fileLocation;
            if (!paused) {
                audioPlayer.play();
            }
            setCurrentTime(audioPlayer.currentTime);
            setQueueHeadIdx(currIdx => ++currIdx);
        }
    }

    /* todo: feed to AlbumView etc...,
    onClick={() => setNewQueueAndPlay()}
    ...tracks = [ // array of track objects
        {title, file_location},
        {title, },
        ...
        {title, }
    ]
    */
    const setNewQueueAndPlay = (newQueueTracksInfo, newQueueHead) => {
        setQueue(newQueueTracksInfo);
        setQueueHeadIdx(newQueueHead);
        audioPlayer.src = apiPlayCallString + newQueueTracksInfo[newQueueHead].fileLocation;
        audioPlayer.play();
        setCurrentTime(audioPlayer.currentTime);
    }

    return (
        <Stack direction='column' spacing={0}
            sx={{
                width: '100%',
                height: '100vh',
                backgroundColor: PRIMARY_COLOR,

                border: DEBUG ? 5 : 0,
                borderColor: 'red',
            }}
        >
            <MainDrawer
                title='Lossless Spotify'
                user='Ali'
                logoutAction={logoutAction}

                setNewQueueAndPlay={setNewQueueAndPlay}
            />
            <PlaybackControls
                playOrPauseAudio={playOrPauseAudio} paused={paused}
                changeVolume={changeVolume} volume={volume}
                skipBack={skipBack} skipForward={skipForward}
                currentTime={currentTime} duration={duration}
                movePlayPosition={movePlayPosition}
                skipPlayback={skipPlayback}

                currentTrackInfo={queue[queueHeadIdx]}
            />
        </Stack>
    );
}