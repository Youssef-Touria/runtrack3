// Récupération du textarea
const keylogger = document.getElementById('keylogger');

// Écouteur d'événement sur tout le document
document.addEventListener('keypress', function(event) {
  // Récupérer la touche pressée
  const touche = event.key;
  
  // Vérifier si c'est une lettre (a-z ou A-Z)
  if (/^[a-zA-Z]$/.test(touche)) {
    // Vérifier si le focus est dans le textarea
    if (document.activeElement === keylogger) {
      // Ajouter la lettre deux fois
      keylogger.value += touche + touche;
    } else {
      // Ajouter la lettre une seule fois
      keylogger.value += touche;
    }
  }
});