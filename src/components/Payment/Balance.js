/**
 * Created by albertwchang on 11/5/16.
 */
import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';

const Balance = (props) => {
  const { amt, currencyCode, onBuildUIAmt, header } = props;
  const settings = { code: currencyCode };
  const uiAmt = currencyFormatter.format(onBuildUIAmt(amt, currencyCode), settings);
  return (
    <div className="panel panel-primary">
      {header('Account Balance')}
      <div className="panel-body">
        <div className="col-xs-6 pull-left">{uiAmt}</div>
        <div className="col-xs-6 pull-right text-right">{currencyCode}</div>
      </div>
    </div>
  );
}

Object.assign(Balance, {
  displayName: 'Account Balance',
  PropTypes: {
    amt: PropTypes.number.isRequired,
    onBuildUIAmt: PropTypes.func.isRequired,
    currencyCode: PropTypes.string.isRequired
  }
});

export default Balance;
