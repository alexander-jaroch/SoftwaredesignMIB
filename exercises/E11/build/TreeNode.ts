namespace E11 {
    export class TreeNode<T> {
        public value: T;
        private parent: TreeNode<T>;
        private children: Array<TreeNode<T>>;

        public constructor(_value: T) {
            this.value = _value;
            this.parent = null;
            this.children = new Array<TreeNode<T>>();
        }

        public appendChild(_child: TreeNode<T>): void {
            _child.parent = this;
            this.children.push(_child);
        }

        public removeChild(_child: TreeNode<T>): void {
            for (let i: number = 0; i < this.children.length; i++) {
                if (this.children[i] === _child) {
                    this.children.splice(i, 1);
                    return;
                }
            }
        }

        public printTree(): void {
            console.group(this.value);
            for (const child of this.children) {
                child.printTree();
            }
            console.groupEnd();
        }

        public getString(_level: number = 0): string {
            let treeString: string = this.prefix(_level) + this.value.toString() + "\n";
            for (const child of this.children) {
                treeString += child.getString(_level + 1);
            }
            return treeString;
        }

        private prefix(_level: number): string {
            let pre: string = "";
            do
                pre += "*";
            while (--_level > 0);
            return pre;
        }
    }
}