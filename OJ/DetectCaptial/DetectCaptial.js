/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
    if (word.length < 2) {
        return true;
    }
    if (word[0].toUpperCase() === word[0]) {
        if (word[1].toUpperCase() === word[1]) {
            for (var i = 2; i < word.length; i++) {
                if (word[i].toUpperCase() !== word[i]) {
                    return false;
                }
            }
        } else {
            for (i = 2; i < word.length; i++) {
                if (word[i].toUpperCase() === word[i]) {
                    return false;
                }
            }
        }
    } else {
        for (i = 1; i < word.length; i++) {
            if (word[i].toUpperCase() === word[i]) {
                return false;
            }
        }
    }
    return true;
};
console.log(detectCapitalUse("dAA"));