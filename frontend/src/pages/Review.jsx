import { useEffect, useState } from 'react';

export default function Review() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await fetch('http://localhost:3001/api/items?status=pending');
    setItems(await res.json());
  };

  useEffect(() => { load(); }, []);

  const decide = async (id, status) => {
    await fetch(`http://localhost:3001/api/review/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    load();
  };

  return (
    <div>
      <h2>Prüfen</h2>
      <ul>
        {items.map(i => (
          <li key={i.id}>{i.text} <button onClick={() => decide(i.id, 'approved')}>Freigeben</button> <button onClick={() => decide(i.id, 'rejected')}>Ablehnen</button></li>
        ))}
      </ul>
    </div>
  );
}
