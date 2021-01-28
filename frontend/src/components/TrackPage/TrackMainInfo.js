import { Link } from 'react-router-dom';
import TrackWaveForm from './TrackWaveForm';

const TrackMainInfo = ({track}) => {

    const uploadDateSplit = track.createdAt.split('-');
    const uploadDate = `${uploadDateSplit[1]}/${uploadDateSplit[2].slice(0,2)}/${uploadDateSplit[0]}`

    return(
        <div className='bg-gradient-to-t from-white via-independence to-space-cadet'>
            <div className='flex flex-row flex-nowrap p-10'>
                <div className='flex-initial'><img src={track.imageUrl} alt='Track' className='w-72 h-72 shadow-2xl rounded'></img></div>
                <div className='flex-grow flex flex-col pl-5 pr-5'>
                    <div className='flex flex-row justify-between pb-3'>
                        <div className='text-silver'><Link to={`/user/${track.User.username}`}>{track.User.username}</Link></div>
                        <div className='text-silver'>Uploaded: {uploadDate}</div>
                    </div>
                    <div className='text-silver pb-3'>{track.Genre.name}</div>
                    <div className='text-4xl text-mandarin pb-3'>{track.title}</div>
                    <TrackWaveForm track={track}/>
                </div>
            </div>
        </div>
    );
}

export default TrackMainInfo;
