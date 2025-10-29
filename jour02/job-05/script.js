// Récupération du footer
const footer = document.getElementById('footer');

// Fonction pour calculer le pourcentage de scroll
function updateScrollProgress() {
  // Hauteur totale du document
  const hauteurTotale = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  // Position actuelle du scroll
  const scrollActuel = window.scrollY;
  
  // Calcul du pourcentage (0 à 100)
  const pourcentage = (scrollActuel / hauteurTotale) * 100;
  
  // Changement de couleur du footer en fonction du pourcentage
  // Rouge (0%) -> Vert (100%)
  const rouge = Math.round(255 - (pourcentage * 2.55));
  const vert = Math.round(pourcentage * 2.55);
  
  footer.style.backgroundColor = `rgb(${rouge}, ${vert}, 0)`;
}

// Écouteur d'événement sur le scroll
window.addEventListener('scroll', updateScrollProgress);

// Initialisation au chargement de la page
updateScrollProgress();