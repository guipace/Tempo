import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../store/track';

const TrackComments = ({ track, sessionUser }) => {
    const dispatch = useDispatch();

    return (
        <>
            {track.Comments &&
            <>
                <div className="flex flex-col px-10 py-5">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="table-fixed min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User Comments
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {track.Comments.map((comment) => {
                                            return(
                                                <tr key={comment.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 object-cover rounded-full" src={comment.User.avatarUrl} alt="user avatar"></img>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    <Link to={`/user/${comment.User.username}`}>{comment.User.firstName}</Link>
                                                                    {comment.User.id === sessionUser.id &&
                                                                    <>
                                                                        <i className="fas fa-edit text-gray-600 text-sm transform hover:scale-110 ml-1 cursor-pointer"></i>
                                                                        <i className="fas fa-trash-alt text-red-700 text-sm transform hover:scale-110 ml-1 cursor-pointer" onClick={() => {console.log("FRONTEND"); dispatch(deleteComment(track.id, comment.id))}}></i>
                                                                    </>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{comment.content}</div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    );
}

export default TrackComments;
