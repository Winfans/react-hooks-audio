import { AudioPlayer } from '../../components';
import { memo } from 'react';

const Chat = memo(() => {
  return (
    <div className="h-full flex justify-center items-center flex-col gap-2 p-2">
      <AudioPlayer />
      <div className="w-[400px]">
        <AudioPlayer showController />
      </div>
    </div>
  );
});
export default Chat;
