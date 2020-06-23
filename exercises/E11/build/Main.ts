namespace E11 {
    const tree: Tree<string> = new Tree<string>();
    const root: TreeNode<string> = tree.createNode("root");
    const child1: TreeNode<string> = tree.createNode("child1");
    const child2: TreeNode<string> = tree.createNode("child2");
    root.appendChild(child1);
    root.appendChild(child2);
    const grand11: TreeNode<string> = tree.createNode("grand11");
    const grand12: TreeNode<string> = tree.createNode("grand12");
    const grand13: TreeNode<string> = tree.createNode("grand13");
    child1.appendChild(grand11);
    child1.appendChild(grand12);
    child1.appendChild(grand13);
    const grand21: TreeNode<string> = tree.createNode("grand21");
    child2.appendChild(grand21);
    child1.removeChild(grand12);

    tree.addAppendObserver(noticeOnAppend);
    function noticeOnAppend(_parent: TreeNode<string>, _child: TreeNode<string>): void {
        console.log("appended", _child, "to", _parent);
    }

    const grand111: TreeNode<string> = tree.createNode("grand111");
    grand11.appendChild(grand111);
    console.log(root.printTree());
    //console.log(root.search(x => x.includes("grand")));

    const results: Array<TreeNode<string>> = root.search(includesGrand);
    console.log(results);

    function includesGrand(_value: string): boolean {
        return _value.includes("grand");
    }

    child2.remove();
    console.log(root.printTree());



    //root.log();
}