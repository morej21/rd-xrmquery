import { XrmCondition, ConditionOperator } from "./XrmCondition";

export class XrmFilter
{     constructor(filterOperator:LogicalOperator){
        this.FilterOperator = filterOperator;
        this.Conditions= [];
        this.Filters = [];
    }
    public Conditions: XrmCondition[];  
    public Filters: XrmFilter[];
    public FilterOperator: LogicalOperator;  
    AddCondition(attributeName: string, conditionOperator:ConditionOperator, value:any) {
        this.Conditions.push({Field: attributeName, Operator: conditionOperator, Data:value});
    }

    AddFilter(childFilter:XrmFilter){
        this.Filters.push(childFilter);
    }
}
export enum LogicalOperator {
    And = "and",
    Or = "or"
}