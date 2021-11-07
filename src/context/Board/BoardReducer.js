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
        availablePlaces: payload,
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
    case 'SET_WHITE_POINTS':
      return {
        ...state,
        pointsWhitePlayer: state.pointsWhitePlayer + 1,
      };
    case 'SET_BLACK_POINTS':
      return {
        ...state,
        pointsBlackPlayer: state.pointsBlackPlayer + 1,
      };

    default:
      return state;
  }
};
