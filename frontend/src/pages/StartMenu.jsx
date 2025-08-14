import { Link } from 'react-router-dom';

export default function StartMenu({ user }) {
  if (!user) return <p>Bitte einloggen.</p>;
  const { role } = user;
  return (
    <div>
      <h2>Startmenü</h2>
      <p>Willkommen {user.username} ({user.department})</p>
      <nav>
        <Link to="/learn">Lernen</Link> | <Link to="/search">Suchen</Link>
        {role !== 'reader' && <span> | <Link to="/add">Hinzufügen</Link> | <Link to="/edit">Bearbeiten</Link></span>}
        {role === 'reviewer' && <span> | <Link to="/review">Prüfen</Link></span>}
        <span> | <Link to="/stats">Statistik</Link></span>
      </nav>
    </div>
  );
}
