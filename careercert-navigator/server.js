/* CareerCert Navigator – backend (Express + JSON file storage) */
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const DB_FILE = path.join(__dirname, 'data', 'db.json');

if (!process.env.JWT_SECRET) console.warn('⚠  JWT_SECRET not set – using a development secret.');

/* ---------- tiny JSON database ---------- */
function loadDB() {
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
  catch { return { users: [], bookmarks: {}, tickets: [] }; }
}
function saveDB(db) {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  const tmp = DB_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DB_FILE);               // atomic write
}

/* ---------- helpers ---------- */
const publicUser = u => ({ id: u.id, name: u.name, email: u.email, college: u.college, dept: u.dept, year: u.year });
const emailOk = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const clean = (v, max = 120) => String(v || '').trim().slice(0, max);
const sign = u => jwt.sign({ sub: u.id }, SECRET, { expiresIn: '7d' });

function auth(required = true) {
  return (req, res, next) => {
    const h = req.headers.authorization || '';
    const token = h.startsWith('Bearer ') ? h.slice(7) : null;
    if (token) {
      try {
        const { sub } = jwt.verify(token, SECRET);
        const user = loadDB().users.find(u => u.id === sub);
        if (user) { req.user = user; return next(); }
      } catch { /* fall through */ }
    }
    if (required) return res.status(401).json({ error: 'Please log in first.' });
    next();
  };
}

/* ---------- app ---------- */
const app = express();
app.use(cors());
app.use(express.json({ limit: '50kb' }));

// Auth
app.post('/api/auth/register', (req, res) => {
  const name = clean(req.body.name), email = clean(req.body.email).toLowerCase(), password = String(req.body.password || '');
  if (!name) return res.status(400).json({ error: 'Name is required.' });
  if (!emailOk(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

  const db = loadDB();
  if (db.users.some(u => u.email === email)) return res.status(409).json({ error: 'An account with this email already exists.' });

  const user = {
    id: crypto.randomUUID(), name, email,
    college: clean(req.body.college) || 'Engineering Institute',
    dept: clean(req.body.dept, 40), year: clean(req.body.year, 20),
    passwordHash: bcrypt.hashSync(password, 10), createdAt: new Date().toISOString()
  };
  db.users.push(user);
  db.bookmarks[user.id] = [];
  saveDB(db);
  res.status(201).json({ token: sign(user), user: publicUser(user) });
});

app.post('/api/auth/login', (req, res) => {
  const email = clean(req.body.email).toLowerCase(), password = String(req.body.password || '');
  const user = loadDB().users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash))
    return res.status(401).json({ error: 'Incorrect email or password.' });
  res.json({ token: sign(user), user: publicUser(user) });
});

app.get('/api/me', auth(), (req, res) => res.json({ user: publicUser(req.user) }));

// Bookmarks (one list per user)
app.get('/api/bookmarks', auth(), (req, res) => {
  res.json({ bookmarks: loadDB().bookmarks[req.user.id] || [] });
});
app.put('/api/bookmarks', auth(), (req, res) => {
  const ids = Array.isArray(req.body.ids) ? [...new Set(req.body.ids.map(i => clean(i, 60)).filter(Boolean))].slice(0, 100) : null;
  if (!ids) return res.status(400).json({ error: 'ids must be an array.' });
  const db = loadDB();
  db.bookmarks[req.user.id] = ids;
  saveDB(db);
  res.json({ bookmarks: ids });
});

// Helpline tickets (guests allowed; linked to the account if logged in)
app.post('/api/tickets', auth(false), (req, res) => {
  const name = clean(req.body.name), email = clean(req.body.email).toLowerCase(), message = clean(req.body.message, 1000);
  if (!name || !emailOk(email) || !message) return res.status(400).json({ error: 'Name, valid email and message are required.' });
  const db = loadDB();
  const ticket = { id: 'CCN-' + Math.floor(100000 + Math.random() * 900000), userId: req.user?.id || null, name, email, message, status: 'open', createdAt: new Date().toISOString() };
  db.tickets.push(ticket);
  saveDB(db);
  res.status(201).json({ ticketId: ticket.id });
});
app.get('/api/tickets', auth(), (req, res) => {
  res.json({ tickets: loadDB().tickets.filter(t => t.userId === req.user.id) });
});

app.use('/api', (req, res) => res.status(404).json({ error: 'Not found.' }));

// Frontend (only these paths are public – db.json and server.js are not exposed)
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => console.log(`CareerCert Navigator running at http://localhost:${PORT}`));
