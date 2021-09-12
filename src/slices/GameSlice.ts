import {
  createSlice, PayloadAction, Reducer,
} from '@reduxjs/toolkit';
import { Game, GameStatus } from '../model/Game';
import { Issue, IssuePriority } from '../model/Issue';
import { User } from '../model/User';
import issuesJSON from '../properties/users.json';

const $issues: Issue[] = [{
  id: 1,
  name: 'issue1',
  link: 'link1',
  priority: IssuePriority.LOW
}, {
  id: 2,
  name: 'issue2',
  link: 'link2',
  priority: IssuePriority.MIDDLE
},
{
  id: 3,
  name: 'issue3',
  link: 'link3',
  priority: IssuePriority.HIGHT
}, {
  id: 4,
  name: 'issue4',
  link: 'link4',
  priority: IssuePriority.MIDDLE
}];

interface GameState {
  game: Game
}
const initialState: GameState = {
  game: {
    members: issuesJSON,
    gameStatus: GameStatus.WAITING,
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
  }

};

export const gameSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<User[]>): void => {
      state.game.members = action.payload;
    },
    addIssue: (state, action: PayloadAction<Issue>): void => {
      state.game.issues.push(action.payload);
    },
    removeIssue: (state, action: PayloadAction<Issue>): void => {
      state.game.issues.forEach((issue, index) => {
        if(action.payload.id === issue.id){
          state.game.issues.splice(index,1);
        }
      })
    },
    upDateIssue: (state, action: PayloadAction<Issue>): void => {
      state.game.issues.forEach((issue, index) => {
        if(action.payload.id === issue.id){
          state.game.issues[index].link = action.payload.link
          state.game.issues[index].name = action.payload.name
          state.game.issues[index].priority = action.payload.priority
        }
      })
    }
  },
});

const { actions, reducer } = gameSlice;

export const { setMembers, addIssue, removeIssue, upDateIssue } = actions;

export default reducer as Reducer<GameState>;