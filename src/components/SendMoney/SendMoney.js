import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './sendmoney.cssmodule.css';

@cssmodules(styles)
class SendMoney extends React.Component {

  render() {
    return (
      <div className="sendmoney-component" styleName="sendmoney-component">
        Please edit src/components//SendMoney.js to update this component!
      </div>
    );
  }
}

Object.assign(SendMoney, {
  displayName: 'SendMoney',
})

export default SendMoney;
