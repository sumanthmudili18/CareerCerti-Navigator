/* CareerCert Navigator – app logic */

const VIEWS = [
  { id: 'catalog',   label: 'Catalog' },
  { id: 'learn',     label: 'Free Learning' },
  { id: 'roadmaps',  label: 'Roadmaps' },
  { id: 'compare',   label: 'Compare' },
  { id: 'matcher',   label: 'Matcher' },
  { id: 'support',   label: 'Helpline' }
];
const DOMAINS = [...new Set(CERTIFICATIONS_DATA.map(c => c.domain))];
const DOMAIN_LABELS = { 'Core CS & Placement': 'Core CS & Algorithms' };

const state = { rec: 'all', domain: 'all', budget: 'all', level: 'all', search: '', compared: [], bookmarked: [], learnTab: Object.keys(LEARN_LINKS)[0] };
const $ = id => document.getElementById(id);
const icons = () => window.lucide && lucide.createIcons();
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderDomainButtons();
  renderCertifications();
  renderLearn();
  renderRoadmaps();
  updateBadges();
  switchView('catalog');
  toggleAuthMode('signin');
  restoreSession();
});

/* ---------- Navigation ---------- */
function renderNav() {
  const html = VIEWS.map(v => `<button class="nav-btn" data-view="${v.id}" onclick="switchView('${v.id}')">${v.label}${v.id === 'compare' ? ' <span id="compare-counter" class="hidden ml-1 px-1.5 rounded-full text-[10px] bg-indigo-600">0</span>' : ''}</button>`).join('');
  $('nav-desktop').innerHTML = html;
  $('nav-mobile').innerHTML = html.replace('id="compare-counter"', 'class-alt');
  $('nav-mobile').querySelectorAll('[class-alt]').forEach(el => el.removeAttribute('class-alt'));
}

function switchView(name) {
  ['catalog', 'learn', 'login', 'compare', 'bookmarks', 'roadmaps', 'matcher', 'support']
    .forEach(v => $(`view-${v}`).classList.toggle('hidden', v !== name));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === name));
  if (name === 'compare') renderComparisonTable();
  if (name === 'bookmarks') renderBookmarksView();
  window.scrollTo({ top: 0 });
  icons();
}

/* ---------- Catalog ---------- */
function renderDomainButtons() {
  const count = d => CERTIFICATIONS_DATA.filter(c => d === 'all' || c.domain === d).length;
  const items = [['all', `All domains (${count('all')})`], ...DOMAINS.map(d => [d, `${DOMAIN_LABELS[d] || d} (${count(d)})`])];
  $('domain-buttons').innerHTML = items.map(([d, label]) =>
    `<button class="dom-btn w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium ${state.domain === d ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}" onclick="setFilter('domain','${d.replace(/'/g, "\\'")}')">${esc(label)}</button>`).join('');
}

function getFiltered() {
  const q = state.search.trim().toLowerCase();
  return CERTIFICATIONS_DATA.filter(c => {
    const text = [c.title, c.provider, c.domain, ...c.skills, ...c.roles].join(' ').toLowerCase();
    if (q && !text.includes(q)) return false;
    if (state.rec === 'recognized' && !c.isRecognized) return false;
    if (state.rec === 'free_platforms' && c.isRecognized) return false;
    if (state.domain !== 'all' && c.domain !== state.domain) return false;
    if (state.level !== 'all' && c.level !== state.level) return false;
    if (state.budget === 'free' && c.costCategory !== 'free') return false;
    if (state.budget === 'under5k' && !['free', 'under5k'].includes(c.costCategory)) return false;
    if (state.budget === 'above5k' && c.costCategory !== 'above5k') return false;
    return true;
  });
}

