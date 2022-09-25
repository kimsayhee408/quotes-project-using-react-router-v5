import { Switch, Route, Redirect } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
// if any of the ROUTES below a certain route starts with the same path, should use the "exact" property

function App() {
  return (
    <Layout>
      <Route path="/" exact>
        <Redirect to="quotes" />
      </Route>
      <Switch>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>

        <Route path="/quotes/:quoteId">
          {/* : means /quotes/ANYTHING will render <QuoteDetail >,
          And whatever value that is, we can get it inside <QuoteDetail> using the useParams hook() then access the .quoteId  */}
          {/*So the flow is: The VIEW FULLSCREEN button for any quote from the all quotes page (inside QuoteItem) is a LINK that changes the path to ex. domain.com/quotes/q1.
          This Route we establish in App.js means anytime user is at path domain.com/quotes/ANYTHING, React will try to render <QuoteDetail>.  And in QuoteDetail --> this is the component where we parse the URL params to find the quote from the list of quotes that matches the Id so we can render the details*/}
          <QuoteDetail />
        </Route>

        <Route path="/new-quote">
          <NewQuote />
        </Route>

        <Route path="*">
          {/*Fallback content, that will match any path that did not match any of the previously listed Routes' paths.  */}
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
