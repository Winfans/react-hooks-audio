import { useBoolean, useMemoizedFn } from 'ahooks';
import { useEffect, useRef, useState } from 'react';

let voicePlay;
const useVoice = ({ value, isWebm }: { value?: string; isWebm?: boolean } = {}) => {
  const [playing, playingAction] = useBoolean(false);
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

  const pause = useMemoizedFn(() => {
    audio.current?.pause();
    playingAction.setFalse();
    voicePlay = null;
  });

  const play = useMemoizedFn(() => {
    if (!voicePlay) {
      voicePlay = {
        playing: true,
        pause: pause,
      };
    } else {
      playingAction.setFalse();
      voicePlay?.pause();
      voicePlay = null;
      voicePlay = {
        playing: true,
        pause: pause,
      };
    }
    audio.current?.play();
    playingAction.setTrue();
  });

  const rePlay = useMemoizedFn(() => {
    if (!voicePlay) {
      voicePlay = {
        playing: true,
        pause: pause,
      };
    } else {
      playingAction.setFalse();
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
    playingAction.setTrue();
  });

  const endedHandle = useMemoizedFn(() => {
    playingAction.setFalse();
    voicePlay = null;
  });

  const loadeddataHandle = useMemoizedFn(() => {
    if (audio.current?.duration !== Infinity) {
      setAudioTime(audio.current.duration);
    }
  });
  const loadedmetadataHandle = useMemoizedFn(() => {
    if (audio.current?.duration !== Infinity) {
      setAudioTime(audio.current?.duration);
    }
  });

  const timeupdateHandle = useMemoizedFn(() => {
    setCurrentTime(audio.current?.currentTime);
  });

  const changeCurrentTime = useMemoizedFn((value) => {
    if (audio.current) {
      audio.current.currentTime = value;
    }
  });

  useEffect(() => {
    if (value) {
      audio.current = new Audio(value);

      if (isWebm) {
        // webm格式可能获取不到总时长
        audio.current.currentTime = Number.MAX_SAFE_INTEGER;
      }
    }
  }, [isWebm, value]);

  const addEventHandle = useMemoizedFn(() => {
    if (audio.current) {
      audio.current.addEventListener('ended', endedHandle);
      audio.current.addEventListener('loadeddata', loadeddataHandle);
      audio.current.addEventListener('loadedmetadata', loadedmetadataHandle);
      audio.current.addEventListener('timeupdate', timeupdateHandle);
    }
  });

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

export { useVoice };
