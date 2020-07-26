import axios from 'axios';

import { CLIENT_ID } from './config';

export default async (gameIds) => {
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
