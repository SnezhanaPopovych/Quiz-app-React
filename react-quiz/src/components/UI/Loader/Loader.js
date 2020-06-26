import React from 'react'
import classes from '../Loader/Loader.module.css'

const Loader = props => (
  <div className={classes.center}>
    <div className={classes.Loader}>
      <div/><div/>
    </div>
  </div>
)

export default Loader