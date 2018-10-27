export default class Utils {
  static randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}