/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, { Component,PropTypes } from 'react';
import '../actions/';
import './app.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Choices from '../components/Choices';
import SendPayment from '../components/Payment/Payment';
import History from '../components/History/History';
import currencyFormatter, { currencies } from 'currency-formatter';

const header = (title) => {
  return <div className='panel-heading'>
    <h2 className='panel-title text-center'>{title}</h2>
  </div>;
};

const footer = (stuff) => {
  return <div className='panel-footer'>{stuff || <div> </div>}</div>;
};

const buildUIAmt = (amount, currencyCode, showSymbol) => {
  const currency = currencyFormatter.findCurrency(currencyCode);
  const { code, decimalDigits } = currency;
  const denominator = Math.pow(10, decimalDigits);
  const currencySettings = {code, format: '%v' +(showSymbol && ' %s' || '')};
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

  return parseFloat(uiValue) && currencyFormatter.format(uiValue, currencySettings) || '';
}

const views = [
  {
    name: 'choices'
  },
  {
    name: 'payment',
    action: 'Send Money'
  },
  {
    name: 'history',
    action: 'View Transaction History'
  }
];
const findView = target => views.find(v => v.name === target) || {};
/* Populated by react-webpack-redux:reducer */
class AppContainer extends Component {
  constructor(props) {
    /*--------------------------------------------------------------------
     1. Send Money
      A) Loading View
      B) Success View
      C) Error View
     2. Past Transactions
      A) Detail view
   --------------------------------------------------------------------*/
    super(props);
    this.state = { setView: 'payment' };
    this.onChangeView = this.onChangeView.bind(this);
  }

  onChangeView(viewName) {
    // No need to account for preventing any form events as the clicked button
    // is not wrapped around a <form> element.
    viewName = ((typeof viewName === "string") ? viewName : 'choices');
    this.setState({ setView: viewName });
  }

  render() {
    const {setView} = this.state;
    const {actions, transactions, currentUser, refs} = this.props;
    var view;

    switch (setView) {
      case 'payment':
        view = (
          <SendPayment refs={refs} onChangeView={this.onChangeView}
            profile={currentUser} onBuildUIAmt={buildUIAmt} actions={actions}>
            {header}
            {footer}
          </SendPayment>
        );
        break;

      case 'history':
        view = (
          <History profile={currentUser} onChangeView={this.onChangeView}
            actions={actions} transactions={transactions} onBuildUIAmt={buildUIAmt}>
            {header}
            {footer}
          </History>
        );
        break;

      default:
        view = (
          <Choices views={views.filter(v => v['action'])}
            onChangeView={this.onChangeView} profile={currentUser}>
            {header}
            {footer}
          </Choices>
        );
    };

    return (
      <div className='container-fluid'>
        <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
          {view}
        </div>
      </div>
    );
  }
}

Object.assign(AppContainer, {
  PropTypes: {
    actions: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    payment: PropTypes.object.isRequired,
    refs: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired
  }
});

// boilerplate Redux
function mapStateToProps(state) {
  const props = {currentUser, payment, refs, transactions} = state;
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
