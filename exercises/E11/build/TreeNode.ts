namespace E11 {
    export class TreeNode<T> {
        public value: T;
        public parent: TreeNode<T>;
        private children: Array<TreeNode<T>>;
        private tree: Tree<T>;

        public constructor(_value: T, _tree: Tree<T>) {
            this.value = _value;
            this.parent = null;
            this.children = new Array<TreeNode<T>>();
            this.tree = _tree;
        }

        *[Symbol.iterator](): Generator {
            yield this;
            for (const child of this.children) {
                yield* child;
            }
        }

        public appendChild(_child: TreeNode<T>): void {
            _child.parent = this;
            this.children.push(_child);
            this.tree.notifyObservers(this);
        }

        public removeChild(_child: TreeNode<T>): void {
            for (let i: number = 0; i < this.children.length; i++) {
                if (this.children[i] === _child) {
                    this.children.splice(i, 1);
                    return;
                }
            }
        }

        public remove(): void {
            if (this.parent)
                this.parent.removeChild(this);
        }

        public stringify(_depth: number = 0): string {
            let treeString: string = this.prefix(_depth) + this.value.toString() + "\n";
            for (const child of this.children)
                treeString += child.stringify(_depth + 1);
            return treeString;
        }

        public search(_pattern: (_value: T) => boolean): Array<TreeNode<T>> {
            const result: Array<TreeNode<T>> = new Array<TreeNode<T>>();
            this.searchRecursive(_pattern, result);
            return result;
        }

        private searchRecursive(_pattern: (_value: T) => boolean, _result: Array<TreeNode<T>>): void {
            if (_pattern(this.value))
                _result.push(this);
            for (const child of this.children)
                child.searchRecursive(_pattern, _result);
        }

        private prefix(_depth: number): string {
            let pre: string = "";
            while (_depth-- > 0)
                pre += "*";
            return pre;
        }
    }
}