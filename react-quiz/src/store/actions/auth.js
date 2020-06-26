import axios from 'axios'
import {
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from './actionsTypes'

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiIFt1ksl0AMhisjeA6FbByh_L-Swd_Uw'

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAiIFt1ksl0AMhisjeA6FbByh_L-Swd_Uw'
    }

    const response = await axios.post(url, authData);
    let data = response.data

    const expirationData = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationData)

    dispatch(authSuccess(data.idToken))
    dispatch(autoLogout(data.expiresIn))
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => dispatch(logout()), time * 1000)
  }
}

export function logout() {

  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')

  return {
    type: AUTH_LOGOUT
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')

    if (!token) {
      dispatch(logout())
    } else {
      const expirationData = new Date(localStorage.getItem('expirationDate'))
      if (expirationData <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationData.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}