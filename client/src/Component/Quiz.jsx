import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import Question from "./Question";
import { CircularProgress } from "@material-ui/core";
import fetchQuestions from "./redux/reducers/questionsSlice";
import useUtils from "./utils/exports";

const Quiz = () => {
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  const {questions,counter,dispatch}=useUtils()

  useEffect(() => {
    const fetch = async () => {
      // const link = `https://the-trivia-api.com/api/questions?categories=${location.state.category}&limit=5&difficulty=easy`
      // const response = await axios.get(link)

      console.log("loading", loading);
      setLoading(true);
      dispatch(fetchQuestions(category));
      // console.log(questions)

      setLoading(false);
    };

    if (questions.length == 0) {
      fetch();
    }
  }, [counter]);

  return (
    <>
      {!loading && questions.length != 0 ? (
        <Question category={category} />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "80vh",
            width: "100vw",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={100} color="secondary" />
        </div>
      )}
    </>
  );
};

export default Quiz;
