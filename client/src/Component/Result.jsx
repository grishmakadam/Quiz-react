import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import ReactSpeedometer from "react-d3-speedometer";
import classes from "./style.module.css";
import useUtils from "./utils/exports";
import { labels } from "./utils/labels";

const Result = () => {
  const location = useLocation();
  const { navigate } = useUtils();

  return (
    <Grid
      container
      maxWidth="md"
      className={classes.container}
      style={{
        flexDirection: "column",
      }}
    >
      <Grid item>
        <ReactSpeedometer
          minValue={0}
          maxValue={6}
          value={location.state.score + 0.5}
          width={400}
          height={200}
          textColor={"#fff"}
          segments={6}
          customSegmentLabels={labels}
        />
      </Grid>
      <Grid
        item
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Typography style={{ fontSize: "20px", color: "#fff" }}>
          Your Score is
          <span style={{ fontSize: "30px" }}> {location.state.score}</span>/5
        </Typography>
        <Button
          variant="contained"
          style={{
            color: "#2E3440",
            backgroundColor: "#fff",
            marginTop: "10px",
          }}
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Grid>
    </Grid>
  );
};

export default Result;
