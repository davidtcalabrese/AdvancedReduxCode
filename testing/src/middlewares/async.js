/**
 * async middleware
 * 
 * - if action doesn't contain a payload with a promise, 
 * pass it to next middleware 
 * - if action contains payload with a promise, resolve promise,
 * replace payload with data and dispatch to middleware again
 */

export default ({ dispatch }) =>
  (next) =>
  (action) => {
    debugger;
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // wait for promise to resolve
    // then create new action and dispatch it
    action.payload.then((response) => {
      const newAction = { ...action, payload: response };
      dispatch(newAction);
    });
  };
