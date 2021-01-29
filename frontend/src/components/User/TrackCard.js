import { Link } from 'react-router-dom';

const TrackCard = ({track}) => {

    const uploadDateSplit = track.createdAt.split('-');
    const uploadDate = `${uploadDateSplit[1]}/${uploadDateSplit[2].slice(0,2)}/${uploadDateSplit[0]}`

    return (
        <>
            <div className='flex flex-row pt-5 items-center'>

                <div className='flex-initial mr-5'>
                    <Link to={`/tracks/${track.id}`}><img src={track.imageUrl} alt='User' className='w-24 h-24 rounded transform hover:scale-110'></img></Link>
                </div>
                <div className='bg-mandarin hover:bg-mandarin-dark text-white font-bold h-14 w-14 mr-5 rounded-full flex justify-center items-center'><i className="fas fa-play"></i></div>
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
