
import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NoteState from './Components/Context/Notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert]=useState(null)
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <div >
      <NoteState>
      <Router>
        <Navbar/>
        <Alert alert={alert} />
        <div className='container'>
        <Routes>
          <Route  path='/' element={<Home showAlert={showAlert}/>}/>
          <Route  path='/about' element={<About/>}/>
          <Route path="/login" element={<Login showAlert={showAlert} />}/>
          <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>

        </Routes>
        </div>
      </Router>
        
      </NoteState>
      
    </div>
  );
}

export default App;
