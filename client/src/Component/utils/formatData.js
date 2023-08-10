export default function formatData(question) {
  const temp = [];
  for (let i of question) {
    const temp1 = [...i.incorrectAnswers, i.correctAnswer];
    for (let k = 0; k < temp1.length; k++) {
      let j = Math.floor(Math.random() * (k + 1));
      let p = temp1[k];
      temp1[k] = temp1[j];
      temp1[j] = p;
    }
    const obj = {
      question: i.question,
      options: [...temp1],
      correct: i.correctAnswer,
      guess: "",
    };
    temp.push(obj);
  }
  return temp;
};
