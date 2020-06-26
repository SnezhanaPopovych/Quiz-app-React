import React, { Component } from 'react'
// import axios from '../../axios/axios-quiz'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import { createControl, validate, validateForm } from '../../form/formFrameworks'
import Auxillary from '../../hoc/Auxillary/Auxillary'
import classes from '../QuizCreator/QuizCreator.module.css'
import {connect} from 'react-redux'
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'
// import {applyMiddleware} from 'redux'

function createOptionControl(number) {
  return createControl({
    label: `Option ${number}`,
    errorMessage: 'Value can\'t be empty',
    id: number
  }, {
    required: true
  })
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter the question', 
      errorMessage: 'Question can\'t be empty'
    }, {
      required: true
    }),
    optin1: createOptionControl(1),
    optin2: createOptionControl(2),
    optin3: createOptionControl(3),
    optin4: createOptionControl(4)
  }
}

class QuizCreator extends Component {

  state = {
    // quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()
  }

  onSubmiHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = event => {
    event.preventDefault()

    // const quiz = this.state.quiz.concat()
    // const index = quiz.length + 1

    const {question, optin1, optin2, optin3, optin4} = this.state.formControls

    const questionItem = {
      question: question.value,
      // id: index,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: optin1.value, id: optin1.id },
        { text: optin2.value, id: optin2.id },
        { text: optin3.value, id: optin3.id },
        { text: optin4.value, id: optin4.id }
      ]
    }

    this.props.createQuizQuestion(questionItem)
    // quiz.push(questionItem)

    this.setState({
      // quiz: quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
  }

  createQuizHandler = event => {
    event.preventDefault()
    
    // try {
    // await axios.post('quizes.json', this.state.quiz)
    
    this.setState({
      // quiz: [],
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })

    this.props.finishCreateQuiz()
    // } catch (e) {
    //   console.log(e)
    // }
  }

  onChangeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = value
    control.touched = true
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
    // console.log(this.state)
  }

  renderControls () {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Auxillary key={controlName + index}>
          <Input
            value={control.value}
            valid={control.valid}
            errorMessage={control.errorMessage}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            onChange={event => this.onChangeHandler(event.target.value, controlName)}
          />
          { index === 0 ? <hr /> : null }
        </Auxillary>
      )
    })
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  render() {

    const select = <Select
      label="Select right answer"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>

          <form onSubmit={this.onSubmiHandler}>

            { this.renderControls() }

            { select }

            <Button
              type="primary"
              onRepeatClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
              >
                Add question
            </Button>

            <Button
              type="success"
              onRepeatClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
              >
                Create test
            </Button>

          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)