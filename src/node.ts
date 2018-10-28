import { Board } from "./board";
import { createInterface } from 'readline';

export class NodeApp {
  board = new Board(10, 10);
  rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  getInput() {
    this.rl.question('\n> ', (ip) => {
      if (ip[0] === '.')
        this.dig(ip.substr(1));
      else if (ip[0] === ',')
        this.flag(ip.substr(1));
      else console.log('Invalid input');
    });
  }

  main() {
    this.board.makeBoard(10, 10, 10);
    console.log(this.board.toString());
    this.getInput();
  }

  dig(input: string) {
    const good = this.board.select(input);
    if (good) {
      this.getInput();
      console.log(this.board.toString());
    }
    else {
      this.board.activateAll();
      console.log(this.board.toString());
      console.log("\nYou lose!");
      process.exit(0);
    }
  }

  flag(input: string) {
    this.board.flagTile(input);
    console.log(this.board.toString());
    this.getInput();
  }
}
