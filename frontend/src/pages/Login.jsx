import { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3001/api/login?user=${username}`);
    const user = await res.json();
    onLogin(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <button type="submit">Login</button>
    </form>
  );
}
