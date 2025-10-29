// Récupération du bouton
const bouton = document.getElementById('button');

// Création d'un article à afficher/masquer
const article = document.createElement('article');
article.textContent = 'L\'important n\'est pas la chute, mais l\'atterrissage.';
article.style.marginTop = '20px';
document.body.appendChild(article);

// État initial : l'article est visible
let estVisible = true;

// Fonction pour afficher/masquer l'article
bouton.addEventListener('click', function() {
  if (estVisible) {
    article.style.display = 'none';
    estVisible = false;
  } else {
    article.style.display = 'block';
    estVisible = true;
  }
});