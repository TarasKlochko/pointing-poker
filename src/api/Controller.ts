import { Socket } from "socket.io-client";
import { UserRole } from "../model/UserRole";

export interface PopupData {
  name: string,
  lastName: string,
  jobPosition: string,
  avatar: string,
  observer: boolean,
}

export interface Response {
  roomObj?: {
    id: string, 
    state: string 
  };
  typeError?: string;
  message?: string;
  status: number;
}

export class Controller {

  public static createRoom(socket: Socket, data: PopupData): Promise<Response>  {
    const {name, lastName, jobPosition, avatar} = data;
    const role = UserRole.DEALER;
    return new Promise(resolve => {
      socket.emit(
        'createRoom',
        {name, lastName, jobPosition, avatar, role },
        (response: string) => {
          const responseObject: Response = JSON.parse(response);
          resolve(responseObject);
        });
    })
  }

  public static login(socket: Socket, data: PopupData, room: string): Promise<Response>  {
    const {name, lastName, jobPosition, avatar, observer} = data;
    const role = observer ? UserRole.OBSERVER : UserRole.PLAYER;
    return new Promise(resolve => {
      socket.emit(
        'login',
        {name, lastName, jobPosition, avatar, role, room},
        (response: string) => {
          const responseObject: Response = JSON.parse(response);
          resolve(responseObject);
        });
    })
  }

  public static checkRoom(socket: Socket, roomID: string): Promise<Response>  {
    return new Promise(resolve => {
      socket.emit(
        'checkRoom',
        {roomID},
        (response: string) => {
          const responseObject: Response = JSON.parse(response);
          resolve(responseObject);
        });
    })
  }
}