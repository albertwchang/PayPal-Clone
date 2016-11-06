import React, { Component, PropTypes } from 'react';
import emailChecker from 'email-validator';
import moment from 'moment';
import Balance from './Balance';
import PaymentAmount from './Amount';
import Recipient from './Recipient';
import currencyFormatter from 'currency-formatter';
//const currencies = currencyFormatter.currencies;
//import cssmodules from 'react-css-modules';
//import styles from './payment.cssmodule.css';

// Helper functions

const getBaseState = ({profile, refs}) => {
  return {
    amount: "",
    currencyCode: profile.currencyCode,
    message: '',
    recipientId: '', // !!! Need to validate as email when sending
    txType: refs.txTypes[0].name
  };
};

class SendPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = getBaseState(props);
    this.onUpdateParam = this.onUpdateParam.bind(this);
    this.onSetMessage = this.onSetMessage.bind(this);
    this.onSetTxType = this.onSetTxType.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUpdateParam(key, value) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }

  onSetMessage(el) {
    const newValue = el.target.value;
    this.setState({message: newValue});
  }

  onSetTxType(el) {
    const txTypeId = el.target.dataset.id;
    this.setState({
      txType: txTypeId
    })
  }

  onClear(el) {
    this.setState(getBaseState(this.props));
  }

  onSubmit(el) {
    // Check all state variables
    console.log("Current data: ", this.state);
    // 1. Make a copy of current state, and trim all inputs
    // 2. Validate each input against list of criteria/conditions
  }

  render() {
    const {
      children: [header, footer],
      onBuildUIAmt, onChangeView, profile,
      refs: { txTypes }
    } = this.props;
    const { amount, currencyCode, message, txType, recipientId } = this.state;
    const currency = currencyFormatter.findCurrency(currencyCode);
    const { code, symbol } = currency;
    const viewButtons =
      <div className="row">
        <div className="btn-group btn-group-lg col-xs-2 pull-left">
          <button type="button" onClick={onChangeView}
            className="btn btn-default btn-block active">
            <i className="fa fa-chevron-circle-left"></i>
          </button>
        </div>
        <div className="btn-group btn-group-lg col-xm-5">
          <button type="button" className="btn btn-default btn-block active"
            onClick={this.onClear}>Clear</button>
        </div>
        <div className="btn-group btn-group-lg col-xs-5 pull-right">
          <button type="submit" className="btn btn-default btn-block active"
            onClick={this.onSubmit}>Next</button>
        </div>
      </div>;

    return (
      <div className="panel panel-primary">
        {header('Send Payment')}
        <div className="panel-body">
          <Recipient emailTo={recipientId} myEmail={profile.email}
            onUpdateParam={this.onUpdateParam} />
          <Balance header={header} currencyCode={currencyCode}
            onBuildUIAmt={onBuildUIAmt} amt={profile.balance} />
          <PaymentAmount currencyCode={currencyCode} balance={profile.balance}
            amount={amount} onBuildUIAmt={onBuildUIAmt} onUpdateParam={this.onUpdateParam} />
          <div className="form-group" name="message">
            <textarea type="text" className="form-control" rows="4"
              maxLength="140" placeholder="Message (optional, 140 char limit)"
              cols="100" value={message} onChange={this.onSetMessage}></textarea>
          </div>
          <div className="row container-fluid" name="transaction-type">
            <div className="form-group">
              <div className="container-fluid">What's this payment for?</div>
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
        {footer(viewButtons)}
      </div>
    );
  }
}

Object.assign(SendPayment, {
  displayName: 'Send Payment',
  PropTypes: {
    actions: PropTypes.object.isRequired,
    onBuildUIAmt: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    refs: PropTypes.object.isRequired
  }
});

export default SendPayment;
