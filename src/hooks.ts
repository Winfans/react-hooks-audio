import { useCallback, useEffect, useRef, useState } from 'react';

let voicePlay;
const useAudio = ({ value, isWebm }: { value?: string; isWebm?: boolean } = {}) => {
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const [audioTime, setAudioTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const init = (value) => {
    if (value) {
      audio.current = new Audio(value);
      if (isWebm) {
        // webm格式可能获取不到总时长
        audio.current.currentTime = Number.MAX_SAFE_INTEGER;
      }
      addEventHandle();
    }
  };

  const pause = useCallback(() => {
    audio.current?.pause();
    setPlaying(false);
    voicePlay = null;
  }, []);

  const play = useCallback(() => {
    if (!voicePlay) {
      voicePlay = {
        playing: true,
        pause: pause,
      };
    } else {
      setPlaying(false);
      voicePlay?.pause();
      voicePlay = null;
      voicePlay = {
        playing: true,
        pause: pause,
      };
    }
    audio.current?.play();
    setPlaying(true);
  }, [pause]);

  const rePlay = useCallback(() => {
    if (!voicePlay) {
      voicePlay = {
        playing: true,
        pause: pause,
      };
    } else {
      setPlaying(false);
      voicePlay?.pause();
      voicePlay = null;
      voicePlay = {
        playing: true,
        pause: pause,
      };
    }

    if (audio.current) {
      audio.current.currentTime = 0;
      audio.current.play();
    }
    setPlaying(true);
  }, [pause]);

  const endedHandle = useCallback(() => {
    setPlaying(false);
    voicePlay = null;
  }, []);

  const loadeddataHandle = useCallback(() => {
    if (audio.current?.duration !== Infinity) {
      setAudioTime(audio.current.duration);
    }
  }, []);
  const loadedmetadataHandle = useCallback(() => {
    if (audio.current?.duration !== Infinity) {
      setAudioTime(audio.current?.duration);
    }
  }, []);

  const timeupdateHandle = useCallback(() => {
    setCurrentTime(audio.current?.currentTime);
  }, []);

  const changeCurrentTime = useCallback((value) => {
    if (audio.current) {
      audio.current.currentTime = value;
    }
  }, []);

  useEffect(() => {
    if (value) {
      audio.current = new Audio(value);

      if (isWebm) {
        // webm格式可能获取不到总时长
        audio.current.currentTime = Number.MAX_SAFE_INTEGER;
      }
    }
  }, [isWebm, value]);

  const addEventHandle = useCallback(() => {
    if (audio.current) {
      audio.current.addEventListener('ended', endedHandle);
      audio.current.addEventListener('loadeddata', loadeddataHandle);
      audio.current.addEventListener('loadedmetadata', loadedmetadataHandle);
      audio.current.addEventListener('timeupdate', timeupdateHandle);
    }
  }, [endedHandle, loadeddataHandle, loadedmetadataHandle, timeupdateHandle]);

  useEffect(() => {
    addEventHandle();
    return () => {
      pause();
      audio.current?.removeEventListener('ended', endedHandle);
      audio.current?.removeEventListener('loadeddata', loadeddataHandle);
      audio.current?.removeEventListener('loadedmetadata', loadedmetadataHandle);
      audio.current?.removeEventListener('timeupdate', timeupdateHandle);
    };
  }, [
    addEventHandle,
    endedHandle,
    loadeddataHandle,
    loadedmetadataHandle,
    pause,
    timeupdateHandle,
  ]);

  return {
    init,
    currentTime,
    setCurrentTime: changeCurrentTime,
    audioTime,
    playing,
    play,
    rePlay,
    pause,
    audio: audio.current,
  };
};

export { useAudio };
