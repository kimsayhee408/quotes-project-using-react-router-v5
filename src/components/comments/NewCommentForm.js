import { useRef } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";
import { useEffect } from "react";

const NewCommentForm = (props) => {
  const { onAddedComment } = props;

  const commentTextRef = useRef();

  const { sendRequest, error, status } = useHttp(addComment);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;
    // optional: Could validate here

    sendRequest({ commentData: { text: enteredText }, quoteId: props.quoteId }); // send the quoteId that we have through props to the http request -- because we need to add the new comment to a PARTICULAR quote
  };

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, onAddedComment, error]);

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}

      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
