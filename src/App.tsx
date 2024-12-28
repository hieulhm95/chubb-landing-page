import { isMobile } from 'react-device-detect';
import reactLogo from './assets/react.svg';
import onEventMobile from './assets/on-event-mobile.png';
import preEventMobile from './assets/pre-event-mobile.png';
import onEventDesktop from './assets/on-event-desktop.png';
import preEventDesktop from './assets/pre-event-desktop.png';
import './App.css';
import GoogleDrivePlayer from './components/GoogleDrivePlayer';

function App() {
  const isOnEvent = true;

  return (
    <div className="posterWrapper">
      {isOnEvent ? (
        isMobile ? (
          <img src={onEventMobile} alt="On event mobile" />
        ) : (
          <img src={onEventDesktop} alt="On event desktop" />
        )
      ) : isMobile ? (
        <img src={preEventMobile} alt="Pre event mobile" />
      ) : (
        <img src={preEventDesktop} alt="Pre event desktop" />
      )}
      <GoogleDrivePlayer />
    </div>
  );
}

export default App;
