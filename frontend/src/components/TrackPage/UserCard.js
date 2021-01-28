
const UserCard = ({track}) => {



    return (
        <>
            <div className='flex flex-row pl-10 pr-10 pt-10'>
                <div className='flex-initial'>
                    <img src={track.User.avatarUrl} alt='User' className='w-24 h-24 rounded'></img>
                </div>
                <div className='flex flex-col pl-5'>
                    <div>{track.User.firstName}</div>
                    <div><a href={track.User.websiteUrl}>{track.User.websiteUrl}</a></div>
                </div>
            </div>
        </>
    );
}

export default UserCard;
