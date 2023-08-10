import { Card, Button, Grid } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Options from "./Options";
import classes from "./style.module.css";
import { UserContext } from "./Context";
import { add_score_api } from "./api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  increment_counter,
  decrement_counter,
  clearOut,
} from "./redux/reducers/questionsSlice";
import { calculateScore } from "./utils/calculateScore";
import useUtils from "./utils/exports";

const Question = (props) => {
  const { questions, counter, user, dispatch, navigate } = useUtils();

  const handleClick = async () => {
    const score = calculateScore(questions);
    try {
      const res = await add_score_api({
        email: user.email,
        category: props.category,
        score: score,
      });
      dispatch(clearOut());
      navigate("/quiz-result", { state: { score: score }, replace: true });
    } catch (ex) {
      console.log(ex);
      navigate("/", { replace: true });
    }
  };

  const handleCounter = (type) => {
    if (type === "+" && counter < questions.length) {
      dispatch(increment_counter());
    } else {
      dispatch(decrement_counter());
    }
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.card}>
        <div className={classes.question}>{questions[counter].question}</div>
        <Options
          options={questions[counter].options}
          answer={questions[counter].answer}
          guess={questions[counter].guess}
          counter={counter}
        />
        <div className={classes.prevnext}>
          <Button
            onClick={handleCounter.bind(null, "-")}
            disabled={counter == 0 ? true : false}
            className={classes.button}
            style={{ backgroundColor: "#66bb6a" }}
          >
            Previous
          </Button>
          <Button
            onClick={handleCounter.bind(null, "+")}
            disabled={counter == 4 ? true : false}
            className={classes.button}
            style={{ backgroundColor: "#66bb6a" }}
          >
            Next
          </Button>
        </div>
        {counter == 4 && (
          <Button
            style={{ textDecoration: "none", backgroundColor: "#66bb6a" }}
            onClick={handleClick}
          >
            Submit
          </Button>
        )}
      </div>
    </Grid>
  );
};

export default Question;
