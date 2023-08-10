import Quiz from "./Component/Quiz";
import Main from "./Component/Main";
import Result from "./Component/Result";
import "./App.css";
import { ThemeProvider, createTheme } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { UserContext, UserContextProvider } from "./Component/Context";

import Cred from "./Component/Cred";
import LandingPage from "./Component/LandingPage";
import { useEffect, useState } from "react";
import { verify_api } from "./Component/api/apiCalls";
import { useContext } from "react";
import Statistics from "./Component/Statistics";
import Navbar from "./Component/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "./Component/redux/reducers/userSlice";
import Question from "./Component/Question";
import { ToastContainer } from "react-toastify";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#66bb6a",
        contrastText: "#fff",
      },
      secondary: {
        main: "#fff",
      },
    },
    overrides: {
      MuiAppBar: {
        colorPrimary: { backgroundColor: "#2E3440" },
      },
    },
  });
  //const { user,dispatch } = useContext(UserContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const verify = async () => {
  //     const res = await verify_api();
  //     console.log(res);
  //     if (res.name != null) {
  //       dispatch(logIn(res));
  //       navigate("/");
  //     } else {
  //       dispatch(logOut());
  //       navigate("/user/login");
  //     }
  //   };
  //   if (user) {
  //     verify();
  //   }
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/show-scores" element={<Statistics />}></Route>
        <Route path="/user/:id" element={<Cred />}></Route>
        <Route path="/quiz/:category" element={<Quiz />}></Route>

        {/* <Route
          path="//:category/:id"
          element={<Question />}
        ></Route> */}
        <Route path="/quiz-result" element={<Result />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}

export default App;
