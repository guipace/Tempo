import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "antd";
import WaveSurfer from "wavesurfer.js";
import { unloadTrack, playAudioTrack, stopTrack } from "../../store/player";

const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "#BFC0C0",
    progressColor: "#EA5C1F",
    cursorColor: "transparent",
    barWidth: 4,
    barRadius: 1,
    responsive: true,
    height: 50,
    normalize: true,
    partialRender: true,
    hideScrollbar: true,
});

export let wavesurfer;

export function Player() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const currentTrack = useSelector(state => state.player.currentTrack);
    const isPlaying = useSelector(state => state.player.isPlaying);
    const waveformRef = useRef(null);
    wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);

    let url;
    if (currentTrack) {
        url = currentTrack.awsUrl;
    }

    if (!url) {
    url =
        "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3";
    }

    // Create new WaveSurfer instance on component mount and when url changes
    useEffect(() => {
        setPlay(false);
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
        wavesurfer.current.load(url);
        wavesurfer.current.on("ready", function () {
            wavesurfer.current.play();
            setPlay(true);

            // Make sure object still available when file loaded
            if (wavesurfer.current) {
                wavesurfer.current.setVolume(volume);
                setVolume(volume);
            }
        });

    // Removes events, elements and disconnects Web Audio nodes when component unmounts
    return () => wavesurfer.current.destroy();
    }, [url]);

    useEffect(() => {
        setPlay(isPlaying);
    }, [isPlaying]);

    const handlePlayPause = () => {
        if (isPlaying) { dispatch(stopTrack()) }
        else { dispatch(playAudioTrack()) }
        wavesurfer.current.playPause();
    };

    const handleStop = () => {
        dispatch(stopTrack());
        dispatch(unloadTrack());
    }

    const onVolumeChange = (e) => {
        const { target } = e;
        const newVolume = +target.value;
        if (newVolume) {
            setVolume(newVolume);
            wavesurfer.current.setVolume(newVolume || 1);
        }
    };

    return (
        <>
            {sessionUser &&
            <>
                <div id='placeholder-for-player' className='bottom-0 h-20 bg-space-cadet'></div>
                <div className='fixed w-screen z-10 h-20 bottom-0 bg-space-cadet bg-opacity-80 px-10 text-silver flex flex-row items-center'>
                    <div className='w-1/6 flex flex-row items-center'>
                        <Button
                            onClick={handlePlayPause}
                            className='text-white hover:text-mandarin font-bold h-10 w-10 rounded-full focus:outline-none'
                        >
                            {!playing ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
                        </Button>
                        <Button
                            onClick={handleStop}
                            className='text-white hover:text-mandarin font-bold h-10 w-10 mr-5 rounded-full focus:outline-none'
                        >
                            <i className="fas fa-stop"></i>
                        </Button>
                        <div className='flex flex-col items-center flex-grow mr-5'>
                            <div>Volume</div>
                            <input
                                className="slider w-36 mt-2"
                                type="range"
                                id="volume"
                                name="volume"
                                min="0.01"
                                max="1"
                                step=".025"
                                onChange={onVolumeChange}
                                defaultValue={volume}
                            />
                        </div>
                    </div>
                    <div id="waveform" ref={waveformRef} className='flex-grow' />
                    <div className='w-3/12 pl-5 flex flex-row items-center'>
                        <div className='flex-initial'><img src={currentTrack.imageUrl} alt='Track' className='w-10 h-10 shadow-2xl rounded'></img></div>
                        <div className='flex flex-col pl-5'>
                            <div>{currentTrack.User.username}</div>
                            <div>{currentTrack.title}</div>
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    );
}

export default Player;
