import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import { useDispatch } from "react-redux";
import { clearOut } from "./redux/reducers/questionsSlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearOut());
  }, []);
  return (
    <>
      <Main />
    </>
  );
};

export default LandingPage;
