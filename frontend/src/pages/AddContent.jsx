import { useState } from 'react';

export default function AddContent() {
  const [form, setForm] = useState({ type: 'tip', text: '', answerA: '', answerB: '', answerC: '', correctAnswer: 'A', category: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert('Gespeichert mit ID ' + data.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Wissen hinzufügen</h2>
      <input name="text" value={form.text} onChange={handleChange} placeholder="Text" />
      <input name="answerA" value={form.answerA} onChange={handleChange} placeholder="Antwort A" />
      <input name="answerB" value={form.answerB} onChange={handleChange} placeholder="Antwort B" />
      <input name="answerC" value={form.answerC} onChange={handleChange} placeholder="Antwort C" />
      <select name="correctAnswer" value={form.correctAnswer} onChange={handleChange}>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <input name="category" value={form.category} onChange={handleChange} placeholder="Kategorie" />
      <button type="submit">Speichern</button>
    </form>
  );
}
