export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'SET_SELECTED_DISC':
      console.log('payload:', payload);
      return {
        ...state,
        selectedDisc: payload,
      };
    case 'SET_AVALIABLE_PLACES':
      return {
        ...state,
        avaliablePlaces: payload,
      };
    case 'SET_PLAYER_TURN':
      return {
        ...state,
        timePlayer: payload,
      };
    case 'SET_NEW_MOV':
      return {
        ...state,
        placeToMov: payload,
      };
    case 'SET_BOARD_MOV':
      return {
        ...state,
        memo: payload,
      };

    default:
      return state;
  }
};
