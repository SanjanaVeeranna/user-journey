import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './components/game';
import Leaderboard from './components/leaderBoard';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Game />
          </>
        } exact />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;