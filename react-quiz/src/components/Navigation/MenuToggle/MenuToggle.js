import React from 'react'
import classes from './MenuToggle.module.css'

const MenuToggle = props => {
  const spanElement = (props.isOpen) ? <span className={`${classes.open} + ${classes.MenuToggle}`} onClick={props.onToggle}>&#215;</span> : <span className={classes.MenuToggle} onClick={props.onToggle}>&#8801;</span>

  return (
    <React.Fragment>{spanElement}</React.Fragment>
  )
}

export default MenuToggle