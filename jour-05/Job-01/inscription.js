// --- Helpers ---
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const globalBox = $('#global-errors');
const form = $('#register-form');

const ERR = {
  first_required: 'Firstname is required',
  last_required: 'Lastname is required',
  pass_required: 'Password is required',
  pass_format: 'Password format is wrong'
};

// Regex: min 8, ≥1 lettre, ≥1 chiffre, ≥1 spécial
const PW_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

// --- Validation champs (inline) ---
function setError(input, msg = '') {
  const p = $('#' + input.id + '-error');
  if (p) p.textContent = msg || '';
  input.classList.toggle('invalid', !!msg);
}

function validateFirst() {
  const v = $('#firstName').value.trim();
  if (!v) { setError($('#firstName'), ''); return false; } // global gère le "required"
  if (v.length < 3) { setError($('#firstName'), 'La taille de votre prénom est trop petite'); return false; }
  setError($('#firstName'), ''); return true;
}

function validateLast() {
  const v = $('#lastName').value.trim();
  if (!v) { setError($('#lastName'), ''); return false; }
  if (v.length < 3) { setError($('#lastName'), 'La taille de votre nom est trop petite'); return false; }
  setError($('#lastName'), ''); return true;
}

function validateEmail() {
  const el = $('#email');
  const v = el.value.trim();
  if (!v) { setError(el, ''); return false; }
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

function validatePassword2() {
  const el = $('#password2');
  const v = el.value;
  if (!v) { setError(el, 'Minimum eight characters, at least one letter, one number and one special character'); return false; }
  const ok = PW_REGEX.test(v) && v === $('#password').value;
  setError(el, ok ? '' : 'Les mots de passe ne correspondent pas ou format invalide');
  return ok;
}

// --- Erreurs globales comme la capture ---
function renderGlobalErrors() {
  const msgs = [];

  if (!$('#firstName').value.trim()) msgs.push(ERR.first_required);
  if (!$('#lastName').value.trim()) msgs.push(ERR.last_required);
  if (!$('#password').value) msgs.push(ERR.pass_required);
  if ($('#password').value && !PW_REGEX.test($('#password').value)) msgs.push(ERR.pass_format);

  globalBox.innerHTML = msgs.map(m => `<p>${m}</p>`).join('');
  globalBox.hidden = msgs.length === 0;
}

['input','blur'].forEach(evt => {
  $('#firstName').addEventListener(evt, () => { validateFirst(); renderGlobalErrors(); });
  $('#lastName').addEventListener(evt, () => { validateLast(); renderGlobalErrors(); });
  $('#email').addEventListener(evt, () => { validateEmail(); });
  $('#password').addEventListener(evt, () => { validatePassword(); renderGlobalErrors(); validatePassword2(); });
  $('#password2').addEventListener(evt, () => { validatePassword2(); });
});

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const ok =
    validateFirst() &
    validateLast() &
    validateEmail() &
    validatePassword() &
    validatePassword2();

  renderGlobalErrors();

  if (ok) {
    alert("Inscription OK (démo).");
  } else {
    // scroll vers erreurs globales (comme UX classique)
    globalBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

// Premier rendu (afficher erreurs globales si champs vides)
renderGlobalErrors();
