import React,{useState,useEffect} from 'react'
import classes from './style.module.css'


const Options = (props) => {
 

const [options,setOptions]=useState([])

console.log(props.options)
 useEffect(() => {
  const handleIndex=()=>{
    const temp=[...props.options]
    console.log(temp)
    setOptions(temp)
   console.log(options)
  }
  handleIndex()
 }, [props.options]);


//  const colorHandle=(index)=>{
//    let temp=[...color]
//    let j=temp.findIndex(x=>x=='#623445')

//    if(j!=-1){
//      temp[j]='#345673'
//    }
//    temp[index]='#623445'
//    setColor(temp)
//  }

  const handleClick=(guess)=>{
  props.answer(guess)
     props.setSelected(guess)
  }

  return (
    <div className={classes.options}>
    {/* <button className={classes.option} style={{backgroundColor:color[0]}} onClick={()=>handleClick(options[0],0)}>{options[0]}</button>
    <button className={classes.option} style={{backgroundColor:color[1]}} onClick={()=>handleClick(options[1],1)}>{options[1]}</button>
    <button className={classes.option} style={{backgroundColor:color[2]}} onClick={()=>handleClick(options[2],2)}>{options[2]}</button>
    <button className={classes.option} style={{backgroundColor:color[3]}} onClick={()=>handleClick(options[3],3)}>{options[3]}</button> */}
    
    {
      options && options.map(option=> <button className={classes.option} onClick={()=>handleClick(option)} style={{backgroundColor:`${props.guess===option?'#66bb6a':'#2E3440'}`,color:`${props.guess===option?'#2E3440':'#66bb6a'}`}}>{option}</button>)
    }

    </div>
  )
}

export default Options
