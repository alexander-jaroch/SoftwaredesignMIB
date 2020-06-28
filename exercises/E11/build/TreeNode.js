"use strict";
var E11;
(function (E11) {
    class TreeNode {
        constructor(_value, _tree) {
            this.value = _value;
            this.parent = null;
            this.children = new Array();
            this.tree = _tree;
        }
        *[Symbol.iterator]() {
            yield this;
            for (const child of this.children) {
                yield* child;
            }
        }
        appendChild(_child) {
            _child.parent = this;
            this.children.push(_child);
            this.tree.notifyObservers(this);
        }
        removeChild(_child) {
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i] === _child) {
                    this.children.splice(i, 1);
                    return;
                }
            }
        }
        remove() {
            if (this.parent)
                this.parent.removeChild(this);
        }
        stringify(_depth = 0) {
            let treeString = this.prefix(_depth) + this.value.toString() + "\n";
            for (const child of this.children)
                treeString += child.stringify(_depth + 1);
            return treeString;
        }
        search(_pattern) {
            const result = new Array();
            this.searchRecursive(_pattern, result);
            return result;
        }
        searchRecursive(_pattern, _result) {
            if (_pattern(this.value))
                _result.push(this);
            for (const child of this.children)
                child.searchRecursive(_pattern, _result);
        }
        prefix(_depth) {
            let pre = "";
            while (_depth-- > 0)
                pre += "*";
            return pre;
        }
    }
    E11.TreeNode = TreeNode;
})(E11 || (E11 = {}));
//# sourceMappingURL=TreeNode.js.map