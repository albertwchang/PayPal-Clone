/**
 * Created by albertwchang on 10/30/16.
 */
import React, { Component, PropTypes } from 'react';
import currencyFormatter from 'currency-formatter';
import accounting from 'accounting';
const currencies = currencyFormatter.currencies;

// Helper functions
const countDecimals = (num, decimalChar) => (num.split(decimalChar)[1] || []).length;
const stripDelimiters = (value, separator) => value.split(separator).join('');

class Amount extends React.Component {
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
    const denominator = Math.pow(10, decimalDigits);
    const currencySettings = {code, format: '%v'};
    var uiValue = '';

    /*
      STORY: 'props.amount' is expected to be a whole number (without decimals!).
      It is used to create a formatted version based on currently-selected currency
     */
    if (amount < denominator) {
      /* Any amount less than denominator can be divided by it in order to get
        decimal value */
      uiValue = (amount / denominator).toString();
    } else {
      /* Values with digits > currency decimal digits required decimal decimal
        separator insertion */
      uiValue = amount.toString();
      const leftValue = uiValue.substr(0, uiValue.length - decimalDigits);
      const rightValue = uiValue.substr(uiValue.length - decimalDigits);
      uiValue = leftValue
        .concat(currencyFormatter.defaultCurrency.decimalSeparator)
        .concat(rightValue);
    }

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

Object.assign(Amount, {
  displayName: 'Payment Amount',
  PropTypes: {
    amount: PropTypes.string.isRequired,
    currencyCode: PropTypes.string.isRequired,
    onUpdateParam: PropTypes.func.isRequired
  }
});

export default Amount;
