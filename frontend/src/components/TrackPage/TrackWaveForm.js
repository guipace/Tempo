import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import WaveSurfer from "wavesurfer.js";
import { playTrack, playAudioTrack, stopTrack } from '../../store/player';
import { wavesurfer as wavesurferPlayer } from '../Player/Player';

const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "#BFC0C0",
    progressColor: "#EA5C1F",
    cursorColor: "transparent",
    barWidth: 4,
    barRadius: 1,
    responsive: true,
    height: 128,
    normalize: true,
    partialRender: true,
    hideScrollbar: true,
});

export function TrackWaveForm({ track }) {
    const dispatch = useDispatch();
    const currentTrack = useSelector(state => state.player.currentTrack);
    const isPlaying = useSelector(state => state.player.isPlaying);
    let url = track.awsUrl;

    if (!url) {
    url =
        "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3";
    }
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const currentTime = useRef(null);

  // create new WaveSurfer instance
  // On component mount and when url changes
    useEffect(() => {
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
        wavesurfer.current.load(url);
        wavesurfer.current.on("ready", function () {
            // https://wavesurfer-js.org/docs/methods.html
            wavesurfer.current.setVolume(0.001);
            // wavesurfer.current.play();
            // make sure object stillavailable when file loaded
        });
        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => wavesurfer.current.destroy();
    }, [url]);

    useEffect(() => {
            if (currentTrack &&
                track.id === currentTrack.id &&
                wavesurferPlayer &&
                wavesurferPlayer.current) {
                    wavesurfer.current.on("ready", function () {
                        wavesurferPlayer.current.on('audioprocess', () => {
                            wavesurfer.current.seekTo(wavesurferPlayer.current.getCurrentTime() / wavesurferPlayer.current.getDuration());
                        })
                    });
                }
    }, [track.id, currentTrack, isPlaying, currentTime])

    const handleClickLoaded = async (e) => {
        e.preventDefault();

        if (isPlaying) {
            wavesurferPlayer.current.pause();
            dispatch(stopTrack())
        }
        else {
            wavesurferPlayer.current.play();
            dispatch(playAudioTrack())
        }

        return dispatch(playTrack(track.id))
    }

    const handleClickUnloaded = async (e) => {
        e.preventDefault();

        dispatch(playAudioTrack())
        return dispatch(playTrack(track.id))
    }

    return (
        <div className='rounded'>
            <div id="waveform" ref={waveformRef} />
            <div className="controls flex flex-row items-center">
                {currentTrack && (track.id === currentTrack.id ?
                                    <button onClick={handleClickLoaded} className='bg-mandarin hover:bg-mandarin-dark text-white font-bold h-14 w-14 mr-5 rounded-full flex justify-center items-center focus:outline-none'>{isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}</button> :
                                    <button onClick={handleClickUnloaded} className='bg-mandarin hover:bg-mandarin-dark text-white font-bold h-14 w-14 mr-5 rounded-full flex justify-center items-center focus:outline-none'><i className="fas fa-play"></i></button>)
                }
                {!currentTrack && <button onClick={handleClickUnloaded} className='bg-mandarin hover:bg-mandarin-dark text-white font-bold h-14 w-14 mr-5 rounded-full flex justify-center items-center focus:outline-none'><i className="fas fa-play"></i></button>}
            </div>
        </div>
    );
}

export default TrackWaveForm;
