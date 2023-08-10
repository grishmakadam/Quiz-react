import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button1 from "./Button1";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

const Main = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState();
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const response = await axios.get(
        "https://the-trivia-api.com/api/categories"
      );
      const data = await response.data;
      const temp = [];

      for (let i in data) {
        temp.push({ category: i, selected: false });
      }
      setCategories(temp);
      console.log(temp);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleCategory = (category) => {
    let temp = [...categories];
    let i = temp.findIndex((x) => x.category === category);
    let j = temp.findIndex((x) => x.selected === true);
    console.log(j);
    if (j != -1) {
      temp[j].selected = false;
    }

    temp[i].selected = true;
    setCategories(temp);
    const x = category.split(" ").join("");
    setCategory(x);
    console.log(x);
  };

  return (
    <>
      <Grid
        container
        sx={{ overflow: "hidden" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item container spacing={3} style={{ margin: "40px" }}>
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={100} color="secondary" />
            </div>
          )}
          {categories.map((item) => (
            <Button1
              item={item}
              key={item.category}
              handleCategory={handleCategory}
            />
          ))}
        </Grid>

        <Grid item justifyContent="center">
          <Link to={`/quiz/${category}`} sx={{ textDecoration: "none" }}>
            <Button
              disabled={loading}
              variant="contained"
              style={{
                backgroundColor: "#66bb6a",
                marginTop: "2rem",
                fontWeight: "bold",
              }}
            >
              Start Quiz
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
