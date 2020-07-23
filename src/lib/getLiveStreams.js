import axios from 'axios';

import { CLIENT_ID, LIMIT_AMOUNT } from '../lib/config';

import validateToken from '../lib/validateToken';

export default async () => {
  // Validate auth token - returns 401 if there is a problem
  const userId = await validateToken();

  // Get followed channels
  const followedChannels = await getFollowedChannels(userId);

  // Send channel IDs to the streams API to determine which streams are live
  const channelIds = followedChannels.map((c) => c.to_id);

  let liveStreams = [];
  let streamsUri = `https://api.twitch.tv/helix/streams?first=${LIMIT_AMOUNT}`;
  for (let i = 0; i < channelIds.length; i += LIMIT_AMOUNT) {
    let queryString =
      '&user_id=' + channelIds.slice(i, i + LIMIT_AMOUNT).join('&user_id=');

    try {
      const res = await axios.get(streamsUri + queryString, {
        headers: {
          'Client-ID': CLIENT_ID,
        },
      });
      liveStreams.push(...res.data.data);
    } catch {
      console.log('Error getting streams');
    }
  }

  return liveStreams;
};

const getFollowedChannels = async (id) => {
  let uri = `https://api.twitch.tv/helix/users/follows?from_id=${id}&first=${LIMIT_AMOUNT}`;
  let followedChannels = [];
  try {
    while (true) {
      const res = await axios.get(uri, {
        headers: {
          'Client-ID': CLIENT_ID,
        },
      });
      followedChannels = [...followedChannels, ...res.data.data];
      if (!res.data.pagination.cursor) {
        break;
      } else {
        uri = uri + '&after=' + res.data.pagination.cursor;
      }
    }
    return followedChannels;
  } catch {
    console.log('Error getting followed channels');
  }
};

const getGames = async (gameIds) => {
  let queryString = '?id=' + gameIds.join('&id=');
  try {
    const res = await axios.get(
      'https://api.twitch.tv/helix/games' + queryString,
      { headers: { 'Client-ID': CLIENT_ID } }
    );
    return res.data.data;
  } catch {
    console.log('Error getting games');
  }
};
