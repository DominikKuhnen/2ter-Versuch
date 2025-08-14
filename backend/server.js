const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory demo data
let nextId = 1;
const items = [];
const users = {
  alice: { username: 'alice', role: 'writer', department: 'Assembly' },
  bob: { username: 'bob', role: 'reader', department: 'Machining' },
  carol: { username: 'carol', role: 'reviewer', department: 'Assembly' },
};

app.get('/api/login', (req, res) => {
  const user = users[req.query.user] || { username: req.query.user || 'guest', role: 'reader', department: 'General' };
  res.json(user);
});

app.post('/api/items', (req, res) => {
  const item = { id: nextId++, status: 'pending', ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.get('/api/items', (req, res) => {
  const { status } = req.query;
  const filtered = status ? items.filter(i => i.status === status) : items;
  res.json(filtered);
});

app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).end();
  items[index] = { ...items[index], ...req.body };
  res.json(items[index]);
});

app.post('/api/review/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).end();
  item.status = req.body.status || item.status;
  item.reviewComment = req.body.comment || '';
  res.json(item);
});

app.get('/api/learn', (req, res) => {
  const approved = items.filter(i => i.status === 'approved');
  res.json(approved);
});

app.get('/api/statistics', (req, res) => {
  const total = items.length;
  const approved = items.filter(i => i.status === 'approved').length;
  res.json({ totalItems: total, approvedItems: approved });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
