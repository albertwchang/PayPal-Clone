import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';
import _ from 'lodash';

const History = (props) => {
  const { children: [header, footer], onBuildUIAmt, onChangeView, profile, transactions } = props;
  const currencies = _.memoize(currencyFormatter.findCurrency);
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
            //const { symbol, symbolOnLeft, spaceBetweenAmountAndSymbol } = currencies(currencyCode);
            const scenario = (senderId === profile.email) ? 'minus' : 'plus';
            const txTypeIcon = (txTypeId === 'gift') ? 'gift' : 'handshake-o';
            const formattedAmt = onBuildUIAmt(amount, currencyCode, true);
            const uiAmt = currencyFormatter.format(formattedAmt, {code: currencyCode});

            return(
              <tr key={index}>
                <td>{moment(timestamp).format('MM/DD/YY @h:mm a')}</td>
                <td>{(scenario === 'minus') ? recipientId : senderId}</td>
                <td>
                  <i className={"fa fa-" +txTypeIcon}></i>
                </td>
                <td className={scenario}>
                  <i className={"fa fa-" +scenario}></i> {uiAmt}
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
    onBuildUIAmt: PropTypes.func.isRequired,
    onChangeView: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired
  }
});

export default History;
