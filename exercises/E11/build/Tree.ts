namespace E11 {
    export interface TreeObserver<T> {
        update(_node: TreeNode<T>): void;
    }

    export class Tree<T> {
        public observers: Array<TreeObserver<T>>;

        public constructor() {
            this.observers = new Array<TreeObserver<T>>();
        }

        public createNode(_value: T): TreeNode<T> {
            return new TreeNode<T>(_value, this);
        }

        public registerObserver(_observer: TreeObserver<T>): void {
            this.observers.push(_observer);
        }

        public notifyObservers(_node: TreeNode<T>): void {
            for (const observer of this.observers)
                observer.update(_node);
        }
    }
}