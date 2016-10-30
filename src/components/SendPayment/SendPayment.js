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
      setCurrency: currencyFormatter.findCurrency(props.profile.currencyCode),
      chosenTxType: this.props.refs.txTypes[0].name
    }
    this.onSetAmt = this.onSetAmt.bind(this);
    this.onSetCurrency = this.onSetCurrency.bind(this);
    this.onSetTxType = this.onSetTxType.bind(this);
  }

  onSetAmt(el) {
    // These variables are coming from 'currency-formatter' npm module
    const { setCurrency } = this.state;

    const rawValue = el.target.value.trim();

    // delimiters specific to the raw value are removed; but NOT the decimal!
    const strippedValue = formatAmt(rawValue, setCurrency.thousandsSeparator);

    const numberValue = parseFloat(strippedValue || 0);

    // invalid characters result in nothing -- so previous state value is refreshed
    if (isNaN(numberValue)) {
      return;
    } else {
      // 2. Format the value based on currency definitions
      var formattedAmt, decimalCnt = countDecimals(rawValue);
      if (decimalCnt < setCurrency.decimalDigits) {
        formattedAmt = currencyFormatter.format(strippedValue, {
          precision: decimalCnt,
          thousand: setCurrency.thousandsSeparator,
          format: '%v'
        }); // e.g. 275. => 275, 275.1 => 275.1, 275.15 => 275.15

        const endChar = strippedValue.endsWith(setCurrency.decimalSeparator)
          ? setCurrency.decimalSeparator
          : '';

        formattedAmt = formattedAmt.concat(endChar);
      } else {
        formattedAmt = currencyFormatter.format(rawValue, {
          precision: setCurrency.decimalDigits,
          format: '%v' // %s is the symbol and %v is the value
        });
      }

      this.setState({amt: formattedAmt});
    }
  }

  onSetCurrency(el) {
    const currencyCode = el.target.innerText;
    if (currencyCode !== this.state.setCurrency.code) {
      // ??? Thought about memoization, but curency list is  < 200 records
      // Perhaps 'currency-formatter' module already implements memoiziation
      this.setState({setCurrency: currencyFormatter.findCurrency(currencyCode)});
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
    const { amt, setCurrency, chosenTxType } = this.state;
    const trimmedAmt = formatAmt(amt, setCurrency.thousandsSeparator);
    const formattedAmt = currencyFormatter.format(trimmedAmt, {
      decimal: setCurrency.decimalSeparator,
      thousand: setCurrency.thousandsSeparator,
      precision: setCurrency.decimalDigits,
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
              {setCurrency.symbol}
            </div>
            <input type="text" className="form-control" value={Number(trimmedAmt) && amt || ''}
              placeholder={Number(trimmedAmt) === 0 ? formattedAmt : ''} onChange={this.onSetAmt}></input>
            <div className="input-group-btn">
              <button type="button" className="btn btn-default dropdown-toggle"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {setCurrency.code}&nbsp;
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
