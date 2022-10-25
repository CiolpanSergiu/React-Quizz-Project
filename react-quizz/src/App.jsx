import React from "react";
import Question from "./components/Question";
import {nanoid} from 'nanoid';

export default function App() {

  //this was originally set to false but everytime Start Quizz button was pressed and the state would change to true
  //the questions and answers show only after the page was reloaded;
  const [quizz, setQuizz] = React.useState();

  const [quizzData, setQuizzData] = React.useState([]);

  const [quizzResults, setQuizzResults] = React.useState({questionsAnswered: 0, displayResults: false});

  const [correctQuestions, setCorrectQuestions] = React.useState(0);

  const [quizzElements, setQuizzElements] = React.useState();

  const [isQuizzFinished, setIsQuizzFinished] = React.useState(false);
  
  const doubleQuote = /&quot;/g
  const singleQuote = /&#039;/g;

  function startQuizz() {
    setQuizz(true);
  }

  function getQuizzData() {
    //   don't know why but after fetching the data and converting it to a json every " / ' is replaced by 
    //   is's HTML character code. I replaced just the single quote and double quotes characters in each questions and answer
    //   because they are most frequently. There may be another character occurrence but i have yet to encounter one;
    //   don't know if there is another way to get rid of them or if there is a way to get data without them.
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

  function getSpecificAnswers(answerClass) {
    return document.getElementsByClassName(answerClass);
  } 

  function getSelectedAnswersText(answersArr) {
    const selectedAnswersArr = [];

    for(let i = 0; i < answersArr.length; i++){
      selectedAnswersArr.push(answersArr[i].innerText)
    }

    return selectedAnswersArr;
  }

  function handleSubmit() {

    const selectedAnswers = getSpecificAnswers('answer selected');
    const allAnswers = getSpecificAnswers('answer');
    const selectedAnswersArr = getSelectedAnswersText(selectedAnswers);

    checkAnswers(selectedAnswersArr, selectedAnswers);

    showCorrectAnswers(allAnswers)

    setQuizzResults({questionsAnswered: selectedAnswers.length, displayResults: true});

    setIsQuizzFinished(true);
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
    setIsQuizzFinished(false);
    getQuizzData();
    setQuizzResults({questionsAnswered: 0, displayResults: false});
    setCorrectQuestions(0)
  }

  return(
    quizz ?
    <div className="quizz-page-container">
      <h1 className="quizz-page-header">React Quizz</h1>
      {quizzElements}
      {quizzResults.displayResults && <h3 className="results">You answered {correctQuestions}/{quizzResults.questionsAnswered} question!</h3>} 
      <button 
        className="submit-btn"
        onClick={isQuizzFinished ? () => restartQuizz() : () => handleSubmit()}
        >
          {isQuizzFinished ? "Restart Quizz" : "Submit Quizz"}
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