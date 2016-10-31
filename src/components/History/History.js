import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import formatCurrency from 'currency-formatter';
//import cssmodules from 'react-css-modules';
//import styles from './history.cssmodule.css';

//@cssmodules(styles)
const History = (props) => {
  const { children: [header, footer], onChangeView, profile, transactions } = props;
  const buttons =
    <div className="row">
      <div className="btn-group btn-group-lg col-sm-12">
        <button className="btn btn-default btn-block active"
          type="button" onClick={onChangeView}>Back</button>
      </div>
    </div>;

  return (
    <div className='panel panel-primary'>
      {header('Transaction History')}
      <table className="table table-striped table-hover">
        <tbody className="history-component">{
          transactions.map((entry, index) => {
            const {recipientId, senderId, txTypeId, amount, currencyCode, timestamp} = entry;
            const scenario = (senderId === profile.email) ? 'minus' : 'plus';
            const txTypeIcon = (txTypeId === 'gift') ? 'gift' : 'handshake-o';
            const formattedAmt = formatCurrency.format(amount, {code: currencyCode});

            return(
              <tr key={index}>
                <td>{moment(timestamp).format('MM/DD/YY @h:mm a')}</td>
                <td>{(scenario === 'minus') ? recipientId : senderId}</td>
                <td>
                  <i className={"fa fa-" +txTypeIcon}></i>
                </td>
                <td className={scenario}>
                  <i className={"fa fa-" +scenario}></i> {formattedAmt}
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </table>

      {footer(buttons)}
    </div>
  );
}

Object.assign(History, {
  displayName: 'Transaction History',
  PropTypes: {
    actions: PropTypes.object.isRequired,
    onChangeView: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired
  }
});

export default History;
