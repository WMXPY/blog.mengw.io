public class Solution {
    public int LeafCount(Node root) {
        if (root == null) {
            return 0;
        }
        if (root.left == null && root.right == null) {
            return 1;
        }
        return LeafCount(root.left) + LeafCount(root.right);
    }
}