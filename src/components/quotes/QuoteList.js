import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  console.log("history", history);
  console.log("location", location);

  const queryParams = new URLSearchParams(location.search); //conveniently creates a JS object from the current URL's query string

  const isSortingAscending = queryParams.get("sort") === "asc";
  // determine if current sort is asending or descending from the query param value for the key'sort'.

  const changeSortingHandler = () => {
    // history.push(`/quotes?sort=` + (isSortingAscending ? "desc" : "asc"));
    // history.push(`${location.path}/?sort=${(isSortingAscending ? "desc" : "asc")}`)};
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };

  const sortQuotes = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
      if (ascending) {
        return quoteA.id > quoteB.id ? 1 : -1;
      } else {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
    });
  };

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending); // component renders sortedQuotes vs. props.quotes

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
        {/* make button text dynamic according to whether currently sorting asc or desc */}
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
