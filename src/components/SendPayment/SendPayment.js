import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import MenuSelect from 'react-select';
import currencyFormatter from 'currency-formatter';
const currencies = currencyFormatter.currencies;
//import cssmodules from 'react-css-modules';
//import styles from './sendpayment.cssmodule.css';

// Helper functions

const countDecimals = (num) => (num.split('.')[1] || []).length;
const formatAmt = (rawValue, strippedValue, currency) => {
  var formattedAmt, decimalCnt = countDecimals(rawValue);

  if (decimalCnt < currency.decimalDigits) {
    formattedAmt = currencyFormatter.format(strippedValue, {
      precision: decimalCnt,
      thousand: currency.thousandsSeparator,
      format: '%v'
    }); // e.g. 275. => 275, 275.1 => 275.1, 275.15 => 275.15

    const endChar = strippedValue.endsWith(currency.decimalSeparator)
      ? currency.decimalSeparator
      : '';

    formattedAmt = formattedAmt.concat(endChar);
  } else {
    formattedAmt = currencyFormatter.format(rawValue, {
      precision: currency.decimalDigits,
      format: '%v' // %s is the symbol and %v is the value
    });
  }

  return formattedAmt;
}
const stripDelimiters = (value, separator) => value.split(separator).join('');

class SendPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amt: "0",
      currency: currencyFormatter.findCurrency(props.profile.currencyCode),
      message: '',
      recipient: '', // !!! Need to validate as email when sending
      txType: this.props.refs.txTypes[0].name
    }
    this.onSetAmt = this.onSetAmt.bind(this);
    this.onSetCurrency = this.onSetCurrency.bind(this);
    this.onSetTxType = this.onSetTxType.bind(this);
  }

  onSetRecipient(el) {
    const rawValue = el.target.value.trim();
    this.setState({recipient: newValue});
  }

  onSetAmt(el) {
    // These variables are coming from 'currency-formatter' npm module
    const { currency } = this.state;
    const rawValue = el.target.value.trim();

    // delimiters specific to the raw value are removed; but NOT the decimal!
    const strippedValue = stripDelimiters(rawValue, currency.thousandsSeparator);
    const numberValue = parseFloat(strippedValue || 0);

    // invalid characters result in nothing -- so previous state value is refreshed
    if (!isNaN(numberValue)) {
      // 2. Format the value based on currency definitions
      this.setState({amt: formatAmt(rawValue, strippedValue, currency)});
    }
  }

  onSetCurrency(el) {
    const currencyCode = el.target.innerText;
    if (currencyCode !== this.state.currency.code) {
      // ??? Thought about memoization, but curency list is  < 200 records
      // Perhaps 'currency-formatter' module already implements memoiziation
      this.setState({currency: currencyFormatter.findCurrency(currencyCode)});
    }
  }

  onSetMessage(el) {
    const rawValue = el.target.value.trim();
    this.setState({message: newValue});
  }

  onSetTxType(el) {
    const txTypeId = el.target.dataset.id;
    this.setState({
      txType: txTypeId
    })
  }

  render() {
    const currencies = currencyFormatter.currencies;
    const { profile, refs: { txTypes } } = this.props;
    const { amt, currency, txType } = this.state;
    const trimmedAmt = stripDelimiters(amt, currency.thousandsSeparator);
    const formattedAmt = currencyFormatter.format(trimmedAmt, {
      decimal: currency.decimalSeparator,
      thousand: currency.thousandsSeparator,
      precision: currency.decimalDigits,
      format: '%v' // %s is the symbol and %v is the value
    });

    return (
      <div className="panel-body">

        <div className="form-group" name="recipient">
          <div className="input-group input-group-lg has-primary">
            <span className="input-group-addon" id="recipient">
              <i className="fa fa-user"></i>
            </span>
            <input className="form-control" placeholder="e.g. erlich_bachman@aviato.com"
               type="text" aria-describedby="basic-addon1"></input>
          </div>
        </div>

        <div className="form-group" name="amt">
          <div className="input-group input-group-lg">
            <div className="input-group-addon" id="amt">
              {currency.symbol}
            </div>
            <input type="text" className="form-control" value={Number(trimmedAmt) && amt || ''}
              placeholder={formattedAmt} onChange={this.onSetAmt}></input>
            <div className="input-group-btn">
              <button type="button" className="btn btn-default dropdown-toggle"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {currency.code}&nbsp;
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-right">{
                currencies.map((c, index) => <li key={index} onClick={this.onSetCurrency}><a href="#">{c.code}</a></li>)
              }
              </ul>
            </div>
          </div>
        </div>

        <div className="form-group has-primary" name="message">
          <textarea type="text" className="form-control" rows="4" maxLength="220"
            placeholder="Message (optional)" cols="100" onChange={this.onSetMessage}></textarea>
        </div>

        <div className="row container-fluid" name="transaction-type">
          <div className="form-group">
            <div>What's this payment for?</div>
            <div className="btn-group btn-group-lg btn-group-vertical btn-block">{
              txTypes.map(type => {
                const isSet = txType === type.name;
                return (
                  <a key={type.name} type="button" className="text-center" onClick={this.onSetTxType}
                    className={"btn btn-default btn-lg" +(isSet && ' active')} data-id={type.name}>{type.description}
                    {isSet ? <i className="fa fa-check pull-right"></i> : ''}
                  </a>
                );
              })
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Object.assign(SendPayment, {
  displayName: 'Send Payment',
  PropTypes: {
    actions: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    refs: PropTypes.object.isRequired
  }
});

export default SendPayment;
