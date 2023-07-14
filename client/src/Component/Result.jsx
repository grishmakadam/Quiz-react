import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container,Typography } from '@material-ui/core'
import { add_score_api } from './api/apiCalls'
import { UserContext } from './Context'
const Result = (props) => {
const {user}=useContext(UserContext)
  const location = useLocation()
  
  useEffect(() => {
    const send = async () => {
      const res = await add_score_api({ email: user.email, category: location.state.category, score: location.state.score })
      console.log(res)
    }
    send()

  },[])
  return (
    <Container maxWidth='md' style={{backgroundColor:'#2E3440',height:'100vh',display:'flex',flexDirection:'column',justifyContent:'center'}}>
    <Typography variant="h3" align='center' style={{ padding: '1rem', fontWeight: 'bold', color: '#66bb6a' }}>Result</Typography>
    <Typography variant="h3" align='center' style={{ padding: '1rem', fontWeight: 'bold', color: '#66bb6a' }}>Your score is <span style={{color:'#66bb6b',fontSize:'4rem'}}>{location.state.score}</span> / 5</Typography>
    </Container>
  )
}

export default Result
