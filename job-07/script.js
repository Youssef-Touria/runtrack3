// Fonction pour vérifier si c'est un jour travaillé
function jourtravaille(date) {
    // Jours fériés de l'année 2020 en France
    const joursFeries2020 = [
        "2020-01-01", // Jour de l'an
        "2020-04-13", // Lundi de Pâques
        "2020-05-01", // Fête du travail
        "2020-05-08", // Victoire 1945
        "2020-05-21", // Ascension
        "2020-06-01", // Lundi de Pentecôte
        "2020-07-14", // Fête nationale
        "2020-08-15", // Assomption
        "2020-11-01", // Toussaint
        "2020-11-11", // Armistice 1918
        "2020-12-25"  // Noël
    ];

    // Formater la date au format YYYY-MM-DD
    const jour = date.getDate();
    const mois = date.getMonth() + 1; // Les mois commencent à 0
    const annee = date.getFullYear();
    
     const estFerie = joursFeries2020.includes(`${mois}-${jour}`);

  if (annee !== 2020) {
    alert(`Cette fonction ne gère que l'année 2020.`);
  } else if (estFerie) {
   alert(`Le ${jour}/${mois}/${annee} est un jour férié.`);
  } else if (jourSemaine === 0 || jourSemaine === 6) {
    alert(`Non, le ${jour}/${mois}/${annee} est un week-end.`);
  } else {
    alert(`Oui, le ${jour}/${mois}/${annee} est un jour travaillé.`);
  }
}
// l'appel e la fct en traitant ce que l'utilisateur a saisie 
let saisie = prompt("Entrez une date au format JJ/MM/AAAA :");

if (saisie) {
  const [jour, mois, annee] = saisie.split("/").map(Number);
  const date = new Date(annee, mois - 1, jour);

  jourtravaille(date);
} else {
  alert("Aucune date saisie !");
}