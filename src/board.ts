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
      const tile = this.tiles[bomb[1]][bomb[0]];
      if (!tile.isBomb) tile.makeBomb();
      else bombs++;
    }
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        const surroundingBombs = 
          this.checkNumBombs(column - 1, row - 1) +
          this.checkNumBombs(column, row - 1) +
          this.checkNumBombs(column + 1, row - 1) +
          this.checkNumBombs(column - 1, row) +
          this.checkNumBombs(column + 1, row) +
          this.checkNumBombs(column - 1, row + 1) +
          this.checkNumBombs(column, row + 1) + 
          this.checkNumBombs(column + 1, row + 1);
        this.tiles[row][column].surroundingBombs = surroundingBombs;
      }
    }
  }

  checkNumBombs(x: number, y: number) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
    if (this.tiles[y][x].isBomb) return 1;
    else return 0;
  }

  toString(): string {
    let board = '\n    ';
    for (let i = 0; i < this.width; i++) {
      board += Utils.letters[i] + " ";
    }
    board += '\n  ┌'
    for (let i = 0; i < this.width; i++) {
      board += '──';
    } 
    
    for (let row = 0; row < this.height; row++) {
      board += `\n${row} │ `
      for (let column = 0; column < this.width; column++) {
        const tile = this.tiles[row][column];
        const char = tile.getChar();
        board += char + " ";
      }
    }
    return board;
  }

  getCoords(input: string) {
    const an = input.toLocaleLowerCase().split('');
    return [Utils.letters.indexOf(an[0]), parseInt(an[1])];
  }

  select(input: string) {
    const coords = this.getCoords(input);
    const tile = this.tiles[coords[1]][coords[0]];
    if (tile.isBomb) {
      return false;
    }
    if (tile.surroundingBombs === 0 && !tile.active) {
      tile.active = true;
      this.digZeros(coords);
      return true;
    }
    else if (tile.surroundingBombs > 0) {
      tile.active = true;
      return true;
    }
    return true;
  }

  activateAll() {
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        this.tiles[column][row].active = true;
      }
    }
  }

  digZeros([x, y]: number[]) {
    this.validateBeforeDig([x - 1, y - 1]);
    this.validateBeforeDig([x, y - 1]);
    this.validateBeforeDig([x + 1, y - 1]);
    this.validateBeforeDig([x - 1, y]);
    this.validateBeforeDig([x + 1, y]);
    this.validateBeforeDig([x - 1, y + 1]);
    this.validateBeforeDig([x, y + 1]);
    this.validateBeforeDig([x + 1, y + 1]);
  }

  validateBeforeDig([x, y]: number[]) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    this.select(Utils.letters[x] + y.toString());
  }

  flagTile(input: string) {
    const [x, y] = this.getCoords(input);
    this.tiles[y][x].flag();
  }
}
