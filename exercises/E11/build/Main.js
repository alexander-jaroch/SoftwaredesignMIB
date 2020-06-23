"use strict";
var E11;
(function (E11) {
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
    child2.appendChild(grand21);
    child1.removeChild(grand12);
    tree.addAppendObserver(noticeOnAppend);
    function noticeOnAppend(_parent, _child) {
        console.log("appended", _child, "to", _parent);
    }
    const grand111 = tree.createNode("grand111");
    grand11.appendChild(grand111);
    console.log(root.printTree());
    //console.log(root.search(x => x.includes("grand")));
    const results = root.search(includesGrand);
    console.log(results);
    function includesGrand(_value) {
        return _value.includes("grand");
    }
    child2.remove();
    console.log(root.printTree());
    //root.log();
})(E11 || (E11 = {}));
//# sourceMappingURL=Main.js.map