import { isMobile } from 'react-device-detect';
import onEventMobile from './assets/on-event-mobile.png';
import preEventMobile from './assets/pre-event-mobile.png';
import onEventDesktop from './assets/on-event-desktop.png';
import preEventDesktop from './assets/pre-event-desktop.png';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json());

function App() {
  const isOnEvent = true;
  const urlObj = new URL(window.location.href);
  const path = urlObj.pathname;
  const id = path.substring(1);

  const {
    data: infoData,
    error: infoError,
    isLoading,
  } = useSWR(`https://gateway.chubbannualstaffparty2025.com/generate/${id}/info`, fetcher);

  if (infoError)
    return (
      <div>
        <progress value={null} />
        <p>Có lỗi xảy ra, vui lòng thử lại</p>
      </div>
    );
  if (!infoData || isLoading) return <progress value={null} />;

  const getBackground = () => {
    if (isOnEvent) {
      return isMobile ? onEventMobile : onEventDesktop;
    } else {
      return isMobile ? preEventMobile : preEventDesktop;
    }
  };

  const fileUrl = infoData?.messageLink
    ? infoData.messageLink
    : infoData?.filename && infoData?.fileId && infoData?.mediaId
    ? `https://gateway.chubbannualstaffparty2025.com/generate/${infoData?.mediaId}`
    : '';

  return (
    <div
      className="posterWrapper"
      style={{
        background: `url(${getBackground()}) no-repeat center center/cover`,
        position: 'relative',
      }}
    >
      {fileUrl && <AudioPlayer isMobile={isMobile} fileUrl={fileUrl} />}
    </div>
  );
}

export default App;
