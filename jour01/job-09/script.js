// Fonction de tri
function tri(numbers, order) {
    // Utilisation de la méthode sort() avec une fonction de comparaison
    if (order === "asc") {
        // Tri ascendant (croissant)
        numbers.sort(function(a, b) {
            return a - b;
        });
    } else if (order === "desc") {
        // Tri décroissant
        numbers.sort(function(a, b) {
            return b - a;
        });
    }
    
    return numbers;
}

// Tests
const tableau1 = [5, 2, 9, 1, 7, 3];
console.log("Tableau original:", [5, 2, 9, 1, 7, 3]);
console.log("Tri ascendant:", tri([5, 2, 9, 1, 7, 3], "asc"));

const tableau2 = [5, 2, 9, 1, 7, 3];
console.log("Tri décroissant:", tri([5, 2, 9, 1, 7, 3], "desc"));

const tableau3 = [100, 50, 75, 25, 10];
console.log("Autre exemple (asc):", tri([100, 50, 75, 25, 10], "asc"));
console.log("Autre exemple (desc):", tri([100, 50, 75, 25, 10], "desc"));