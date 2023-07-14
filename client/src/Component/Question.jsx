import { Card, Button, Grid } from '@material-ui/core'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Options from './Options'
import classes from './style.module.css'

const Question = (props) => {
  const [selected,setSelected]=useState('')
 


  return (
    <Grid container className={classes.container}>

     
        <div className={classes.card}>
         <div className={classes.question}>{props.question}</div>
          <Options options={props.options} answer={props.answer} selected={selected} setSelected={setSelected} guess={props.guess} />
          <div className={classes.prevnext}>
          <Button onClick={props.handleCounter.bind(null, '-')} disabled={props.counter==0?true:false} className={classes.button} style={{backgroundColor:'#66bb6a'}}>Previous</Button>
          <Button onClick={props.handleCounter.bind(null, '+')} disabled={props.counter==4?true:false} className={classes.button} style={{backgroundColor:'#66bb6a'}}>Next</Button>
          </div>
          {props.counter==4 && <Link to="/quiz-result" state={{score:props.calculateScore(),category:props.category}}><Button style={{textDecoration:'none',backgroundColor:'#66bb6a'}}>Submit</Button></Link>}
        </div>



    </Grid>
  )
}

export default Question
