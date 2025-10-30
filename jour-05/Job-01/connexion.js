// Helpers
const $ = (sel, root = document) => root.querySelector(sel);

const form = $('#login-form');
const globalBox = $('#global-errors');

const ERR = {
  email_required: 'Email is required',
  pass_required: 'Password is required',
  pass_format: 'Password format is wrong'
};

// Même règle que l'inscription : 8+ chars, 1 lettre, 1 chiffre, 1 spécial
const PW_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function setError(input, msg = '') {
  const p = $('#' + input.id + '-error');
  if (p) p.textContent = msg || '';
  input.classList.toggle('invalid', !!msg);
}

function validateEmail() {
  const el = $('#email');
  const v = el.value.trim();
  if (!v) { setError(el, ''); return false; } // global gère le "required"
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  setError(el, ok ? '' : "Format d'email invalide");
  return ok;
}

function validatePassword() {
  const el = $('#password');
  const v = el.value;
  if (!v) { setError(el, 'Minimum eight characters, at least one letter, one number and one special character'); return false; }
  const ok = PW_REGEX.test(v);
  setError(el, ok ? '' : 'Minimum eight characters, at least one letter, one number and one special character');
  return ok;
}

// Erreurs globales (style de ta capture)
function renderGlobalErrors() {
  const msgs = [];
  if (!$('#email').value.trim()) msgs.push(ERR.email_required);
  if (!$('#password').value) msgs.push(ERR.pass_required);
  if ($('#password').value && !PW_REGEX.test($('#password').value)) msgs.push(ERR.pass_format);

  globalBox.innerHTML = msgs.map(m => `<p>${m}</p>`).join('');
  globalBox.hidden = msgs.length === 0;
}

// Live validation
['input','blur'].forEach(evt => {
  $('#email').addEventListener(evt, () => { validateEmail(); renderGlobalErrors(); });
  $('#password').addEventListener(evt, () => { validatePassword(); renderGlobalErrors(); });
});

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const ok = validateEmail() & validatePassword();
  renderGlobalErrors();
  if (ok) {
    alert('Connexion OK (démo).');
  } else {
    globalBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

// Premier rendu (si champs vides)
renderGlobalErrors();
