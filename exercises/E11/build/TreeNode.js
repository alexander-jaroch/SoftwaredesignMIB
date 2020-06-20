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
        remove() {
            if (this.parent)
                this.parent.removeChild(this);
        }
        search(_pattern) {
            const result = new Array();
            this.searchRecursive(_pattern, result);
            return result;
        }
        stringify() {
            return this.stringifyRecursive(0);
        }
        log() {
            console.group(this.value);
            for (const child of this.children)
                child.log();
            console.groupEnd();
        }
        searchRecursive(_pattern, _result) {
            if (_pattern(this.value))
                _result.push(this);
            for (const child of this.children)
                child.searchRecursive(_pattern, _result);
        }
        stringifyRecursive(_depth) {
            let treeString = this.prefix(_depth) + this.value.toString() + "\n";
            for (const child of this.children)
                treeString += child.stringifyRecursive(_depth + 1);
            return treeString;
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