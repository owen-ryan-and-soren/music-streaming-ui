/**
 * @notes
 * Audio Element:
 * * https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
 */

import React, { Fragment } from 'react';

import { Box, Stack, Slider, IconButton, Typography } from '@mui/material';

import PlayCircle from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUp from '@mui/icons-material/VolumeUp';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../config/color_palette';

import TychoImage from '../../sample_images/tycho.png';


const DEBUG = false;


/**
 * * * * * * * * * * * * * * * * * * *
 * Audio Player Button Components
 * 
 */




/**
 * Styles to be applied to the buttons in the audio player.
 * @param {string} buttonContent The content to be displayed in the tooltip.
 * @returns A style object to be applied to the button.
 * @todo This should be achieved via style and theme ?
 * MyIconButton = styled(IconButton)(...); ?
 */
const playerButtonStyle = (buttonContent) => ({
    '&:hover::after': {
        content: buttonContent,
        display: 'block',
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '1px',
        backgroundColor: SECONDARY_COLOR,
        color: QUATERNARY_COLOR,
        borderRadius: 10,
        fontSize: '14px',
        fontWeight: 'bold',
    },
    '&::after': {
        content: '""',
        display: 'none',
    },
});




/**
 * A rewind button that provides a rewind function when clicked.
 * @param {function} props.rewindAudio callback function to rewind audio.
 * @returns A Rewind IconButton Component with an onClick handler to rewind the
 * audio by 10 seconds.
 */
function RewindButton(props) {
    const { skipPlayback } = props;
    return (
        <IconButton aria-label='rewind 10 seconds'
            onClick={() => skipPlayback(-10)} size='large' sx={{ ...playerButtonStyle(`"rewind"`) }}
        >
            <Replay10Icon fontSize='inherit' sx={{ color: QUATERNARY_COLOR }} />
        </IconButton>
    );
}


/**
 * A fast forward button that provides a fastForward function when clicked.
 * @param {function} props.fastForward callback function to fast forward audio.
 * @returns A FastForward IconButton Component with an onClick handler to fast
 * forward the audio by 10 seconds.
 */
function FastForwardButton(props) {
    const { skipPlayback } = props;
    return (
        <IconButton aria-label='fast-forward 10 seconds'
            onClick={() => skipPlayback(10)} size='large' sx={{ ...playerButtonStyle(`"ff"`) }}
        >
            <Forward10Icon fontSize='inherit' sx={{ color: QUATERNARY_COLOR }} />
        </IconButton>
    );
}


/**
 * A play button that will either play or pause the audio when clicked.
 * @param {function} props.playOrPauseAudio callback function to play or
 * pause the audio.
 * @param {boolean} props.paused whether the audio is paused or not.
 * @returns A Play IconButton or Pause IconButton Component with an 
 * onClick handler to play or pause the audio
 */
function PlayOrPauseButton(props) {
    const { playOrPauseAudio, paused } = props;
    return (
        <Fragment>
            {paused ? (
                <IconButton aria-label='play button'
                    onClick={playOrPauseAudio}
                    sx={{ ...playerButtonStyle(`"play"`) }}
                    size='large'
                >
                    <PlayCircle
                        fontSize='inherit'
                        sx={{
                            color: QUATERNARY_COLOR,
                            '&:hover': {
                                color: TERTIARY_COLOR,
                                content: `"pause"`,
                            },
                        }}
                    />
                </IconButton>
            ) : (
                <IconButton aria-label='pause button'
                    onClick={playOrPauseAudio}
                    sx={{ ...playerButtonStyle(`"pause"`) }}
                    size='large'
                >
                    <PauseCircleIcon
                        fontSize='inherit'
                        sx={{ color: QUATERNARY_COLOR }}
                    />
                </IconButton>
            )}
        </Fragment>
    );
}


/**
 * A play button that will play the audio when clicked.
 * @param {function} props.playAudio callback function to play audio.
 * @returns A Play IconButton Component with an onClick handler to play audio.
 */
function PlayButton(props) {
    const { playAudio } = props;
    return (
        <IconButton aria-label='play button'
            onClick={playAudio}
            sx={{ ...playerButtonStyle(`"play"`) }}
            size='large'
        >
            <PlayCircle
                fontSize='inherit'
                sx={{
                    color: QUATERNARY_COLOR,
                    '&:hover': {
                        color: TERTIARY_COLOR,
                        content: `"pause"`,
                    },
                }}
            />
        </IconButton>
    );
}


