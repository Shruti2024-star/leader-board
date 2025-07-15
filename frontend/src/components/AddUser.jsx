import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const AddUser = ({ refreshUsers,refreshLeaderboard }) => {
  const [name, setName] = useState('');
const addUser = async () => {
  if (name) {
    await axios.post(`${API}/api/users`, { name });
    setName('');
    refreshUsers();
    refreshLeaderboard(); 
  }
};


  return (
    <div className="form-group">
      <input
        className="form-input"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder='New user name'
      />
      <button className="btn" onClick={addUser}>Add User</button>
    </div>
  );
};

export default AddUser;
