"use strict";
var E11;
(function (E11) {
    class TreeNode {
        constructor(_value) {
            this.value = _value;
            this.parent = null;
            this.children = new Array();
        }
        appendChild(_child) {
            _child.parent = this;
            this.children.push(_child);
        }
        removeChild(_child) {
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i] === _child) {
                    this.children.splice(i, 1);
                    return;
                }
            }
        }
        printTree() {
            console.group(this.value);
            for (const child of this.children) {
                child.printTree();
            }
            console.groupEnd();
        }
        getString(_level = 0) {
            let treeString = this.prefix(_level) + this.value.toString() + "\n";
            for (const child of this.children) {
                treeString += child.getString(_level + 1);
            }
            return treeString;
        }
        prefix(_level) {
            let pre = "";
            do
                pre += "*";
            while (--_level > 0);
            return pre;
        }
    }
    E11.TreeNode = TreeNode;
})(E11 || (E11 = {}));
//# sourceMappingURL=TreeNode.js.map