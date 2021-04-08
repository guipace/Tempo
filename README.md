# Tempo

<p align="center">
    <img src="#" alt="Tempo" />
</p>

## Description
[Tempo](https://tempo-project-0.herokuapp.com) is a full-stack web application and a music sharing platform dedicated to electronic music inspired on [SoundCloud](https://soundcloud.com).

## Links
* [Live Application](https://tempo-project-0.herokuapp.com)
* [Application Wiki](https://github.com/guipace/Tempo/wiki)

## Primary Languages
* JavaScript
* HTML5
* CSS3
* SQL

## Technologies Implemented
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Node.js](https://nodejs.org/)
* [Wavesurfer.js](https://wavesurfer-js.org/)
* [Express.js](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [Bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme)
* [PostgreSQL](https://www.postgresql.org/)
* [Amazon Web Services S3](https://aws.amazon.com/s3/)
* [Docker](https://www.docker.com/)
* [FontAwesome](https://fontawesome.com/)
* [TailwindCSS](https://tailwindcss.com)
* [Heroku](https://heroku.com/)

## Developing
Below are instructions to run the application on a local development environment.

### Pre-installed requirements:
* Node.js
* PostgreSQL

### Instructions:
1. Clone this repository
    ```bash
    git clone https://github.com/guipace/Tempo.git
    ```

2. Change directory
    ```bash
    cd Tempo && cd backend
    ```

3. Install node modules
    ```bash
    npm install
    ```

4. Create your own environment variables files (`.env`) based on the provided examples (`.env.example`) in the backend directory.

5. Create a user in your PostgreSQL that matches your environment variables configuration.

6. Use Sequelize to create the database
    ```bash
    npx dotenv sequelize-cli db:create
    ```

7. Apply migrations to the database
    ```bash
    npx dotenv sequelize-cli db:migrate
    ```

8. Seed the database
    ```bash
    npx dotenv sequelize db:seed:all
    ```

9. In another terminal, change directories into the frontend directory
    ```bash
    cd frontend
    ```

10. Install node modules
    ```bash
    npm install
    ```

11. Run backend application in first terminal
    ```bash
    npm start
    ```

12. Run the frontend application in second terminal
    ```bash
    npm start
    ```

13. The application should open in your default browser.

## Challenges
A challenge faced in the development of SoarView includes the following:
* In order to improve the user experience I wanted to have an audio player that persisted as the user navigated across the application and visually show a waveform representing the track being played. In order to have the waveform on both the persistent player and on the track page with a visual representation if audio is playing and at what point in the track it is, I had to synchronize two instances of the audio player. While according to the wavesurfer.js documentation it was not specifically intended for this use, I developed a solution that allowed for this by using React components and Redux for state management.

## Code Highlight
* Implementation of Wavesurfer.js library with integration with Redux to synchronize with two audio player instances and control state of audio track.

    ```javascript
    const formWaveSurferOptions = (ref) => ({
        container: ref,
        waveColor: "#BFC0C0",
        progressColor: "#EA5C1F",
        cursorColor: "transparent",
        barWidth: 4,
        barRadius: 1,
        responsive: true,
        height: 50,
        normalize: true,
        partialRender: true,
        hideScrollbar: true,
    });

    export let wavesurfer;

    export function Player() {
        const dispatch = useDispatch();
        const sessionUser = useSelector(state => state.session.user);
        const currentTrack = useSelector(state => state.player.currentTrack);
        const isPlaying = useSelector(state => state.player.isPlaying);
        const waveformRef = useRef(null);
        wavesurfer = useRef(null);
        const [playing, setPlay] = useState(false);
        const [volume, setVolume] = useState(0.5);

        let url;
        if (currentTrack) {
            url = currentTrack.awsUrl;
        }

        if (!url) {
        url =
            "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3";
        }

        // Create new WaveSurfer instance on component mount and when url changes
        useEffect(() => {
            setPlay(false);
            const options = formWaveSurferOptions(waveformRef.current);
            wavesurfer.current = WaveSurfer.create(options);
            wavesurfer.current.load(url);
            wavesurfer.current.on("ready", function () {
                wavesurfer.current.play();
                setPlay(true);

                // Make sure object still available when file loaded
                if (wavesurfer.current) {
                    wavesurfer.current.setVolume(volume);
                    setVolume(volume);
                }
            });

        // Removes events, elements and disconnects Web Audio nodes when component unmounts
        return () => wavesurfer.current.destroy();
        }, [url]);

        useEffect(() => {
            setPlay(isPlaying);
        }, [isPlaying]);

        const handlePlayPause = () => {
            if (isPlaying) { dispatch(stopTrack()) }
            else { dispatch(playAudioTrack()) }
            wavesurfer.current.playPause();
        };

        const handleStop = () => {
            dispatch(stopTrack());
            dispatch(unloadTrack());
        }

        const onVolumeChange = (e) => {
            const { target } = e;
            const newVolume = +target.value;
            if (newVolume) {
                setVolume(newVolume);
                wavesurfer.current.setVolume(newVolume || 1);
            }
        };

        return (
            <>
                {sessionUser &&
                <>
                    <div id='placeholder-for-player' className='bottom-0 h-20 bg-space-cadet'></div>
                    <div className='fixed w-screen z-10 h-20 bottom-0 bg-space-cadet bg-opacity-80 px-10 text-silver flex flex-row items-center'>
                        <div className='w-1/6 flex flex-row items-center'>
                            <Button
                                onClick={handlePlayPause}
                                className='text-white hover:text-mandarin font-bold h-10 w-10 rounded-full focus:outline-none'
                            >
                                {!playing ? <i className="fas fa-play"></i> : <i className="fas fa-pause"></i>}
                            </Button>
                            <Button
                                onClick={handleStop}
                                className='text-white hover:text-mandarin font-bold h-10 w-10 mr-5 rounded-full focus:outline-none'
                            >
                                <i className="fas fa-stop"></i>
                            </Button>
                            <div className='flex flex-col items-center flex-grow mr-5'>
                                <div>Volume</div>
                                <input
                                    className="slider w-36 mt-2"
                                    type="range"
                                    id="volume"
                                    name="volume"
                                    min="0.01"
                                    max="1"
                                    step=".025"
                                    onChange={onVolumeChange}
                                    defaultValue={volume}
                                />
                            </div>
                        </div>
                        <div id="waveform" ref={waveformRef} className='flex-grow' />
                        <div className='w-3/12 pl-5 flex flex-row items-center'>
                            <div className='flex-initial'><img src={currentTrack.imageUrl} alt='Track' className='w-10 h-10 shadow-2xl rounded'></img></div>
                            <div className='flex flex-col pl-5'>
                                <div>{currentTrack.User.username}</div>
                                <div>{currentTrack.title}</div>
                            </div>
                        </div>
                    </div>
                </>
                }
            </>
        );
    }
    ```
