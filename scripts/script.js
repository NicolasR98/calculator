class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.allClear();
  }

  allClear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  clear() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  selectOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  compute() {
    let result;
    const previousNum = parseFloat(this.previousOperand);
    const currentNum = parseFloat(this.currentOperand);

    if (isNaN(previousNum) || isNaN(currentNum)) return;

    switch (this.operation) {
      case "+":
        result = previousNum + currentNum;
        break;
      case "-":
        result = previousNum - currentNum;
        break;
      case "x":
        result = previousNum * currentNum;
        break;
      case "/":
      case "÷":
        result = previousNum / currentNum;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
    this.updateDisplay();
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandText.innerText = "";
    }
  }
}

const buttonsNumbers = document.querySelectorAll("[data-number]");
const buttonsOperators = document.querySelectorAll("[data-operator]");
const buttonClear = document.querySelector("[data-clear]");
const buttonAllClear = document.querySelector("[data-all-clear]");
const buttonEqual = document.querySelector("[data-equals]");
const previousOperandText = document.querySelector("[data-operand-previous]");
const currentOperandText = document.querySelector("[data-operand-current]");

const calculator = new Calculator(previousOperandText, currentOperandText);

const setKeyboard = (e) => {
  if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
    calculator.appendNumber(e.key);
  }
  if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
    calculator.selectOperation(e.key);
  }
  if (e.key === "Enter") calculator.compute();
  if (e.key === "Backspace") calculator.clear();
  if (e.key === "Delete") calculator.allClear();
};

window.addEventListener("keydown", setKeyboard);

buttonsNumbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
  });
});

buttonsOperators.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.selectOperation(btn.innerText);
  });
});

buttonEqual.addEventListener("click", () => {
  calculator.compute();
});

buttonAllClear.addEventListener("click", () => {
  calculator.allClear();
});

buttonClear.addEventListener("click", () => {
  calculator.clear();
});
