import { describe, expect, it } from "vitest";
import { Evaluator, EvaluatorErrorEnum, OperatorEnum } from "./Evaluator";

describe("Evaluator", () => {
  it("initial state", () => {
    const evaluator = new Evaluator();

    expect(evaluator.getState()).toEqual({
      left: "0",
      right: null,
      op: null,
      total: null,
      error: null,
    });
  });

  it("should replace '0' within first pushed symbol", () => {
    const evaluator = new Evaluator();

    evaluator.push("5");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "5",
      }),
    );
  });

  it("should save several symbols", () => {
    const evaluator = new Evaluator();

    evaluator.push("5");
    evaluator.push("6");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "56",
      }),
    );
  });

  it("should save op symbol", () => {
    const evaluator = new Evaluator();

    evaluator.push("55.5468");
    evaluator.push("+");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "55.5468",
        op: OperatorEnum.ADDITION,
      }),
    );
  });

  it("should save only the last pushed op", () => {
    const evaluator = new Evaluator();

    evaluator.push("55.5468");
    evaluator.push("+");
    evaluator.push("-");
    evaluator.push("/");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "55.5468",
        op: OperatorEnum.DIVISION,
      }),
    );
  });

  it("should save to the right side symbols after pushing op symbol", () => {
    const evaluator = new Evaluator();

    evaluator.push("55.5468");
    evaluator.push("+");
    evaluator.push("10.68");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "55.5468",
        right: "10.68",
        op: OperatorEnum.ADDITION,
      }),
    );
  });

  it("should save the total to the left side after pushing op symbol", () => {
    const evaluator = new Evaluator();

    evaluator.push("55");
    evaluator.push("+");
    evaluator.push("-10");
    evaluator.push("*");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: (Number("55") - Number("10")).toString(),
        op: OperatorEnum.MULTIPLICATION,
        total: (Number("55") - Number("10")).toString(),
      }),
    );
  });

  it("should save the total to the left side after pushing op symbol when the right side is empty", () => {
    const evaluator = new Evaluator();

    evaluator.push("55.5468");
    evaluator.push("+");
    evaluator.push("0");
    evaluator.push("*");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: (Number("55.5468") + Number("0")).toString(),
        op: OperatorEnum.MULTIPLICATION,
        total: (Number("55.5468") + Number("0")).toString(),
      }),
    );
  });

  it("should save the total to the left side after pushing op symbol and number", () => {
    const evaluator = new Evaluator();

    evaluator.push("55.5468");
    evaluator.push("+");
    evaluator.push("10.68");
    evaluator.push("*");
    evaluator.push("2");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: (Number("55.5468") + Number("10.68")).toString(),
        right: "2",
        op: OperatorEnum.MULTIPLICATION,
        total: (Number("55.5468") + Number("10.68")).toString(),
      }),
    );
  });

  it("should save the total to the left side after pushing '=' symbol", () => {
    const evaluator = new Evaluator();

    evaluator.push("55.5468");
    evaluator.push("+");
    evaluator.push("10.68");
    evaluator.push("=");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: (Number("55.5468") + Number("10.68")).toString(),
        total: (Number("55.5468") + Number("10.68")).toString(),
      }),
    );
  });

  it("should save the current float value less 1", () => {
    const evaluator = new Evaluator();

    evaluator.push("0");
    evaluator.push(".");
    evaluator.push("2");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "0.2",
      }),
    );
  });

  it("should save the current float value great then 1", () => {
    const evaluator = new Evaluator();

    evaluator.push("5");
    evaluator.push(".");
    evaluator.push("232");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "5.232",
      }),
    );
  });

  it("should prevent saving several '.' symbols on each sides", () => {
    const evaluator = new Evaluator();

    evaluator.push("5");
    evaluator.push(".");
    evaluator.push("2");
    evaluator.push(".");
    evaluator.push("3");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "5.23",
      }),
    );
  });

  it("should reset the left side after pushing '=' symbol and number", () => {
    const evaluator = new Evaluator();

    evaluator.push("55.5468");
    evaluator.push("+");
    evaluator.push("10.68");
    evaluator.push("=");
    evaluator.push("6");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "6",
      }),
    );
  });

  it("should save the total to the left side after pushing '=' symbol and op symbol", () => {
    const evaluator = new Evaluator();

    evaluator.push("55.5468");
    evaluator.push("+");
    evaluator.push("10.68");
    evaluator.push("=");
    evaluator.push("+");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: (Number("55.5468") + Number("10.68")).toString(),
        op: OperatorEnum.ADDITION,
        total: (Number("55.5468") + Number("10.68")).toString(),
      }),
    );
  });

  it("should return error when dividing by 0", () => {
    const evaluator = new Evaluator();

    evaluator.push("2");
    evaluator.push("/");
    evaluator.push("0");
    evaluator.push("=");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        error: EvaluatorErrorEnum.INFINITE_VALUE,
      }),
    );
  });

  it("should return error when dividing by 0", () => {
    const evaluator = new Evaluator();

    evaluator.push("2dsa");
    evaluator.push("+");
    evaluator.push("2");
    evaluator.push("=");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        error: EvaluatorErrorEnum.NOT_CORRECT_VALUE,
      }),
    );
  });

  it("should reset state after correct pushing symbol after error", () => {
    const evaluator = new Evaluator();

    evaluator.push("2");
    evaluator.push("/");
    evaluator.push("0");
    evaluator.push("=");
    evaluator.push("5");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "5",
      }),
    );
  });

  it("should not pass pushing more 16 symbols", () => {
    const evaluator = new Evaluator();

    evaluator.push("1234567891234567");
    evaluator.push("1");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "1234567891234567",
      }),
    );
  });

  it("should correct perform float number parsing", () => {
    const evaluator = new Evaluator();

    evaluator.push(".");
    evaluator.push("*");
    evaluator.push(".");
    evaluator.push("=");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "0",
        total: "0",
      }),
    );
  });

  it("should correct validate symbols before pushing: ',' => '.'", () => {
    const evaluator = new Evaluator();

    evaluator.push("0,58");
    evaluator.push("+");
    evaluator.push("1");
    evaluator.push("=");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "1.58",
        total: "1.58",
      }),
    );
  });

  it("should correct validate symbols before pushing: 'x' => '*'", () => {
    const evaluator = new Evaluator();

    evaluator.push("0,58");
    evaluator.push("x");
    evaluator.push("1");
    evaluator.push("=");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "0.58",
        total: "0.58",
      }),
    );
  });

  it("should correct validate symbols before pushing: 'x' => '*'", () => {
    const evaluator = new Evaluator();

    evaluator.push("0,58");
    evaluator.push("x");
    evaluator.push("1");
    evaluator.push("=");

    expect(evaluator.getState()).toEqual(
      evaluator.createState({
        left: "0.58",
        total: "0.58",
      }),
    );
  });
});
