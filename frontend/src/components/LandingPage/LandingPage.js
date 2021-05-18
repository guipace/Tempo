import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const sessionUser = useSelector(state => state.session.user)

  if (!sessionUser) {
    return (<Redirect to='/login' />)
  }

  return (
    <div className='mt-10 flex-1'>Hello World</div>
  )
}

export default LandingPage;
