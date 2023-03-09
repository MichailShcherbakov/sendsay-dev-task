import { describe, expect } from "vitest";
import { OPERATORS } from "./constants";
import { Lexer } from "./lexer";

describe("lexer", () => {
  describe.each([
    "0",
    "545",
    "178914745645647",
    "1.4854",
    "154.4854",
    "0.127",
    "0.99454",
    "8875785.99454",
    "6.62606957e-34",
  ])("parsing '%i' number", expr => {
    const lexer = Lexer({
      expr,
    });

    const token = lexer.next();

    expect(token).toBeDefined();
    expect(token?.value).toEqual(expr);
  });

  describe.each([...OPERATORS])("parsing '%i' operator", expr => {
    const lexer = Lexer({
      expr,
    });

    const token = lexer.next();

    expect(token).toBeDefined();
    expect(token?.value).toEqual(expr);
  });
});
