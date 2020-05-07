export class XrmCondition
{
    constructor(){       
    }
    public Field!: string;
    public Operator!: ConditionOperator;
    public Data: any;    
}
export enum ConditionOperator
{
    BeginsWith = 'like',
    Between = 'between',
    Contains = 'like',
    DoesNotBeginWith = 'not-like',
    DoesNotContain = 'not-like',
    DoesNotEndWith = 'not-like',
    EndsWith = 'like',
    Equal = 'eq',
    EqualBusinessId = 'eq-businessid',
    EqualUserId = 'eq-userid',
    EqualUserTeams = 'eq-userteams',
    GreaterEqual = 'ge',
    GreaterThan = 'gt',
    In = 'in',
    InFiscalPeriod = 'in-fiscal-period',
    InFiscalPeriodAndYear = 'in-fiscal-period-and-year',
    InFiscalYear = 'in-fiscal-year',
    InOrAfterFiscalPeriodAndYear = 'in-or-after-fiscal-period-and-year',
    InOrBeforeFiscalPeriodAndYear = 'in-or-before-fiscal-period-and-year',
    Last7Days = 'last-seven-days',
    LastFiscalPeriod = 'last-fiscal-period',
    LastFiscalYear = 'last-fiscal-year',
    LastMonth = 'last-month',   
    LastWeek = 'last-week',   
    LastXDays = 'last-x-days',
    LastXFiscalPeriods = 'last-x-fiscal-periods',
    LastXFiscalYears = 'last-x-fiscal-years',
    LastXHours = 'last-x-hours',
    LastXMonths = 'last-x-months',
    LastXWeeks = 'last-x-weeks',
    LastXYears = 'last-x-years',
    LastYear = 'last-year',
    LessEqual = 'le',
    LessThan = 'lt',
    Like = 'like',
    Next7Days = 'next-seven-days',
    NextFiscalPeriod = 'next-fiscal-period',
    NextFiscalYear = 'next-fiscal-year',
    NextMonth = 'next-month',
    NextWeek = 'next-week',
    NextXDays = 'next-x-days',
    NextXFiscalPeriods = 'next-x-fiscal-periods',
    NextXFiscalYears = 'next-x-fiscal-years',
    NextXHours = 'next-x-hours',
    NextXMonths = 'next-x-months',
    NextXWeeks = 'next-x-weeks',
    NextXYears = 'next-x-years',
    NextYear = 'next-year',
    NotBetween = 'not-between',
    NotEqual = 'ne',
    NotEqualBusinessId = 'ne-businessid',
    NotEqualUserId = 'ne-userid',
    NotIn = 'not-in',
    NotLike = 'not-like',
    NotNull = 'not-null',
    NotOn = 'ne',
    Null = 'null',
    OlderThanXMonths = 'olderthan-x-months',
    On = 'on',
    OnOrAfter = 'on-or-after',
    OnOrBefore = 'on-or-before',
    ThisFiscalPeriod = 'this-fiscal-period',
    ThisFiscalYear = 'this-fiscal-year',
    ThisMonth = 'this-month',
    ThisWeek = 'this-week',
    ThisYear = 'this-year',
    Today = 'today',
    Tomorrow = 'tomorrow',
    Yesterday = 'yesterday'
}