function certCard(c) {
  const saved = state.bookmarked.includes(c.id);
  const compared = state.compared.includes(c.id);
  return `
  <article class="glass-panel card rounded-2xl p-5 flex flex-col justify-between">
    <div>
      <div class="flex items-center justify-between gap-2 mb-3">
        <span class="chip ${c.isRecognized ? 'chip-gold' : 'chip-grey'}">${c.isRecognized ? '★ Industry recognized' : 'Self-learning'}</span>
        <button onclick="toggleBookmark('${c.id}')" title="${saved ? 'Remove bookmark' : 'Bookmark'}" class="p-1.5 rounded-lg ${saved ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}">
          <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
        </button>
      </div>
      <h3 class="text-sm font-bold leading-snug mb-1">${esc(c.title)}</h3>
      <p class="text-[11px] text-slate-500 mb-2">${esc(c.provider)} · ${esc(c.level)}</p>
      <p class="text-xs text-slate-400 leading-relaxed">${esc(c.description)}</p>
      ${c.isRecognized ? '' : '<p class="mt-2.5 text-[11px] text-amber-300/80 bg-amber-950/20 border border-amber-500/15 p-2 rounded-lg">Good for learning, but not a recognized hiring credential.</p>'}
      <div class="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
        <div>Exam fee<strong class="block ${c.costCategory === 'free' ? 'text-emerald-400' : 'text-blue-400'}">${esc(c.priceText)}</strong></div>
        <div>Typical CTC<strong class="block text-emerald-400">${esc(c.salaryPackage)}</strong></div>
        <div class="col-span-2">Duration<span class="block text-slate-300">${esc(c.duration)}</span></div>
      </div>
    </div>
    <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
      <label class="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer hover:text-white">
        <input type="checkbox" onchange="toggleCompare('${c.id}')" ${compared ? 'checked' : ''}> Compare
      </label>
      <div class="flex items-center gap-3">
        <button onclick="viewDetails('${c.id}')" class="text-xs font-semibold text-indigo-400 hover:text-indigo-300">Details</button>
        <a href="${c.link}" target="_blank" rel="noopener" class="btn btn-ghost !py-1.5">Enroll</a>
      </div>
    </div>
  </article>`;
}

function renderCertifications() {
  const list = getFiltered();
  $('visible-count').textContent = list.length;
  $('certifications-grid').innerHTML = list.length
    ? list.map(certCard).join('')
    : `<div class="col-span-full py-16 text-center text-slate-400 text-xs">No certifications match these filters.
         <button onclick="resetFilters()" class="block mx-auto mt-2 text-indigo-400 hover:underline">Clear filters</button></div>`;
  icons();
}

function setFilter(key, value) {
  state[key] = value;
  if (key === 'domain') renderDomainButtons();
  renderCertifications();
}
function handleSearch() { state.search = $('search-input').value; renderCertifications(); }
function resetFilters() {
  Object.assign(state, { rec: 'all', domain: 'all', budget: 'all', level: 'all', search: '' });
  $('search-input').value = '';
  $('budget-select').value = 'all';
  $('level-select').value = 'all';
  document.querySelector('input[name="recFilter"][value="all"]').checked = true;
  renderDomainButtons();
  renderCertifications();
}

/* ---------- Free learning links ---------- */
function renderLearn() {
  const cats = Object.keys(LEARN_LINKS);
  $('learn-tabs').innerHTML = cats.map(c =>
    `<button onclick="setLearnTab('${c}')" class="px-3.5 py-2 text-xs font-semibold rounded-full border ${c === state.learnTab ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 text-slate-300 hover:border-slate-500'}">${c}</button>`).join('');
  $('learn-grid').innerHTML = LEARN_LINKS[state.learnTab].map(l => `
    <a class="link-tile" href="${l.url}" target="_blank" rel="noopener">
      <span><span class="block text-sm font-bold">${esc(l.name)}</span><span class="block text-xs text-slate-400">${esc(l.desc)}</span></span>
      <i data-lucide="external-link" class="w-4 h-4 text-slate-500 shrink-0"></i>
    </a>`).join('');
  icons();
}
function setLearnTab(t) { state.learnTab = t; renderLearn(); }

