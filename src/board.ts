import IMinesweeperBoard from "./models/board";
import { Tile } from "./tile";
import Utils from "./utils";

export class Board implements IMinesweeperBoard {
  tiles: Tile[][] = [];
  width: number;
  height: number

  constructor(width?: number, height?: number) {
    this.width = width || 0;
    this.height = height || 0;
  }

  makeBoard(bombs: number, width?: number, height?: number) {
    this.width = width || this.width;
    this.height = height || this.height;
    this.tiles = new Array<Tile[]>(this.height);
    for (let i = 0; i < this.height; i++) {
      this.tiles[i] = [];
    }
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        this.tiles[row][column] = new Tile();
      }
    }
    for (let i = 0; i < bombs; i++) {
      const bomb = [Utils.randomInt(0, this.width), Utils.randomInt(0, this.height)];
      this.tiles[bomb[1]][bomb[0]].makeBomb();
    }
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        this.tiles[row][column].surroundingBombs = 
          this.checkNumBombs(row - 1, column - 1) +
          this.checkNumBombs(row, column - 1)

      }
    }
  }

  checkNumBombs(x: number, y: number) {
    if (x < 0 || x >= this.width || y > 0 || y >= this.height) return 0;
    if (this.tiles[y][x].isBomb) return 1;
    else return 0;
  }

  toString(): string {
    const header = '';
    for (let i = 0; i < this.width; i++) {

    }
    // for ()
    return '';
  }
}
