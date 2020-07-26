import React, { useContext, useEffect } from 'react';

import twitchContext from '../context/twitchContext';
import Stream from './Stream';

const StreamsList = () => {
  const { liveStreams, getLiveStreams } = useContext(twitchContext);

  useEffect(() => {
    getLiveStreams();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="streams-list">
      {liveStreams &&
        liveStreams.map((ls) => (
          <div key={ls.gameId}>
            <h3>{ls.gameTitle}</h3>
            <ul>
              {ls.streams.map((stream) => (
                <Stream key={stream.id} stream={stream} />
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default StreamsList;
