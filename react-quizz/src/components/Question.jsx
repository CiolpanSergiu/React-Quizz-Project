import React from "react";
import {nanoid} from 'nanoid';
import Answers from './Answers';

export default function Question(props) {
    const data = props.data;
    
    const doubleQuote = /&quot;/g;
    const singleQuote = /&#039;/g;

    //Fisher–Yates shuffle
    function shuffleArray(arr) {
        for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    //unshuffled
    const questionAnswers = shuffleArray([
        {
            value: data.incorrect_answers[0].replace(singleQuote, "'").replace(doubleQuote, '"'),
            isSelected: false
        },
        {
            value: data.incorrect_answers[1].replace(singleQuote, "'").replace(doubleQuote, '"'),
            isSelected: false
        },
        {
            value: data.incorrect_answers[2].replace(singleQuote, "'").replace(doubleQuote, '"'),
            isSelected: false
        },
        {
            value: data.correct_answer.replace(singleQuote, "'").replace(doubleQuote, '"'),
            isSelected: false
        },
    ]);
    
    return(
        <div className="quizz-element">
            <h3 className="question">{`${props.questionNumber}.  ${data.question.replace(singleQuote, "'").replace(doubleQuote, '"')}`}</h3>
            <h3 className="category">{`Category: ${data.category}`}</h3>
            <Answers 
                answers={questionAnswers}
                correctAnswer={data.correct_answer}
                submited={props.submited}
            />            
        </div>
    )
}