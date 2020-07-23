import React from 'react';

import getParams from '../lib/getParams';
import setAuthHeader from '../lib/setAuthHeader';

const Callback = (props) => {
  const params = getParams(props.location.hash);
  localStorage.setItem('token', params.access_token);
  setAuthHeader(params.access_token);
  props.history.push('/');
  return <div>One moment...</div>;
};

export default Callback;
