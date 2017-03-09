/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
    var array = [];
    var bin;
    var length;
    for (var i = 0; i <= num; i++) {
        bin = i.toString(2);
        length = 0;
        for (var j = 0; j < bin.length; j++) {
            if (bin[j] == 1) {
                length++;
            }
        }
        array.push(parseInt(length));
    }
    return array;
};
console.log(countBits(5));