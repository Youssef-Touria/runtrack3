// Fonction FizzBuzz
function fizzbuzz() {
    // Boucle de 1 à 151
    for (let i = 1; i <= 151; i++) {
        // Vérifier d'abord si le nombre est multiple de 3 ET de 5
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        }
        // Sinon, vérifier si le nombre est multiple de 3
        else if (i % 3 === 0) {
            console.log("Fizz");
        }
        // Sinon, vérifier si le nombre est multiple de 5
        else if (i % 5 === 0) {
            console.log("Buzz");
        }
        // Sinon, afficher le nombre
        else {
            console.log(i);
        }
    }
}

// Appel de la fonction
fizzbuzz();
