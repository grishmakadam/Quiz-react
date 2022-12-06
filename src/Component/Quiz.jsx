import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import Question from './Question';
import { CircularProgress } from '@material-ui/core';
const Quiz = (props) => {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [counter, setCounter] = useState(0)
   
 
   
    const location = useLocation()
    useEffect(() => {
        setLoading(true)
        const fetch = async () => {
            const link = `https://the-trivia-api.com/api/questions?categories=${location.state.category}&limit=5&difficulty=easy`
            const response = await axios.get(link)
            const data = await response.data
            console.log(data)
            const temp = []
            for (let i of data) {
                const temp1=[...i.incorrectAnswers,i.correctAnswer]
                for(let k=0;k<temp1.length;k++){
                    let j=Math.floor(Math.random()*(k+1));
                    let p=temp1[k]
                    temp1[k]=temp1[j]
                    temp1[j]=p
                  }
                const obj={'question':i.question,'options':[...temp1],'correct':i.correctAnswer,'guess':''}
                temp.push(obj)
            }
            setQuestions(temp)

            setLoading(false)

        }

        fetch()

    }, []);

    const handleCounter=(type)=>{
      if(type==='+' && counter<questions.length){
        setCounter(prevCounter=>prevCounter+1)
       
      }
      else{
        setCounter(prevCounter=>prevCounter-1)
      }
    }

    const calculateScore=()=>{
        let score=0


        for(let i=0;i<5;i++){
            console.log(questions[i].correct===questions[i].correct)
            if(questions[i].guess===questions[i].correct){
                score+=1
            }
        }
        return score
    }
  
    const handleAnswers=(guess)=>{
        let temp=[...questions]
        temp[counter].guess=guess
        setQuestions(temp)
     
    }


    return (
        <>
            {!loading && questions[counter]?
          
            <Question question={questions[counter].question} options={questions[counter].options} 
            handleCounter={handleCounter}   answer={handleAnswers} calculateScore={calculateScore} guess={questions[counter].guess} counter={counter}/>

          
           : <div style={{display:'flex',alignItems:'center',height:'100vh',width:'100vw',justifyContent:'center'}}><CircularProgress  size={100} color='secondary'/></div>
            
            }
        </>
    )
}

export default Quiz
