/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (words) {
    const qrow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const wrow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const zrow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
    var re = [];
    for (word in words) {
        if (qrow.indexOf(words[word][0].toLowerCase()) != -1) {
            var watch = true;
            for (letter in words[word]) {
                if (qrow.indexOf(words[word][letter].toLowerCase()) == -1) {
                    watch = false;
                    letter = words[word].length;
                }
            }
            if (watch == true) re.push(words[word]);
        }
        if (wrow.indexOf(words[word][0].toLowerCase()) != -1) {
            var watch = true;
            for (letter in words[word]) {
                if (wrow.indexOf(words[word][letter].toLowerCase()) == -1) {
                    watch = false;
                    letter = words[word].length;
                }
            }
            if (watch == true) re.push(words[word]);
        }
        if (zrow.indexOf(words[word][0].toLowerCase()) != -1) {
            var watch = true;
            for (letter in words[word]) {
                if (zrow.indexOf(words[word][letter].toLowerCase()) == -1) {
                    watch = false;
                    letter = words[word].length;
                }
            }
            if (watch == true) re.push(words[word]);
        }
    }
    return re;
};
console.log(findWords(["Hello", "Alaska", "Dad", "Peace"]));