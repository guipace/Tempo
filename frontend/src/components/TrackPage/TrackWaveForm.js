import React, { useEffect, useRef, useState } from "react";
import { Button, Slider } from "antd";
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

export function TrackWaveForm({ url }) {
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
        <div className='shadow-2xl rounded'>
            <div id="waveform" ref={waveformRef} />
                <div className="controls">
                    <Button
                    style={{
                        background: "rgb(22, 22, 23)",
                        color: "rgba(255, 255, 255, 0.65)",
                        borderColor: "#001529",
                    }}
                    onClick={handlePlayPause}
                    >
                    {!playing ? "Play" : "Pause"}
                    </Button>
                    <input
                    className="slider"
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
