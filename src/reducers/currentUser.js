/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {} from '../actions/const';

const initialState = {
  name: {
    first: 'Albert',
    last: 'Chang'
  },
  email: 'achang@xyz.com',
  balance: 693321,
  currencyCode: 'USD'
};

function currentUserReducer(state = initialState, action) {
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

module.exports = currentUserReducer;
