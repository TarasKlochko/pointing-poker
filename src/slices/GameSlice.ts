import {
  createSlice, PayloadAction, Reducer,
} from '@reduxjs/toolkit';
import { Issue, IssuePriority } from '../model/Issue';
import { GameState, Room } from '../model/Room';
import { User } from '../model/User';
import { UserRole } from '../model/UserRole';
import issuesJSON from '../properties/users.json';

const $issues: Issue[] = [{
  id: '1',
  name: 'issue1',
  link: 'link1',
  priority: IssuePriority.LOW
}, {
  id: '2',
  name: 'issue2',
  link: 'link2',
  priority: IssuePriority.MIDDLE
},
{
  id: '3',
  name: 'issue3',
  link: 'link3',
  priority: IssuePriority.HIGHT
}, {
  id: '4',
  name: 'issue4',
  link: 'link4',
  priority: IssuePriority.MIDDLE
}];

interface RoomState {
  room: Room
  dealer: User
}
const initialState: RoomState = {
  room: {
    roomID: '',
    name: '',
    members: [],
    state: GameState.WAITING,
    gameSettings: {
      isMasterAsPlayer: true,
      cardValues: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'],
      scopeTipeShort: '',
      cardCover: '5',
      isAutoNewPlayer: true,
      isAutoCardFlipping: true,
      isChangingCard: false,
      isTimer: false,
      timeMin: '2',
      timeSec: '00',
    },
    issues: $issues,
  },
  dealer: {
    id: '',
    image: '',
    name: '',
    surname: '',
    role: '',
    jobPosition: '',
    room: ''
  }

};

export const gameSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<User[]>): void => {
      state.room.members = action.payload;
      action.payload.forEach((user) => {
        if(user.role === UserRole.DEALER) state.dealer = user;
      })
    },
    addIssue: (state, action: PayloadAction<Issue>): void => {
      state.room.issues.push(action.payload);
    },
    removeIssue: (state, action: PayloadAction<Issue>): void => {
      state.room.issues.forEach((issue, index) => {
        if(action.payload.id === issue.id){
          state.room.issues.splice(index,1);
        }
      })
    },
    upDateIssue: (state, action: PayloadAction<Issue>): void => {
      state.room.issues.forEach((issue, index) => {
        if(action.payload.id === issue.id){
          state.room.issues[index].link = action.payload.link
          state.room.issues[index].name = action.payload.name
          state.room.issues[index].priority = action.payload.priority
        }
      })
    },
    changeGameState: (state, action: PayloadAction<GameState>): void => {
      state.room.state = action.payload;
    },
    setRoomID: (state, action: PayloadAction<string>): void => {
      state.room.roomID = action.payload;
    },
    setRoomName: (state, action: PayloadAction<string>): void => {
      state.room.name = action.payload;
    },
  },
});

const { actions, reducer } = gameSlice;

export const {
  setMembers,
  addIssue,
  removeIssue,
  upDateIssue,
  changeGameState,
  setRoomName,
  setRoomID,
} = actions;

export default reducer as Reducer<RoomState>;
