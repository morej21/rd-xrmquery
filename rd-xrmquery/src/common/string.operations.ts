export class String {
    public static Empty: string = "";

    public static isNullOrWhiteSpace(value: string): boolean {
        try {
            if (value == null || value == 'undefined')
                return false;

            return value.replace(/\s/g, '').length < 1;
        }
        catch (e) {
            return false;
        }
    }

    public static Format(value: any, ...args: any): string {
        try {
            return value.replace(/{(\d+(:.*)?)}/g, function (match: any, i: any) {
                var s = match.split(':');
                if (s.length > 1) {
                    i = i[0];
                    match = s[1].replace('}', '');
                }

                var arg = String.formatPattern(match, args[i]);
                return typeof arg != 'undefined' && arg != null ? arg : String.Empty;
            });
        }
        catch (e) {
            return String.Empty;
        }
    }
    public static like(value: string): string {
        if(!value) 
            return value;
            
        let tmpString: string = value;

        tmpString = tmpString.replace(/\*/gi,"%");
        tmpString = tmpString.trim();

        if(!tmpString.startsWith("%"))
            tmpString = '%'+tmpString
        if(!tmpString.endsWith("%"))    
            tmpString = tmpString +'%'
        return tmpString;
    }
    public static escapeXML(value: string): string{
        if(!value) 
            return value;

        let tmpString:string = value;

        tmpString = tmpString.replace(/\&/gi,"&amp;")
                            .replace(/\</gi, "&lt;")
                            .replace(/\>/gi, "&gt;")
                            .replace(/\'/gi, "&apos;")
                            .replace(/\"/gi, "&quot;")
        return tmpString
    }

    private static formatPattern(match: any, arg: string): string {
        switch (match) {
            case 'L':
                arg = arg.toLowerCase();
                break;
            case 'U':
                arg = arg.toUpperCase();
                break;
            default:
                break;
        }

        return arg;
    }
}