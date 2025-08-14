import { useState } from 'react';

export default function EditContent() {
  const [id, setId] = useState('');
  const [item, setItem] = useState(null);

  const fetchItem = async () => {
    const res = await fetch('http://localhost:3001/api/items');
    const list = await res.json();
    const found = list.find(i => i.id === Number(id));
    setItem(found || null);
  };

  const updateItem = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    alert('Aktualisiert');
  };

  if (!item) {
    return (
      <div>
        <h2>Wissen bearbeiten</h2>
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
        <button onClick={fetchItem}>Laden</button>
      </div>
    );
  }

  return (
    <form onSubmit={updateItem}>
      <h2>Eintrag {item.id}</h2>
      <input value={item.text || ''} onChange={(e) => setItem({ ...item, text: e.target.value })} />
      <button type="submit">Speichern</button>
    </form>
  );
}
