import Game from "../classes/game";
import { Message } from "./Message";
import { User } from "./User";

export interface Room {
  id: number;
  name: string;
  users: User[];
  messages: Message[];
  game: Game;
}
