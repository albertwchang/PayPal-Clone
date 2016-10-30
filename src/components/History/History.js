import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import formatCurrency from 'currency-formatter';
import cssmodules from 'react-css-modules';
import styles from './history.cssmodule.css';

@cssmodules(styles)
class History extends React.Component {

  render() {
    //<div className="history-component" styleName="history-component">
    //  Please edit src/components//History.js to update this component!
    //</div>

    const { transactions } = this.props;
    return (
      <table className="table table-striped table-hover" styleName="history-component">
        <tbody className="history-component">{
          transactions.map((entry, index) => {
            const {recipientId, senderId, txTypeId, amount, currencyCode, timestamp} = entry;
            const scenario = (senderId === 'achang@xyz.com') ? 'minus' : 'plus';
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
    );
  }
}

Object.assign(History, {
  displayName: 'Transaction History',
  PropTypes: {
    actions: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired
  }
});

export default History;
