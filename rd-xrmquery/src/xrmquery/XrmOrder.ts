export class XrmOrder {
    public AttributeName: string;
    public OrderType: OrderType;

    constructor(attributeName: string, orderType:OrderType) {
      this.AttributeName = attributeName;
      this.OrderType = orderType;  
    }
}
export enum OrderType
{
    Ascending = 0,
    Descending = 1
}