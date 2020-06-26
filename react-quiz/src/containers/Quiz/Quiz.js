import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from '../../axios/axios-quiz';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import classes from './Quiz.module.css';
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends Component {

  // state = {
  //   results: {},
  //   isFinished: false,
  //   activeQuestion: 0,
  //   answerState: null,
  //   quiz: [],
  //   loading: true
  // }

  // onAnswerClickHandler = answerId => {
    // if (this.state.answerState) {
    //   const key = Object.keys(this.state.answerState)[0]
    //   if (this.state.answerState[key] === 'success') {
    //     return
    //   }
    // }

    // const question = this.state.quiz[this.state.activeQuestion]
    // const results = this.state.results

    // if (question.rightAnswerId === answerId) {

    //   if (!results[question.id]) {
    //     results[question.id] = 'success'
    //   }

    //   this.setState({answerState: { [answerId]: 'success', results }})

    //   const timeout = window.setTimeout(() => {
    //     if (this.isQuestionFinished()) {
    //       this.setState({
    //         isFinished: true
    //       })
    //     } else {
    //       this.setState((prevState) => ({
    //         activeQuestion: prevState.activeQuestion + 1,
    //         answerState: null
    //       }))
    //     }

    //     window.clearTimeout(timeout)
    //   }, 1000)

    // } else {
    //   results[question.id] = 'error'
    //   this.setState({answerState: { [answerId]: 'error', results }})
    // }
    // console.log(this.state.results)
  // }

  // isQuestionFinished() {
  //   return this.props.activeQuestion + 1 === this.props.quiz.length
  // }

  // onRepeatClickHandler= () => {
  //   this.setState({
  //     results: {},
  //     isFinished: false,
  //     activeQuestion: 0,
  //     answerState: null
  //   })
  // }

  componentDidMount() {
    // console.log(this.props.match.params.id)
    this.props.fetchQuizById(this.props.match.params.id)
    // try {
    //   const response = await axios.get(`quizes/${this.props.match.params.id}.json`)
    //   const quiz = response.data

    //   this.setState({
    //     quiz,
    //     loading: false
    //   })
    // } catch (e) {
    //   console.log(e)
    // }
    // console.log('Quiz ID: ', this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all the questions</h1>

          {
            this.props.loading || !this.props.quiz // или ||
            ? <Loader />
            : this.props.isFinished
              ? <FinishedQuiz
                results={this.props.results}
                quiz={this.props.quiz }
                onRepeatClick={this.props.retryQuiz}
              />
              : <ActiveQuiz 
                answers={this.props.quiz[this.props.activeQuestion].answers}
                question={this.props.quiz[this.props.activeQuestion].question}
                onAnswerClick={this.props.quizAnswerClick}
                quizLength={this.props.quiz.length}
                answerNumber={this.props.activeQuestion + 1}
                state={this.props.answerState}
              />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)