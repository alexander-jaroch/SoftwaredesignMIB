namespace E11 {
    export type AppendObserver<T> = (_parent: TreeNode<T>, _child: TreeNode<T>) => void;
    export class Tree<T> {
        public appendObservers: Array<AppendObserver<T>>;

        public constructor() {
            this.appendObservers = new Array<AppendObserver<T>>();
        }

        public createNode(_value: T): TreeNode<T> {
            return new TreeNode<T>(_value, this);
        }

        public addAppendObserver(_appendObserver: AppendObserver<T>): void {
            this.appendObservers.push(_appendObserver);
        }
    }
}