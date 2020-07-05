namespace E10 {
    export class Container<T extends Property> {
        public properties: Array<T>;

        public constructor() {
            this.properties = new Array<T>();
        }

        public add(_property: T): void {
            this.properties.push(_property);
        }

        public raiseTaxes(_percentage: number): void {
            for (const property of this.properties)
                property.raiseTax(_percentage);
        }

        public print(): void {
            for (const property of this.properties)
                property.print();
        }
    }
}