import React from 'react'
import classes from './QuizList.module.css'
import Loader from '../../components/UI/Loader/Loader'
import {NavLink} from 'react-router-dom'
// import axios from '../../axios/axios-quiz'
import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz'

class QuizList extends React.Component {

  // state = {
  //   quizes: [],
  //   loading: true
  // }

  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

 componentDidMount() {
   this.props.fetchQuizes()
    // try {
    //   const response = await axios.get('quizes.json')
      
    //   const quizes = []
    //   Object.keys(response.data).map((key, index) => {
    //     return quizes.push({
    //       id: key,
    //       name: `Test №${index + 1}`
    //     })
    //   })

    //   this.setState({
    //     quizes,
    //     loading: false
    //   })

    // } catch (e) {
    //   console.log(e)
    // }
  }

  render () {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz List</h1>
        
          {this.props.loading && this.props.quizes.length !== 0
            ? <Loader />
            : <ul>
                {this.renderQuizes()}
              </ul>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)