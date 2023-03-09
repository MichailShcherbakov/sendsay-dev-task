import { describe, expect } from "vitest";
import { Evaluator } from "./evaluator";

describe("evaluator", () => {
  describe.each([
    ["5 + 4", 9],
    ["5 + +4 - 10", -1],
    ["5 + 4 * 10", 45],
    ["5 + 5 * -10", -45],
    ["+5 + +5 * -10", -45],
    ["5*1/5+1", 2],
    ["5*1/5.0+1", 2],
    ["5.0*1/5.0+1.01", 2.01],
  ])("exec '%i' expr", (expr, result) => {
    const evaluator = Evaluator();

    expect(evaluator.evaluate(expr)).toEqual(result);
  });
});
