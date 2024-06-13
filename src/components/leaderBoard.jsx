import React, { useState, useEffect } from 'react';
import LeaderboardItem from './leaderBoardItem'; 


const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [timeWindow, setTimeWindow] = useState('5 minutes');
  
    useEffect(() => {
      const fetchLeaderboardData = async () => {
        const response = await fetch('/api/leaderboard', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          params: { timeWindow },
        });
        const data = await response.json();
        setLeaderboardData(data);
      };
      fetchLeaderboardData();
    }, [timeWindow]);
  
    const handleTimeWindowChange = (newTimeWindow) => {
      setTimeWindow(newTimeWindow);
    };
  
    return (
      <div className="leaderboard">
        <select value={timeWindow} onChange={(e) => handleTimeWindowChange(e.target.value)}>
          <option value="5 minutes">5 minutes</option>
          <option value="10 minutes">10 minutes</option>
          <option value="30 minutes">30 minutes</option>
          <option value="1 hour">1 hour</option>
        </select>
        <ul>
          {leaderboardData.map((userData, index) => (
            <LeaderboardItem key={index} user={userData.user} score={userData.score} />
          ))}
        </ul>
        
      </div>
    );
  };

export default Leaderboard;


