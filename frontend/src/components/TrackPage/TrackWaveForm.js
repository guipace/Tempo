import WaveSurfer from 'wavesurfer.js';

const TrackWaveForm = (track) => {

    const wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
    });

    return (
        <>
            <div id="waveform" className='bg-silver bg-opacity-10 shadow-2xl rounded flex-grow'>TrackWaveForm</div>

        </>
    );
}

export default TrackWaveForm;
