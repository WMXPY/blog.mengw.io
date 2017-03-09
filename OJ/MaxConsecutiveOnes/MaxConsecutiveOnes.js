/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
    var temp = 0;
    var re = 0;
    nums.push(0);
    for (var i = 0; i < nums.length; i++) {
        if (nums[i] == 1) {
            temp++;
        } else {
            re = Math.max(temp, re);
            temp = 0;
        }
    }
    return re;
};
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]));