
const UserMainInfo = ({user}) => {

    const joinedDateSplit = user.createdAt.split('-');
    const joinedDate = `${joinedDateSplit[1]}/${joinedDateSplit[2].slice(0,2)}/${joinedDateSplit[0]}`

    return(
        <>
            {user && (
                <div className='bg-gradient-to-t from-white via-independence to-space-cadet'>
                    <div className='flex flex-row flex-nowrap p-10'>
                        <div className='flex-initial'><img src={user.avatarUrl} alt='User' className='w-72 h-72 shadow-2xl rounded-full'></img></div>
                        <div className='flex-grow flex flex-col pl-5 pr-5'>
                            <div className='text-4xl text-mandarin pb-3'>{`${user.firstName} ${user.lastName}`}</div>
                            <div className='text-silver pb-3'>{`Joined on: ${joinedDate}`}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserMainInfo;
