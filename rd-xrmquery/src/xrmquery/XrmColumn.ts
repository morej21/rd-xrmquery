export class XrmColumn {
    public Name: string | undefined;
    public Aggregate: AggregateOptions | undefined;
    public Alias: string | undefined;
    public DateGrouping: DateGrouping | undefined;

    constructor(name: string);
    constructor(name: string, alias: string);
    constructor(name: string, alias: string);
    constructor(name: string, alias: string, aggregation: XrmAggregation);
    constructor(name?: string, alias?: string, aggregate?: XrmAggregation) {
        if(name)
        this.Name = name;
        if(alias)
        this.Alias = alias;
        if (aggregate &&  aggregate.Aggregate)
            this.Aggregate = aggregate.Aggregate;
        if (aggregate && aggregate.DateGrouping)
            this.DateGrouping = aggregate.DateGrouping;
    }
}

//groupby => dategrouping !!
//orderby via alias 
export enum AggregateOptions {
    Sum = 'sum',
    Min = 'min',
    Max = 'max',
    CountColumn = 'countcolumn',
    Count = 'count',
    Avg = 'avg'
}

export class XrmAggregation {
    Aggregate: AggregateOptions | undefined
    DateGrouping: DateGrouping | undefined;
}

export enum DateGrouping {
    Year = 'year',
    Quarter = 'quarter',
    Month = 'month',
    Week = 'week',
    Day = 'day',
}