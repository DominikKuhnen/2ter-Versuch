import { useState } from 'react';

export default function Search() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch('http://localhost:3001/api/items');
    const list = await res.json();
    setResults(list.filter(i => i.text?.includes(term)));
  };

  return (
    <div>
      <h2>Suchen</h2>
      <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Suchbegriff" />
      <button onClick={handleSearch}>Suchen</button>
      <ul>
        {results.map(r => <li key={r.id}>{r.text}</li>)}
      </ul>
    </div>
  );
}
