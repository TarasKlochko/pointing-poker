import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import popupReducer from '../components/mainPage/popup/popupSlice';
import createGameReducer from '../components/mainPage/createGame.slice';
import createSocketReducer from '../api/socket.slice';
import gameSettingsReducer from '../components/wrapperPage/lobby/settingsBlock/settingBlog.slice';
import { gameSlice } from '../slices/GameSlice';
import { userSlice } from '../slices/UserSlice';

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    createGame: createGameReducer,
    socket: createSocketReducer,
    gameSettings: gameSettingsReducer,
    game: gameSlice.reducer,
    user: userSlice.reducer,
  },middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
