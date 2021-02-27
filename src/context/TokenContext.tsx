import React, { useContext } from 'react';
import { tokenReducer } from '../reducers/TokenReducer';

export interface IToken {
  id: number;
  name: string;
}

export interface ITokenState {
  token: IToken[];
}

export const initialTokenState: ITokenState = {
  token: [{ id: 0, name: '' }]
};

export interface ITokenStateContext {
  tokenState: ITokenState;
}
const initialStateContext: ITokenStateContext = {
  tokenState: initialTokenState
};
const initalDispatchContext = null;

export const TokenStateContext = React.createContext(initialStateContext);
export const TokenDispatchContext = React.createContext(initalDispatchContext);

export const useTokenStateContext = () => useContext(TokenStateContext);
export const useTokenDispatchContext = () => useContext(TokenDispatchContext);

export function TokenContextProvider({ children }) {
  const [tokenState, dispatch] = React.useReducer(tokenReducer, initialTokenState);
  return (
    <TokenStateContext.Provider value={{ tokenState }}>
      <TokenDispatchContext.Provider value={dispatch}>{children}</TokenDispatchContext.Provider>
    </TokenStateContext.Provider>
  );
}
