import { XrmColumn } from "./XrmColumn";

export class XrmColumnSet {
    AllColumns: boolean = false;
    public Columns: XrmColumn[];
    
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

    public AddColumn(column: string){
        this.AllColumns = false;
        this.Columns.push(new XrmColumn(column));
    }

    public AddColumns(...columns: string[]){
        this.AllColumns = false;
        this.Columns.push(...columns.map(c => new XrmColumn(c)));
    }

}
