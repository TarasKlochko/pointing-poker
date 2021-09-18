import { Socket } from 'socket.io-client';
import { Room } from '../model/Room';
import { User } from '../model/User';
import { UserRole } from '../model/UserRole';

export interface PopupData {
  name: string;
  lastName: string;
  jobPosition: string;
  avatar: string;
  observer: boolean;
}

export interface Response {
  roomObj?: Room;
  message?: string;
  user: User;
  users: User[];
  dealer: User;
  userID: string;
  status: number;
}

export class Controller {
  public static createRoom(socket: Socket, data: PopupData): Promise<Response> {
    const { name, lastName, jobPosition, avatar } = data;
    const role = UserRole.DEALER;
    return new Promise((resolve) => {
      socket.emit('createRoom', { name, lastName, jobPosition, avatar, role }, (response: string) => {
        const responseObject: Response = JSON.parse(response);
        resolve(responseObject);
      });
    });
  }

  /**
   * @param socket
   * @param data (name, lastName, jobPosition, avatar, role)
   * @returns {@link Response}
   */

  public static login(socket: Socket, data: PopupData, room: string): Promise<Response> {
    const { name, lastName, jobPosition, avatar, observer } = data;
    const role = observer ? UserRole.OBSERVER : UserRole.PLAYER;
    return new Promise((resolve) => {
      socket.emit('login', { name, lastName, jobPosition, avatar, role, room }, (response: string) => {
        const responseObject: Response = JSON.parse(response);
        resolve(responseObject);
      });
    });
  }

  /**
   * @param socket
   * @param data (name, lastName, jobPosition, avatar, role)
   * @param room
   * @returns {@link Response}
   */

  public static checkRoom(socket: Socket, roomID: string): Promise<Response> {
    return new Promise((resolve) => {
      socket.emit('checkRoom', { roomID }, (response: string) => {
        const responseObject: Response = JSON.parse(response);
        resolve(responseObject);
      });
    });
  }

  /**
   * @param socket
   * @param roomID
   * @returns {@link Response}
   */

  public static deleteUser(socket: Socket, userID: string): Promise<Response> {
    return new Promise((resolve) => {
      socket.emit('deleteUser', { userID }, (response: string) => {
        const responseObject: Response = JSON.parse(response);
        resolve(responseObject);
      });
    });
  }

  /**
   * @param socket
   * @param userID
   * @returns {@link Response}
   */

  public static deleteRoom(socket: Socket, roomID: string): Promise<Response> {
    return new Promise((resolve) => {
      socket.emit('deleteRoom', { roomID }, (response: string) => {
        const responseObject: Response = JSON.parse(response);
        resolve(responseObject);
      });
    });
  }

  /**
   * @param socket
   * @param roomID
   * @returns {@link Response}
   */

  public static updateRoom(socket: Socket, room: Room): Promise<Response> {
    return new Promise((resolve) => {
      socket.emit('updateRoom', { room }, (response: string) => {
        const responseObject: Response = JSON.parse(response);
        console.log('responce')
        console.log(responseObject);
        resolve(responseObject);
      });
    });
  }

  /**
   * @param socket
   * @param roomID
   * @returns {@link Response}
   */

  public static getUser(socket: Socket, userID: string ): Promise<Response> {
    return new Promise((resolve) => {
      socket.emit('getUser', { userID }, (response: string) => {
        const responseObject: Response = JSON.parse(response);
        resolve(responseObject);
      });
    });
  }

  public static getDataForReload(socket: Socket, roomID: string, userID: string ): Promise<Response> {
    return new Promise((resolve) => {
      socket.emit('getDataForReload', { roomID, userID }, (response: string) => {
        const responseObject: Response = JSON.parse(response);
        resolve(responseObject);
      });
    });
  }

  public static getUsers(socket: Socket, roomID: string ): Promise<Response> {
    return new Promise((resolve) => {
      socket.emit('getUsers', { roomID }, (response: string) => {
        const responseObject: Response = JSON.parse(response);
        resolve(responseObject);
      });
    });
  }
}
