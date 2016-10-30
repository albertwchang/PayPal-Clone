import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import MenuSelect from 'react-select';
import currencyFormatter from 'currency-formatter';
const currencies = currencyFormatter.currencies;
//import cssmodules from 'react-css-modules';
//import styles from './sendpayment.cssmodule.css';

const formatAmt = function(value, separator) {
  return value.split(separator).join('');
}

const countDecimals = function(num) {
  return (num.split('.')[1] || []).length;
}

//@cssmodules(styles)
class SendPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amt: "0",
      chosenCurrency: currencyFormatter.findCurrency(props.profile.currencyCode),
      chosenTxType: this.props.refs.txTypes[0].name
    }
    this.onSetAmt = this.onSetAmt.bind(this);
    this.onSetCurrency = this.onSetCurrency.bind(this);
    this.onSetTxType = this.onSetTxType.bind(this);
  }

  onSetAmt(el) {
    // empty values will be replaced w/ 0
    const { decimalSeparator, thousandsSeparator, decimalDigits } = this.state.chosenCurrency;
    const rawValue = el.target.value;
    const trimmedValue = formatAmt(rawValue, thousandsSeparator);
    const input = parseFloat(trimmedValue || 0);

    // 1. Check for, and remove characters
    if (isNaN(input)) {
      return;
    } else {
      /*
       Look at number by digit count, and divide it by 10^currentPoser

       */
      // 2. Format the value based on currency definitions
      var formattedAmt, amtDecimals = countDecimals(rawValue);
      if (amtDecimals < decimalDigits) {
        formattedAmt = currencyFormatter.format(trimmedValue, {
          precision: amtDecimals,
          thousand: thousandsSeparator,
          format: '%v' // %s is the symbol and %v is the value
        });
        formattedAmt += trimmedValue.endsWith(decimalSeparator) ? decimalSeparator : '';
      } else {
        formattedAmt = currencyFormatter.format(rawValue, {
          precision: decimalDigits,
          format: '%v' // %s is the symbol and %v is the value
        });
      }

      this.setState({amt: formattedAmt});
    }
  }

  onSetCurrency(el) {
    const currencyCode = el.target.innerText;
    if (currencyCode !== this.state.chosenCurrency.code) {
      // ??? Does it make sense to use Memoization here ???
      this.setState({chosenCurrency: currencyFormatter.findCurrency(currencyCode)});
    }
  }

  onSetTxType(el) {
    const txTypeId = el.target.dataset.id;
    this.setState({
      chosenTxType: txTypeId
    })
  }

  render() {
    const currencies = currencyFormatter.currencies;
    const { profile, refs: { txTypes } } = this.props;
    const { amt, chosenCurrency, chosenTxType } = this.state;
    const { decimalSeparator, thousandsSeparator, decimalDigits } = chosenCurrency;
    const trimmedAmt = formatAmt(amt, thousandsSeparator);
    const formattedAmt = currencyFormatter.format(trimmedAmt, {
      decimal: decimalSeparator,
      thousand: thousandsSeparator,
      precision: decimalDigits,
      format: '%v' // %s is the symbol and %v is the value
    });

    return (
      <div className="panel-body">
        <div className="form-group">
          <div className="input-group input-group-lg">
            <span className="input-group-addon" id="basic-addon1">
              <i className="fa fa-user"></i>
            </span>
            <input className="form-control" placeholder="e.g. erlich_bachman@aviato.com"
               type="text" aria-describedby="basic-addon1"></input>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group input-group-lg">
            <div className="input-group-addon" id="basic-addon1">
              {chosenCurrency.symbol}
            </div>
            <input type="text" className="form-control" value={Number(trimmedAmt) && amt || ''}
              placeholder={Number(trimmedAmt) === 0 ? formattedAmt : ''} onChange={this.onSetAmt}></input>
            <div className="input-group-btn">
              <button type="button" className="btn btn-default dropdown-toggle"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {chosenCurrency.code}&nbsp;
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-right">{
                currencies.map((c, index) => <li key={index} onClick={this.onSetCurrency}><a href="#">{c.code}</a></li>)
              }
              </ul>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <textarea type="text" className="form-control" rows="4" cols="100%" placeholder="Message (optional)"></textarea>
          </div>
        </div>
        <div className="row container-fluid">
          <div className="form-group">
            <div>What's this payment for?</div>
            <div className="btn-group btn-group-lg btn-group-vertical btn-block">{
              txTypes.map(type =>
                <a key={type.name} type="button" className="text-center" onClick={this.onSetTxType}
                  className="btn btn-default btn-lg" data-id={type.name} selected>{type.description}
                  {chosenTxType === type.name ? <i className="fa fa-check pull-right"></i> : ''}
                </a>)
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
