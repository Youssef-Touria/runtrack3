// Code Konami : ↑ ↑ ↓ ↓ ← → ← → B A
const codeKonami = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

// Tableau pour stocker les touches pressées par l'utilisateur
let touchesPressees = [];

// Écouteur d'événement sur les touches du clavier
document.addEventListener('keydown', function(event) {
  // Ajouter la touche pressée au tableau
  touchesPressees.push(event.key);
  
  // Garder seulement les 10 dernières touches (longueur du code Konami)
  touchesPressees = touchesPressees.slice(-10);
  
  // Vérifier si le code Konami est correct
  if (JSON.stringify(touchesPressees) === JSON.stringify(codeKonami)) {
    // Activer le style La Plateforme_
    document.body.classList.add('konami-active');
    
    // Optionnel : afficher un message dans la console
    console.log('🎮 Code Konami activé !');
  }
});