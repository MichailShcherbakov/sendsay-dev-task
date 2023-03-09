import { Char, RawExpr } from "./type";

export const NULLABLE_CHAR: Char = "x00";

export const EMPTY_EXPRESSION: RawExpr = "";

export const OPERATORS = "+-*/()^%=;,";

export const CONSTANTS = {
  pi: Math.PI,
};

export const FUNCTIONS = {
  abs: Math.abs,
  acos: Math.acos,
  asin: Math.asin,
  atan: Math.atan,
  ceil: Math.ceil,
  cos: Math.cos,
  exp: Math.exp,
  floor: Math.floor,
  random: Math.random,
  sin: Math.sin,
  sqrt: Math.sqrt,
  tan: Math.tan,
};
