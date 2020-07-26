import axios from 'axios';

import { CLIENT_ID, LIMIT_AMOUNT } from './config';

export default async (id) => {
  let uri = `https://api.twitch.tv/helix/users/follows`;
  let followedChannels = [];
  const params = {
    from_id: id,
    first: LIMIT_AMOUNT,
  };
  try {
    while (true) {
      const res = await axios.get(uri, {
        params,
        headers: {
          'Client-ID': CLIENT_ID,
        },
      });
      followedChannels = [...followedChannels, ...res.data.data];
      if (!res.data.pagination.cursor) {
        break;
      } else {
        params['after'] = res.data.pagination.cursor;
      }
    }
    return followedChannels;
  } catch {
    console.log('Error getting followed channels');
  }
};
