import React from 'react'

const Question = (props) => {
  return (
    <div className="questionContainer">
      <div className="question">{props.question}</div>
      <div className="options">{props.options.map((o) => `${o}\t`)}</div>
      <div className="correctAns">{props.answer}</div>
    </div>
  )
}

export default Question;
