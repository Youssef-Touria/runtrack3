
 function jourTravaille(date) {
    const joursFeries2020 = [
        '2020-01-01', '2020-04-13', '2020-05-01', '2020-05-08',
        '2020-05-21', '2020-06-01', '2020-07-14', '2020-08-15',
        '2020-11-01', '2020-11-11', '2020-12-25'
    ];
    const jour = date.getDay();
    const dateStr = date.toISOString().split('T')[0];
    if (jour === 0 || jour === 6 || joursFeries2020.includes(dateStr)) {
        return false; // Week-end ou jour férié
    }
    return true; // Jour travaillé
}
// Exemple d'utilisation
const dateTest = new Date('2020-05-01');
console.log(jourTravaille(dateTest)); // false (jour férié)
// const dateTest2 = new Date('2020-05-04');
// console.log(jourTravaille(dateTest2)); // true (jour travaillé)
// const dateTest3 = new Date('2020-05-02');
// console.log(jourTravaille(dateTest3)); // false (samedi)
// const dateTest4 = new Date('2020-05-03');
// console.log(jourTravaille(dateTest4)); // false (dimanche)


