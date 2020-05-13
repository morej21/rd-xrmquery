import { String } from '../common/string.operations';
import { XrmFilter, LogicalOperator } from "./XrmFilter";
import { XrmColumnSet } from "./XrmColumnSet";
import { XrmLinkEntity, JoinOperator } from "./XrmLinkEntity";
import { XrmOrder, OrderType } from "./XrmOrder";
import { ConditionOperator } from "./XrmCondition";
import { XrmPageInfo } from './XrmPageInfo';

export class XrmQuery {
    public EntityName: string;
    public ColumnSet: XrmColumnSet
    public Criteria: XrmFilter;
    public Distinct: boolean
    public LinkEntities: XrmLinkEntity[];
    public Orders: XrmOrder[];
    public PageInfo: XrmPageInfo | undefined;
    private isAggregate: boolean = false;

    constructor(entityName: string) {
        this.EntityName = entityName;
        this.ColumnSet = new XrmColumnSet(false);
        this.Criteria = new XrmFilter(LogicalOperator.And);
        this.Distinct = false;
        this.LinkEntities = [];
        this.Orders = [];
    }
    public AddOrder(attributeName: string, orderType: OrderType) {
        this.Orders.push(new XrmOrder(attributeName, orderType))
    }
    public AddLink(linkToEntityName: string, linkFromAttributeName: string, linkToAttributeName: string, joinOperator: JoinOperator): XrmLinkEntity {
        let linkEntity = new XrmLinkEntity(this.EntityName, linkToEntityName, linkFromAttributeName, linkToAttributeName, joinOperator);
        this.LinkEntities.push(linkEntity);
        return linkEntity;
    }
    public GetFetchXml(): string {
        let fetchXml: string = "<fetch ";
        if (this.ColumnSet && !this.ColumnSet.AllColumns) {
            if (this.ColumnSet.Columns.filter(c => c.Aggregate).length > 0) {
                this.isAggregate = true;
                fetchXml += " aggregate='true' "
            }
        }
        if (this.PageInfo) {
            if (this.PageInfo.ReturnTotalRecordCount)
                fetchXml += " returntotalrecordcount='true' "
            if (this.PageInfo.PageNumber)
                fetchXml += ` page='${this.PageInfo.PageNumber}' `;
            if (this.PageInfo.Count)
                fetchXml += ` count='${this.PageInfo.Count}' `;
            if (this.PageInfo.PagingCookie) {
                let cookiePart = decodeURIComponent(decodeURIComponent(this.PageInfo.PagingCookie.split('pagingcookie="')[1].split('"')[0]));
                fetchXml += ` paging-cookie='${encodeURIComponent(String.escapeXML(cookiePart))}'`;
            }
        }
        fetchXml += ` distinct='${this.Distinct}' mapping='logical'>`;
        fetchXml += `<entity name='${this.EntityName}'>`;
        fetchXml += this.getXmlAttributes(this.ColumnSet); //attributes        
        fetchXml += this.getXmlLinkEntities(this.LinkEntities);//link-entities  
        fetchXml += this.getXmlFilters(this.Criteria);//filters
        fetchXml += "</entity>"
        fetchXml += "</fetch>";
        return fetchXml;
    }
    private getXmlAttributes(columnSet?: XrmColumnSet): string {
        let attributes: string = "";

        if (!columnSet || !columnSet.Columns || (!columnSet.AllColumns && columnSet.Columns.length == 0)) {
            attributes += "<no-attrs/>"
        }
        else
            if (columnSet) {
                if (columnSet.AllColumns) {
                    attributes += "<all-attributes/>"
                }
                else if (columnSet.Columns.length > 0) {
                    columnSet.Columns.forEach(c => {
                        attributes += "<attribute"
                        attributes += ` name='${c.Name}' `;
                        if (c.Alias)
                            attributes += ` alias='${c.Alias}' `;
                        if (this.isAggregate)
                            if (!c.Alias)
                                attributes += ` alias='${c.Name}' `;
                        if (c.Aggregate)
                            attributes += ` aggregate='${c.Aggregate}' `;
                        if (this.isAggregate && !c.Aggregate) {
                            attributes += " groupby='true' "
                            if (c.DateGrouping)
                                attributes += ` dategrouping = '${c.DateGrouping}' `;
                        }
                        attributes += " />";
                    });
                }
            }
        return attributes;
    }
    private getXmlFilters(criteria: XrmFilter): string {
        let filters: string = "";
        if (criteria && (criteria.Conditions && criteria.Conditions.length > 0) || (criteria.Filters && criteria.Filters.length > 0)) {
            filters += `<filter type='${criteria.FilterOperator}'>`;
            if (criteria.Conditions) {
                criteria.Conditions.forEach(c => {
                    if (typeof (c.Data) === 'number')
                        filters += `<condition attribute='${c.Field}' operator='${c.Operator}' value='${c.Data.toString()}' />`; //value='${2n}'(2 = c.data)
                    else if (typeof (c.Data) === 'boolean')
                        filters += `<condition attribute='${c.Field}' operator='${c.Operator}' value='${c.Data}' />`;
                    else if (c.Operator == ConditionOperator.Null || c.Operator == ConditionOperator.NotNull)
                        filters += `<condition attribute='${c.Field}' operator='${c.Operator}' />`;
                    else if (c.Operator == ConditionOperator.In) {
                        if (Array.isArray(c.Data)) {
                            filters += `<condition attribute='${c.Field}' operator='${c.Operator}'>`;
                            filters += c.Data.map(v => `<value>${encodeURIComponent(String.escapeXML(v))}</value>`).join("");
                            filters += "</condition>"
                        }
                    }
                    else
                        filters += `<condition attribute='${c.Field}' operator='${c.Operator}' value='${encodeURIComponent(String.escapeXML(c.Data))}' />`;
                })
            }
            if (criteria.Filters) {
                criteria.Filters.forEach(f => {
                    filters += this.getXmlFilters(f); //recurse embedded filters                
                })
            }
            filters += "</filter>"
        }
        return filters;
    }
    private getXmlLinkEntities(linkEntities: XrmLinkEntity[]): string {
        let xmlLinkEntities: string = "";
        if (linkEntities && linkEntities.length > 0) {
            linkEntities.forEach(l => {
                xmlLinkEntities += `<link-entity name='${l.LinkToEntityName}'  from='${l.LinkFromAttributeName}' to='${l.LinkToAttributeName}'  link-type='${l.JoinOperator}'`
                if (l.EntityAlias)
                    xmlLinkEntities += ` alias='${l.EntityAlias}' `;
                xmlLinkEntities += ">";
                xmlLinkEntities += this.getXmlAttributes(l.ColumnSet);
                xmlLinkEntities += this.getXmlFilters(l.LinkCriteria);
                xmlLinkEntities += this.getXmlLinkEntities(l.LinkEntities); //recurse embedded linkentities
                xmlLinkEntities += "</link-entity>"
            })
        }
        return xmlLinkEntities;
    }
}