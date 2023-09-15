import { useEffect } from 'react';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Karte from './Karte';
import Rezervacije from './Rezervacije';

function App() {
  
   return(
        <div className='container'>
            <div className='row'>
                <div className='col-12 text-center'>
                      <h2>Welcome</h2>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                  <BrowserRouter>
                  <Routes>
                    <Route path='' element={<Login></Login>}></Route>
                    <Route path='register' element={<Register></Register>}></Route>
                    <Route path='/karte' element={< Karte />}></Route>
                    <Route path='/rezervacije' element={<Rezervacije />}></Route>
                  </Routes>
                  </BrowserRouter>
                </div>
            </div>
        </div>
    )
}

export default App;
