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
function App() {
  const theme = createTheme({
    overrides: {
      MuiAppBar: {
        colorPrimary: { backgroundColor: "#2E3440" },
      },
    },
  });
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const res = await verify_api();
      console.log(res)
      if (res.name != null) {
        dispatch({ type: "login", payload: { ...res } });
        navigate("/");
      } else {
        navigate("/user/login");
      }
    };
    verify();
  }, []);

  return (
      <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>

            <Route path="/user/:id" element={<Cred />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
            <Route path="/quiz-result" element={<Result />}></Route>
          </Routes>
       
      </ThemeProvider>
  );
}

export default App;
