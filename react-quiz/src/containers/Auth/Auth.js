import React, {Component} from 'react'
import classes from '../Auth/Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
// import axios from 'axios'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/auth'

// function validateEmail(email) {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Prompt rigth email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
          type: 'password',
          label: 'Password',
          errorMessage: 'Prompt rigth password',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6
          }
      }
    }
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )

    // const authData = {
    //   email: this.state.formControls.email.value,
    //   password: this.state.formControls.password.value,
    //   returnSecureToken: true
    // }

    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAiIFt1ksl0AMhisjeA6FbByh_L-Swd_Uw', authData)
    //   console.log(response.data)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
    // const authData = {
    //   email: this.state.formControls.email.value,
    //   password: this.state.formControls.password.value,
    //   returnSecureToken: true
    // }

    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiIFt1ksl0AMhisjeA6FbByh_L-Swd_Uw', authData)
    //   console.log(response.data)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
    // console.log(`${controlName} ${event.target.value}`)

    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls,
      isFormValid
    })
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={control + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          errorMessage={control.errorMessage}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Autherization</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            
            {this.renderInputs()}

            <Button
              type="success"
              onRepeatClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Log in
            </Button>

            <Button
              type="primary"
              onRepeatClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Registration
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)