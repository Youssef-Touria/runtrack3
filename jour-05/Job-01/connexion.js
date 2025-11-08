// Récupérer le formulaire
const form = document.getElementById('connexion-form');

// Récupérer les champs
const email = document.getElementById('email');
const password = document.getElementById('password');

// Fonction pour afficher une erreur
function afficherErreur(champId, message) {
  const erreur = document.getElementById(champId + '-error');
  erreur.textContent = message;
}

// Fonction pour effacer une erreur
function effacerErreur(champId) {
  const erreur = document.getElementById(champId + '-error');
  erreur.textContent = '';
}

// Valider l'email
function validerEmail() {
  const valeur = email.value;
  if (!valeur.includes('@')) {
    afficherErreur('email', 'L\'email doit contenir un @');
    return false;
  }
  if (!valeur.includes('.')) {
    afficherErreur('email', 'L\'email doit contenir un point');
    return false;
  }
  effacerErreur('email');
  return true;
}

// Valider le mot de passe
function validerPassword() {
  const valeur = password.value;
  if (valeur.length < 8) {
    afficherErreur('password', 'Le mot de passe doit avoir au moins 8 caractères');
    return false;
  }
  effacerErreur('password');
  return true;
}

// Écouter les changements sur chaque champ
email.addEventListener('blur', validerEmail);
password.addEventListener('blur', validerPassword);

// Quand on soumet le formulaire
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Empêche l'envoi
  
  // Valider tous les champs
  const emailValide = validerEmail();
  const passwordValide = validerPassword();
  
  // Si tout est valide
  if (emailValide && passwordValide) {
    alert('Connexion réussie !');
    console.log('Email:', email.value);
    console.log('Password:', password.value);
  } else {
    alert('Veuillez corriger les erreurs');
  }
});