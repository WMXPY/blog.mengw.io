/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
    x = x.toString(2);
    y = y.toString(2);
    var min = Math.max(x.length, y.length);
    if (x.length < y.length) {
        x = '0'.repeat(y.length - x.length) + x;
    } else {
        y = '0'.repeat(x.length - y.length) + y;
    }
    var count = 0;
    for (var i = 0; i < x.length; i++) {
        if (x[i] != y[i]) {
            count++;
        }
    }
    return count;

};
hammingDistance(2, 4);
// console.log(2 ^ 4);
// console.log('d'.repeat(5));