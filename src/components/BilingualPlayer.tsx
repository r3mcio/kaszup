'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

type MediaSource = {
  pl: string;
  en: string;
};

type BilingualPlayerProps = {
  type: 'audio' | 'video';
  sources: MediaSource;
  poster?: string;
  title?: string;
  subtitle?: string;
};

export default function BilingualPlayer({
  type,
  sources,
  poster,
  title,
  subtitle,
}: BilingualPlayerProps) {
  const t = useTranslations('Player');
  // Attempt to get locale safely
  const locale = useLocale();
  
  const [currentLang, setCurrentLang] = useState<'pl' | 'en'>(locale === 'pl' ? 'pl' : 'en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const mediaRef = useRef<HTMLMediaElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Sync language with locale changes if needed
  useEffect(() => {
    if (locale === 'pl' || locale === 'en') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentLang(locale);
    }
  }, [locale]);

  // Handle language switch
  const handleLangToggle = (lang: 'pl' | 'en') => {
    if (lang === currentLang) return;
    
    // Attempting seamless switch: store time & play state
    const time = currentTime;
    const wasPlaying = isPlaying;
    
    setCurrentLang(lang);
    setIsLoading(true);
    
    // Temporarily pause to avoid glitching
    if (mediaRef.current && wasPlaying) {
      mediaRef.current.pause();
    }
    
    // Let the new src load
    setTimeout(() => {
      if (mediaRef.current) {
        mediaRef.current.currentTime = time;
        if (wasPlaying) {
          mediaRef.current.play().catch((e) => console.log('Autoplay prevented:', e));
        }
      }
      setIsLoading(false);
    }, 400); // Give enough time for the skeleton to show and media to switch
  };

  const togglePlayPause = () => {
    if (!mediaRef.current) return;
    if (isPlaying) {
      mediaRef.current.pause();
    } else {
      mediaRef.current.play().catch((e) => console.log('Play prevented:', e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (mediaRef.current) {
      setDuration(mediaRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !mediaRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    mediaRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (mediaRef.current) {
      mediaRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (mediaRef.current) {
      const newMuted = !isMuted;
      mediaRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (newMuted) {
        mediaRef.current.volume = 0;
        setVolume(0);
      } else {
        mediaRef.current.volume = 1;
        setVolume(1);
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(255,255,255,0.03)] bg-neutral-900/60 backdrop-blur-2xl border border-zinc-800 p-5 sm:p-8 flex flex-col gap-6 text-white transition-all duration-500 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] group/player">
      
      {/* Media Display (if video) or Info Header (if audio) */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-black/80 shadow-inner group/media border border-zinc-800">
        {type === 'video' ? (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={sources[currentLang]}
            poster={poster}
            className="w-full h-auto aspect-video object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlayPause}
            playsInline
          />
        ) : (
          <audio
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            src={sources[currentLang]}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />
        )}

        {/* Loading Skeleton Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm z-10 flex items-center justify-center animate-pulse">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin" />
          </div>
        )}
        
        {/* Play overlay for video */}
        {type === 'video' && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity cursor-pointer pointer-events-none duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-500/90 backdrop-blur-md flex items-center justify-center text-white pl-1.5 shadow-xl shadow-emerald-500/20 scale-90 group-hover/media:scale-100 transition-transform">
              <PlayIcon className="w-10 h-10" />
            </div>
          </div>
        )}

        {/* Audio Visual Header */}
        {type === 'audio' && (
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-8 text-center sm:text-left">
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-1 shadow-[0_0_30px_rgba(16,185,129,0.3)] shrink-0">
              <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center overflow-hidden">
                {poster ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={poster} alt="Poster" className="w-full h-full object-cover opacity-90" />
                ) : (
                  <MusicIcon className="w-12 h-12 text-emerald-400" />
                )}
              </div>
              {/* Playing indicator ring */}
              {isPlaying && (
                <div className="absolute -inset-2 rounded-full border border-emerald-500/30 animate-ping opacity-75" style={{ animationDuration: '3s' }} />
              )}
            </div>
            <div className="flex flex-col justify-center h-full pt-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">{title || 'Audio Demo'}</h3>
              <p className="text-emerald-400 font-medium text-sm sm:text-base mt-1.5 uppercase tracking-widest">{subtitle || 'Voice Actor Portfolio'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls Area */}
      <div className="flex flex-col gap-5 px-2">
        {/* Progress Bar */}
        <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-neutral-400 font-mono tracking-wider">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <div 
            ref={progressRef}
            className="relative flex-1 h-2.5 bg-neutral-800/80 rounded-full cursor-pointer hover:h-4 transition-all group/progress overflow-hidden"
            onClick={handleProgressClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Hover indicator (optional) */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md scale-0 group-hover/progress:scale-100 transition-transform origin-center -ml-2"
              style={{ left: `${progressPercent}%` }}
            />
          </div>
          <span className="w-10">{formatTime(duration)}</span>
        </div>

        {/* Primary Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          
          {/* Left: Play/Pause & Volume */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <button 
              onClick={togglePlayPause}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-black hover:scale-110 hover:bg-emerald-400 hover:text-white transition-all shadow-lg shadow-white/10 active:scale-95 duration-300"
              title={isPlaying ? t('pause') : t('play')}
              aria-label={isPlaying ? t('pause') : t('play')}
            >
              {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-7 h-7 ml-1.5" />}
            </button>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleMute} 
                className="text-neutral-400 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                title={isMuted ? t('unmute') : t('mute')}
                aria-label={isMuted ? t('unmute') : t('mute')}
              >
                {isMuted || volume === 0 ? <VolumeXIcon className="w-5 h-5"/> : <VolumeIcon className="w-5 h-5" />}
              </button>
              {/* Volume slider — always visible on mobile, fades in on desktop hover */}
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                className="w-20 sm:w-24 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          {/* Right: Language Toggle */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-full border border-zinc-800 shadow-inner w-full sm:w-auto justify-center">
            <button
              onClick={() => handleLangToggle('pl')}
              className={`flex-1 sm:flex-none sm:w-[100px] min-h-[44px] text-sm font-bold rounded-full transition-all duration-300 ${currentLang === 'pl' ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
              title={t('switchLanguage')}
              aria-label={`${t('switchLanguage')} ${t('pl')}`}
            >
              {t('pl')}
            </button>
            <button
              onClick={() => handleLangToggle('en')}
              className={`flex-1 sm:flex-none sm:w-[100px] min-h-[44px] text-sm font-bold rounded-full transition-all duration-300 ${currentLang === 'en' ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
              title={t('switchLanguage')}
              aria-label={`${t('switchLanguage')} ${t('en')}`}
            >
              {t('en')}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

// Minimal Icons
function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M8 5v14l11-7z"/></svg>;
}
function PauseIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
}
function VolumeIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>;
}
function VolumeXIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>;
}
function MusicIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>;
}
