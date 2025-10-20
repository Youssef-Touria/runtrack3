// Fonction pour vérifier si un nombre est premier
function estPremier(nombre) {
    // Un nombre premier doit être supérieur ou égal à 2
    if (nombre < 2) {
        return false;
    }
    
    // Vérifier si le nombre est divisible par un autre nombre que 1 et lui-même
    for (let i = 2; i < nombre; i++) {
        if (nombre % i === 0) {
            return false; // Divisible par i, donc pas premier
        }
    }
    
    return true; // Aucun diviseur trouvé, c'est un nombre premier
}

// Fonction sommenombrespremiers
function sommenombrespremiers(nombre1, nombre2) {
    // Vérifier si les deux nombres sont premiers
    if (estPremier(nombre1) && estPremier(nombre2)) {
        return nombre1 + nombre2; // Retourner la somme
    } else {
        return false; // Au moins un des nombres n'est pas premier
    }
}

// Tests
console.log(sommenombrespremiers(3, 5));   // 8 (3 et 5 sont premiers)
console.log(sommenombrespremiers(2, 7));   // 9 (2 et 7 sont premiers)
console.log(sommenombrespremiers(4, 5));   // false (4 n'est pas premier)
console.log(sommenombrespremiers(6, 8));   // false (ni 6 ni 8 ne sont premiers)
console.log(sommenombrespremiers(11, 13)); // 24 (11 et 13 sont premiers)
console.log(sommenombrespremiers(1, 2));   // false (1 n'est pas premier)

