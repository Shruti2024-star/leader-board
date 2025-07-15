import React from 'react';

const Leaderboard = ({ leaderboard }) => {
  const renderCard = (user, index) => {
    let rankClass = '';
    if (index === 0) rankClass = 'rank-card first';
    else if (index === 1) rankClass = 'rank-card second';
    else if (index === 2) rankClass = 'rank-card third';

    return (
      <div className={rankClass} key={index}>
        <h3>{user.name}</h3>
        <p>Points: {user.totalPoints}</p>
        <p>Rank: {user.rank}</p>
      </div>
    );
  };

  return (
    <div>
      <h3 className="subheading">Top 3 Rankers</h3>
      <div className="card-container">
        {leaderboard.slice(0, 3).map((user, index) => renderCard(user, index))}
      </div>

      <h3 className="subheading">Leaderboard</h3>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th><th>Name</th><th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user.rank}>
              <td>{user.rank}</td>
              <td>{user.name}</td>
              <td>{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;



