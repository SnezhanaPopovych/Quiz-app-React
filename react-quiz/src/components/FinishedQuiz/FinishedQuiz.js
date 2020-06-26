import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total += 1;
    }
    return total
  }, 0)
  // console.log(Object.keys(props.results))
  // console.log(successCount)
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {
          props.quiz.map((quizItem, index) => {
            let spanElement = props.results[quizItem.id] === 'error' ? <span className={classes.error}>&#10539;</span> : <span className={classes.success}>&#10003;</span>

            return (<li key={index}>
              <strong>{index + 1}</strong>&nbsp;
              {quizItem.question}
              {spanElement}
            </li>)
          })
        }
      </ul>

      <p>Right {successCount} from {props.quiz.length}</p>

      <div>
        <Button onRepeatClick={props.onRepeatClick} type="primary">Repeat</Button>
        <Link to="/">
          <Button type="success">Go to test's page</Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz