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
 * @typedef Child
 * @property {DungeonPosition} position
 */

/**
 * @param {Number[][]} dungeon
 * @return {Number}
 */
export default function maxCollectedFruits(dungeon) {
  const max_moves = dungeon.length;
  const dungeon_width = dungeon.length - 1;
  const dungeon_height = dungeon[0].length - 1;

  if (max_moves < 2 || max_moves > 1000) {
    throw new Error("Invalid dungeon size. Must be 2 <= x <= 1000");
  }

  /** @type {DungeonLocation[]} */
  const fruits_collected = [];

  const children = [
    {
      position: {
        x: 0,
        y: 0,
      },
      valid_directions: [
        { x: 1, y: 1 },
      ],
    },
    {
      position: {
        x: dungeon_width,
        y: 0,
      },
      valid_directions: [
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
    },
    {
      position: {
        x: 0,
        y: dungeon_height,
      },
      valid_directions: [
        { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ],
    },
  ];

  for (const child of children) {
    collectFruits({ dungeon, child, fruits_collected });
  }

  for (let i = 0; i < max_moves; i++) {
    for (const child of children) {
      moveChild({ dungeon, child });
      collectFruits({ dungeon, child, fruits_collected });
    }
  }

  let sum_fruits_collected = 0;
  for (const location of fruits_collected) {
    sum_fruits_collected += location.num_fruits;
  }

  return sum_fruits_collected;
}

/**
 * @param {object} param0
 * @param {number[][]} param0.dungeon
 * @param {Child} param0.child
 * @param {DungeonLocation[]} param0.fruits_collected
 */
function collectFruits({
  dungeon,
  child,
  fruits_collected,
}) {
  let was_collected = false;
  for (const location of fruits_collected) {
    const already_collected = (
      child.position.x === location.position.x &&
      child.position.y === location.position.y
    );
    if (already_collected) {
      was_collected = true;
    }
  }
  if (was_collected) {
    return;
  }

  fruits_collected.push({
    position: child.position,
    num_fruits: dungeon[child.position.y][child.position.x],
  });
}

/**
 *
 * @param {object} param0
 * @param {number[][]} param0.dungeon
 * @param {Child} param0.child
 */
function moveChild({
  dungeon,
  child,
}) {
  const dungeon_width = dungeon[0].length - 1;
  const dungeon_height = dungeon.length - 1;

  /**
   * @type {DungeonLocation}
   */
  const next_location = {
    position: { x: -1, y: -1 },
    num_fruits: -1,
  };

  for (const direction of child.valid_directions) {
    /**
     * @type {DungeonPosition}
     */
    const next_position = {
      x: child.position.x + direction.x,
      y: child.position.y + direction.y,
    };

    if (next_position.x > dungeon_width) {
      continue;
    }
    if (next_position.y > dungeon_height) {
      continue;
    }
    const is_center_child = child.position.x === child.position.y;
    if (is_center_child === false) {

      const will_hit_center_diagonal = next_position.x === next_position.y;
      if (will_hit_center_diagonal) {
        continue;
      }

      // TODO
      let will_cross_center_diagonal = false;
      for (let i = 0; i < dungeon_width; i++) {
        /**
         * @type {DungeonPosition}
         */
        const diagonal_point = {
          x: i,
          y: i,
        };

        const started_left = (
          child.position.x < diagonal_point.x ||
          child.position.y > diagonal_point.y
        );
        const will_cross_right = started_left && (
          next_position.x >= diagonal_point.x &&
          next_position.y <= diagonal_point.y
        );

        const started_right = (
          child.position.x > diagonal_point.x ||
          child.position.y < diagonal_point.y
        );
        const will_cross_left = started_right && (
          next_position.x <= diagonal_point.x &&
          next_position.y >= diagonal_point.y
        );

        if (will_cross_right || will_cross_left) {
          will_cross_center_diagonal = true;
          break;
        }
      }
      if (will_cross_center_diagonal) {
        continue;
      }
    }

    const next_position_num_fruits = dungeon[next_position.y][next_position.x];

    if (next_position_num_fruits <= next_location.num_fruits) {
      continue;
    }

    next_location.position = next_position;
    next_location.num_fruits = next_position_num_fruits;
  }

  if (next_location.position.x === -1) {
    return;
  }
  if (next_location.position.y === -1) {
    return;
  }

  child.position = next_location.position;
}
