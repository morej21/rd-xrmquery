import { XrmColumnSet } from "./XrmColumnSet";
import { XrmFilter, LogicalOperator } from "./XrmFilter";
import { XrmOrder } from "./XrmOrder";

export class XrmLinkEntity {
    public ColumnSet: XrmColumnSet;
    public EntityAlias: string;
    public JoinOperator: JoinOperator;
    public LinkCriteria: XrmFilter;
    public LinkEntities: XrmLinkEntity[];
    public LinkFromAttributeName: string;
    public LinkFromEntityName: string;
    public LinkToAttributeName: string;
    get LinkToEntityName(): string {
        if (this.linkToEntityName)
            return this.linkToEntityName;
        else return "";
    }
    set LinkToEntityName(newName: string) {
        this.linkToEntityName = newName;

    }
    public Orders: XrmOrder[];
    private linkToEntityName: string | undefined;
    constructor(linkFromEntityName: string, linkToEntityName: string, linkFromAttributeName: string, linkToAttributeName: string, joinOperator: JoinOperator) {
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
    public AddLink(linkToEntityName: string, linkFromAttributeName: string, linkToAttributeName: string, joinOperator: JoinOperator): XrmLinkEntity {
        let linkEntity = new XrmLinkEntity(this.EntityAlias, linkToEntityName, linkFromAttributeName, linkToAttributeName, joinOperator);
        this.LinkEntities.push(linkEntity);
        return linkEntity;
    }
}
export enum JoinOperator {
    Inner = 'inner',
    LeftOuter = 'outer',
    Natural = 'natural'
}