/* ---------- Roadmaps ---------- */
function renderRoadmaps() {
  $('roadmap-grid').innerHTML = ROADMAPS.map(r => `
    <div class="glass-panel p-6 rounded-2xl space-y-4">
      <div class="flex items-center gap-3">
        <span class="p-2.5 rounded-xl bg-${r.color}-500/10 text-${r.color}-400 border border-${r.color}-500/20"><i data-lucide="${r.icon}" class="w-5 h-5"></i></span>
        <div><h3 class="text-base font-bold">${esc(r.title)}</h3><p class="text-xs text-emerald-400 font-medium">Placement CTC: ${r.ctc}</p></div>
      </div>
      <ol class="space-y-2.5 text-xs text-slate-300">
        ${r.steps.map((s, i) => `<li class="p-3 bg-slate-900/60 rounded-xl border border-slate-800"><strong>Step ${i + 1}.</strong> ${esc(s)}</li>`).join('')}
      </ol>
    </div>`).join('');
}

/* ---------- Compare ---------- */
function toggleCompare(id) {
  if (state.compared.includes(id)) {
    state.compared = state.compared.filter(x => x !== id);
  } else if (state.compared.length >= 3) {
    alert('You can compare up to 3 certifications at a time.');
    renderCertifications();
    return;
  } else {
    state.compared.push(id);
  }
  updateBadges();
}
function clearComparison() {
  state.compared = [];
  updateBadges();
  renderCertifications();
  renderComparisonTable();
}
function renderComparisonTable() {
  const has = state.compared.length > 0;
  $('compare-empty').classList.toggle('hidden', has);
  $('compare-table-container').classList.toggle('hidden', !has);
  if (!has) return;
  const certs = CERTIFICATIONS_DATA.filter(c => state.compared.includes(c.id));
  $('compare-header-row').innerHTML = '<th class="py-3 px-4 text-slate-400 w-1/4">Attribute</th>' + certs.map(c =>
    `<th class="py-3 px-4 font-bold align-top">${esc(c.title)}<button onclick="toggleCompare('${c.id}');renderCertifications();renderComparisonTable()" class="block text-[10px] text-red-400 font-normal hover:underline mt-0.5">Remove</button></th>`).join('');
  const rows = [
    ['Provider', c => c.provider],
    ['Recognition', c => c.isRecognized ? '★ Industry recognized' : 'Learning platform'],
    ['Level', c => c.level],
    ['Exam fee', c => c.priceText],
    ['Typical CTC', c => c.salaryPackage],
    ['Duration', c => c.duration],
    ['Job roles', c => c.roles.join(', ')],
    ['Exam format', c => c.examDetails]
  ];
  $('compare-body').innerHTML = rows.map(([label, fn]) =>
    `<tr><td class="py-3 px-4 font-semibold text-slate-400">${label}</td>${certs.map(c => `<td class="py-3 px-4">${esc(fn(c))}</td>`).join('')}</tr>`).join('');
}

/* ---------- Bookmarks ---------- */
function toggleBookmark(id) {
  state.bookmarked = state.bookmarked.includes(id) ? state.bookmarked.filter(x => x !== id) : [...state.bookmarked, id];
  updateBadges();
  renderCertifications();
  renderBookmarksView();
  saveBookmarks();
}
function renderBookmarksView() {
  const saved = CERTIFICATIONS_DATA.filter(c => state.bookmarked.includes(c.id));
  $('bookmarks-empty').classList.toggle('hidden', saved.length > 0);
  $('bookmarks-grid').classList.toggle('hidden', saved.length === 0);
  $('bookmarks-grid').innerHTML = saved.map(c => `
    <div class="glass-panel rounded-2xl p-5 flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-center mb-2">
          <span class="chip chip-blue">${esc(c.domain)}</span>
          <button onclick="toggleBookmark('${c.id}')" class="text-xs text-red-400 hover:underline">Remove</button>
        </div>
        <h3 class="text-sm font-bold mb-1">${esc(c.title)}</h3>
        <p class="text-xs text-slate-400 mb-2">${esc(c.provider)} · ${esc(c.priceText)}</p>
        <p class="text-xs text-emerald-400 font-medium">CTC: ${esc(c.salaryPackage)}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
        <button onclick="viewDetails('${c.id}')" class="text-xs text-indigo-400 hover:underline">Details</button>
        <a href="${c.link}" target="_blank" rel="noopener" class="btn !py-1.5">Enroll</a>
      </div>
    </div>`).join('');
}
function updateBadges() {
  $('bookmark-counter').textContent = state.bookmarked.length;
  const n = state.compared.length;
  document.querySelectorAll('#compare-counter').forEach(b => { b.textContent = n; b.classList.toggle('hidden', n === 0); });
}

