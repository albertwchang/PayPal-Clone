/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {} from '../actions/const';
const initialState = [
  {
    recipientId: 'achang@xyz.com',
    senderId: 'ebachman@aviato.com',
    txTypeId: 'business',
    amount: 145.00,
    currencyCode: 'CHF',
    timestamp: "2016-08-19T11:23:37-07:00"
  }, {
    recipientId: 'achang@xyz.com',
    senderId: 'myeung@abc.com',
    txTypeId: 'gift',
    amount: 331.00,
    currencyCode: 'USD',
    timestamp: "2016-05-12T23:31:37-07:00"
  }, {
    recipientId: 'bwayne@batman.com',
    senderId: 'achang@xyz.com',
    txTypeId: 'business',
    amount: 44.00,
    currencyCode: 'USD',
    timestamp: "2016-01-15T14:45:37-07:00"
  }, {
    recipientId: 'myeung@abc.com',
    senderId: 'bwayne@batman.com',
    txTypeId: 'gift',
    amount: 195.00,
    currencyCode: 'USD',
    timestamp: "2016-03-23T12:11:37-07:00"
  }, {
    recipientId: 'bwayne@batman.com',
    senderId: 'ebachman@aviato.com',
    txTypeId: 'gift',
    amount: 245.00,
    currencyCode: 'CHF',
    timestamp: "2016-03-03T03:30:37-07:00"
  }, {
    recipientId: 'ebachman@aviato.com',
    senderId: 'achang@xyz.com',
    txTypeId: 'business',
    amount: 3333.00,
    currencyCode: 'KRW',
    timestamp: "2016-05-03T09:32:37-07:00"
  }, {
    recipientId: 'ebachman@aviato.com',
    senderId: 'myeung@abc.com',
    txTypeId: 'gift',
    amount: 222.54,
    currencyCode: 'USD',
    timestamp: "2016-10-09T09:17:37-07:00"
  }, {
    recipientId: 'bwayne@batman.com',
    senderId: 'bwayne@batman.com',
    txTypeId: 'business',
    amount: 1445.93,
    currencyCode: 'JPY',
    timestamp: "2016-06-04T17:39:37-07:00"
  }, {
    recipientId: 'jknoxville@jackass.com',
    senderId: 'myeung@abc.com',
    txTypeId: 'gift',
    amount: 794.21,
    currencyCode: 'USD',
    timestamp: "2016-06-11T07:31:37-07:00"
  }, {
    recipientId: 'ebachman@aviato.com',
    senderId: 'myeung@abc.com',
    txTypeId: 'gift',
    amount: 75.00,
    currencyCode: 'USD',
    timestamp: "2016-03-21T07:29:37-07:00"
  }, {
    recipientId: 'ebachman@aviato.com',
    senderId: 'achang@xyz.com',
    txTypeId: 'gift',
    amount: 175.00,
    currencyCode: 'CAD',
    timestamp: "2016-06-21T17:39:37-07:00"
  }, {
    recipientId: 'myeung@abc.com',
    senderId: 'ebachman@aviato.com',
    txTypeId: 'business',
    amount: 75.00,
    currencyCode: 'USD',
    timestamp: "2016-07-25T17:17:37-07:00"
  }, {
    recipientId: 'jknoxville@jackass.com',
    senderId: 'bwayne@batman.com',
    txTypeId: 'gift',
    amount: 2475.00,
    currencyCode: 'KRW',
    timestamp: "2016-03-16T03:41:37-07:00"
  }, {
    recipientId: 'achang@xyz.com',
    senderId: 'bwayne@batman.com',
    txTypeId: '',
    amount: 2345.00,
    currencyCode: 'KRW',
    timestamp: "2016-08-12T07:45:37-07:00"
  }, {
    recipientId: 'myeung@abc.com',
    senderId: 'achang@xyz.com',
    txTypeId: '',
    amount: 175.00,
    currencyCode: 'CAD',
    timestamp: "2016-10-25T17:05:37-07:00"
  }, {
    recipientId: 'myeung@abc.com',
    senderId: 'achang@xyz.com',
    txTypeId: '',
    amount: 75.00,
    currencyCode: 'USD',
    timestamp: "2016-04-02T17:09:37-07:00"
  }, {
    recipientId: 'achang@xyz.com',
    senderId: 'jknoxville@jackass.com',
    txTypeId: 'gift',
    amount: 75.00,
    currencyCode: 'USD',
    timestamp: "2016-10-21T17:11:37-07:00"
  }, {
    recipientId: 'myeung@abc.com',
    senderId: 'achang@xyz.com',
    txTypeId: 'business',
    amount: 875.00,
    currencyCode: 'CNY',
    timestamp: "2016-05-28T21:51:37-07:00"
  }, {
    recipientId: 'jknoxville@jackass.com',
    senderId: 'achang@xyz.com',
    txTypeId: 'gift',
    amount: 75.00,
    currencyCode: 'USD',
    timestamp: "2016-04-03T19:55:37-07:00"
  }, {
    recipientId: 'bwayne@batman.com',
    senderId: 'jknoxville@jackass.com',
    txTypeId: 'business',
    amount: 8275.00,
    currencyCode: 'JPY',
    timestamp: "2016-03-02T10:13:37-07:00"
  }, {
    recipientId: 'jknoxville@jackass.com',
    senderId: 'myeung@abc.com',
    txTypeId: 'gift',
    amount: 75.00,
    currencyCode: 'USD',
    timestamp: "2016-03-12T13:34:37-07:00"
  }, {
    recipientId: 'myeung@abc.com',
    senderId: 'bwayne@batman.com',
    txTypeId: 'gift',
    amount: 275.00,
    currencyCode: 'CNY',
    timestamp: "2016-10-19T18:29:37-07:00"
  }
];

function transactionsReducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    /*
    case YOUR_ACTION: {
      // Modify next state depending on the action and return it
      return nextState;
    }
    */
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

module.exports = transactionsReducer;
