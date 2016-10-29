/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, { Component, PropTypes } from 'react';
import '../actions/';
//import './app.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Choices from '../components/Choices';
import Send from '../components/SendMoney/SendMoney';
import History from '../components/History/History';
const views = [
  {
    name:'send',
    title: 'Send Money'
  }, {
    name: 'history',
    title: 'Transaction History'
  }
];

/* Populated by react-webpack-redux:reducer */
class App extends Component {
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
    this.state = {
      chosenView: 'choices'
    };

    this.onChangeView = this.onChangeView.bind(this);
  }

  onChangeView(viewName) {
    // No need to account for preventing any form events as the clicked button
    // is not wrapped around a <form> element.
    this.setState({chosenView: viewName});
  }

  render() {
    const { actions, transactions } = this.props;
    const { chosenView } = this.state;

    switch(chosenView) {
      case 'send':
        return <Send actions={actions} transactions={transactions} />;
        break;

      case 'history':
        return <History actions={actions} transactions={transactions} />;
        break;

      default:
        return <Choices onChangeView={this.onChangeView} views={views} />;
        break;
    };
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
Object.assign(App, {
  PropTypes: {
    actions: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired
  }
});

// boilerplate Redux
function mapStateToProps(state) {
  // eslint-disable-line no-unused-vars
  /* Populated by react-webpack-redux:reducer */
  const props = { transactions: state.transactions };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
