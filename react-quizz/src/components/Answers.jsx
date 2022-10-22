import React from "react";


export default function Answers(props) {
    
    const [answers, setAnswers] = React.useState(props.answers);

    function selectAnswer(currentAnswer) {
        setAnswers(prevState => prevState.map(element => {
           return element === currentAnswer ? 
            {value: element.value, isSelected: true} : 
            {value: element.value, isSelected: false};
        }))
    }

    return(
        <div className="answers-container">
            <button
                className={answers[0].isSelected ? "answer selected" : "answer"}
                onClick={() => selectAnswer(answers[0])}
                current_state={answers[0]}
            >
                {props.answers[0].value}
            </button>
            <button
                className={answers[1].isSelected ? "answer selected" : "answer"}
                onClick={() => selectAnswer(answers[1])}
                current_state={answers[1]}
            >
                {props.answers[1].value}
            </button>
            <button
                className={answers[2].isSelected ? "answer selected" : "answer"}
                onClick={() => selectAnswer(answers[2])}
                current_state={answers[2]}
            >
                {props.answers[2].value}
            </button>
            <button
                className={answers[3].isSelected ? "answer selected" : "answer"}
                onClick={() => selectAnswer(answers[3])}
                current_state={answers[3]}
            >
                {props.answers[3].value}
            </button>
        </div>
    )
}