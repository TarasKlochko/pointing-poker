import { GameSettings } from "../components/wrapperPage/lobby/settingsBlock/settingBlog.slice";
import { Issue } from "./Issue";

export interface Room {
  roomID: string;
  name: string;
  state: GameState;
  issues: Issue[];
  gameSettings: GameSettings;
}

export enum GameState {
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT'
}