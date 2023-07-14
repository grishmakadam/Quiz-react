import React,{useState} from 'react'
import { Button, Grid } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';

const Button1 = (props) => {


const handle=()=>{
  props.handleCategory(props.item.category)

}

let backgroundcolor=props.item.selected?'#66bb6a':'#4C566A'
let color=props.item.selected?'#2E3440':'#D8DEE9'
  return (
    <Grid item xs={12} md={6}>
      <Button
        variant="contained"
        fullWidth={true}
        onClick={handle}
        style={{backgroundColor:backgroundcolor,color:color,fontWeight:'bold'}}
      >
        {props.item.category}
      </Button>
    </Grid>

  )
}

export default Button1
