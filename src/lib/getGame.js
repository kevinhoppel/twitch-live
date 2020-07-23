import axios from 'axios';

export default async (id) => {
  try {
    const res = await axios.get(`https://api.twitch.tv/helix/games?id=${id}`, {
      headers: { 'Client-ID': CLIENT_ID },
    });
    return res.data.data[0];
  } catch {
    console.log('Error getting games');
  }
};
