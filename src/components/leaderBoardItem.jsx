import React from 'react';

const LeaderboardItem = ({ user, score }) => {
  return (
    <li>
      <span>{user}</span> - <span>{score}</span>
    </li>
  );
};

export default LeaderboardItem;