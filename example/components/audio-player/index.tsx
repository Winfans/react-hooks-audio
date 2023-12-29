import { useAudio } from '@/hooks';
import { blockTimeFormat, convertBlob2AudioUrl } from '../../utils';
import { useBoolean, useMemoizedFn } from 'ahooks';
import { Slider } from 'antd';
import { v4 } from 'uuid';
import { FC, memo, useMemo } from 'react';
import PuaseGreyIcon from '../../assets/img/pause-grey.svg';
import PlayGreyIcon from '../../assets/img/play-grey.svg';
import PlayIcon from '../../assets/img/play.png';
import PuaseIcon from '../../assets/img/puase.png';
import './index.less';

enum VoicePlayeThemeEnum {
  PRIMARY = 'primary',
  PLAIN = 'plain',
}
interface AudioPlayerProps {
  value?: string;
  showController?: boolean;
  theme?: VoicePlayeThemeEnum | `${VoicePlayeThemeEnum}`;
  onBeforePlay?: () => Promise<ArrayBuffer>;
  disabled?: boolean;
  isReplay?: boolean;
}
const AudioPlayer: FC<AudioPlayerProps> = memo((props) => {
  const {
    value,
    showController,
    disabled,
    theme = VoicePlayeThemeEnum.PRIMARY,
    onBeforePlay,
    isReplay,
  } = props;
  const { playing, play, pause, currentTime, audioTime, setCurrentTime, init, rePlay } = useAudio({
    value,
  });
  const [loading, loadingActions] = useBoolean();
  const _id = useMemo(() => {
    return v4();
  }, []);
  const playVoice = useMemoizedFn(async (e) => {
    e.stopPropagation();

    if (disabled) return;

    if (onBeforePlay) {
      loadingActions.setTrue();
      const res = await onBeforePlay();

      if (res) {
        init(convertBlob2AudioUrl(res));
      }

      loadingActions.setFalse();
    }

    isReplay ? rePlay() : play();
  });
  const pauseAudio = useMemoizedFn((e) => {
    e.stopPropagation();
    if (disabled) return;
    pause();
  });

  const contentJsx = useMemo(() => {
    if (loading) {
      return (
        <>
          {theme === VoicePlayeThemeEnum.PRIMARY && (
            <svg
              className="loading"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_865_14413)">
                <rect width="24" height="24" rx="12" fill="#39F881" />
                <rect x="2" y="2" width="20" height="20" fill="#D8D8D8" fillOpacity="0.01" />
                <path
                  opacity="0.15"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.875 12C18.875 12 18.875 13.3114 18.3923 14.5307C18.3923 14.5307 17.8682 15.8545 16.8614 16.8614C16.8614 16.8614 15.8545 17.8682 14.5307 18.3923C14.5307 18.3923 13.3114 18.875 12 18.875C12 18.875 10.6886 18.875 9.46935 18.3923C9.46935 18.3923 8.14546 17.8682 7.13864 16.8614C7.13864 16.8614 6.13182 15.8545 5.60771 14.5307C5.60771 14.5307 5.125 13.3114 5.125 12C5.125 12 5.125 10.6886 5.60771 9.46935C5.60771 9.46935 6.13182 8.14546 7.13864 7.13864C7.13864 7.13864 8.14546 6.13182 9.46935 5.60771C9.46935 5.60771 10.6886 5.125 12 5.125C12 5.125 13.3114 5.125 14.5307 5.60771C14.5307 5.60771 15.8545 6.13182 16.8614 7.13864C16.8614 7.13864 17.8682 8.14546 18.3923 9.46935C18.3923 9.46935 18.875 10.6886 18.875 12ZM17.0815 12C17.0815 12 17.0815 11.0307 16.7247 10.1295C16.7247 10.1295 16.3374 9.15099 15.5932 8.40682C15.5932 8.40682 14.849 7.66265 13.8705 7.27526C13.8705 7.27526 12.9693 6.91848 12 6.91848C12 6.91848 11.0307 6.91848 10.1295 7.27526C10.1295 7.27526 9.15099 7.66265 8.40682 8.40682C8.40682 8.40682 7.66265 9.15099 7.27526 10.1295C7.27526 10.1295 6.91848 11.0307 6.91848 12C6.91848 12 6.91848 12.9693 7.27526 13.8705C7.27526 13.8705 7.66265 14.849 8.40682 15.5932C8.40682 15.5932 9.15099 16.3373 10.1295 16.7247C10.1295 16.7247 11.0307 17.0815 12 17.0815C12 17.0815 12.9693 17.0815 13.8705 16.7247C13.8705 16.7247 14.849 16.3373 15.5932 15.5932C15.5932 15.5932 16.3374 14.849 16.7247 13.8705C16.7247 13.8705 17.0815 12.9693 17.0815 12Z"
                  fill="black"
                />
                <path
                  d="M18.1756 8.97532C17.5656 7.72871 16.5104 6.81146 16.5104 6.81146C16.1366 6.48654 15.5702 6.52615 15.2453 6.89992C14.9204 7.2737 14.96 7.8401 15.3338 8.16501C16.1145 8.84366 16.5646 9.7636 16.5646 9.7636C16.9997 10.6528 17.0691 11.6456 17.0691 11.6456C17.1386 12.6384 16.8314 13.5796 16.8314 13.5796C16.5137 14.5532 15.8351 15.3339 15.8351 15.3339C15.5101 15.7077 15.5498 16.2741 15.9235 16.599C16.2973 16.9239 16.8637 16.8843 17.1886 16.5105C18.1059 15.4553 18.5364 14.136 18.5364 14.136C18.9521 12.8623 18.8582 11.5205 18.8582 11.5205C18.7644 10.1787 18.1756 8.97532 18.1756 8.97532Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_865_14413">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
          {theme === VoicePlayeThemeEnum.PLAIN && (
            <img className="w-[20px] h-[20px]" src={PuaseGreyIcon} alt="" />
          )}
        </>
      );
    } else if (playing) {
      return (
        <>
          {theme === VoicePlayeThemeEnum.PRIMARY && (
            <img
              data-id={_id}
              onClick={pauseAudio}
              className="cursor-pointer w-[22px] h-[22px]"
              src={PuaseIcon}
              alt=""
            />
          )}
          {theme === VoicePlayeThemeEnum.PLAIN && (
            <img
              data-id={_id}
              onClick={pauseAudio}
              className="cursor-pointer w-[20px] h-[20px]"
              src={PuaseGreyIcon}
              alt=""
            />
          )}
        </>
      );
    } else {
      return (
        <>
          {theme === VoicePlayeThemeEnum.PRIMARY && (
            <img
              data-id={_id}
              onClick={playVoice}
              className="cursor-pointer w-[22px] h-[22px]"
              src={PlayIcon}
              alt=""
            />
          )}
          {theme === VoicePlayeThemeEnum.PLAIN && (
            <img
              data-id={_id}
              onClick={playVoice}
              className="cursor-pointer w-[20px] h-[20px]"
              src={PlayGreyIcon}
              alt=""
            />
          )}
        </>
      );
    }
  }, [loading, playing, theme, _id, pauseAudio, playVoice]);
  return (
    <div className="voice-player flex gap-2 items-center">
      {contentJsx}
      {showController && (
        <div className="flex-1 flex gap-1 items-center">
          <span className="text-[#343435] text-xs">{blockTimeFormat(currentTime)}</span>
          <div className="flex-1">
            <Slider
              value={currentTime}
              onChange={setCurrentTime}
              min={0}
              max={audioTime}
              step={0.01}
              tooltip={{ open: false }}
            />
          </div>
          <span className="text-[#343435] text-xs">{blockTimeFormat(audioTime)}</span>
        </div>
      )}
    </div>
  );
});
AudioPlayer.defaultProps = {};
export default AudioPlayer;
