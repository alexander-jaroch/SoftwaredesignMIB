"use strict";
var E11;
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
//# sourceMappingURL=Tree.js.map