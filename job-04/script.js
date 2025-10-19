/**
 * Retourne true si l'année est bisextile, sinon false.
 * Règle :
 * - divisible par 4 ET pas par 100, OU divisible par 400
 */
function bisextile(annee) {
  // (facultatif) sécurités
  if (!Number.isInteger(annee)) {
    throw new TypeError('annee doit être un entier');
  }
  return (annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0);
}

// Petits tests en console
console.log('2000 →', bisextile(2000)); // true
console.log('1900 →', bisextile(1900)); // false
console.log('2024 →', bisextile(2024)); // true
console.log('2025 →', bisextile(2025)); // false
console.log('2007→', bisextile(2007)); // false
console.log('1600 →', bisextile(1600)); // true
console.log('2020 →', bisextile(2020)); // true
console.log('1800 →', bisextile(1800)); // false
console.log('2021 →', bisextile(2021)); // false
console.log('2028 →', bisextile(2028)); // true




