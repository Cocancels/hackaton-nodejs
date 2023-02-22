import { User } from "./User";
import { Room } from "./Room";

export interface Message {
  id: string;
  content: string;
  user: User;
  room: Room;
  createdAt: Date;
}
