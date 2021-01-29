import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import WaveSurfer from "wavesurfer.js";

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
    let url = track.awsUrl;

    if (!url) {
    url =
        "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3";
    }
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
    useEffect(() => {
        setPlay(false);
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
        wavesurfer.current.load(url);
        wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);
      // make sure object stillavailable when file loaded
        if (wavesurfer.current) {
            wavesurfer.current.setVolume(volume);
            setVolume(volume);
        }
    });
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
    }, [url]);

    const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
    };

    const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;
        if (newVolume) {
            setVolume(newVolume);
            wavesurfer.current.setVolume(newVolume || 1);
        }
    };

    return (
        <div className='rounded'>
            <div id="waveform" ref={waveformRef} />
                <div className="controls flex flex-row items-center">
                    <Button
                        onClick={handlePlayPause}
                        className='bg-mandarin hover:bg-mandarin-dark text-white font-bold h-14 w-14 mr-5 rounded-full'
                    >
                        {!playing ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
                    </Button>
                    <input
                        className="slider w-1/6"
                        type="range"
                        id="volume"
                        name="volume"
                        // waveSurfer recognize value of `0` same as `1`
                        //  so we need to set some zero-ish value for silence
                        min="0.01"
                        max="1"
                        step=".025"
                        onChange={onVolumeChange}
                        defaultValue={volume}
                    />
            </div>
        </div>
    );
}

export default TrackWaveForm;
