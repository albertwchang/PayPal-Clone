/**
 * Created by albertwchang on 11/5/16.
 */
import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';

const Balance = (props) => {
  const { amt, currencyCode, onBuildUIAmt } = props;
  const settings = { code: currencyCode };
  const uiAmt = currencyFormatter.format(onBuildUIAmt(amt, currencyCode), settings);

  return (
    <div className="row">
      <div className="col-xs-4 text-right">Account Balance ({currencyCode})</div>
      <div className="col-xs-8 text-left"
        style={(amt > 0) ? {color: "#85bb65"} : {}}>{uiAmt}
      </div>
    </div>
  );
}

Object.assign(Balance, {
  displayName: 'Remaining Balance',
  PropTypes: {
    amt: PropTypes.number.isRequired,
    onBuildUIAmt: PropTypes.func.isRequired,
    currencyCode: PropTypes.string.isRequired
  }
});

export default Balance;
