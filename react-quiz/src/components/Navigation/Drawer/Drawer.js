import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Drawer extends Component {
  
  handleClick = () => {
    this.props.onClose()
  }

  renderLinkes(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink 
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.handleClick}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    
    let links = [
      {to: '/', label: 'Quiz list', exact: true}
    ]

    if (this.props.isAuthenticated) {
      links.push(
        {to: '/quiz-creator', label: 'Create test', exact: false},
        {to: '/logout', label: 'Logout', exact: false},
      )
    } else {
      links.push(
        {to: '/auth', label: 'Authorization', exact: false}
      )
    }

    const cls = [classes.Drawer]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinkes(links) }
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
      </React.Fragment>
    )
  }
}

export default Drawer