import { XrmColumn } from "./XrmColumn";

export class XrmColumnSet {
    AllColumns: boolean = false;

    constructor(allColumns?: boolean) {
        if (allColumns)
            this.AllColumns = allColumns
        this.Columns = [];
    }
    static FromColumns(...columns: string[]): XrmColumnSet {
        let returnColumnSet = new XrmColumnSet(false);
        returnColumnSet.Columns.push(...columns.map(c => new XrmColumn(c)));
        return returnColumnSet
    }
    public Columns: XrmColumn[];
}