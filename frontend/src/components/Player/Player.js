


const Player = () => {


    return (
        <div className="player">
            <div className="player__inner container">
            <div className="player__section player__section--song">
                <div className="player__song">
                <div className="player__song__artwork" style={{ backgroundImage: `url(${artworkUrl})` }} />
                <div className="player__song__main">
                    <Link
                    className="player__song__title"
                    navigateTo={navigateTo}
                    keys={{ id }}
                    path={SONG_PATH}
                    >
                    {title}
                    </Link>
                    <Link
                    className="player__song__username"
                    navigateTo={navigateTo}
                    keys={{ id: user.id }}
                    path={USER_PATH}
                    >
                    {username}
                    </Link>
                </div>
                </div>
            </div>
            <div className="player__section">
                <div className="player__buttons">
                <div
                    className="player__button"
                    onClick={playPrevSong}
                    role="button"
                    tabIndex="0"
                >
                    <i className="player__button__icon ion-ios-rewind" />
                </div>
                <div
                    className="player__button"
                    onClick={togglePlay}
                    role="button"
                    tabIndex="0"
                >
                    <i className={`player__button__icon ion-ios-${isPlaying ? 'pause' : 'play'}`} />
                </div>
                <div
                    className="player__button"
                    onClick={playNextSongFromButton}
                    role="button"
                    tabIndex="0"
                >
                    <i className="player__button__icon ion-ios-fastforward" />
                </div>
                </div>
            </div>
            <div className="player__section player__section--seek">
                <Slider
                max={duration}
                onChange={changeCurrentTime}
                value={currentTime}
                />
            </div>
            <div className="player__section player__section--time">
                <div className="player__time">
                {formatSeconds(currentTime)}
                <div className="player__time__separator">
                    /
                </div>
                {formatSeconds(duration)}
                </div>
            </div>
            <div className="player__section player__section--options">
                <div className="player__buttons player__buttons--options">
                <div
                    className={`player__button ${repeat ? 'player__button--active' : ''}`}
                    onClick={toggleRepeat}
                    role="button"
                    tabIndex="0"
                >
                    <i className="player__button__icon ion-loop" />
                </div>
                <div
                    className={`player__button ${shuffle ? 'player__button--active' : ''}`}
                    onClick={toggleShuffle}
                    role="button"
                    tabIndex="0"
                >
                    <i className="player__button__icon ion-shuffle" />
                </div>
                <div
                    className={`player__button ${showHistory ? 'player__button--active' : ''}`}
                    onClick={toggleShowHistory}
                    role="button"
                    tabIndex="0"
                >
                    <i className="player__button__icon ion-android-list" />
                </div>
                <div
                    className="player__button player__button--volume"
                    onClick={toggleMuted}
                    role="button"
                    tabIndex="0"
                >
                    <i className={`player__button__icon ion-android-volume-${muted ? 'off' : 'mute'}`} />
                    <i className={`player__button__icon player__button__icon--absolute ${volumeClassName(volume)}`} />
                </div>
                </div>
            </div>
            <div className="player__section player__section--volume">
                <Slider
                max={1}
                onChange={changeVolume}
                value={volume}
                />
            </div>
            </div>
        </div>
    );

};

export default Player;
