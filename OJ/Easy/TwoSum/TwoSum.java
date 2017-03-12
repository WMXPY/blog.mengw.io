public class Solution {
    public int[] twoSum(int[] nums, int target) {
        int nums_length = nums.length;
        for (int i = 0; i < nums_length; i++) {
            for (int j = 0; j < nums_length - i; j++) {
                if (nums[i] + nums[j] == target) {
                    int[] re = { i, j };
                    return re;
                }
            }
        }
        int[] re = {};
        return re;
    }
}