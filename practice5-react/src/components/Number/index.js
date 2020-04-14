import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './index.css';

export default class Number extends Component {
  // 类型检查
  static propTypes = {
    value: PropTypes.string, // 计算器数字
    className: PropTypes.string, // css类
    onClick: PropTypes.func, // 点击回调函数
  };

  // 默认值
  static defaultProps = {
    value: '0',
    className: '',
    onClick: () => {},
  };

  constructor(props) {
    super(props);
  }

  onClick(e) {
    this.props.onClick && this.props.onClick(e.target.innerText);
  }

  render() {
    const outerClassName = this.props.className || '';
    return (
      <button
        className={`number ${outerClassName}`}
        onClick={this.onClick.bind(this)}>
        {this.props.value}
      </button>
    );
  }
}
