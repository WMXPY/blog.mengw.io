/**
 * @param {string} s
 * @return {string}
 */
var reverseString = function (s) {
    var splitString = s.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
};
console.log(reverseString('helpp'))