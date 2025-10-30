function jsonValueKey(jsonString, key) {
    const jsonObject = JSON.parse(jsonString);
    return jsonObject[key];
}

// Test
const jsonStr = `{
    "name": "La Plateforme_",
    "address": "8 rue d'hozier",
    "city": "Marseille",
    "nb_staff": "11",
    "creation": "2019"
}`;

console.log(jsonValueKey(jsonStr, "city")); // Marseille