/* ---------- API + Auth (talks to server.js) ---------- */
let authMode = 'signin';
const tokenStore = {
  get: () => { try { return localStorage.getItem('ccn_token'); } catch { return null; } },
  set: t => { try { t ? localStorage.setItem('ccn_token', t) : localStorage.removeItem('ccn_token'); } catch {} }
};
// When the page is served by the Express server, use same-origin. When opened via
// VS Code Live Server (port 5500) or file://, call the backend on port 3000.
const API_BASE = location.port === '3000' ? '' : 'http://localhost:3000';
async function api(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const t = tokenStore.get();
  if (t) headers.Authorization = 'Bearer ' + t;
  const res = await fetch(API_BASE + '/api' + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}
function showUser(u) {
  $('auth-guest').classList.add('hidden');
  $('auth-user').classList.remove('hidden');
  $('auth-user').classList.add('flex');
  $('user-display-name').textContent = u.name;
  $('user-display-college').textContent = u.college;
  $('user-avatar').textContent = u.name.charAt(0).toUpperCase();
}
function toggleAuthMode(mode) {
  authMode = mode;
  const signin = mode === 'signin';
  $('tab-btn-signin').className = `flex-1 py-2 text-xs font-semibold rounded-lg ${signin ? 'bg-indigo-600' : 'text-slate-400'}`;
  $('tab-btn-signup').className = `flex-1 py-2 text-xs font-semibold rounded-lg ${signin ? 'text-slate-400' : 'bg-indigo-600'}`;
  $('signup-extra-fields').classList.toggle('hidden', signin);
  $('form-name').closest('div').classList.toggle('hidden', signin);
  $('form-name').required = !signin;
  $('auth-submit-btn').textContent = signin ? 'Sign in' : 'Create account';
  $('auth-title').textContent = signin ? 'Student login' : 'Create student profile';
  $('auth-subtitle').textContent = signin ? 'Access your saved courses and roadmaps' : 'Set up your college profile';
  $('auth-error').classList.add('hidden');
}
async function handleAuthSubmit(e) {
  e.preventDefault();
  const err = $('auth-error');
  err.classList.add('hidden');
  const signin = authMode === 'signin';
  try {
    const { token, user } = await api(signin ? '/auth/login' : '/auth/register', {
      method: 'POST',
      body: {
        name: $('form-name').value, email: $('form-email').value, password: $('form-password').value,
        college: $('form-college').value, dept: $('form-dept').value, year: $('form-year').value
      }
    });
    tokenStore.set(token);
    showUser(user);
    await loadBookmarks(true);
    e.target.reset();
    switchView('catalog');
  } catch (ex) { err.textContent = ex.message; err.classList.remove('hidden'); }
}
function handleLogout() {
  tokenStore.set(null);
  state.bookmarked = [];
  updateBadges(); renderCertifications(); renderBookmarksView();
  $('auth-user').classList.add('hidden');
  $('auth-user').classList.remove('flex');
  $('auth-guest').classList.remove('hidden');
  switchView('catalog');
}
// Restore session on page load
async function restoreSession() {
  if (!tokenStore.get()) return;
  try { const { user } = await api('/me'); showUser(user); await loadBookmarks(false); }
  catch { tokenStore.set(null); }
}
// Bookmarks: saved on the server when logged in, in memory for guests.
// On login, guest bookmarks are merged into the account's list.
async function loadBookmarks(merge) {
  const { bookmarks } = await api('/bookmarks');
  state.bookmarked = [...new Set([...bookmarks, ...(merge ? state.bookmarked : [])])];
  if (merge && state.bookmarked.length !== bookmarks.length) await saveBookmarks();
  updateBadges(); renderCertifications(); renderBookmarksView();
}
function saveBookmarks() {
  if (!tokenStore.get()) return;
  api('/bookmarks', { method: 'PUT', body: { ids: state.bookmarked } }).catch(() => {});
}

/* ---------- Modal ---------- */
function openModal(id) { $(id).classList.remove('hidden'); }
function closeModal(id) { $(id).classList.add('hidden'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal('detail-modal'); });

function viewDetails(id) {
  const c = CERTIFICATIONS_DATA.find(x => x.id === id);
  if (!c) return;
  $('modal-content').innerHTML = `
    <span class="chip chip-blue">${esc(c.domain)}</span>
    <h2 class="text-lg font-bold mt-2 mb-2 pr-6">${esc(c.title)}</h2>
    <p class="text-xs text-slate-300 mb-4 leading-relaxed">${esc(c.description)}</p>
    <dl class="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs mb-4">
      <div><dt class="inline font-semibold">Exam: </dt><dd class="inline text-slate-400">${esc(c.examDetails)}</dd></div>
      <div><dt class="inline font-semibold">Roles: </dt><dd class="inline text-emerald-400">${esc(c.roles.join(', '))}</dd></div>
      <div><dt class="inline font-semibold">Skills: </dt><dd class="inline text-slate-400">${esc(c.skills.join(', '))}</dd></div>
      <div><dt class="inline font-semibold">Fee: </dt><dd class="inline">${esc(c.priceText)}</dd></div>
      <div><dt class="inline font-semibold">Typical CTC: </dt><dd class="inline text-emerald-400">${esc(c.salaryPackage)}</dd></div>
    </dl>
    <div class="flex justify-end gap-2">
      <button onclick="closeModal('detail-modal')" class="btn btn-ghost">Close</button>
      <a href="${c.link}" target="_blank" rel="noopener" class="btn">Official site</a>
    </div>`;
  openModal('detail-modal');
}

/* ---------- Matcher ---------- */
function handleQuizSubmit(e) {
  e.preventDefault();
  const domain = $('quiz-domain').value;
  const free = document.querySelector('input[name="quiz-budget"]:checked').value === 'free';
  const matches = CERTIFICATIONS_DATA.filter(c => c.domain === domain && (!free || c.costCategory === 'free'));
  $('quiz-results').classList.remove('hidden');
  $('quiz-results-container').innerHTML = matches.length ? matches.map(c => `
    <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center gap-3">
      <div>
        <div class="text-xs font-bold">${esc(c.title)}</div>
        <div class="text-[11px] text-slate-400">${esc(c.provider)} · <span class="text-emerald-400">${esc(c.priceText)}</span></div>
      </div>
      <button onclick="viewDetails('${c.id}')" class="btn !py-1.5">Details</button>
    </div>`).join('')
    : '<p class="text-xs text-slate-400 p-3 bg-slate-900 rounded-xl border border-slate-800">No free options in this domain. Choose "Include exam fees" to see official certifications.</p>';
}

/* ---------- Support ---------- */
async function handleSupportSubmit(e) {
  e.preventDefault();
  const res = $('ticket-response');
  res.classList.remove('hidden');
  try {
    const { ticketId } = await api('/tickets', { method: 'POST', body: {
      name: $('ticket-name').value, email: $('ticket-email').value, message: $('ticket-message').value } });
    res.textContent = `Ticket #${ticketId} recorded for ${$('ticket-name').value}. Our advisor desk will email you within 24 working hours.`;
    e.target.reset();
  } catch (ex) { res.textContent = ex.message; }
}
