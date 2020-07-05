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
/// <reference path="TreeNode.ts" />
var E11;
/// <reference path="TreeNode.ts" />
(function (E11) {
    class Tree {
        constructor() {
            this.observers = new Array();
        }
        createNode(_value) {
            return new E11.TreeNode(_value, this);
        }
        registerObserver(_observer) {
            this.observers.push(_observer);
        }
        notifyObservers(_node) {
            for (const observer of this.observers)
                observer.update(_node);
        }
    }
    E11.Tree = Tree;
})(E11 || (E11 = {}));
/// <reference path="Tree.ts" />
var E11;
/// <reference path="Tree.ts" />
(function (E11) {
    class AppendLog {
        update(_node) {
            console.log("appended", _node, "to", _node.parent);
        }
    }
    class AppendLog2 {
        update(_node) {
            console.log(_node.value, "appended");
        }
    }
    const tree = new E11.Tree();
    const root = tree.createNode("root");
    const child1 = tree.createNode("child1");
    const child2 = tree.createNode("child2");
    root.appendChild(child1);
    root.appendChild(child2);
    const grand11 = tree.createNode("grand11");
    const grand12 = tree.createNode("grand12");
    const grand13 = tree.createNode("grand13");
    child1.appendChild(grand11);
    child1.appendChild(grand12);
    child1.appendChild(grand13);
    const grand21 = tree.createNode("grand21");
    tree.registerObserver(new AppendLog2());
    child2.appendChild(grand21);
    child1.removeChild(grand12);
    tree.registerObserver(new AppendLog());
    const grand111 = tree.createNode("grand111");
    grand11.appendChild(grand111);
    console.log(root.stringify());
    console.log(root.search(x => x.includes("grand")));
    child2.remove();
    console.log(root.stringify());
    for (const node of root) {
        console.log(node);
    }
})(E11 || (E11 = {}));
//# sourceMappingURL=core.js.map