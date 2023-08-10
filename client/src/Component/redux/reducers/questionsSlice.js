import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import formatData from "../../utils/formatData";

const initialState = {
  questions: [],
  counter: 0,
};
const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  (category) => {
    return axios
      .get(
        `https://the-trivia-api.com/api/questions?categories=${category}&limit=5&difficulty=easy`
      )
      .then((res) => {
        const temp = formatData(res.data);
        return temp;
      })
      .catch((ex) => {
        return ex.message;
      });
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState: initialState,

  reducers: {
    set_guess: (state, action) => {
      state.questions[action.payload.index].guess = action.payload.option;
    },
    increment_counter: (state, action) => {
      state.counter += 1;
    },
    decrement_counter: (state, action) => {
      state.counter -= 1;
    },
    clearOut: (state) => {
      state.questions = [];
      state.counter = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
      console.log(state.questions);
    });
    builder.addCase(fetchQuestions.rejected, (state, action) => {
      state.questions = [];
    });
    builder.addCase(fetchQuestions.pending, (state, action) => {
      state.questions = [];
    });
  },
});

export const questionsReducer = questionsSlice.reducer;
export const { clearOut,set_guess,increment_counter,decrement_counter } = questionsSlice.actions;
export default fetchQuestions;
