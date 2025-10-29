// Récupérer le bouton
const button = document.getElementById('button');

// Ajouter un écouteur d'événement sur le clic
button.addEventListener('click', function() {
    // Utiliser fetch pour récupérer le contenu du fichier
    fetch('expression.txt')
        .then(response => response.text())
        .then(data => {
            // Créer un paragraphe
            const p = document.createElement('p');
            // Placer le contenu du fichier dans le paragraphe
            p.textContent = data;
            // Insérer le paragraphe dans le body
            document.body.appendChild(p);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du fichier:', error);
        });
});