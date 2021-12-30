import {
    SET_SELECTED_DISC,
    SET_AVAILABLE_PLACES,
    SET_PLAYER_TURN,
    SET_BOARD_MOV,
    SET_KEEP_MOV,
    SET_WHITE_POINTS,
    SET_BLACK_POINTS, SET_WIN_PLAYER,
} from 'src/context/actionsTypes';
import {IState} from "src/ts/interfaces";
import {TAction} from "src/ts/types";


const reducer = (state:IState, action:TAction):IState => {
  switch (action.type) {
      case SET_SELECTED_DISC:
        return {
        ...state,
        selectedDisc: action.payload,
      };
    case SET_AVAILABLE_PLACES:
      return {
        ...state,
        availablePlaces: action.payload,
      };
    case SET_PLAYER_TURN:
      return {
        ...state,
        playerTurn: action.payload,
      };
    case SET_BOARD_MOV:
      return {
        ...state,
        memo: action.payload,
      };
    case SET_KEEP_MOV:
      return {
        ...state,
        keepMov: action.payload,
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
        winPlayer: action.payload,
      };

    default:
      return state;
  }
};

export default reducer