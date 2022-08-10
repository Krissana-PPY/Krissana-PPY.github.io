let countarrnumber = 0;
let average;
let sumnumber = 0;
const arrnumber = [];
let number = prompt("Enter an integer (a negative integer to quit):");
list = readlnput(number,arrnumber);
function readlnput(number,arrnumber) {
    this.number = number;
    this.arrnumber = arrnumber;
    while (number >= 0 || isNaN(number)) { 
        if (number >= 0) {
            arrnumber.push(number);
            countarrnumber++;
        }
        number = prompt("Enter an integer (a negative integer to quit):");
    }
    return arrnumber
}

function displayStats(list,average) {
    for (i = 0 ; i < countarrnumber ; i++) {
        sumnumber += Number(list[i]);
    }
    this.ave = function() {
        this.average = sumnumber / countarrnumber;
        if (isNaN(this.average) == true) {
            this.average = 0.00;
            return this.average;
        } else {
            return this.average;
        }
    };
}

var maxarrnumber = Math.max.apply(Math, arrnumber);
var minarrnumber = Math.min.apply(Math, arrnumber);
let c = new displayStats(list,average);

if (arrnumber.length != 0) {
    alert("For the list " + arrnumber + ", the averages is " + c.ave().toFixed(2) + ", the minimum is " + minarrnumber + ", and the maximum is " + maxarrnumber);
} else {
    alert("For the list " + 0 + ", the averages is " + (0) + ", the minimum is " + (0) + ", and the maximum is " + (0));
}