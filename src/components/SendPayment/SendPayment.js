import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import PaymentAmount from './PaymentAmount';
//import currencyFormatter from 'currency-formatter';
//const currencies = currencyFormatter.currencies;
//import cssmodules from 'react-css-modules';
//import styles from './sendpayment.cssmodule.css';

// Helper functions

const getBaseState = ({profile, refs}) => {
  return {
    amount: "0",
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
    this.onSetRecipient = this.onSetRecipient.bind(this);
    this.onUpdateAmount = this.onUpdateAmount.bind(this);
    this.onSetMessage = this.onSetMessage.bind(this);
    this.onSetTxType = this.onSetTxType.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onSetRecipient(el) {
    const newValue = el.target.value.trim();
    this.setState({recipientId: newValue});
  }

  onUpdateAmount(key, value) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }

  onSetMessage(el) {
    const newValue = el.target.value.trim();
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

  render() {
    const { children: [header, footer], profile, refs: { txTypes } } = this.props;
    const { amount, currencyCode, message, txType, recipientId } = this.state;
    const buttons =
      <div className="row container-fluid">
        <div className="btn-group btn-group-lg col-sm-5 pull-left">
          <button type="button" className="btn btn-default btn-block active"
            onClick={this.onClear}>Clear</button>
        </div>
        <div className="btn-group btn-group-lg col-sm-5 pull-right">
          <button type="submit" className="btn btn-default btn-block active">Submit</button>
        </div>
      </div>;

    return (
      <div className='panel panel-primary'>
        {header('Send Payment')}
        <div className="panel-body">

          <div className="form-group" name="recipient">
            <div className="input-group input-group-lg">
              <span className="input-group-addon" id="recipient">
                <i className="fa fa-user"></i>
              </span>
              <input className="form-control" placeholder="e.g. erlich_bachman@aviato.com"
                type="text" value={recipientId} onChange={this.onSetRecipient}></input>
            </div>
          </div>

          <PaymentAmount currencyCode={currencyCode}
            amount={amount} onUpdateAmount={this.onUpdateAmount} />

          <div className="form-group" name="message">
            <textarea type="text" className="form-control" rows="4"
              maxLength="140" placeholder="Message (optional, 140 char limit)"
              cols="100" value={message} onChange={this.onSetMessage}></textarea>
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
        {footer(buttons)}
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
