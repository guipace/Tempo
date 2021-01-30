
export default function Footer() {

    return (
        <footer className='w-full bottom-0 flex justify-around bg-space-cadet text-silver'>
            <div className="flex py-2 flex-col justify-center items-center">
                <p>About The Developer</p>
                <div className="w-full flex py-2 flex justify-around items-center">
                <a href='http://www.linkedin.com/in/guilhermepace/'><i className="fab fa-linkedin"></i></a>
                <a href='http://github.com/guipace'><i className="fab fa-github"></i></a>
                <a href='mailto:pace.gui@gmail.com'><i className="far fa-envelope"></i></a>
                </div>
            </div>
            <div className="flex py-2 flex-col justify-center items-center">
                <p>Technologies Used</p>
                <div className="w-full flex py-2 flex justify-around items-center">
                    <a href='http://en.wikipedia.org/wiki/JavaScript'><i className="fab fa-js-square"></i></a>
                    <a href='http://nodejs.org/'><i className="fab fa-node"></i></a>
                    <a href='http://reactjs.org/'><i className="fab fa-react"></i></a>
                    <a href='https://redux.js.org/'><img src='/img/redux.png' alt='' className='h-4'></img></a>
                    <a href='https://www.postgresql.org/'><img src='/img/postgresql.png' alt='' className='h-4'></img></a>
                </div>
            </div>

        </footer>
    );
}
