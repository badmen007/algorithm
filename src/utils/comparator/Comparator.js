export default class Comparator {
  constructor(compareFunction) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  static defaultCompareFunction(a, b) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }
  /**
   * 等于
   * @param {*} a
   * @param {*} b
   * @returns
   */
  equal(a, b) {
    return this.compare(a, b) === 0;
  }
  /**
   * 小于
   * @param {*} a
   * @param {*} b
   * @returns
   */
  lessThan(a, b) {
    return this.compare(a, b) < 0;
  }
  /**
   * 大于
   * @param {*} a
   * @param {*} b
   * @returns
   */
  greaterThan(a, b) {
    return this.compare(a, b) > 0;
  }
  /**
   * 小于等于
   * @param {*} a
   * @param {*} b
   * @returns
   */
  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }
  /**
   * 大于等于
   * @param {*} a
   * @param {*} b
   * @returns
   */
  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }
  /**
   * 倒序排序
   */
  reverse() {
    const compareOrigin = this.compare;
    this.compare = (a, b) => compareOrigin(b, a);
  }
}
