/**
 * @typedef Position
 * @property {Number} x
 * @property {Number} y
 */

/**
 * @param {Number[][]} fruits
 * @return {Number}
 */
function maxCollectedFruits(fruits) {
  const dungeon_width = fruits.length - 1;
  const dungeon_height = fruits[0].length - 1;
  const max_moves = dungeon_width;

  if (max_moves < 2 || max_moves > 1000) {
    throw new Error("Invalid dungeon size. Must be 2 <= x <= 1000");
  }

  /** @type {Position} */
  let child_1_pos = {
    x: 0,
    y: 0,
  };
  /** @type {Number[]} */
  let child_1_fruit_collected = [];

  /** @type {Position} */
  let child_2_pos = {
    x: dungeon_width,
    y: 0,
  };
  /** @type {Number[]} */
  let child_2_fruit_collected = [];

  /** @type {Position} */
  let child_3_pos = {
    x: 0,
    y: dungeon_height,
  };
  /** @type {Number[]} */
  let child_3_fruit_collected = [];

  let moves_remaining = max_moves.valueOf();
}

/**
 *
 * @param {Number[][]} fruits
 * @param {Number[]} child_1_pos
 * @param {Number[]} child_1_fruit_collected
 * @param {Number[]} child_2_pos
 * @param {Number[]} child_2_fruit_collected
 * @param {Number[]} child_3_pos
 * @param {Number[]} child_3_fruit_collected
 */
function moveChildren(
  fruits,
  child_1_pos,
  child_1_fruit_collected,
  child_2_pos,
  child_2_fruit_collected,
  child_3_pos,
  child_3_fruit_collected,
) {
  moveChild1(child_1_pos, child_1_fruit_collected, fruits);
  moveChild2(child_2_pos, child_2_fruit_collected, fruits);
  moveChild3(child_3_pos, child_3_fruit_collected, fruits);
}

/**
 *
 * @param {Position} child_1_pos
 * @param {Number[]} child_1_fruit_collected
 * @param {Number[][]} fruits
 */
function moveChild1(
  child_1_pos,
  child_1_fruit_collected,
  fruits,
) {

  // TODO: look ahead at possible paths
  // TODO: check largest value path
  // TODO: move to largest value path location
  // TODO: collect fruit at location
  // TODO: mark the fruit here as collected
}

/**
 * @param {Number[]} child_2_pos
 * @param {Number[]} child_2_fruit_collected
 * @param {Number[][]} fruits
 */
function moveChild2(
  child_2_pos,
  child_2_fruit_collected,
  fruits,
) {

}

/**
 * @param {Number[]} child_3_pos
 * @param {Number[]} child_3_fruit_collected
 * @param {Number[][]} fruits
 */
function moveChild3(
  child_3_pos,
  child_3_fruit_collected,
  fruits,
) {

}
