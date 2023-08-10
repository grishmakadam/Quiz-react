import React, { useState, useEffect } from "react";
import classes from "./style.module.css";
import { set_guess } from "./redux/reducers/questionsSlice";
import useUtils from "./utils/exports";

const Options = (props) => {
  const { dispatch } = useUtils();
  useEffect(() => {}, [props.options]);

 

  const handleClick = (guess) => {
    dispatch(set_guess({ index: props.counter, option: guess }));
  };

  return (
    <div className={classes.options}>
     
      {props.options &&
        props.options.map((option) => (
          <button
            className={classes.option}
            onClick={() => handleClick(option)}
            style={{
              backgroundColor: `${
                props.guess === option ? "#66bb6a" : "#2E3440"
              }`,
              color: `${props.guess === option ? "#2E3440" : "#66bb6a"}`,
            }}
          >
            {option}
          </button>
        ))}
    </div>
  );
};

export default Options;
