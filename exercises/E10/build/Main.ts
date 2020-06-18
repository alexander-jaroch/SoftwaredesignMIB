namespace E10 {
    const container: Container<Flat> = new Container();
    const f1: Flat = new Flat("Musterstr. 1", 400, 0.065);
    const f2: Flat = new Flat("Musterstr. 2", 6000, 0.065);
    const f3: Flat = new Flat("Musterstr. 3", 666, 0.065);
    const f4: Flat = new Flat("Musterstr. 4", 3141, 0.065);
    const f5: Flat = new Flat("Am Großhausberg 2", 266, 0.065);
    container.add(f1);
    container.add(f2);
    container.add(f3);
    container.add(f4);
    container.add(f5);
    container.print();
    container.raiseTaxes(0.5);
    container.print();
}