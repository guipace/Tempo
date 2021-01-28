import TrackWaveForm from './TrackWaveForm';

const TrackMainInfo = ({track, user}) => {

    const uploadDateSplit = track.createdAt.split('-');
    const uploadDate = `${uploadDateSplit[1]}/${uploadDateSplit[2].slice(0,2)}/${uploadDateSplit[0]}`

    return(
        <div className='bg-gradient-to-t from-white via-independence to-space-cadet'>
            <div className='flex flex-row flex-nowrap p-10'>
                <div className='w-50 flex-initial'><img src={track.imageUrl} alt='Track' className='shadow-2xl rounded'></img></div>
                <div className='flex-grow flex flex-col pl-5 pt-5 pr-5'>
                    <div className='flex flex-row justify-between pb-5'>
                        <div className='text-silver'>{user.username}</div>
                        <div className='text-silver'>Uploaded: {uploadDate}</div>
                    </div>
                    <div className='text-silver pb-5'> PLACEHOLDER</div>
                    <div className='text-4xl text-mandarin pb-5'>{track.title} RÜFÜS DU SOL [DJ Set] - Robot Heart - Burning Man 2019</div>
                    <TrackWaveForm track={track}/>
                </div>
            </div>
        </div>
    );
}

export default TrackMainInfo;
