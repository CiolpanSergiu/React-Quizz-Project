import React from "react";
import Question from "./components/Question";
import {nanoid} from 'nanoid';

export default function App() {

  const [quizz, setQuizz] = React.useState(false);

  const [quizzData, setQuizzData] = React.useState([]);

  const [answeredQuestions, setAnsweredQuestions] = React.useState([0, false]);

  const [correctQuestions, setCorrectQuestions] = React.useState(0);

  const [quizzElements, setQuizzElements] = React.useState();

  const [won, setWon] = React.useState(false);


  function startQuizz() {
    setQuizz(true);
  }

  function getQuizzData() {
    return fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(response => response.json())
    .then(data => setQuizzData(data.results))
  }

  function checkAnswers(answersArr, answers) {

    for(let i = 0; i < answersArr.length; i++){
      if(answersArr[i] !== quizzData[i].correct_answer){
        answers[i].classList.add('incorrect-answer');
      } else {
        answers[i].classList.add('correct-answer');
        setCorrectQuestions(prevState => prevState + 1);
      }
    }
  }

  function showCorrectAnswers(answers) {
    for(let i = 0; i < answers.length; i++){
      for(let j = 0; j < quizzData.length; j++){
        if(answers[i].innerText === quizzData[j].correct_answer){
          answers[i].classList.add("correct-answer");
        }
      }
    }
  }

  function submitQuizz(x) {
    const selectedAnswers = document.getElementsByClassName('answer selected');
    const allAnswers = document.getElementsByClassName('answer');

    const selectedAnswersArr = [];
    // const allAnswersArr = []

    for(let i = 0; i < selectedAnswers.length; i++){
      selectedAnswersArr.push(selectedAnswers[i].innerText)
    }

    // for(let i = 0; i < allAnswers.length; i++){
    //   allAnswersArr.push(allAnswers[i].innerText)
    // }

    checkAnswers(selectedAnswersArr, selectedAnswers);

    showCorrectAnswers(allAnswers)

    setAnsweredQuestions([selectedAnswers.length, true]);

    setWon(true);
  }

  React.useEffect(()=>{
    getQuizzData();
  }, []);



  React.useEffect(() => {
    setQuizzElements(quizzData.map((question, index) => {
      return (
        <Question 
          key={nanoid()}
          questionNumber={index + 1}
          data={question} 
        />
      )
    }))
  }, [quizz])

  function restartQuizz() {
    setQuizz(false);
    setWon(false);
    getQuizzData();
    setAnsweredQuestions([0, false]);
    setCorrectQuestions(0)
  }

  return(
    quizz ?
    <div className="quizz-page-container">
      <h1 className="quizz-page-header">React Quizz</h1>
      {quizzElements}
      {answeredQuestions[1] && <h3 className="results">You answered {correctQuestions}/{answeredQuestions[0]} question!</h3>} 
      <button 
        className="submit-btn"
        onClick={won ? () => restartQuizz() : () => submitQuizz()}
        >
          {won ? "Restart Quizz" : "Submit Quizz"}
      </button>
    </div>
    :
    <div className="start-page">
      <h1 className="start-page-header">ReactQuizz</h1>
      <h3 className="start-page-description">Press the button when you are ready</h3>
      <button className="start-quizz-btn" onClick={() => startQuizz()}>Start Quizz</button>
    </div>
  )
}