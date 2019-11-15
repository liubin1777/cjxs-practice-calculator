/*
 * @Author: 超级学生
 * @Date: 2019-11-15 23:19:32
 * @Last Modified time: 2019-11-15 23:19:32
 */

var currentOperand = 0; // 当前操作数, 默认0
var previousOperand = 0; // 上一个操作数，默认0
var operation; // 操作符号(+,-,x,÷)

// 重置
function clear() {
  currentOperand = 0;
  previousOperand = 0;
  operation = undefined;
}

// 删除数字
function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

// 追加数字
function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + number.toString();
}

// 选择操作符号
function chooseOperation(oper) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = oper;
  previousOperand = currentOperand;
  currentOperand = '';
}

// 计算
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
 *  获取要显示的数字
 *
 * @param {*} number
 * @returns
 */
function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
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
 * 更新显示
 *
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

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  compute();
  updateDisplay();
});

allClearButton.addEventListener('click', button => {
  clear();
  updateDisplay();
});

deleteButton.addEventListener('click', button => {
  deleteNumber();
  updateDisplay();
});
