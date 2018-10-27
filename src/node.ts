import { Board } from "./board";

export class NodeApp {
  board = new Board();

  main() {
    this.board.makeBoard(10, 10, 2);
  }
}
