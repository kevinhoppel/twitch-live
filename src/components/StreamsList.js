import React, { useState, useEffect } from 'react';

import getLiveStreams from '../lib/getLiveStreams';

const StreamsList = () => {
  const [liveStreams, setLiveStreams] = useState([]);

  const fetchData = async () => {
    setLiveStreams(await getLiveStreams());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {liveStreams ? (
        <ul>
          {liveStreams.map((f, i) => (
            <li>
              {i + 1}: {f.user_name} - {f.title} - {f.viewer_count}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default StreamsList;
