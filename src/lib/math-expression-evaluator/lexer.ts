import { EMPTY_EXPRESSION, NULLABLE_CHAR, OPERATORS } from "./constants";
import { Optional } from "./tools";
import { Char, RawExpr, Token, TokenType } from "./type";

function isWhiteSpace(ch: Char) {
  return ch === "u0009" || ch === " " || ch === "u00A0";
}

function isLetter(ch: Char) {
  return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
}

function isDecimalDigit(ch: Char) {
  return ch >= "0" && ch <= "9";
}

function createToken(type: TokenType, value: RawExpr): Token {
  return {
    type,
    value,
  };
}

function isIdentifierStart(ch: Char): boolean {
  return ch === "_" || isLetter(ch);
}

function isIdentifierPart(ch: Char): boolean {
  return isIdentifierStart(ch) || isDecimalDigit(ch);
}

export type LexerOptions = {
  expr?: string;
};

export function Lexer(options: LexerOptions = {}) {
  /** Initial expression */
  let expr: RawExpr = options.expr ?? EMPTY_EXPRESSION;
  /** Index fof the iterator */
  let index = 0;

  function reset(options: LexerOptions = {}): void {
    expr = options.expr ?? EMPTY_EXPRESSION;
    index = 0;
  }

  function getNextChar(): Char {
    if (index >= expr.length) return NULLABLE_CHAR;

    const ch = expr.charAt(index);

    index += 1;

    return ch;
  }

  function peekNextChar(): Char {
    return index < expr.length ? expr.charAt(index) : NULLABLE_CHAR;
  }

  function skipSpaces(): void {
    let ch = NULLABLE_CHAR;

    while (index < expr.length) {
      ch = peekNextChar();

      if (!isWhiteSpace(ch)) break;

      getNextChar();
    }
  }

  function scanOperator(): Optional<Token> {
    const ch: Char = peekNextChar();

    if (OPERATORS.indexOf(ch) === -1) return;

    return createToken(TokenType.OPERATOR, getNextChar());
  }

  function scanIdentifier(): Optional<Token> {
    let ch: Char = peekNextChar();

    if (!isIdentifierStart(ch)) return;

    let identifier: RawExpr = getNextChar();

    ch = peekNextChar();

    while (isIdentifierPart(ch)) {
      identifier += getNextChar();

      ch = peekNextChar();
    }

    return createToken(TokenType.IDENTIFIER, identifier);
  }

  function scanNumber(): Optional<Token> {
    let ch: Char = peekNextChar();

    if (!isDecimalDigit(ch) && ch !== ".") return;

    let number: RawExpr = "";

    function scanDecimalDigits() {
      number += getNextChar();

      ch = peekNextChar();

      while (isDecimalDigit(ch)) {
        number += getNextChar();

        ch = peekNextChar();
      }
    }

    if (ch !== ".") {
      scanDecimalDigits();
    }

    if (ch === ".") {
      scanDecimalDigits();
    }

    if (ch === "e" || ch === "E") {
      number += getNextChar();

      ch = peekNextChar();

      if (ch !== "+" && ch !== "-" && isDecimalDigit(ch)) {
        throw new SyntaxError("Unexpected character after the exponent sign");
      }

      scanDecimalDigits();
    }

    return createToken(TokenType.NUMBER, number);
  }

  function next(): Optional<Token> {
    let token: Optional<Token>;

    skipSpaces();

    if (index >= expr.length) return;

    token = scanNumber();
    if (token) return token;

    token = scanOperator();
    if (token) return token;

    token = scanIdentifier();
    if (token) return token;

    throw new SyntaxError("Unknown token from character " + peekNextChar());
  }

  function peek(): Optional<Token> {
    let token: Optional<Token>;

    const prevIndex = index;

    try {
      token = next();
    } catch (e) {
      // ignore
    }

    index = prevIndex;

    return token;
  }

  return {
    next,
    reset,
    peek,
  };
}
