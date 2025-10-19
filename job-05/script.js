// Tableau contenant les jours de la semaine
const jourssemaines = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

// Fonction qui affiche les jours de la semaine
function afficherjourssemaines() {
    // Boucle for pour parcourir le tableau
    for (let i = 0; i < jourssemaines.length; i++) {
        console.log(jourssemaines[i]);
    }
}

// Appel de la fonction
afficherjourssemaines();