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
  
  const doubleQuote = /&quot;/g
  const singleQuote = /&#039;/g;

  function startQuizz() {
    setQuizz(true);
  }

  function getQuizzData() {
    //don't know why but after fetching the data and converting it to a json evert "/' is replaced by 
    //is's HTML character code. I replaced just the single quote and double quotes characters in each questions and answer
    // because they are most frequently but there may be another character occurrence but i have yet to encounter one;
    //don't know if there is another way to get rid of them or if there is a way to get data without them.
    return fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(response => response.json())
    .then(data => setQuizzData(data.results))
  }

  function checkAnswers(answersArr, answers) {

    for(let i = 0; i < answersArr.length; i++){
      const formatedCorrectAnswer = quizzData[i].correct_answer.replace(singleQuote, "'").replace(doubleQuote, '"')
      if(answersArr[i] !== formatedCorrectAnswer){
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
        const formatedCorrectAnswer = quizzData[j].correct_answer.replace(singleQuote, "'").replace(doubleQuote, '"')
        if(answers[i].innerText === formatedCorrectAnswer){
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