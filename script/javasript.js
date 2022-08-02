let primenumber = "";
var number = prompt("Enter a positive integer");

while (number < 0 || Math.ceil(number) != this.number|| isNaN(number)) { 
    number = prompt("Enter a positive integer");
}
showPrimes(number);
function showPrimes(n) {
    for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;
        primenumber += " " + i;
    }
    alert("For n = "+ n +" prime numbers are" + primenumber); //a prime
}

function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}