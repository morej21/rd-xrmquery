import { XrmColumnSet } from "./XrmColumnSet";
import { XrmFilter, LogicalOperator } from "./XrmFilter";
import { XrmOrder } from "./XrmOrder";

export class XrmLinkEntity {
    public ColumnSet: XrmColumnSet;
    public EntityAlias: string;
    public JoinOperator: JoinOperator|undefined;
    public LinkCriteria: XrmFilter;
    public LinkEntities: XrmLinkEntity[];
    public LinkFromAttributeName: string|undefined;
    public LinkFromEntityName: string |undefined;
    public LinkToAttributeName: string|undefined;
    public LinkToEntityName: string|undefined;
    public Intersect: boolean;    
    public Orders: XrmOrder[];

    constructor();
    constructor(linkFromEntityName: string, linkToEntityName: string, linkFromAttributeName: string, linkToAttributeName: string);
    constructor(linkFromEntityName: string, linkToEntityName: string, linkFromAttributeName: string, linkToAttributeName: string, joinOperator: JoinOperator);
    constructor(linkFromEntityName?: string, linkToEntityName?: string, linkFromAttributeName?: string, linkToAttributeName?: string, joinOperator?: JoinOperator) {
        //this.EntityAlias = linkToEntityName;
        this.LinkFromEntityName = linkFromEntityName;
        this.LinkToEntityName = linkToEntityName;
        this.LinkFromAttributeName = linkFromAttributeName;
        this.LinkToAttributeName = linkToAttributeName;
        this.JoinOperator = joinOperator;

        this.LinkCriteria = new XrmFilter(LogicalOperator.And);
        this.Orders = [];
        this.LinkEntities = [];
        this.ColumnSet = new XrmColumnSet(false);
    }
    public AddLink(linkToEntityName: string, linkFromAttributeName: string, linkToAttributeName: string): XrmLinkEntity
    public AddLink(linkToEntityName: string, linkFromAttributeName: string, linkToAttributeName: string, joinOperator: JoinOperator): XrmLinkEntity
    public AddLink(linkToEntityName: string, linkFromAttributeName: string, linkToAttributeName: string, joinOperator?: JoinOperator): XrmLinkEntity {
        let linkEntity : XrmLinkEntity;
       
        if(joinOperator)
            linkEntity = new XrmLinkEntity(this.EntityAlias, linkToEntityName, linkFromAttributeName, linkToAttributeName, joinOperator);
        else
            linkEntity = new XrmLinkEntity(this.EntityAlias, linkToEntityName, linkFromAttributeName, linkToAttributeName)
         this.LinkEntities.push(linkEntity);

        return linkEntity;
    }
}
export enum JoinOperator {
    Inner = 'inner',
    LeftOuter = 'outer',
    Natural = 'natural'
}
