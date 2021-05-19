import React, { useState } from 'react';
import axios from 'axios';

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username);
    axios.put(`https://myflixdb-5303.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    }, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch(e => {
        console.log('error updating the user')
      });
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} placeholder="Username" required onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="text" value={password} placeholder="Password" required onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} placeholder="Email" required onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Date of birth:
        <input type="date" value={birthday} placeholder="Date of Birth" required onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Update</button>
    </form>
  );
}