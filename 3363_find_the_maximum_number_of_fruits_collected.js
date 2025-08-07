/**
 * @typedef Position
 * @property {Number} x
 * @property {Number} y
 */

/**
 * @typedef DungeonLocation
 * @property {Position} position
 * @property {Number} num_fruits
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

  collectStartingPositionFruits(
    fruits,
    child_1_pos,
    child_1_fruit_collected,
    child_2_pos,
    child_2_fruit_collected,
    child_3_pos,
    child_3_fruit_collected,
  );

  let moves_remaining = max_moves.valueOf();
  do {
    moveChildren(
      fruits,
      child_1_pos,
      child_1_fruit_collected,
      child_2_pos,
      child_2_fruit_collected,
      child_3_pos,
      child_3_fruit_collected,
    );

    moves_remaining--;

  } while (moves_remaining > 0);

  console.log("child_1_fruit_collected:", child_1_fruit_collected);
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
function collectStartingPositionFruits(
  fruits,
  child_1_pos,
  child_1_fruit_collected,
  child_2_pos,
  child_2_fruit_collected,
  child_3_pos,
  child_3_fruit_collected,
) {
  const child_1_position_fruits = fruits[child_1_pos.y][child_1_pos.x];
  child_1_fruit_collected.push(child_1_position_fruits);
  const child_2_position_fruits = fruits[child_2_pos.y][child_2_pos.x];
  child_2_fruit_collected.push(child_2_position_fruits);
  const child_3_position_fruits = fruits[child_3_pos.y][child_3_pos.x];
  child_3_fruit_collected.push(child_3_position_fruits);
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
  const child_1_path_with_most_fruits = moveChild1(child_1_pos, fruits);
  child_1_fruit_collected.push(child_1_path_with_most_fruits.num_fruits);

  moveChild2(child_2_pos, child_2_fruit_collected, fruits);
  moveChild3(child_3_pos, child_3_fruit_collected, fruits);

  console.log("child_1_path_with_most_fruits:", child_1_path_with_most_fruits);
}

/**
 *
 * @param {Position} child_1_pos
 * @param {Number[][]} fruits
 */
function moveChild1(
  child_1_pos,
  fruits,
) {
  /** @type {Position[]} */
  const paths = [
    {
      x: child_1_pos.x + 1,
      y: child_1_pos.y,
    },
    {
      x: child_1_pos.x + 1,
      y: child_1_pos.y + 1,
    },
    {
      x: child_1_pos.x,
      y: child_1_pos.y + 1,
    },
  ];

  /** @type {DungeonLocation} */
  const path_with_most_fruits = {
    position: {
      x: 0,
      y: 0,
    },
    num_fruits: 0,
  };
  for (const path of paths) {
    if (path.x > fruits.length - 1) {
      continue;
    }

    if (path.y > fruits[path.x].length - 1) {
      continue;
    }

    const num_fruits_at_location = fruits[path.y][path.x];
    if (num_fruits_at_location > path_with_most_fruits.num_fruits) {
      path_with_most_fruits.position = path;
      path_with_most_fruits.num_fruits = num_fruits_at_location;
      child_1_pos.x = path.x;
      child_1_pos.y = path.y;
    };
  }

  return path_with_most_fruits;

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
  console.log("Child 2 not implemented");
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
  console.log("Child 3 not implemented");
}

// Should be 100
maxCollectedFruits([
  [1 , 2 , 3 , 4 ],
  [5 , 6 , 8 , 7 ],
  [9 , 10, 11, 12],
  [13, 14, 15, 16],
]);
