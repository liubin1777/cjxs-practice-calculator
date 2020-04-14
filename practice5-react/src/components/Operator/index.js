import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './index.css';

export default class Operator extends Component {
  static propTypes = {
    value: PropTypes.string, // 计算器数字
  };

  static defaultProps = {
    value: '0',
  };

  constructor(props) {
    super(props);
  }

  onClick(e) {
    this.props.onClick && this.props.onClick(e.target.innerText);
  }

  render() {
    return (
      <button className="operator" onClick={this.onClick.bind(this)}>
        {this.props.value}
      </button>
    );
  }
}
