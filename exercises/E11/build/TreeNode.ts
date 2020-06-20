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

        public remove(): void {
            if (this.parent)
                this.parent.removeChild(this);
        }

        public search(_pattern: (_value: T) => boolean): Array<TreeNode<T>> {
            const result: Array<TreeNode<T>> = new Array<TreeNode<T>>();
            this.searchRecursive(_pattern, result);
            return result;
        }

        public stringify(): string {
            return this.stringifyRecursive(0);
        }

        public log(): void {
            console.group(this.value);
            for (const child of this.children)
                child.log();
            console.groupEnd();
        }

        private searchRecursive(_pattern: (_value: T) => boolean, _result: Array<TreeNode<T>>): void {
            if (_pattern(this.value))
                _result.push(this);
            for (const child of this.children)
                child.searchRecursive(_pattern, _result);
        }

        private stringifyRecursive(_depth: number): string {
            let treeString: string = this.prefix(_depth) + this.value.toString() + "\n";
            for (const child of this.children)
                treeString += child.stringifyRecursive(_depth + 1);
            return treeString;
        }

        private prefix(_depth: number): string {
            let pre: string = "";
            while (_depth-- > 0)
                pre += "*";
            return pre;
        }
    }
}