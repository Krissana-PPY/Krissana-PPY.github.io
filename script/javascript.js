let primenumber = " ";
let numtrue = 0;
const arrnumber = [];
var number = prompt("Enter a positive integer");

while (number < 0 || Math.ceil(number) != this.number|| isNaN(number)) { 
    number = prompt("Enter a positive integer");
}
showPrimes(number);
function showPrimes(n) {
    for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;
        arrnumber[numtrue] = " " + String(i);
        numtrue++
    }
    alert("For n = "+ n +" prime numbers are" + arrnumber); //a prime
}

function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}