/**
 * A pause button that will pause the audio when clicked.
 * @param {function} props.pauseAudio callback function to pause audio.
 * @returns A Pause IconButton Component with an onClick handler to pause audio.
 */
function PauseButton(props) {
    const { pauseAudio } = props;
    return (
        <IconButton aria-label='pause button'
            onClick={pauseAudio}
            sx={{ ...playerButtonStyle(`"pause"`) }}
            size='large'
        >
            <PauseCircleIcon
                fontSize='inherit'
                sx={{ color: QUATERNARY_COLOR }}
            />
        </IconButton>
    );
}


/**
 * A skip back button that provides a skipBack function when clicked.
 * @param {function} props.skipBack callback function to skip to the previous
 * track.
 * @returns A SkipBack IconButton Component with an onClick handler to skip
 * to the previous track.
 */
function SkipBackButton(props) {
    const { skipBack } = props;
    return (
        <IconButton aria-label='skip back'
            onClick={skipBack} size='large' sx={{ ...playerButtonStyle(`"skip back"`) }}
        >
            <SkipPreviousIcon
                fontSize='inherit'
                sx={{ color: QUATERNARY_COLOR }}
            />
        </IconButton>
    );
}


/**
 * A skip forward button that provides a skipForward function when clicked.
 * @param {function} props.skipForward callback function to skip to the next
 * track.
 * @returns A SkipForward IconButton Component with an onClick handler to skip
 * to the next track.
 */
function SkipForwardButton(props) {
    const { skipForward } = props;
    return (
        <IconButton aria-label='skip forward'
            onClick={skipForward} size='large' sx={{ ...playerButtonStyle(`"skip forward"`) }}
        >
            <SkipNextIcon
                fontSize='inherit'
                sx={{ color: QUATERNARY_COLOR }}
            />
        </IconButton>
    );
}




/**
 * * * * * * * * * * * * * * * * * * *
 * Audio Player Controls Components
 * 
 */




