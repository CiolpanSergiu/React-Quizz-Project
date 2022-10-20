import React from "react";
import Question from "./components/Question";
import {nanoid} from 'nanoid';

export default function App() {

  const [quizz, setQuizz] = React.useState(false);

  const [quizzData, setQuizzData] = React.useState([]);

  const [isSubmited, setIsSubmited] = React.useState(false);

  function startQuizz() {
    setQuizz(true);
  }

  function getQuizzData() {
    return fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(response => response.json())
    .then(data => setQuizzData(data.results))
  }

  function submitQuizz(x) {
    setIsSubmited(true);
  }

  React.useEffect(()=>{
    getQuizzData();
  }, []);

  const quizzElements = quizzData.map((question, index) => {
    return (
      <Question 
        key={nanoid()}
        submited={isSubmited} 
        questionNumber={index + 1}
        data={question} 
      />
    )
  })

  return(
    quizz ?
    <div className="quizz-page-container">
      <h1 className="quizz-page-header">React Quizz</h1>
      {quizzElements}
      <button className="submit-btn" onClick={() => submitQuizz()}>Submit Answers</button>
    </div>
    :
    <div className="start-page">
      <h1 className="start-page-header">ReactQuizz</h1>
      <h3 className="start-page-description">Press the button when you are ready</h3>
      <button className="start-quizz-btn" onClick={() => startQuizz()}>Start Quizz</button>
    </div>
  )
}