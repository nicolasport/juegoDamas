import { SET_SELECTED_DISC, SET_AVALIABLE_PLACES, SET_PLAYER_TURN, SET_BOARD_MOV, SET_KEEP_MOV } from '~/context/Board/actionsTypes';

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_SELECTED_DISC:
      return {
        ...state,
        selectedDisc: payload,
      };
    case SET_AVALIABLE_PLACES:
      return {
        ...state,
        avaliablePlaces: payload,
      };
    case SET_PLAYER_TURN:
      return {
        ...state,
        timePlayer: payload,
      };

    case SET_BOARD_MOV:
      return {
        ...state,
        memo: payload,
      };
    case SET_KEEP_MOV:
      return {
        ...state,
        keepMov: payload,
      };

    default:
      return state;
  }
};
