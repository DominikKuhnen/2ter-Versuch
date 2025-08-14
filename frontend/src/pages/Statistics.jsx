import { useEffect, useState } from 'react';

export default function Statistics() {
  const [stats, setStats] = useState(null);
  useEffect(() => { fetch('http://localhost:3001/api/statistics').then(res => res.json()).then(setStats); }, []);
  if (!stats) return null;
  return (
    <div>
      <h2>Statistik</h2>
      <p>Einträge gesamt: {stats.totalItems}</p>
      <p>Freigegeben: {stats.approvedItems}</p>
    </div>
  );
}
