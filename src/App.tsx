import { isMobile } from 'react-device-detect';
import onEventMobile from './assets/on-event-mobile.jpg';
import preEventMobile from './assets/pre-event-mobile.jpg';
import onEventDesktop from './assets/on-event-desktop.jpg';
import preEventDesktop from './assets/pre-event-desktop.jpg';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import useSWR from 'swr';

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json());

function App({ isOnEvent }: { isOnEvent: boolean }) {
  const urlObj = new URL(window.location.href);
  const path = urlObj.pathname;
  const id = path.substring(1);

  const getBackground = (isEventDay: boolean) => {
    if (isEventDay) {
      return isMobile ? onEventMobile : onEventDesktop;
    } else {
      return isMobile ? preEventMobile : preEventDesktop;
    }
  };

  const {
    data: infoData,
    error: infoError,
    isLoading,
  } = useSWR(
    isOnEvent && id ? `https://gateway.chubbannualstaffparty2025.com/generate/${id}/info` : null,
    fetcher
  );

  if (!id || !isOnEvent) {
    return (
      <div
        className="posterWrapper"
        style={{
          background: `url(${getBackground(false)})`,
          position: 'relative',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }

  if (infoError)
    return (
      <div>
        <progress value={undefined} />
        <p>Có lỗi xảy ra, vui lòng thử lại</p>
      </div>
    );
  if (!infoData || isLoading) return <progress value={undefined} />;

  // const fileUrl = infoData?.messageLink
  //   ? infoData.messageLink
  //   : infoData?.filename && infoData?.fileId && infoData?.mediaId
  //   ? `https://gateway.chubbannualstaffparty2025.com/generate/${infoData?.mediaId}`
  //   : '';

  const fileUrl =
    // infoData?.mediaLink ||
    `https://gateway.chubbannualstaffparty2025.com/generate/${infoData?.mediaId}`;

  return (
    <div
      className="posterWrapper"
      style={{
        background: `url(${getBackground(isOnEvent)})`,
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {fileUrl && <AudioPlayer isMobile={isMobile} fileUrl={fileUrl} />}
    </div>
  );
}

export default App;
