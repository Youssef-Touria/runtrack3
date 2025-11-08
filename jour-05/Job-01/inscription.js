// Récupérer le formulaire
const form = document.getElementById('inscription-form');

// Récupérer tous les champs
const nom = document.getElementById('nom');
const prenom = document.getElementById('prenom');
const email = document.getElementById('email');
const password = document.getElementById('password');
const adresse = document.getElementById('adresse');
const codePostal = document.getElementById('code-postal');

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

// Valider le nom
function validerNom() {
  const valeur = nom.value;
  if (valeur.length < 2) {
    afficherErreur('nom', 'Le nom doit avoir au moins 2 caractères');
    return false;
  }
  effacerErreur('nom');
  return true;
}

// Valider le prénom
function validerPrenom() {
  const valeur = prenom.value;
  if (valeur.length < 2) {
    afficherErreur('prenom', 'Le prénom doit avoir au moins 2 caractères');
    return false;
  }
  effacerErreur('prenom');
  return true;
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

// Valider l'adresse
function validerAdresse() {
  const valeur = adresse.value;
  if (valeur.length < 5) {
    afficherErreur('adresse', 'L\'adresse doit avoir au moins 5 caractères');
    return false;
  }
  effacerErreur('adresse');
  return true;
}

// Valider le code postal
function validerCodePostal() {
  const valeur = codePostal.value;
  if (valeur.length !== 5) {
    afficherErreur('code-postal', 'Le code postal doit avoir exactement 5 chiffres');
    return false;
  }
  // Vérifier que ce sont bien des chiffres
  if (isNaN(valeur)) {
    afficherErreur('code-postal', 'Le code postal doit contenir uniquement des chiffres');
    return false;
  }
  effacerErreur('code-postal');
  return true;
}

// Écouter les changements sur chaque champ (validation quand on quitte le champ)
nom.addEventListener('blur', validerNom);
prenom.addEventListener('blur', validerPrenom);
email.addEventListener('blur', validerEmail);
password.addEventListener('blur', validerPassword);
adresse.addEventListener('blur', validerAdresse);
codePostal.addEventListener('blur', validerCodePostal);

// Quand on soumet le formulaire
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Empêche l'envoi du formulaire
  
  // Valider tous les champs
  const nomValide = validerNom();
  const prenomValide = validerPrenom();
  const emailValide = validerEmail();
  const passwordValide = validerPassword();
  const adresseValide = validerAdresse();
  const codePostalValide = validerCodePostal();
  
  // Si tout est valide
  if (nomValide && prenomValide && emailValide && passwordValide && adresseValide && codePostalValide) {
    alert('Formulaire valide ! Inscription réussie.');
    console.log('Données du formulaire:');
    console.log('Nom:', nom.value);
    console.log('Prénom:', prenom.value);
    console.log('Email:', email.value);
    console.log('Password:', password.value);
    console.log('Adresse:', adresse.value);
    console.log('Code Postal:', codePostal.value);
  } else {
    alert('Veuillez corriger les erreurs dans le formulaire');
  }
});