import React, { Component } from 'react';
import './App.css';
import Number from './components/Number';
import Operator from './components/Operator';
import Output from './components/Output';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onClickNumber = this.onClickNumber.bind(this);
    this.onClickOperator = this.onClickOperator.bind(this);

    this.currentOperand = ''; // 当前操作数, 默认空字符串
    this.previousOperand = ''; // 上一个操作数，默认空字符串
    this.operation = undefined; // 操作符号(+,-,x,÷)

    this.state = {
      cur: '',
      pre: '',
      oper: undefined,
    };
  }

  /**
   * 追加数字
   *
   * @param {int} number 操作数
   * @returns
   */
  appendNumber(number) {
    const { currentOperand = '' } = this;
    if (number === '.' && currentOperand.includes('.')) return;
    this.currentOperand = currentOperand.toString() + number.toString();
  }

  /**
   * 更新计算器
   */
  updateDisplay() {
    const {
      currentOperand = '',
      previousOperand = '',
      operation = undefined,
    } = this;

    this.currentOperand = this.getDisplayNumber(currentOperand);
    if (operation != null) {
      this.previousOperand = `${this.getDisplayNumber(
        previousOperand
      )} ${operation}`;
    } else {
      this.previousOperand = '';
    }

    this.setState({
      cur: this.currentOperand,
      pre: this.previousOperand,
      oper: this.operation,
    });
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
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  /**
   * 计算
   *
   * @returns
   */
  compute() {
    const {
      currentOperand = '',
      previousOperand = '',
      operation = undefined,
    } = this;

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
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  /**
   * 清空重置
   */
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;

    this.setState({
      pre: '',
      cur: '',
      oper: undefined,
    });
  }

  /**
   * 删除数字
   */
  deleteNumber() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.setState({
      cur: this.currentOperand,
    });
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

  // 点击AC按钮
  onClickClear(e) {
    this.clear();
    this.updateDisplay();
  }

  // 点击Del按钮
  onClickDel(e) {
    this.deleteNumber();
    this.updateDisplay();
  }

  // 点击数字按钮
  onClickNumber(number) {
    this.appendNumber(number);
    this.updateDisplay();
  }

  // 点击操作符按钮
  onClickOperator(value) {
    this.chooseOperation(value);
    this.updateDisplay();
  }

  // 点击等号按钮
  onClickEqual(e) {
    this.compute();
    this.updateDisplay();
  }

  render() {
    const { pre, cur } = this.state;
    return (
      <div className="calculator">
        <Output cur={cur} pre={pre} />
        <button className="span-two" onClick={this.onClickClear.bind(this)}>
          AC
        </button>
        <button className="del" onClick={this.onClickNumber.bind(this)}>
          DEL
        </button>
        <Operator value="÷" onClick={this.onClickOperator} />
        <Number value="1" onClick={this.onClickNumber} />
        <Number value="2" onClick={this.onClickNumber} />
        <Number value="3" onClick={this.onClickNumber} />
        <Operator value="x" onClick={this.onClickOperator} />
        <Number value="4" onClick={this.onClickNumber} />
        <Number value="5" onClick={this.onClickNumber} />
        <Number value="6" onClick={this.onClickNumber} />
        <Operator value="+" onClick={this.onClickOperator} />
        <Number value="7" onClick={this.onClickNumber} />
        <Number value="8" onClick={this.onClickNumber} />
        <Number value="9" onClick={this.onClickNumber} />
        <Operator value="—" onClick={this.onClickOperator} />
        <Number className="span-two" value="0" onClick={this.onClickNumber} />
        <Number value="." onClick={this.onClickNumber} />
        <button className="equals" onClick={this.onClickEqual.bind(this)}>
          =
        </button>
      </div>
    );
  }
}
