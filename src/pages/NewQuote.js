import React from "react";
import { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";

import { addQuote } from "../lib/api";
import useHttp from "../hooks/use-http"; // go see what this custom hook does!!!! what it wants as args and what it returns!!

function NewQuote() {
  const history = useHistory();
  // "programmatic navigation" - we will manipulate the history object to navigate user back to the quotes path after user adds a new quote

  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]); //navigate away from page status indicates app is done posting new quote to firebase

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
}

export default NewQuote;
