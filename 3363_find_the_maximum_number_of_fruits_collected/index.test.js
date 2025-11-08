import { test, describe } from "node:test";
import assert from "node:assert/strict";

import maxCollectedFruits from "./index.js";

describe(`3363 Find the maximum number of fruits collected`, () => {
  describe(`${maxCollectedFruits.name}`, () => {
    test(`outputs the correct sum`, async () => {
      const test_cases = [
        {
          input: [
            [1, 2, 3, 4],
            [5, 6, 8, 7],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
          ],
          expected: 100,
        },
        {
          input: [
            [1, 1],
            [1, 1],
          ],
          expected: 4,
        },
        {
          input: [
            [8, 5, 0, 17, 15],
            [6, 0, 15, 6, 0],
            [7, 19, 16, 8, 18],
            [11, 3, 2, 12, 13],
            [17, 15, 15, 4, 6]
          ],
          expected: 145,
        },
        {
          input: [
            [11, 17, 13, 0, 18],
            [13, 12, 10, 12, 19],
            [4, 8, 10, 14, 16],
            [2, 13, 12, 7, 16],
            [4, 9, 7, 4, 3]
          ],
          expected: 145,
        },
        {
          input: [
            [4, 18, 19, 9, 20, 14],
            [16, 4, 4, 16, 15, 16],
            [2, 11, 15, 6, 8, 9],
            [6, 7, 11, 17, 7, 6],
            [17, 17, 2, 13, 2, 14],
            [16, 9, 6, 14, 7, 16],
          ],
          expected: 182,
        },
      ];

      for (const test_case of test_cases) {
        let input_string = "\n";
        for (const row of test_case.input) {
          input_string += "[" + row.map((num) => num.toString().padStart(4, " ")) + "]\n";
        }
        assert.equal(
          maxCollectedFruits(test_case.input),
          test_case.expected,
          `input: ${input_string}\nexpected: ${test_case.expected}`,
        );
      }
    });
  });
});
