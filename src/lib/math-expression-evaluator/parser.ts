import { Lexer } from "./lexer";
import { Optional } from "./tools";
import {
  FunctionCallNode,
  IdentifierNode,
  RawExpr,
  SyntaxTreeNode,
  SyntaxTreeNodeKindEnum,
  Token,
  TokenType,
} from "./type";

export function Parser() {
  const lexer = Lexer();

  function matchOp(token: Token, op: RawExpr): boolean {
    return token.type === TokenType.OPERATOR && token.value === op;
  }

  function parseArgumentList(): IdentifierNode[] {
    let token: Optional<Token>;
    let node: SyntaxTreeNode;

    const args: IdentifierNode[] = [];

    node = parseExpression();

    while (node) {
      if (node.kind !== SyntaxTreeNodeKindEnum.IDENTIFIER) {
        throw new SyntaxError(
          `The ident of the arg cannot be parsed: ${node.kind}`,
        );
      }

      args.push(node);

      token = lexer.peek();

      if (!token || !matchOp(token, ",")) break;

      lexer.next();

      node = parseExpression();
    }

    return args;
  }

  function parseFunctionCall(name: string): FunctionCallNode {
    let args: IdentifierNode[] = [];
    let token = lexer.next();

    if (!token || !matchOp(token, "(")) {
      throw new SyntaxError('Expecting ( in a function call "' + name + '"');
    }

    token = lexer.peek();
    if (!token || !matchOp(token, ")")) {
      args = parseArgumentList();
    }

    token = lexer.next();
    if (!token || !matchOp(token, ")")) {
      throw new SyntaxError('Expecting ) in a function call "' + name + '"');
    }

    return {
      kind: SyntaxTreeNodeKindEnum.FUNCTION_CALL,
      ident: {
        kind: SyntaxTreeNodeKindEnum.IDENTIFIER,
        name,
      },
      args,
    };
  }

  function parsePrimary(): SyntaxTreeNode {
    let token = lexer.peek();

    if (!token) {
      throw new SyntaxError("Unexpected termination of expression");
    }

    if (token.type === TokenType.IDENTIFIER) {
      token = lexer.next();

      if (!token) {
        throw new SyntaxError("Unexpected termination of expression");
      }

      if (lexer.peek() && matchOp(lexer.peek()!, "(")) {
        return parseFunctionCall(token.value);
      }

      return {
        kind: SyntaxTreeNodeKindEnum.IDENTIFIER,
        name: token.value,
      };
    }

    if (token.type === TokenType.NUMBER) {
      token = lexer.next();

      if (!token) {
        throw new SyntaxError("Unexpected termination of expression");
      }

      return {
        kind: SyntaxTreeNodeKindEnum.NUMBER,
        value: token.value,
      };
    }

    if (matchOp(token, "(")) {
      lexer.next();

      const node = parseAssignment();

      token = lexer.next();
      if (!token || !matchOp(token, ")")) {
        throw new SyntaxError("Expecting )");
      }

      return {
        kind: SyntaxTreeNodeKindEnum.EXPRESSION,
        node,
      };
    }

    throw new SyntaxError("Parse error, can not process token " + token.value);
  }

  function parseUnary(): SyntaxTreeNode {
    let token = lexer.peek();

    if (token && (matchOp(token, "-") || matchOp(token, "+"))) {
      token = lexer.next();

      const node = parseUnary();

      if (token) {
        return {
          kind: SyntaxTreeNodeKindEnum.UNARY,
          operator: token.value,
          node,
        };
      }
    }

    return parsePrimary();
  }

  function parseMultiplicative(): SyntaxTreeNode {
    let node = parseUnary();
    let token = lexer.peek();

    if (!token) return node;

    while (matchOp(token, "*") || matchOp(token, "/")) {
      token = lexer.next();

      if (!token) break;

      node = {
        kind: SyntaxTreeNodeKindEnum.BINARY,
        operator: token.value,
        left: node,
        right: parseUnary(),
      };

      token = lexer.peek();

      if (!token) break;
    }

    return node;
  }

  function parseAdditive(): SyntaxTreeNode {
    let node = parseMultiplicative();
    let token = lexer.peek();

    if (!token) return node;

    while (matchOp(token, "+") || matchOp(token, "-")) {
      token = lexer.next();

      if (!token) break;

      node = {
        kind: SyntaxTreeNodeKindEnum.BINARY,
        operator: token.value,
        left: node,
        right: parseMultiplicative(),
      };

      token = lexer.peek();

      if (!token) break;
    }

    return node;
  }

  function parseAssignment(): SyntaxTreeNode {
    const node = parseAdditive();

    if (!node || node.kind !== SyntaxTreeNodeKindEnum.IDENTIFIER) return node;

    const token = lexer.peek();

    if (token && matchOp(token, "=")) {
      lexer.next();

      return {
        kind: SyntaxTreeNodeKindEnum.ASSIGNMENT,
        ident: node,
        value: parseAssignment(),
      };
    }

    return {
      kind: SyntaxTreeNodeKindEnum.EXPRESSION,
      node,
    };
  }

  function parseExpression() {
    return parseAssignment();
  }

  function parse(expr: string): SyntaxTreeNode {
    lexer.reset({ expr });

    const parsedExpr = parseExpression();

    const token = lexer.next();

    // if the token exists, it means that some part of the expression has not been parsed
    if (token) throw new SyntaxError("Unexpected token " + token.value);

    return parsedExpr;
  }

  return {
    parse,
  };
}
