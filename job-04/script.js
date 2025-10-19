// Fonction pour déterminer si une année est bisextile
function bisextile(annee) {
    // Une année est bisextile si :
    // - Elle est divisible par 4 ET
    // - (Elle n'est pas divisible par 100 OU elle est divisible par 400)
    if (annee % 4 === 0 && (annee % 100 !== 0 || annee % 400 === 0)) {
        return true;
    }
    return false;
}

// Tests de la fonction
console.log("2024 est bisextile :", bisextile(2024)); // true
console.log("2023 est bisextile :", bisextile(2023)); // false
console.log("2000 est bisextile :", bisextile(2000)); // true
console.log("1900 est bisextile :", bisextile(1900)); // false
console.log("2100 est bisextile :", bisextile(2100)); // false
console.log("2400 est bisextile :", bisextile(2400)); // true