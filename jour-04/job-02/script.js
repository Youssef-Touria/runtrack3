function jsonValueKey(jsonString, key) {
    try {
        const jsonObject = JSON.parse(jsonString);
        return jsonObject[key];
    } catch (error) {
        console.error("Erreur lors du parsing JSON:", error);
        return undefined;
    }
}

// Tests
const jsonStr = `{
    "name": "La Plateforme_",
    "address": "8 rue d'hozier",
    "city": "Marseille",
    "nb_staff": "11",
    "creation": "2019"
}`;

console.log(jsonValueKey(jsonStr, "city"));      // Affiche: Marseille
console.log(jsonValueKey(jsonStr, "name"));      // Affiche: La Plateforme_
console.log(jsonValueKey(jsonStr, "nb_staff"));  // Affiche: 11
console.log(jsonValueKey(jsonStr, "creation"));  // Affiche: 2019
console.log(jsonValueKey(jsonStr, "address"));   // Affiche: 8 rue d'hozier
console.log(jsonValueKey(jsonStr, "country"));   // Affiche: undefined