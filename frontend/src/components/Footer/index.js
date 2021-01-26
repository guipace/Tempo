import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <footer className='w-screen bottom-0 flex justify-around'>
            <div className="flex py-2 flex-col justify-center items-center">
                <p>About The Developer</p>
                <Link to='#'>About The Developer</Link>
                <Link to='#'>About The Developer</Link>
                <Link to='#'>About The Developer</Link>
            </div>
            <div className="flex py-2 flex-col justify-center items-center">
                <p>Technologies Used</p>
                <Link to='#'>Technologies Used</Link>
                <Link to='#'>Technologies Used</Link>
                <Link to='#'>Technologies Used</Link>
            </div>

        </footer>
    );
}
