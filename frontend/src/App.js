import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserSelect from './components/UserSelect';
import AddUser from './components/AddUser';
import Leaderboard from './components/Leaderboard';
import './App.css';

const API = 'https://leader-board-cdc7.onrender.com';


function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [claimedPoints, setClaimedPoints] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/api/users`);

    setUsers(res.data);
  };

  const fetchLeaderboard = async () => {
    const res = await axios.get(`${API}/api/claim/leaderboard`);
    setLeaderboard(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
  }, []);

  const handleClaim = async () => {
    if (!selectedUser) return;
    const res = await axios.post(`${API}/api/claim/${selectedUser}`);
    setClaimedPoints(res.data.points);
    fetchLeaderboard();
  };

  return (
    <div className="container">
      <h2 className="heading">Leaderboard System</h2>
      
      <div className="form-group">
        <UserSelect
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <button className="btn" onClick={handleClaim}>Claim Points</button>
      </div>

      {claimedPoints !== null && (
        <p className="claimed-text">Claimed: {claimedPoints} points</p>
      )}

      <AddUser refreshUsers={fetchUsers} refreshLeaderboard={fetchLeaderboard} />

      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}

export default App;




