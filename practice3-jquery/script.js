/*
 * @Author: 小丑黑客
 * @Date: 2019-11-16 02:38:39
 * @Last Modified by: ClownHacker
 * @Last Modified time: 2019-11-16 03:04:20
 */

/**
 * 声明一个计算器类
 *
 * @class Calculator
 */
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  /**
   * 清空重置
   */
  clear() {
    this.currentOperand = ''; // 当前操作数, 默认空字符串
    this.previousOperand = ''; // 上一个操作数，默认空字符串
    this.operation = undefined; // 操作符号(+,-,x,÷)
  }

  /**
   * 删除数字
   */
  deleteNumber() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  /**
   * 追加数字
   *
   * @param {int} number 操作数
   * @returns
   */
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  /**
   * 选择操作符号
   *
   * @param {string} oper 操作符号
   * @returns
   */
  chooseOperation(oper) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = oper;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  /**
   * 计算
   *
   * @returns
   */
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '—':
        computation = prev - current;
        break;
      case 'x':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  /**
   *  根据传入的数字在特定语言环境下的表示字符串，比如传入39999，然后39,999
   *
   * @param {int} number 数字
   * @returns 返回数字字符串
   */
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      // 文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  /**
   * 更新计算器
   */
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

// 获取数字（0，1，2，3....9）元素
const numberButtons = $('[data-number]');
// 获取操作符（+,-,x,÷）元素
const operationButtons = $('.operator');
// 获取等号（=）元素
const equalsButton = $('.equals');
// 获取删除操作符（DEL）元素
const deleteButton = $('[data-delete]');
// 获取清除（AC）元素
const allClearButton = $('[data-all-clear]');
// 获取上一个操作数元素
const previousOperandTextElement = $('[data-previous-operand]')[0];
// 获取当前操作数元素
const currentOperandTextElement = $('[data-current-operand]')[0];

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// 遍历所有数字按钮添加点击事件
numberButtons.click(event => {
  var button = event.currentTarget;
  var text = button.innerText;
  calculator.appendNumber(text);
  calculator.updateDisplay();
});

// 遍历所有操作符按钮添加点击事件
operationButtons.click(event => {
  var button = event.currentTarget;
  var text = button.innerText;
  calculator.chooseOperation(text);
  calculator.updateDisplay();
});

// 等号按钮添加点击事件
equalsButton.click(event => {
  calculator.compute();
  calculator.updateDisplay();
});

// 清空按钮添加点击事件
allClearButton.click(event => {
  calculator.clear();
  calculator.updateDisplay();
});

// 删除按钮添加点击事件
deleteButton.click(event => {
  calculator.deleteNumber();
  calculator.updateDisplay();
});