function CurrentTrackInfo(props) {
    const { title, artist, album, image, dispatch } = props;

    return (
        <Stack aria-label='playback controls'
            direction='row'
            sx={{
                width: '5%',
                height: '80%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ml: 8,

                border: DEBUG ? 5 : 0,
                borderColor: 'red',
            }}
        >
            <img src={TychoImage} alt='Tycho' loading='lazy' width='100%' />
            <Box sx={{ ml: 1, mr: 5 }} >
                <Typography variant='h7' component='div' noWrap
                    sx={{
                        flexGrow: 1,
                        color: QUATERNARY_COLOR,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title}
                </Typography>
                <Typography aria-label='artist'
                    component='div'
                    variant='h7'
                    noWrap
                    onClick={() => { console.log('artist'); }}
                    sx={{
                        flexGrow: 1,
                        color: QUATERNARY_COLOR,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '&:hover': { textDecoration: 'underline' },
                    }}
                >
                    {artist}
                </Typography>
            </Box>
        </Stack>
    );
}

function PlayBackControlBar(props) {
    const {
        skipBack, skipForward,
        paused, playOrPauseAudio,
        skipPlayback,
    } = props;

    return (
        <Stack direction='row' align='auto'
            sx={{
                width: '50%',
                height: '80%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: DEBUG ? 5 : 0,
                borderColor: 'green',
            }}
        >
            {/* <RewindButton skipPlayback={skipPlayback} /> */}
            <SkipBackButton skipBack={skipBack} />
            {/* isPlaying ? (
                    // <PauseButton dispatch={dispatch} />
                    <PauseButton pauseAudio={pauseAudio} />
                ) : (
                    // <PlayButton dispatch={dispatch} />
                    <PlayButton playAudio={playAudio} />
                ) */}
            <PlayOrPauseButton
                playOrPauseAudio={playOrPauseAudio}
                paused={paused}
            />
            <SkipForwardButton skipForward={skipForward} />
            {/* <FastForwardButton skipPlayback={skipPlayback} /> */}
        </Stack>
    );
}

function PlayHead(props) {
    const {
        movePlayPosition, currentTime, duration
    } = props;

    const convertSecondsToTimeString = (timeInSeconds) => {
        return `${Math.floor(timeInSeconds / 60)}:${(timeInSeconds % 60) < 10 ? "0" + (timeInSeconds % 60).toString() : (timeInSeconds % 60).toString()}`;
    }

    return (
        <Stack direction="row"
            sx={{
                width: '60%',
                height: '20%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant='h7' component='div'
                sx={{
                    color: QUATERNARY_COLOR,
                    m: 1
                }}
            >
                {convertSecondsToTimeString(Math.floor(currentTime))}
            </Typography>
            <Slider aria-label="Play Head"
                value={currentTime / duration * 100}
                onChange={(event) => movePlayPosition(event.target.value)}
                sx={{
                    width: '100%',
                    color: QUATERNARY_COLOR,
                    m: 1
                }}
                step={0.0000000001}
                min={0}
                max={100}
            />
            <Typography variant='h7' component='div'
                sx={{
                    color: QUATERNARY_COLOR,
                    m: 1
                }}
            >
                {convertSecondsToTimeString(Math.floor(duration))}
            </Typography>
        </Stack>
    );
}

/**
 * A volume slider that provides a changeVolume function when the slider is
 * moved.
 * @param {function} props.changeVolume callback function to change the volume
 * of the audio.
 * @param {number} props.volume the current volume of the audio.
 * @returns A VolumeSlider IconButton and Slider Component with an onChange
 * handler to change the volume of the audio.
 */
function VolumeSlider(props) {
    const { changeVolume, volume } = props;
    return (
        <Fragment>
            <IconButton aria-label='volume slider'
                size='large' sx={{ ...playerButtonStyle(`"volume"`) }}
            >
                <VolumeUp fontSize='inherit' sx={{ color: QUATERNARY_COLOR }} />
            </IconButton>
            <Slider aria-label='Volume'
                onChange={(event) => changeVolume(event.target.value)}
                value={volume}
                size='small'
                sx={{
                    color: QUATERNARY_COLOR,
                    width: '10%',
                    mr: 2,
                }}
            />
        </Fragment>
    );
}

/**
 * Returns the currently player track (image title, artist), playback controls,
 * and the playhead.
 * @param {function} props.playOrPauseAudio callback function to play or
 * pause the audio.
 * @param {function} props.paused whether the audio is paused or not.
 * @param {function} props.changeVolume callback function to change the
 * volume of the audio.
 */
export default function PlaybackControls(props) {
    const {
        playOrPauseAudio, paused,
        changeVolume, volume,
        skipBack, skipForward,
        movePlayPosition, currentTime, duration,
        skipPlayback,
        currentTrackInfo
    } = props;

    const title = currentTrackInfo.trackTitle;
    const artist = currentTrackInfo.artistName;

    return (
        <Stack direction='row' position={'fixed'} bottom={0}
            sx={{
                width: '100%',
                height: '10%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 1,
                backgroundColor: SECONDARY_COLOR,

                border: DEBUG ? 5 : 0,
                borderColor: 'red',
            }}
        >
            <CurrentTrackInfo title={title} artist={artist} />
            <Box sx={{ flexGrow: 1 }} />
            <Stack
                sx={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    // justifyContent: 'center',

                    border: DEBUG ? 5 : 0,
                    borderColor: 'red',
                }}
            >
                <PlayBackControlBar
                    playOrPauseAudio={playOrPauseAudio}
                    paused={paused}
                    // rewind={skipPlayback}
                    // fastForward={skipPlayback}
                    skipPlayback={skipPlayback}
                    skipBack={skipBack}
                    skipForward={skipForward}
                />
                <PlayHead
                    movePlayPosition={movePlayPosition}
                    currentTime={currentTime}
                    duration={duration}
                />
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <VolumeSlider changeVolume={changeVolume} volume={volume} />
            <IconButton aria-label='full screen'
                onClick={() => { console.log('enter full screen'); }}
                sx={{ ...playerButtonStyle(`"full screen"`) }}
            >
                <OpenInFullIcon fontSize='inherit' sx={{ color: QUATERNARY_COLOR }} />
            </IconButton>
        </Stack >
    );
}
