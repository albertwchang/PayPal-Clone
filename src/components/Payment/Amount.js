/**
 * Created by albertwchang on 10/30/16.
 */
import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';
import accounting from 'accounting';
const currencies = currencyFormatter.currencies;

// Helper functions
const countDecimals = (num, decimalChar) => (num.split(decimalChar)[1] || []).length;
const convertDecimal = (value, oldDecimal, newDecimal) => value.replace(oldDecimal, newDecimal);
const stripDelimiters = (value, separator) => value.split(separator).join('');
const formatAmount = (inputValue, bareValue, currency) => {
  var formattedAmount, decimalCnt = countDecimals(inputValue, currency.decimalSeparator);

  if (decimalCnt < currency.decimalDigits) {
    formattedAmount = currencyFormatter.format(bareValue, {
      decimal: currency.decimalSeparator,
      precision: decimalCnt,
      thousand: currency.thousandsSeparator,
      format: '%v'
    }); // e.g. 275. => 275, 275.1 => 275.1, 275.15 => 275.15

    const endChar = bareValue.endsWith(currency.decimalSeparator)
      ? currency.decimalSeparator
      : '';

    formattedAmount = formattedAmount.concat(endChar);
  } else {
    formattedAmount = currencyFormatter.format(inputValue, {
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
    const inputValue = el.target.value.trim().replace(currency.symbol, '');

    // 1. strip away any currency symbols
    // 2. Split inputValue based on decimal separator -- array > 2 === invalid

    // delimiters specific to the raw value are removed; but NOT the decimal!
    const bareValue = stripDelimiters(inputValue, currency.thousandsSeparator);
    const numberValue = parseInt(stripDelimiters(bareValue, currency.decimalSeparator));

    // invalid characters result in nothing -- so previous state value is refreshed
    if (!isNaN(numberValue)) {
      this.props.onUpdateParam('amount', numberValue);
    }
  }

  onSetCurrency(el) {
    const newCode = el.target.innerText;
    this.props.onUpdateParam('currencyCode', newCode);
  }

  render() {
    const { currency: { code, decimalSeparator, decimalDigits, symbol } } = this.state;
    const { amount } = this.props;
    //const numberValue = parseInt(amount);
    const denominator = Math.pow(10, decimalDigits);
    const currencySettings = {code, format: '%v'};
    var uiValue = '';

    if (amount < denominator) {
      uiValue = (amount / denominator).toString();
    } else {
      // find position from right of number based on currency decimal digits
      uiValue = amount.toString();
      const leftValue = uiValue.substr(0, uiValue.length - decimalDigits);
      const rightValue = uiValue.substr(uiValue.length - decimalDigits);
      uiValue = leftValue
        .concat(currencyFormatter.defaultCurrency.decimalSeparator)
        .concat(rightValue);
    }

    console.log(uiValue);
    uiValue = parseFloat(uiValue) && currencyFormatter.format(uiValue, currencySettings) || '';
    const placeholderValue = currencyFormatter.format(0, currencySettings);

    return (
      <div className="form-group" name="amount">
        <div className="input-group input-group-lg">
          <span className="input-group-addon" id="currency-code">
            {symbol}
          </span>
          <input type="text" className="form-control" value={uiValue}
            onChange={this.onSetAmount} placeholder={placeholderValue}></input>
          <div className="input-group-btn">
            <button type="button" className="btn btn-default dropdown-toggle"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {code}&nbsp;
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
    onUpdateParam: PropTypes.func.isRequired
  }
});

export default PaymentAmount;
