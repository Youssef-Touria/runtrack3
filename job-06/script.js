function fizzbuzz() {
    // Boucle de 1 à 151
    for (let i = 1; i <= 151; i++) {
        // Vérification des conditions et affichage des résultats
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}