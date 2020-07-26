import React, { useReducer } from 'react';
import axios from 'axios';

import TwitchContext from './twitchContext';
import twitchReducer, { GET_LIVE_STREAMS, SET_CHANNEL } from './twitchReducer';

import { CLIENT_ID, LIMIT_AMOUNT } from '../lib/config';
import validateToken from '../lib/validateToken';
import getFollowedChannels from '../lib/getFollowedChannels';
import getGames from '../lib/getGames';

const TwitchState = (props) => {
  const initialState = {
    liveStreams: [],
    channel: null,
  };

  const getLiveStreams = async () => {
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

    const games = await getGames(liveStreams.map((ls) => ls.game_id));

    const sorted = [];
    games.forEach((g) => {
      const game = {
        gameId: g.id,
        gameTitle: g.name,
        boxArtUrl: g.box_art_url,
        streams: liveStreams.filter((s) => s.game_id === g.id),
      };
      sorted.push(game);
    });

    sorted.sort((_a, _b) => {
      var a = _a.gameTitle.toUpperCase();
      var b = _b.gameTitle.toUpperCase();

      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });

    sorted.forEach((s) => {
      s.streams.sort((_a, _b) => {
        var a = _a.user_name.toUpperCase();
        var b = _b.user_name.toUpperCase();

        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      });
    });

    dispatch({ type: GET_LIVE_STREAMS, payload: sorted });
  };

  const setChannel = (channel) => {
    dispatch({ type: SET_CHANNEL, payload: channel });
  };

  const [state, dispatch] = useReducer(twitchReducer, initialState);
  return (
    <TwitchContext.Provider
      value={{
        liveStreams: state.liveStreams,
        channel: state.channel,
        getLiveStreams,
        setChannel,
      }}
    >
      {props.children}
    </TwitchContext.Provider>
  );
};

export default TwitchState;
