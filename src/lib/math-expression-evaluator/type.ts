export type Char = string;
export type RawExpr = string;

export enum TokenType {
  OPERATOR = "OPERATOR",
  IDENTIFIER = "IDENTIFIER",
  NUMBER = "NUMBER",
}

export type Token = {
  type: TokenType;
  value: string;
};

export enum SyntaxTreeNodeKindEnum {
  FUNCTION_CALL = "FUNCTION_CALL",
  ASSIGNMENT = "ASSIGNMENT",
  UNARY = "UNARY",
  EXPRESSION = "EXPRESSION",
  IDENTIFIER = "IDENTIFIER",
  NUMBER = "NUMBER",
  BINARY = "BINARY",
}

export interface AbstractSyntaxTreeNode {
  kind: SyntaxTreeNodeKindEnum;
}

export interface FunctionCallNode extends AbstractSyntaxTreeNode {
  kind: SyntaxTreeNodeKindEnum.FUNCTION_CALL;
  ident: IdentifierNode;
  args: IdentifierNode[];
}

export interface AssignmentNode extends AbstractSyntaxTreeNode {
  kind: SyntaxTreeNodeKindEnum.ASSIGNMENT;
  ident: IdentifierNode;
  value: SyntaxTreeNode;
}

export interface UnaryNode extends AbstractSyntaxTreeNode {
  kind: SyntaxTreeNodeKindEnum.UNARY;
  operator: string;
  node: SyntaxTreeNode;
}

export interface ExpressionNode extends AbstractSyntaxTreeNode {
  kind: SyntaxTreeNodeKindEnum.EXPRESSION;
  node: SyntaxTreeNode;
}

export interface IdentifierNode extends AbstractSyntaxTreeNode {
  kind: SyntaxTreeNodeKindEnum.IDENTIFIER;
  name: string;
}

export interface NumberNode extends AbstractSyntaxTreeNode {
  kind: SyntaxTreeNodeKindEnum.NUMBER;
  value: string;
}

export interface BinaryNode extends AbstractSyntaxTreeNode {
  kind: SyntaxTreeNodeKindEnum.BINARY;
  operator: string;
  left: SyntaxTreeNode;
  right: SyntaxTreeNode;
}

export type SyntaxTreeNode =
  | ExpressionNode
  | UnaryNode
  | AssignmentNode
  | FunctionCallNode
  | IdentifierNode
  | NumberNode
  | BinaryNode;
