/**
 * Created by albertwchang on 10/30/16.
 */
import React, { Component, PropTypes } from 'react';
import currencyFormatter, { currencies } from 'currency-formatter';

// Helper functions
var $el;
const stripDelimiters = (value, separator) => value.split(separator).join('');
const checkOverdraft = (amount, balance) => {
  // Should not enter amount > account balance
  if (amount > balance) {
    const settings = {
      container: 'body',
      content: 'Sending more than you have?',
      html: false,
      placement: 'right',
      trigger: 'manual'
    };

    if (!$el) {
      $el = $('input[name="amount"]');
    }

    $el.popover(settings).popover('show')
      .on('hidden.bs.popover', (e) => $(this).popover('destroy'));
  } else {
    $el && $el.popover('hide');
  }
};

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

  componentWillUpdate(newProps) {
    const { amount, balance } = newProps;
    const oldAmt = this.props.amount;
    const oldBalance = this.props.balance;
    if ( (oldAmt > oldBalance && amount < balance) || (oldAmt < oldBalance && amount > balance))
      checkOverdraft(amount, balance);
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
    const { currency } = this.state;
    const { amount, balance, onBuildUIAmt } = this.props;
    const currencySettings = {code: currency.code, format: '%v'};
    const uiValue = onBuildUIAmt(amount, currency.code, false);
    const placeholderValue = currencyFormatter.format(0, currencySettings);

    return (
      <div className="form-group" name="amount">
        <div className="input-group input-group-lg">
          <span className="input-group-addon" id="currency-code">
            {currency.symbol}
          </span>
          <input type="text" className="form-control" value={uiValue}
            style={balance < amount ? {color: "#FF0000"} : {}} name="amount"
            onChange={this.onSetAmount} placeholder={placeholderValue}></input>
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

Object.assign(Amount, {
  displayName: 'Payment Amount',
  PropTypes: {
    amount: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
    onBuildUIAmt: PropTypes.func.isRequired,
    currencyCode: PropTypes.string.isRequired,
    onUpdateParam: PropTypes.func.isRequired
  }
});

export default Amount;
