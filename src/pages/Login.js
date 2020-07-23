import React from 'react';

import { CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SCOPE } from '../lib/config';

const Login = () => {
  const url = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  return (
    <div className="m-3">
      <a href={url} className="btn btn-block btn-dark all-center">
        Login
      </a>
    </div>
  );
};

export default Login;
