export const calculateScore = (questions) => {
  let score = 0;

  for (let i = 0; i < 5; i++) {
    if (questions[i].guess === questions[i].correct) {
      score += 1;
    }
  }
  return score;
};
