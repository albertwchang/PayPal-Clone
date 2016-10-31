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
import './app.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Choices from '../components/Choices';
import SendPayment from '../components/SendPayment/SendPayment';
import History from '../components/History/History';

const header = (title) => {
  return <div className='panel-heading'>
    <h2 className='panel-title text-center'>{title}</h2>
  </div>;
};

const footer = (stuff) => {
  return <div className='panel-footer'>{stuff || <div> </div>}</div>;
};

const views = [
  {
    name: 'choices'
    //title: 'What Are We Doing?'
  },
  {
    name: 'send',
    action: 'SendPayment Money'
    //title: 'SendPayment Money'
  },
  {
    name: 'history',
    action: 'View Transaction History'
    //title: 'Transaction History'
  }
];
const findView = target => views.find(v => v.name === target) || {};
/* Populated by react-webpack-redux:reducer */
class AppContainer extends Component {
  constructor(props) {
    /*--------------------------------------------------------------------
     1. SendPayment Money
      A) Loading View
      B) Success View
      C) Error View
     2. Past Transactions
      A) Detail view
   --------------------------------------------------------------------*/
    super(props);
    this.state = { setView: 'choices' };
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
      case 'send':
        view = (
          <SendPayment actions={actions} profile={currentUser}
            refs={refs} onChangeView={this.onChangeView}>
            {header}
            {footer}
          </SendPayment>
        );
        break;

      case 'history':
        view = (
          <History actions={actions} transactions={transactions} profile={currentUser}>
            {header}
            {footer}
          </History>
        );
        break;

      default:
        view = (
          <Choices onChangeView={this.onChangeView} views={views.filter(v => v['action'])} profile={currentUser}>
            {header}
            {footer}
          </Choices>
        );
    };

    return (
      <div className='container-fluid'>
        <div className='col-xs-6 col-xs-offset-3 col-lg-4 col-lg-offset-4'>
          {view}
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
