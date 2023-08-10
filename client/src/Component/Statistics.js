import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { show_scores } from "./api/apiCalls";
import BasicTable from "./DataTable";
import useUtils from "./utils/exports";
import classes from "./style.module.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Filler,
} from "chart.js";
import { Bar, Pie, getElementsAtEvent } from "react-chartjs-2";
import { toast } from "react-toastify";
import { logOut } from "./redux/reducers/userSlice";

ChartJS.register(ArcElement, Tooltip, Legend, Colors, Filler);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.color = "#000";

const Statistics = () => {
  const chartRef = useRef();
  const { navigate, dispatch } = useUtils();
  const [scores, setScores] = useState([]);

  const [pie, setPie] = useState({ labels: [], series: [], color: [] });

  const [bar, setBar] = useState({});
  const color = [
    "#ea5545",
    "#f46a9b",
    "#ef9b20",
    "#edbf33",
    "#ede15b",
    "#bdcf32",
    "#87bc45",
    "#27aeef",
    "#b33dc6",
    "#00bfa0",
  ];

  const format = (index, data = scores, labels = pie.labels) => {
    let y = [0, 0, 0, 0, 0, 0];
    data.forEach((x) => {
      if (x.categoryName === labels[index]) {
        y[x["quiz_score"]] += 1;
      }
    });
    return y;
  };
  const { user } = useUtils();

  useEffect(() => {
    const send = async () => {
      try {
        console.log(user);
        const res = await show_scores(user.email);

        const temp = {};
        if (res.status != false) {
          setScores((prev) => [...res.scores]);
          res.scores.forEach((x) => {
            if (x.categoryName in temp) {
              temp[x.categoryName] += 1;
            } else {
              temp[x.categoryName] = 1;
            }
          });

          setPie((prev) => ({
            labels: Object.keys(temp),
            series: Object.values(temp),
            color: color.slice(0, Object.keys(temp).length),
          }));
          setBar((prev) => ({
            name: Object.keys(temp)[0],
            data: format(0, res.scores, Object.keys(temp)),
            bgColor: color[0],
          }));
        } else {
          dispatch(logOut());
          setTimeout(() => {
            toast.error(res.error);
          }, 10);
        }
      } catch (ex) {
        navigate("/");
        setTimeout(() => {
          toast.error("hello");
        }, 10);
      }
    };

    send();
  }, []);

  const handleClick = (event) => {
    const z = getElementsAtEvent(chartRef.current, event);
    console.log(z[0].element.options.backgroundColor);
    setBar((prev) => ({
      name: pie.labels[z[0].index],
      data: format(z[0].index),
      bgColor: z[0].element.options.backgroundColor,
    }));
  };

  return (
    <>
      {scores.length != 0 && (
        <Grid container className={classes.stats}>
          <Grid item md={5} className={classes.pie}>
            <Pie
              options={{
                plugins: {
                  colors: {
                    forceOverride: false,
                  },
                  legend: {
                    position: "right",
                  },
                  title: {
                    display: true,
                    text: "No. of quizzes taken per category",
                    font: {
                      size: 16,
                    },
                  },
                },
                maintainAspectRatio: false,
              }}
              data={{
                labels: pie.labels,
                datasets: [
                  {
                    data: pie.series,
                    borderWidth: 1,
                    backgroundColor: pie.color,
                  },
                ],
              }}
              ref={chartRef}
              onClick={handleClick}
            />
          </Grid>
          <Grid item md={5} className={classes.bar}>
            <Bar
              options={{
                scales: {
                  y: {
                    ticks: {
                      precision: 0,
                    },
                    title: {
                      display: true,
                      text: "No. of quizzes taken",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Scores",
                    },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        size: 16,
                      },
                    },
                  },
                },
              }}
              data={{
                labels: [0, 1, 2, 3, 4, 5],
                datasets: [
                  {
                    label: bar.name,

                    data: bar.data,
                    backgroundColor: bar.bgColor,
                    fill: true,
                  },
                ],
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: "30px" }}>
            <BasicTable stats={scores} />
          </Grid>
        </Grid>
      )}
      {scores.length == 0 && (
        <Grid
          container
          className={classes.noDisplay}
        >
          <Typography
            style={{ color: "#fff", fontSize: "40px", fontStyle: "italic" }}
          >
            No data to show
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default Statistics;
