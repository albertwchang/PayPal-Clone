/**
 * Created by albertwchang on 10/30/16.
 */
import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';
const currencies = currencyFormatter.currencies;

// Helper functions
const countDecimals = (num) => (num.split('.')[1] || []).length;
const stripDelimiters = (value, separator) => value.split(separator).join('');
const formatAmount = (rawValue, strippedValue, currency) => {
  var formattedAmount, decimalCnt = countDecimals(rawValue);

  if (decimalCnt < currency.decimalDigits) {
    formattedAmount = currencyFormatter.format(strippedValue, {
      precision: decimalCnt,
      thousand: currency.thousandsSeparator,
      format: '%v'
    }); // e.g. 275. => 275, 275.1 => 275.1, 275.15 => 275.15

    const endChar = strippedValue.endsWith(currency.decimalSeparator)
      ? currency.decimalSeparator
      : '';

    formattedAmount = formattedAmount.concat(endChar);
  } else {
    formattedAmount = currencyFormatter.format(rawValue, {
      precision: currency.decimalDigits,
      format: '%v' // %s is the symbol and %v is the value
    });
  }

  return formattedAmount;
};

class PaymentAmount extends React.Component {
  constructor(props) {
    super(props);
    this.onSetAmount = this.onSetAmount.bind(this);
    this.onSetCurrency = this.onSetCurrency.bind(this);
    this.state = {
      currency: currencyFormatter.findCurrency(props.currencyCode)
    };
  }

  componentWillReceiveProps(nextProps) {
    const newCurrencyCode = nextProps.currencyCode;
    if (newCurrencyCode !== this.props.currencyCode) {
      this.setState({
        currency: currencyFormatter.findCurrency(newCurrencyCode)
      });
    }
  }

  onSetAmount(el) {
    // These variables are coming from 'currency-formatter' npm module
    const { currency } = this.state;
    const rawValue = el.target.value.trim();

    // delimiters specific to the raw value are removed; but NOT the decimal!
    const strippedValue = stripDelimiters(rawValue, currency.thousandsSeparator);
    const numberValue = parseFloat(strippedValue || 0);

    // invalid characters result in nothing -- so previous state value is refreshed
    if (!isNaN(numberValue)) {
      // 2. Format the value based on currency definitions
      const newAmount = formatAmount(rawValue, strippedValue, currency);
      this.props.onUpdateAmount('amount', newAmount);
    }
  }

  onSetCurrency(el) {
    const currencyCode = el.target.innerText;
    if (currencyCode !== this.state.currency.code) {
      // ??? Thought about memoization, but curency list is  < 200 records
      // Perhaps 'currency-formatter' module already implements memoiziation
      this.props.onUpdateAmount('currencyCode', currencyCode);
    }
  }

  render() {
    const { amount } = this.props;
    const { currency } = this.state;
    const trimmedAmount = stripDelimiters(amount, currency.thousandsSeparator);
    const formattedAmount = currencyFormatter.format(trimmedAmount, {
      decimal: currency.decimalSeparator,
      thousand: currency.thousandsSeparator,
      precision: currency.decimalDigits,
      format: '%v' // %s is the symbol and %v is the value
    });

    return (
      <div className="form-group" name="amount">
        <div className="input-group input-group-lg">
          <div className="input-group-addon" id="amount">
            {currency.symbol}
          </div>
          <input type="text" className="form-control" value={Number(trimmedAmount) && amount || ''}
                 placeholder={formattedAmount} onChange={this.onSetAmount}></input>
          <div className="input-group-btn">
            <button type="button" className="btn btn-default dropdown-toggle"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {currency.code}&nbsp;
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu dropdown-menu-right">{
              currencies.map((c, index) => <li key={index} onClick={this.onSetCurrency}>
                <a href="#">{c.code}</a>
              </li>)
            }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Object.assign(PaymentAmount, {
  displayName: 'PaymentAmount',
  PropTypes: {
    amount: PropTypes.string.isRequired,
    currencyCode: PropTypes.string.isRequired,
    onUpdateAmount: PropTypes.func.isRequired
  }
});

export default PaymentAmount;
