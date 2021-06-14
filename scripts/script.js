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
  }

  clear() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  selectOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
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
      case "÷":
        result = previousNum / currentNum;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
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

buttonsNumbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});

buttonsOperators.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.selectOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

buttonEqual.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

buttonAllClear.addEventListener("click", () => {
  calculator.allClear();
  calculator.updateDisplay();
});

buttonClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
