void recursivePreorder(TreeNode *root)
{
    if(root)
    {
        cout<<root->val<<' ';
        recursivePreorder(root->left);
        recursivePreorder(root->right);
    }
}

void recursiveInorder(TreeNode *root)
{
    if(root)
    {
        recursiveInorder(root->left);
        cout<<root->val<<' ';
        recursiveInorder(root->right);
    }
}

void recursivePostorder(TreeNode *root)
{
    if(root)
    {
        recursivePostorder(root->left);
        recursivePostorder(root->right);
        cout<<root->val<<' ';
    }
}