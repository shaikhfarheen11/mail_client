import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import Emaillist from './Component/EmailList';
import Compose from './Component/Compose';
import { useSelector } from 'react-redux';
import { selectSendMessageIsOpen } from './Component/store/mailSlice';
import EmailDetails from './Component/EmailDetails';
function App() {
  const isMessageOpen = useSelector(selectSendMessageIsOpen);
  console.log(isMessageOpen);
  return (
    <BrowserRouter>

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/header" element={<Header />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/mail" element={<EmailDetails />} />

          </Routes>
          <div className='app__body'> 
        <Routes>
          <Route path="/header" element={<Emaillist />} />
          {isMessageOpen && <Route path="/compose" element={<Compose />} />}

        </Routes>
      </div>
          </BrowserRouter>
          )
}

export default App;
