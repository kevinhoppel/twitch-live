import React, { useContext } from 'react';

import twitchContext from '../context/twitchContext';

const Stream = ({ stream }) => {
  const { setChannel } = useContext(twitchContext);
  return (
    <li>
      <button onClick={() => setChannel(stream.user_name)}>
        {stream.user_name}
      </button>
      - {stream.viewer_count}
    </li>
  );
};

export default Stream;
