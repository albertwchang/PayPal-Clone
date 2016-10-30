/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import '../actions/';
//import './app.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Choices from '../components/Choices';
import Send from '../components/SendPayment/SendPayment';
import History from '../components/History/History';
const views = [
  {
    name: 'choices',
    title: 'What Are We Doing?'
  },
  {
    name: 'send',
    action: 'Send Money',
    title: 'Send Money'
  },
  {
    name: 'history',
    action: 'View Transaction History',
    title: 'Transaction History'
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
    this.state = { chosenView: 'send' };
    this.onChangeView = this.onChangeView.bind(this);
  }
  onChangeView(viewName) {
    // No need to account for preventing any form events as the clicked button
    // is not wrapped around a <form> element.
    this.setState({ chosenView: viewName });
  }
  renderSubView(chosenView) {
    const {actions, transactions, currentUser, refs} = this.props;
    switch (chosenView) {
    case 'send':
      return <Send actions={actions} profile={currentUser} refs={refs} />;
      break;
    case 'history':
      return <History actions={actions} transactions={transactions} profile={currentUser}/>;
      break;
    default:
      return <Choices onChangeView={this.onChangeView} views={views.filter(v => v['action'])} profile={currentUser}/>;
      break;
    }
    ;
  }
  render() {
    const {chosenView} = this.state;
    return (
      <div className='container-fluid'>
        <div className='col-sm-6 col-sm-offset-3'>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h2 className='panel-title text-center'>{findView(chosenView).title}</h2>
            </div>
            {this.renderSubView(chosenView)}
          </div>
        </div>
      </div>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
Object.assign(AppContainer, {
  PropTypes: {
    actions: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired
  }
});
// boilerplate Redux
function mapStateToProps(state) {
  // eslint-disable-line no-unused-vars
  /* Populated by react-webpack-redux:reducer */
  const props = {
    transactions: state.transactions,
    currentUser: state.currentUser,
    refs: state.refs
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
