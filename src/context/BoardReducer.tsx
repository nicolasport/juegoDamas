import {
    SET_SELECTED_DISC,
    SET_AVAILABLE_PLACES,
    SET_PLAYER_TURN,
    SET_BOARD_MOV,
    SET_KEEP_MOV,
} from 'src/context/actionsTypes';

// ! TODO @param state and action are type any
const reducer = (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case SET_SELECTED_DISC:
        return {
        ...state,
        selectedDisc: payload,
      };
    case SET_AVAILABLE_PLACES:
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

export default reducer