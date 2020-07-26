import React from 'react';

import StreamsList from '../components/StreamsList';
import VideoPlayer from '../components/VideoPlayer';

const Home = () => {
  return (
    <div className="container">
      <StreamsList />
      <VideoPlayer />
    </div>
  );
};

export default Home;
