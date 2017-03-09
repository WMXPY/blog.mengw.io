/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
    var re = [];
    for (var i = 1; i <= n; i++) {
        var thisre = i + '';
        if (i % 3 == 0) {
            thisre = 'Fizz';
        }
        if (i % 5 == 0) {
            if (thisre == i) {
                thisre = 'Buzz';
            } else {
                thisre += 'Buzz';
            }
        }
        re.push(thisre);
    }
    return re;
};
console.log(fizzBuzz(15));