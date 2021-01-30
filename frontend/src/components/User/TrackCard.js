import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { playTrack, playAudioTrack, stopTrack } from '../../store/player';
import { wavesurfer } from '../Player/Player';

const TrackCard = ({track}) => {
    const dispatch = useDispatch();
    const currentTrack = useSelector(state => state.player.currentTrack);
    const isPlaying = useSelector(state => state.player.isPlaying);

    const uploadDateSplit = track.createdAt.split('-');
    const uploadDate = `${uploadDateSplit[1]}/${uploadDateSplit[2].slice(0,2)}/${uploadDateSplit[0]}`

    const handleClickLoaded = async (e) => {
        e.preventDefault();

        if (isPlaying) {
            wavesurfer.current.pause();
            dispatch(stopTrack())
        }
        else {
            wavesurfer.current.play();
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
        <>
            <div className='flex flex-row pt-5 items-center'>

                <div className='flex-initial mr-5'>
                    <Link to={`/tracks/${track.id}`}><img src={track.imageUrl} alt='User' className='w-24 h-24 rounded transform hover:scale-110'></img></Link>
                </div>
                {currentTrack && (track.id === currentTrack.id ?
                                    <button onClick={handleClickLoaded} className='bg-mandarin hover:bg-mandarin-dark text-white font-bold h-14 w-14 mr-5 rounded-full flex justify-center items-center focus:outline-none'>{isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}</button> :
                                    <button onClick={handleClickUnloaded} className='bg-mandarin hover:bg-mandarin-dark text-white font-bold h-14 w-14 mr-5 rounded-full flex justify-center items-center focus:outline-none'><i className="fas fa-play"></i></button>)
                }
                {!currentTrack && <button onClick={handleClickUnloaded} className='bg-mandarin hover:bg-mandarin-dark text-white font-bold h-14 w-14 mr-5 rounded-full flex justify-center items-center focus:outline-none'><i className="fas fa-play"></i></button>}
                <div className='text-2xl text-space-cadet hover:text-mandarin flex-grow'><Link to={`/tracks/${track.id}`}>{track.title}</Link></div>
                <div className='flex flex-col pl-5 text-right'>
                    <div>{uploadDate}</div>
                    <div>{track.Genre.name}</div>
                </div>
            </div>
        </>
    );
}

export default TrackCard;
