function afficherjourssemaines() {
    // Création du tableau contenant les jours de la semaine
    const jourssemaines = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche"
    ];
    
    // Boucle for pour afficher chaque jour
    for (let i = 0; i < jourssemaines.length; i++) {
        console.log(jourssemaines[i]);
    }
}

// Appel de la fonction pour tester
afficherjourssemaines();