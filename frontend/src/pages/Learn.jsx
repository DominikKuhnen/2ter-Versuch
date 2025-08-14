import { useEffect, useState } from 'react';

export default function Learn() {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/api/learn').then(res => res.json()).then(setItems);
  }, []);

  const next = () => setIndex((i) => (i + 1) % items.length);

  if (!items.length) return <p>Keine freigegebenen Inhalte.</p>;

  const item = items[index];
  return (
    <div>
      <h2>Lernen</h2>
      <p>{item.text}</p>
      <button onClick={next}>Weiter</button>
    </div>
  );
}
