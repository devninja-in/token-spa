import { ITokenState } from '../context/TokenContext';

export interface IAction<T> {
  type: T;
  payload?: any;
}

// Constants
export enum TokenReducerConstants {
  generateToken = 'generateToken',
  listTokens = 'listTokens'
}

type IActionType = IAction<TokenReducerConstants>;

export const tokenReducer = (state: ITokenState, action: IActionType) => {
  switch (action.type) {
    case TokenReducerConstants.generateToken:
      return { ...state };
    case TokenReducerConstants.listTokens:
      return { ...state };
    default:
      return state;
  }
};
