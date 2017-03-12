/**
 * Created by WMPCXPY on 2017/3/11.
 */
public class Solutions {
    public static int[] twoSum(int[] nums, int target) {
        //        int[] input = {3,2,4};
        //        int[] lists = twoSum(input,6);
        //        for (int i = 0; i < lists.length; i++) {
        //            System.out.println(lists[i]);
        //        }
        int nums_length = nums.length;
        for (int i = 0; i < nums_length; i++) {
            for (int j = nums_length - 1; j >= 0; j--) {
                if (nums[i] + nums[j] == target && i != j) {
                    int[] re = {i, j};
                    return re;
                }
            }
        }
        int[] re = {};
        return re;
    }
}
