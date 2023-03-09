import { CONSTANTS, FUNCTIONS } from "./constants";
import { Parser } from "./parser";
import { hasProp } from "./tools";
import { SyntaxTreeNode, SyntaxTreeNodeKindEnum } from "./type";

export function Evaluator() {
  const parser = Parser();
  const variables: Record<string, number> = {};

  function exec(node: SyntaxTreeNode): number {
    switch (node.kind) {
      case SyntaxTreeNodeKindEnum.EXPRESSION: {
        return exec(node);
      }
      case SyntaxTreeNodeKindEnum.NUMBER: {
        return parseFloat(node.value);
      }
      case SyntaxTreeNodeKindEnum.BINARY: {
        const left = exec(node.left);
        const right = exec(node.right);

        switch (node.operator) {
          case "+":
            return left + right;
          case "-":
            return left - right;
          case "*":
            return left * right;
          case "/":
            return left / right;
          default:
            throw new SyntaxError("Unknown operator " + node.operator);
        }
      }
      case SyntaxTreeNodeKindEnum.UNARY: {
        const expr = exec(node.node);
        switch (node.operator) {
          case "+":
            return expr;
          case "-":
            return -expr;
          default:
            throw new SyntaxError("Unknown operator " + node.operator);
        }
      }
      case SyntaxTreeNodeKindEnum.IDENTIFIER: {
        if (hasProp(CONSTANTS, node.name)) {
          return CONSTANTS[node.name];
        }

        if (hasProp(variables, node.name)) {
          return variables[node.name];
        }

        throw new SyntaxError("Unknown identifier");
      }
      case SyntaxTreeNodeKindEnum.ASSIGNMENT: {
        const right = exec(node.value);

        variables[node.ident.name] = right;

        return right;
      }
      case SyntaxTreeNodeKindEnum.FUNCTION_CALL: {
        if (hasProp(FUNCTIONS, node.ident.name)) {
          const args = [];

          for (let i = 0; i < node.args.length; ++i) {
            args.push(exec(node.args[i]));
          }

          return FUNCTIONS[node.ident.name].apply(null, args as any);
        }

        throw new SyntaxError("Unknown function " + node.ident.name);
      }
      default: {
        throw new SyntaxError("Unknown syntax node");
      }
    }
  }

  function evaluate(expr: string) {
    const tree = parser.parse(expr);
    return exec(tree);
  }

  return {
    evaluate: evaluate,
  };
}
