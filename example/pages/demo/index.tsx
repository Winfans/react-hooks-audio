import { AudioPlayer } from '../../components';
import { memo } from 'react';

const Chat = memo(() => {
  return (
    <div className="h-full flex justify-center items-center flex-col gap-2 p-2">
      <div className="w-[400px]">
        <div>demo1:</div>
        <AudioPlayer value="/audio/chat.wav" />
      </div>
      <div className="w-[400px] mt-4">
        <div>demo2:</div>
        <AudioPlayer value="/audio/chat.wav" showController />
      </div>
    </div>
  );
});
export default Chat;
