/*
   格式化日期
   参数：date日期，format日期格式例如yyyy-MM-dd
*/
export function formatDate(date, format) {
    try {
        if (!date) {return;}
        if (!format)
        {format = "yyyy-MM-dd";}
        switch (typeof date) {
        case "string":
            date = new Date(date.replace(/-/, "/"));
            break;
        case "number":
            date = new Date(date);
            break;
        }
        if (!(date instanceof Date)) {return;}
        var dict = {
            "yyyy" : date.getFullYear(),
            "M" : date.getMonth() + 1,
            "d" : date.getDate(),
            "H" : date.getHours(),
            "m" : date.getMinutes(),
            "s" : date.getSeconds(),
            "MM" : ("" + (date.getMonth() + 101)).substr(1),
            "dd" : ("" + (date.getDate() + 100)).substr(1),
            "HH" : ("" + (date.getHours() + 100)).substr(1),
            "mm" : ("" + (date.getMinutes() + 100)).substr(1),
            "ss" : ("" + (date.getSeconds() + 100)).substr(1)
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
            return dict[arguments[0]];
        });
    } catch (error) {
        console.log(error)
    }
}