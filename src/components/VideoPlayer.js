import React, { useContext } from 'react';

import twitchContext from '../context/twitchContext';

const VideoPlayer = () => {
  const { channel } = useContext(twitchContext);
  if (!channel) return <h3>Please select a live channel.</h3>;
  return (
    <div>
      <iframe
        title={`${channel} Live Stream`}
        src={`https://player.twitch.tv/?channel=${channel}&parent=localhost&autoplay=true`}
        height="480"
        width="854"
        frameBorder="0"
        scrolling="no"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
