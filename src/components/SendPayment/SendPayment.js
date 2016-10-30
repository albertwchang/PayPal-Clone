import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import MenuSelect from 'react-select';
import formatCurrency from 'currency-formatter';
const currencies = formatCurrency.currencies;
//import cssmodules from 'react-css-modules';
//import styles from './sendpayment.cssmodule.css';

//@cssmodules(styles)
class SendPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amt: 0,
      chosenCurrency: formatCurrency.findCurrency(props.profile.currencyCode)
    }
    this.onSetAmt = this.onSetAmt.bind(this);
    this.onSetCurrency = this.onSetCurrency.bind(this);
  }

  onSetAmt(value) {
    const input = parseFloat(value.target.value);
    if (input !== NaN) {
      console.log("input");
      this.setState({amt: input});
    }
  }

  onSetCurrency(el) {
    const currencyCode = el.target.innerText;
    if (currencyCode !== this.state.chosenCurrency.code) {
      // ??? Does it make sense to use Memoization here ???
      this.setState({chosenCurrency: formatCurrency.findCurrency(currencyCode)});
    }
  }

  render() {
    const { profile, refs: { txTypes } } = this.props;
    const { amt, chosenCurrency } = this.state;
    const currencies = formatCurrency.currencies;

    return (
      <div className="panel-body">
        <div className="form-group input-group input-group-lg">
          <span className="input-group-addon" id="basic-addon1">
            <i className="fa fa-user"></i>
          </span>
          <input className="form-control" placeholder="e.g. erlich_bachman@aviato.com"
             type="text" aria-describedby="basic-addon1"></input>
        </div>
        <div className="form-group">
          <div className="input-group input-group-lg">
            <div className="input-group-addon" id="basic-addon1">
              <i className="fa fa-money"></i>
            </div>
            <div className="input-group-addon" id="basic-addon1">
              {chosenCurrency.symbol}
            </div>
            <input type="text" className="form-control" placeholder="0.00"
              onChange={this.onSetAmt}></input>
            <div className="input-group-btn">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
