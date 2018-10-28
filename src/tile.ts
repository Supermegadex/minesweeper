import ITile from "./models/tile";
import chalk from 'chalk';

export class Tile implements ITile {
  isBomb = false;
  surroundingBombs = 0;
  active = false;
  flagged = false;

  makeBomb() {
    this.isBomb = true;
  }

  flag() {
    this.flagged = !this.flagged;
  }

  getChar() {
    if (this.active) {
      if (this.isBomb) return chalk.bgRedBright('b');
      if (this.surroundingBombs === 0) return ' ';
      else {
        const num = this.surroundingBombs.toString();
        switch (num) {
          case '1': return chalk.cyan('1');
          case '2': return chalk.green('2');
          case '3': return chalk.magenta('3');
          default: return chalk.yellow(num);
        }
      }
    }
    else {
      if (this.flagged) return chalk.red('F');
      return chalk.gray('x');
    }
  }
}
