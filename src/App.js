import './App.css';
import './index.css';

import BotControlPanel from "./pages/BotControlPanel";
import GamePanel from "./pages/GamePanel";
import Jeopardy from "./pages/Jeopardy";
import ActiveGame from './pages/ActiveGame';
import LoginPage from './pages/LoginPage';
import PointsSystem from './pages/PointsSystem'
import ServerError from './pages/ServerError';
import AddPoints from './pages/AddPoints';

import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TokenRetrival from './pages/TokenRetrival';



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/panel' element={<BotControlPanel />} />
        <Route path='/addpoints' element={<AddPoints />} />
        <Route path='/gamepanel/' element={<GamePanel />} />
        <Route path='/activegame/' element={<ActiveGame />} />
        <Route path='/jeopardy' element={<Jeopardy />} />
        <Route path='/points' element={<PointsSystem />} />
        <Route path='/auth' element = {<TokenRetrival />} />
        <Route path='/500' element = {<ServerError />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
