import {
  createSlice, PayloadAction, Reducer,
} from '@reduxjs/toolkit';
import { User } from "../model/User";

interface UserState {
  user: User
}

const initialState = {
  user: {
    id: '',
    image: '',
    name: '',
    surname: '',
    role: '',
    jobPosition: '',
    room: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>): void => {
      state.user.id = action.payload.id;
      if (action.payload.image) {
        state.user.image = action.payload.image;
      }
      state.user.name = action.payload.name;
      state.user.surname = action.payload.surname;
      state.user.role = action.payload.role;
      state.user.jobPosition = action.payload.jobPosition;
      state.user.room = action.payload.room;
    }
  }
});

const { actions, reducer } = userSlice;

export const { setUser } = actions;

export default reducer as Reducer<UserState>;
