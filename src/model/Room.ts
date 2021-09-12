import { GameSettings } from "../components/wrapperPage/lobby/settingsBlock/settingBlog.slice";
import { Issue } from "./Issue";

export interface Room {
  roomID: string;
  name: string;
  issues: Issue[];
  gameSettings: GameSettings;
}