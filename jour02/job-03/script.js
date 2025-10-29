// Récupération des éléments
const bouton = document.getElementById('button');
const compteur = document.getElementById('compteur');

// Fonction pour ajouter 1 au compteur
function addone() {
  // Récupérer la valeur actuelle du compteur
  let valeurActuelle = parseInt(compteur.textContent);
  
  // Incrémenter de 1
  valeurActuelle++;
  
  // Mettre à jour l'affichage
  compteur.textContent = valeurActuelle;
}

// Ajout de l'écouteur d'événement sur le bouton
bouton.addEventListener('click', addone);