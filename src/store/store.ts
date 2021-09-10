import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import popupReducer from '../components/mainPage/popup/popupSlice';
import createGameReducer from '../components/mainPage/createGame.slice';
import createSocketReducer from '../api/socket.slice'

export const store = configureStore({
  reducer: { popup: popupReducer, createGame: createGameReducer, socket: createSocketReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
