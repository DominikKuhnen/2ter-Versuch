import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import StartMenu from './pages/StartMenu';
import AddContent from './pages/AddContent';
import EditContent from './pages/EditContent';
import Search from './pages/Search';
import Review from './pages/Review';
import Learn from './pages/Learn';
import Statistics from './pages/Statistics';

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/start" /> : <Login onLogin={setUser} />} />
        <Route path="/start" element={<StartMenu user={user} />} />
        <Route path="/add" element={<AddContent user={user} />} />
        <Route path="/edit" element={<EditContent user={user} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/review" element={<Review />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/stats" element={<Statistics />} />
      </Routes>
    </Router>
  );
}
