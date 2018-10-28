export default class Utils {
  static letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  static randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}