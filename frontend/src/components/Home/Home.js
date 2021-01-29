import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) {
        return ( <Redirect to={`/user/${sessionUser.username}`} /> );

    } else {
        return ( <Redirect to='/login' /> );
    }

}

export default Home;
