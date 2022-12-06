import { Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button1 from './Button1';
import { Link } from 'react-router-dom';
import {CircularProgress} from '@material-ui/core';

const Main = () => {
    const [categories, setCategories] = useState([])
const [loading,setLoading]=useState(false)
    const [category, setCategory] = useState()

    useEffect(() => {
        setLoading(true)
        const fetch = async () => {
            const response = await axios.get("https://the-trivia-api.com/api/categories")
            const data = await response.data
            const temp = []

            for (let i in data) {
                temp.push({ category: i, selected: false })
            }
            setCategories(temp)
            console.log(temp)
            setLoading(false)
        }
        fetch()
    }, []);

  
    const handleCategory = (category) => {
        let temp=[...categories]
        let i=temp.findIndex(x=>x.category===category)
        let j=temp.findIndex(x=>x.selected===true)
        console.log(j)
        if(j!=-1){
            temp[j].selected=false;
        }
   
        temp[i].selected=true;
        setCategories(temp)
        const x=category.split(" ").join("")
        setCategory(x)
        console.log(x)
    }
    
    return (
        <>
        <Container maxWidth='md' style={{backgroundColor:'#2E3440',height:'100vh',display:'flex',flexDirection:'column',justifyContent:'space-around'}} >
            <Typography variant="h3" align='center' style={{ padding: '1rem', fontWeight: 'bold', color: '#66bb6a' }}>Shivam's Brain</Typography>

            <Grid container spacing={3}>

                {loading && <div style={{display:'flex',alignItems:'center',height:'100vh',width:'100vw',justifyContent:'center'}}><CircularProgress  size={100} color='secondary'/></div>
}
                {categories.map(item => <Button1 item={item} key={item.category} handleCategory={handleCategory}   />)}
            </Grid>
            <div style={{display:'flex',justifyContent:'center'}}>
            <Link to="/quiz" state={{category:category}} style={{textDecoration:'none'}}>
            <Button
                variant="contained"
                style={{ backgroundColor: "#66bb6a",marginTop:'2rem',fontWeight:'bold'}}   
                           
                >
                Start Quiz
            </Button>
            </Link>
            </div>
        </Container>
        </>
    )
}

export default Main
