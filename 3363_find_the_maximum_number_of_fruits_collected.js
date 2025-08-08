/**
 * @typedef DungeonPosition
 * @property {Number} x
 * @property {Number} y
 */

/**
 * @typedef DungeonLocation
 * @property {DungeonPosition} position
 * @property {Number} num_fruits
 */

/**
 * @param {Number[][]} fruits
 * @return {Number}
 */
function maxCollectedFruits(fruits) {
  const dungeon_width = fruits.length - 1;
  const dungeon_height = fruits[0].length - 1;
  const max_moves = dungeon_width + 1;

  if (max_moves < 2 || max_moves > 1000) {
    throw new Error("Invalid dungeon size. Must be 2 <= x <= 1000");
  }

  /** @type {DungeonPosition} */
  let child_1_pos = {
    x: 0,
    y: 0,
  };
  /** @type {Number[]} */
  let child_1_fruit_collected = [];

  /** @type {DungeonPosition} */
  let child_2_pos = {
    x: dungeon_width,
    y: 0,
  };
  /** @type {Number[]} */
  let child_2_fruit_collected = [];

  /** @type {DungeonPosition} */
  let child_3_pos = {
    x: 0,
    y: dungeon_height,
  };
  /** @type {Number[]} */
  let child_3_fruit_collected = [];

  let collected_positions = [];
  collectStartingPositionFruits(
    fruits,
    collected_positions,
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
      collected_positions,
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
  console.log("child_2_fruit_collected:", child_2_fruit_collected);
  console.log("child_3_fruit_collected:", child_3_fruit_collected);

  let total_fruit_collected = []
  total_fruit_collected.push(child_1_fruit_collected, child_2_fruit_collected, child_3_fruit_collected);
  total_fruit_collected = total_fruit_collected.flat();
  let total_fruit_collected_sum = 0;
  for (const fruit_collected of total_fruit_collected) {
    total_fruit_collected_sum += fruit_collected;
  }
  console.log("Total fruit collected", total_fruit_collected, "=", total_fruit_collected_sum);
  return total_fruit_collected_sum;
}

/**
 *
 * @param {Number[][]} fruits
 * @param {DungeonPosition[]} collected_positions
 * @param {Number[]} child_1_pos
 * @param {Number[]} child_1_fruit_collected
 * @param {Number[]} child_2_pos
 * @param {Number[]} child_2_fruit_collected
 * @param {Number[]} child_3_pos
 * @param {Number[]} child_3_fruit_collected
 */
function collectStartingPositionFruits(
  fruits,
  collected_positions,
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

  collected_positions.push(
    structuredClone(child_1_pos),
    structuredClone(child_2_pos),
    structuredClone(child_3_pos),
  );
}

/**
 *
 * @param {Number[][]} fruits
 * @param {DungeonPosition[]} collected_positions
 * @param {Number[]} child_1_pos
 * @param {Number[]} child_1_fruit_collected
 * @param {Number[]} child_2_pos
 * @param {Number[]} child_2_fruit_collected
 * @param {Number[]} child_3_pos
 * @param {Number[]} child_3_fruit_collected
 */
function moveChildren(
  fruits,
  collected_positions,
  child_1_pos,
  child_1_fruit_collected,
  child_2_pos,
  child_2_fruit_collected,
  child_3_pos,
  child_3_fruit_collected,
) {
  const child_1_path_with_most_fruits = moveChild1(child_1_pos, fruits);
  const child_2_path_with_most_fruits = moveChild2(child_2_pos, fruits);
  const child_3_path_with_most_fruits = moveChild3(child_3_pos, fruits);

  let child_1_path_already_collected = false;
  let child_2_path_already_collected = false;
  let child_3_path_already_collected = false;
  for (const collected_position of structuredClone(collected_positions)) {
    const x = collected_position.x;
    const y = collected_position.y;

    if (
      child_1_path_with_most_fruits.position.x === x &&
      child_1_path_with_most_fruits.position.y === y
    ) {
      child_1_path_already_collected = true;
    }

    if (
      (
        child_2_path_with_most_fruits.position.x === x &&
        child_2_path_with_most_fruits.position.y === y
      ) ||
      (
        child_2_path_with_most_fruits.position.x === child_1_path_with_most_fruits.position.x &&
        child_2_path_with_most_fruits.position.y === child_1_path_with_most_fruits.position.y
      )
    ) {
      child_2_path_already_collected = true;
    }

    if (
      (
        child_3_path_with_most_fruits.position.x === x &&
        child_3_path_with_most_fruits.position.y === y
      ) ||
      (
        child_3_path_with_most_fruits.position.x === child_1_path_with_most_fruits.position.x &&
        child_3_path_with_most_fruits.position.y === child_1_path_with_most_fruits.position.y
      ) ||
      (
        child_3_path_with_most_fruits.position.x === child_2_path_with_most_fruits.position.x &&
        child_3_path_with_most_fruits.position.y === child_2_path_with_most_fruits.position.y
      )
    ) {
      child_3_path_already_collected = true;
    }
  }

  if (!child_1_path_already_collected) {
    child_1_fruit_collected.push(child_1_path_with_most_fruits.num_fruits);
    collected_positions.push(child_1_path_with_most_fruits.position);
  }

  if (!child_2_path_already_collected) {
    child_2_fruit_collected.push(child_2_path_with_most_fruits.num_fruits);
    collected_positions.push(child_2_path_with_most_fruits.position);
  }

  if (!child_3_path_already_collected) {
    child_3_fruit_collected.push(child_3_path_with_most_fruits.num_fruits);
    collected_positions.push(child_3_path_with_most_fruits.position);
  }
}

/**
 *
 * @param {DungeonPosition} current_position
 * @param {Number[][]} fruits
 */
function moveChild1(
  current_position,
  fruits,
) {
  const paths = [
    {
      x: current_position.x + 1,
      y: current_position.y,
    },
    {
      x: current_position.x + 1,
      y: current_position.y + 1,
    },
    {
      x: current_position.x,
      y: current_position.y + 1,
    },
  ];

  return moveChild(
    current_position,
    paths,
    fruits,
  );
}

/**
 * @param {Number[]} current_position
 * @param {Number[][]} fruits
 */
function moveChild2(
  current_position,
  fruits,
) {
  const paths = [
    {
      x: current_position.x - 1,
      y: current_position.y + 1,
    },
    {
      x: current_position.x,
      y: current_position.y + 1,
    },
    {
      x: current_position.x + 1,
      y: current_position.y + 1,
    },
  ];

  return moveChild(
    current_position,
    paths,
    fruits,
  );
}

/**
 * @param {Number[]} current_position
 * @param {Number[][]} fruits
 */
function moveChild3(
  current_position,
  fruits,
) {
  const paths = [
    {
      x: current_position.x + 1,
      y: current_position.y - 1,
    },
    {
      x: current_position.x + 1,
      y: current_position.y,
    },
    {
      x: current_position.x + 1,
      y: current_position.y + 1,
    },
  ];

  return moveChild(
    current_position,
    paths,
    fruits,
  );
}

/**
 *
 * @param {DungeonPosition} child_pos
 * @param {DungeonPosition[]} paths
 * @param {Number[][]} fruits
 */
function moveChild(
  child_pos,
  paths,
  fruits,
) {
  /** @type {DungeonLocation} */
  const path_with_most_fruits = {
    position: {
      x: 0,
      y: 0,
    },
    num_fruits: 0,
  };
  for (const path of paths) {
    if (path.y > fruits.length - 1) {
      continue;
    }

    if (path.x > fruits[0].length - 1) {
      continue;
    }

    const num_fruits_at_location = fruits[path.y][path.x];
    if (num_fruits_at_location > path_with_most_fruits.num_fruits) {
      path_with_most_fruits.position = path;
      path_with_most_fruits.num_fruits = num_fruits_at_location;
      child_pos.x = path.x;
      child_pos.y = path.y;
    };
  }

  return path_with_most_fruits;
}

// Should be 100
maxCollectedFruits([
  [1, 2, 3, 4],
  [5, 6, 8, 7],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
]);

maxCollectedFruits([
  [1, 1],
  [1, 1],
]);
