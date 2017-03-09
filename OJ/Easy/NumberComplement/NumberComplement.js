/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
    var bin = num.toString(2);
    var rev = '';
    for (var i = 0; i < bin.length; i++) {
        if (bin[i] == 0) {
            rev += '1';
        } else {
            rev += '0';
        }
    }
    rev = parseInt(rev, 2);
    return rev;
};
findComplement(35);