import ITile from "./models/tile";

export class Tile implements ITile {
  isBomb = false;
  surroundingBombs = 0;
  active = false;

  makeBomb() {
    this.isBomb = true;
  }
}
