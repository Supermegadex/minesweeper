import ITile from "./tile";

export default interface IMinesweeperBoard {
  tiles: ITile[][];
  makeBoard(width: number, height: number, bombs: number): void;
}
