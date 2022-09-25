import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "completed",
    };
  }

  return state;
}
// the httpState and httpReducer explained:
//at various points of a HTTP request, the combination of the httpState's 3 properties will indicate will reflect "the http state" - together by holding information about the request status, responsedata, and error message
// SO in the components where we use this reusable hook, we will get access to an object with a 'status' property whose value we can use to
// for ex. navigate away from the page if(status==='completed');
// or create  a <isLoading> state in that component to ex. show a loading spinner while status==='pending'

// In our React components where we want to send http requests, we can call our custom useHttp() to get access to the properties inside the httpState
// hook explained:
//1st arg: function that can be called by this hook  to send the actual request.  This function will be one found in api.js
//2nd arg: boolean o know whether it should start, in loading state or not, which can be helpful if we work on a component that sends a request right away,
// return value: an object with 4 properties -- 3 which are properties coppied from the httpState (status, data, error); and 1 method (the sendRequest function which dispatches a SEND request to the httpReducer)

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;

// in the component where you use useHttp; you can use the
