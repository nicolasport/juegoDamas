import {
    SET_SELECTED_DISC,
    SET_AVAILABLE_PLACES,
    SET_PLAYER_TURN,
    SET_BOARD_MOV,
    SET_KEEP_MOV,
    SET_WHITE_POINTS,
    SET_BLACK_POINTS, SET_WIN_PLAYER,
} from 'src/context/actionsTypes';
import {IAction, IState} from "../ts/interfaces";


const reducer = (state:IState, action:IAction) => {
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
        playerTurn: payload,
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
    case SET_WHITE_POINTS:
      return {
        ...state,
        pointsWhitePlayer: state.pointsWhitePlayer + 1,
      };
    case SET_BLACK_POINTS:
      return {
        ...state,
        pointsBlackPlayer: state.pointsBlackPlayer + 1,
      };
    case SET_WIN_PLAYER:
      return {
        ...state,
        winPlayer: payload,
      };

    default:
      return state;
  }
};

export default reducer