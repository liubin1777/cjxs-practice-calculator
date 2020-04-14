import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './index.css';

export default class Output extends Component {
  static propTypes = {
    pre: PropTypes.string, // 上一个操作数
    cur: PropTypes.string, // 当前操作数
  };

  static defaultProps = {
    pre: '',
    cur: '0',
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.interval = null;
    this.gather = true;
    this.intervalTime = 9000;
  }

  render() {
    const { pre, cur } = this.props;
    return (
      <div className="output">
        <div data-previous-operand className="output_pre">
          {pre}
        </div>
        <div data-current-operand className="output_cur">
          {cur}
        </div>
      </div>
    );
  }
}
