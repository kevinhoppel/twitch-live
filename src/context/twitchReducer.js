export const GET_LIVE_STREAMS = 'get-live-streams';
export const SET_CHANNEL = 'set-channel';

export default (state, action) => {
  switch (action.type) {
    case GET_LIVE_STREAMS:
      return {
        ...state,
        liveStreams: action.payload,
      };
    case SET_CHANNEL:
      return {
        ...state,
        channel: action.payload,
      };
    default:
      return state;
  }
};
