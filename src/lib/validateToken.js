import axios from 'axios';

export default async () => {
  try {
    const res = await axios.get('https://id.twitch.tv/oauth2/validate');
    return res.data.user_id;
  } catch {
    console.log('Error during validateToken');
  }
};
