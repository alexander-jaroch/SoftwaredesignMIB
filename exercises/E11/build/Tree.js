"use strict";
var E11;
(function (E11) {
    class Tree {
        constructor() {
            this.appendObservers = new Array();
        }
        createNode(_value) {
            return new E11.TreeNode(_value, this);
        }
        addAppendObserver(_appendObserver) {
            this.appendObservers.push(_appendObserver);
        }
    }
    E11.Tree = Tree;
})(E11 || (E11 = {}));
//# sourceMappingURL=Tree.js.map