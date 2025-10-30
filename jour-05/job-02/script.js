// ====== Utilitaires ======
const debounce = (fn, delay = 300) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
};

// Simule des contrôles serveur (asynchrone) pour username / email
const takenUsernames = ["admin", "superuser", "aya"];
const takenEmails = ["test@example.com", "admin@demo.fr"];

const fakeApiCheck = (list, value) =>
  new Promise(resolve => setTimeout(() => resolve(!list.includes(value.trim().toLowerCase())), 400));

// ====== Règles de validation ======
const rules = {
  required: v => (!v || !v.trim() ? "Ce champ est requis." : null),

  username: v => {
    if (!v) return null;
    const ok = /^[a-zA-Z0-9._-]{3,20}$/.test(v.trim());
    return ok ? null : "3–20 caractères (lettres, chiffres, ., _, -).";
  },

  async usernameAvailable(v) {
    if (!v) return null;
    const ok = await fakeApiCheck(takenUsernames, v);
    return ok ? null : "Nom d’utilisateur déjà pris.";
  },

  emailFormat: v => {
    if (!v) return null;
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    return ok ? null : "Format d’email invalide.";
  },

  async emailAvailable(v) {
    if (!v) return null;
    const ok = await fakeApiCheck(takenEmails, v);
    return ok ? null : "Cet email est déjà utilisé.";
  },

  passwordStrength: v => {
    if (!v) return null;
    const len = v.length >= 8;
    const mix = /[A-Za-z]/.test(v) && /\d/.test(v);
    const special = /[^A-Za-z0-9]/.test(v);
    const score = (len?1:0) + (mix?1:0) + (special?1:0) + (v.length>=12?1:0);
    const msg = len && mix ? null : "Min. 8 caractères, avec lettres + chiffres.";
    return { error: msg, score };
  },

  confirmMatch: (pwd, conf) => (pwd === conf ? null : "Les mots de passe ne correspondent pas."),

  phoneFR: v => {
    if (!v) return null; // optionnel
    const ok = /^(?:\+33|0)[1-9]\d{8}$/.test(v.replace(/\s/g, ""));
    return ok ? null : "Numéro français attendu (ex : 06xxxxxxxx).";
  },

  terms: checked => (checked ? null : "Vous devez accepter les conditions.")
};

// ====== Helpers d’affichage ======
function setError(inputOrWrapper, message) {
  const wrapper = inputOrWrapper.classList?.contains("field") ? inputOrWrapper : inputOrWrapper.closest(".field");
  const input = inputOrWrapper.classList?.contains("field") ? wrapper.querySelector("input") : inputOrWrapper;
  const err = wrapper.querySelector(".error");
  if (!wrapper || !err) return;
  err.textContent = message || "";
  wrapper.classList.toggle("is-invalid", Boolean(message));
  if (input) input.setAttribute("aria-invalid", Boolean(message));
}

function setStrength(meter, score) {
  if (!meter) return;
  meter.value = score ?? 0;
}

// ====== Validation par champ (avec async) ======
async function validateUsername(el) {
  const req = rules.required(el.value);
  if (req) return setError(el, req), false;
  const fmt = rules.username(el.value);
  if (fmt) return setError(el, fmt), false;
  const avail = await rules.usernameAvailable(el.value);
  if (avail) return setError(el, avail), false;
  setError(el, null); return true;
}

async function validateEmail(el) {
  const req = rules.required(el.value);
  if (req) return setError(el, req), false;
  const fmt = rules.emailFormat(el.value);
  if (fmt) return setError(el, fmt), false;
  const avail = await rules.emailAvailable(el.value);
  if (avail) return setError(el, avail), false;
  setError(el, null); return true;
}

function validatePassword(el, meter) {
  const req = rules.required(el.value);
  if (req) { setError(el, req); setStrength(meter, 0); return false; }
  const { error, score } = rules.passwordStrength(el.value);
  setStrength(meter, score);
  if (error) { setError(el, error); return false; }
  setError(el, null); return true;
}

function validateConfirm(pwdEl, confEl) {
  const req = rules.required(confEl.value);
  if (req) return setError(confEl, req), false;
  const match = rules.confirmMatch(pwdEl.value, confEl.value);
  if (match) return setError(confEl, match), false;
  setError(confEl, null); return true;
}

function validatePhone(el) {
  const err = rules.phoneFR(el.value);
  if (err) { setError(el, err); return false; }
  setError(el, null); return true;
}

function validateTerms(wrapper) {
  const cb = wrapper.querySelector("input[type=checkbox]");
  const err = rules.terms(cb.checked);
  if (err) { setError(wrapper, err); return false; }
  setError(wrapper, null); return true;
}

// ====== Initialisation ======
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profile-form");
  const submitBtn = document.getElementById("submitBtn");

  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirm");
  const phone = document.getElementById("phone");
  const termsWrapper = document.querySelector(".field.checkbox");
  const meter = document.getElementById("strength");

  // Afficher/masquer mot de passe
  document.getElementById("togglePwd").addEventListener("click", () => {
    password.type = password.type === "password" ? "text" : "password";
  });

  // Listeners (debounced pour éviter le spam)
  username.addEventListener("input", debounce(() => validateUsername(username), 350));
  username.addEventListener("blur", () => validateUsername(username));

  email.addEventListener("input", debounce(() => validateEmail(email), 350));
  email.addEventListener("blur", () => validateEmail(email));

  password.addEventListener("input", () => {
    validatePassword(password, meter);
    if (confirm.value) validateConfirm(password, confirm);
  });
  password.addEventListener("blur", () => validatePassword(password, meter));

  confirm.addEventListener("input", () => validateConfirm(password, confirm));
  confirm.addEventListener("blur", () => validateConfirm(password, confirm));

  phone.addEventListener("input", debounce(() => validatePhone(phone), 250));
  phone.addEventListener("blur", () => validatePhone(phone));
  termsWrapper.addEventListener("change", () => validateTerms(termsWrapper));

  // Activation/désactivation du bouton en temps réel
  const updateButtonState = async () => {
    const ok = await Promise.all([
      validateUsername(username),
      validateEmail(email),
      Promise.resolve(validatePassword(password, meter)),
      Promise.resolve(validateConfirm(password, confirm)),
      Promise.resolve(validatePhone(phone)),
      Promise.resolve(validateTerms(termsWrapper))
    ]);
    submitBtn.disabled = !ok.every(Boolean);
  };

  form.addEventListener("input", debounce(updateButtonState, 200));
  form.addEventListener("change", updateButtonState);

  // Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await updateButtonState();
    if (submitBtn.disabled) return;

    // Ici, tu ferais un fetch() vers ton API.
    alert("Formulaire valide ✔ (simulation d’envoi).");
    form.reset();
    setStrength(meter, 0);
    // Nettoie les erreurs visibles
    form.querySelectorAll(".field").forEach(w => setError(w, null));
    submitBtn.disabled = true;
  });
});
