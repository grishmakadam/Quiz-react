
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Quiz from './Component/Quiz';
import Main from './Component/Main';
import Result from './Component/Result';
import './App.css'
function App() {


  return (
    <>
  <Router>
    <Routes>
    <Route path='/' element={<Main/>}></Route>
    <Route path='/quiz' element={<Quiz/>}></Route>
    <Route path='/quiz-result' element={<Result/>}></Route>
    </Routes>
  </Router>
   
  </>

  );
}


export default App;
