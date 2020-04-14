/*
 * @Author: 小丑黑客
 * @Date: 2019-11-16 02:38:39
 * @Last Modified by: ClownHacker
 * @Last Modified time: 2019-11-16 03:04:20
 */

var currentOperand = ''; // 当前操作数, 默认空字符串
var previousOperand = ''; // 上一个操作数，默认空字符串
var operation; // 操作符号(+,-,x,÷)

/**
 * 清空重置
 */
function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = undefined;
}

/**
 * 删除数字
 */
function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

/**
 * 追加数字
 *
 * @param {int} number 操作数
 * @returns
 */
function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + number.toString();
}

/**
 * 选择操作符号
 *
 * @param {string} oper 操作符号
 * @returns
 */
function chooseOperation(oper) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = oper;
  previousOperand = currentOperand;
  currentOperand = '';
}

/**
 * 计算
 *
 * @returns
 */
function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
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
  currentOperand = computation;
  operation = undefined;
  previousOperand = '';
}

/**
 *  根据传入的数字在特定语言环境下的表示字符串，比如传入39999，然后39,999
 *
 * @param {int} number 数字
 * @returns 返回数字字符串
 */
function getDisplayNumber(number) {
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
function updateDisplay() {
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
  if (operation != null) {
    previousOperandTextElement.innerText = `${getDisplayNumber(
      previousOperand
    )} ${operation}`;
  } else {
    previousOperandTextElement.innerText = '';
  }
}

// 获取数字（0，1，2，3....9）元素
const numberButtons = document.querySelectorAll('[data-number]');
// 获取操作符（+,-,x,÷）元素
const operationButtons = document.querySelectorAll('.operator');
// 获取等号（=）元素
const equalsButton = document.querySelector('.equals');
// 获取删除操作符（DEL）元素
const deleteButton = document.querySelector('[data-delete]');
// 获取清除（AC）元素
const allClearButton = document.querySelector('[data-all-clear]');
// 获取上一个操作数元素
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
// 获取当前操作数元素
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

// 遍历所有数字按钮添加点击事件
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

// 遍历所有操作符按钮添加点击事件
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

// 等号按钮添加点击事件
equalsButton.addEventListener('click', button => {
  compute();
  updateDisplay();
});

// 清空按钮添加点击事件
allClearButton.addEventListener('click', button => {
  clear();
  updateDisplay();
});

// 删除按钮添加点击事件
deleteButton.addEventListener('click', button => {
  deleteNumber();
  updateDisplay();
});
