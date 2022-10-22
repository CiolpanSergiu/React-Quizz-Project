import React from "react";
import {nanoid} from 'nanoid';
import Answers from './Answers';

export default function Question(props) {
    const data = props.data;

    //Fisher–Yates shuffle
    //don't know. searched on internet
    function shuffleArray(arr) {
        for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    const questionAnswers = shuffleArray([
        {
            value: data.incorrect_answers[0],
            isSelected: false
        },
        {
            value: data.incorrect_answers[1],
            isSelected: false
        },
        {
            value: data.incorrect_answers[2],
            isSelected: false
        },
        {
            value: data.correct_answer,
            isSelected: false
        },
    ]);
    
    return(
        <div className="quizz-element">
            <h3 className="question">{`${props.questionNumber}.  ${data.question}`}</h3>
            <Answers 
                answers={questionAnswers}
                correctAnswer={data.correct_answer}
                submited={props.submited}
            />            
        </div>
    )
}