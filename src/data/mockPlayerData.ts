import { ComponentProps } from 'react';
import BilingualPlayer from '@/components/BilingualPlayer';

export const mockAudioPlayerProps: ComponentProps<typeof BilingualPlayer> = {
  type: 'audio',
  title: 'Commercial Demo Reel',
  subtitle: 'Voice Actor Portfolio',
  poster: '/images/audio-waveform-poster.jpg', // Optional: path to a cover image
  sources: {
    pl: '/audio/audio_pl.mp3',
    en: '/audio/audio_en.mp3',
  },
};

export const mockVideoPlayerProps: ComponentProps<typeof BilingualPlayer> = {
  type: 'video',
  poster: '/images/video-thumbnail.jpg',
  sources: {
    pl: '/video/video_pl.mp4',
    en: '/video/video_en.mp4',
  },
};

// Example Usage in a Page:
// 
// import BilingualPlayer from '@/components/BilingualPlayer';
// import { mockAudioPlayerProps } from '@/data/mockPlayerData';
// 
// export default function Page() {
//   return (
//     <div className="p-8">
//       <BilingualPlayer {...mockAudioPlayerProps} />
//     </div>
//   );
// }
