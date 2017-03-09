var addTwoNumbers = function (l1, l2) {
    var int1 = '',
        int2 = '';
    for (var i = l1.length - 1; i >= 0; i--) {
        int1 += l1[i] + '';
    }
    for (i = l2.length - 1; i >= 0; i--) {
        int2 += l2[i] + '';
    }
    int1 = parseInt(int1);
    int2 = parseInt(int2);
    var re = int1 + int2;
    re = re.toString();
    var array = [];
    for (i = re.length - 1; i >= 0; i--) {
        array.push(parseInt(re.substring(i, i + 1)));
    }
    return array;
};
console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));