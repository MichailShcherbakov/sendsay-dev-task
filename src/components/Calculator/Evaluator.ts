export enum OperatorEnum {
  ADDITION = "+",
  SUBTRACTION = "-",
  MULTIPLICATION = "*",
  DIVISION = "/",
}

const OPERATIONS = {
  [OperatorEnum.ADDITION]: (left: number, right: number) => left + right,
  [OperatorEnum.SUBTRACTION]: (left: number, right: number) => left - right,
  [OperatorEnum.MULTIPLICATION]: (left: number, right: number) => left * right,
  [OperatorEnum.DIVISION]: (left: number, right: number) => left / right,
};

const OPERATORS: string[] = [
  OperatorEnum.ADDITION,
  OperatorEnum.SUBTRACTION,
  OperatorEnum.MULTIPLICATION,
  OperatorEnum.DIVISION,
];

export enum EvaluatorErrorEnum {
  INFINITE_VALUE = "INFINITE_VALUE",
  NOT_CORRECT_VALUE = "NOT_CORRECT_VALUE",
}

const EQUALS = "=";
const DOT = ".";

export type Char = string;

export type EvaluatorState = {
  left: string;
  right: string | null;
  op: OperatorEnum | null;
  total: string | null;
  error: EvaluatorErrorEnum | null;
};

export class Evaluator {
  private maxLength = 16;
  private precision = 16;
  private state: EvaluatorState = {
    left: "0",
    right: null,
    op: null,
    total: null,
    error: null,
  };

  public getState(): EvaluatorState {
    return this.state;
  }

  private replaceOrAdd(target: "left" | "right", ch: Char) {
    if (
      ch === "." &&
      !this.isEmpty(this.state[target]) &&
      this.state[target]!.indexOf(ch) !== -1
    ) {
      return;
    }

    if (this.state[target] && this.state[target]!.length >= this.maxLength) {
      return;
    }

    if (
      (this.state[target] === "0" || this.isEmpty(this.state[target])) &&
      ch !== "."
    ) {
      this.state[target] = ch;
    } else if (this.isEmpty(this.state[target]) && ch === ".") {
      this.state[target] = "0" + ch;
    } else {
      this.state[target] += ch;
    }
  }

  private hasExpr() {
    return (
      !this.isEmpty(this.state.left) &&
      this.state.op &&
      !this.isEmpty(this.state.right)
    );
  }

  private isEmpty(side: unknown): side is null {
    return side === null;
  }

  private isOp(ch: Char): ch is OperatorEnum {
    return OPERATORS.indexOf(ch) !== -1;
  }

  private computeTotal() {
    if (!this.hasExpr()) return;

    const left = Number(this.state.left);
    const right = Number(this.state.right);

    if (Number.isNaN(left) || Number.isNaN(right)) {
      this.state = this.createState({
        error: EvaluatorErrorEnum.NOT_CORRECT_VALUE,
      });

      return;
    }

    const total = OPERATIONS[this.state.op!](left, right);

    if (!Number.isFinite(total)) {
      this.state = this.createState({
        error: EvaluatorErrorEnum.INFINITE_VALUE,
      });

      return;
    }

    this.state = this.createState({
      left: total.toString(),
      total: total.toString(),
    });
  }

  private shouldClearState() {
    if (!this.isEmpty(this.state.error)) return true;

    return (
      !this.isEmpty(this.state.left) &&
      this.isEmpty(this.state.op) &&
      this.isEmpty(this.state.right) &&
      !this.isEmpty(this.state.total)
    );
  }

  private isEquals(ch: Char) {
    return ch === EQUALS;
  }

  private resetState() {
    this.state = this.createState();
  }

  public createState(state: Partial<EvaluatorState> = {}): EvaluatorState {
    return {
      left: "0",
      right: null,
      op: null,
      total: null,
      error: null,
      ...state,
    };
  }

  private validate(ch: Char) {
    return ch
      .toLowerCase()
      .replaceAll("x", OperatorEnum.MULTIPLICATION)
      .replaceAll(",", DOT);
  }

  public push(ch: Char): EvaluatorState {
    ch = this.validate(ch);

    if (this.isEquals(ch)) {
      this.computeTotal();
    } else if (this.isOp(ch)) {
      if (this.hasExpr()) {
        this.computeTotal();
      }

      this.state.op = ch;
    } else if (this.state.op) {
      this.replaceOrAdd("right", ch);
    } else {
      if (this.shouldClearState()) {
        this.resetState();
      }

      this.replaceOrAdd("left", ch);
    }

    return this.getState();
  }
}
