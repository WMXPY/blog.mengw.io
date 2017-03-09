/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    var lookup = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var romanStr = "";
    for (var i in lookup) {
        while (num >= lookup[i]) {
            romanStr += i;
            num -= lookup[i];
        }
    }
    return romanStr;
};
console.log(intToRoman(1093));