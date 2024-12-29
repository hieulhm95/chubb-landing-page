import { useRef, useState } from 'react';
import AudioHeartIcon from '../assets/audio-heart-icon-min.png';
import AudioBackground from '../assets/audio-background-min.png';
import './AudioPlayer.css';
import Spinner from './Spinner';

const AudioPlayer = ({ fileUrl, isMobile }: { fileUrl: string; isMobile: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);

  const handlePlay = () => {
    if (isPlayed) {
      audioRef.current?.pause();
      setIsPlayed(false);
      return;
    }
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlayed(true);
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlayThrough = () => {
    setIsLoading(false);
    setIsLoaded(true);
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        padding: 8,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: `url(${AudioBackground}) `,
          width: isMobile ? 279 : 463,
          height: isMobile ? 232 : 187,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: isMobile ? 'contain' : 'cover',
        }}
      >
        <audio
          ref={audioRef}
          style={{ display: 'none' }}
          onLoadStart={handleLoadStart}
          onCanPlayThrough={handleCanPlayThrough}
        >
          <source src={fileUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <div className="audio-player-container">
          <div onClick={handlePlay} className="audio-heart-icon">
            {isLoading && <Spinner />}
            {isLoaded && <img src={AudioHeartIcon} alt="Audio Heart Icon" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
