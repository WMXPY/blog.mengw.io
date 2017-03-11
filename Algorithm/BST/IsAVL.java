public class Solution {
    public boolean isAVL(Node root) {
        return maxDepth(root) - minDepth(root) <= 1;
    }

    int maxDepth(Node root) {
        if (root == null) {
            return 0;
        } else {
            return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
        }
    }

    int minDepth(Node root) {
        if (root == null) {
            return 0;
        } else {
            return 1 + Math.min(minDepth(root.left), minDepth(root.right));
        }
    }
}