jQuery.validator.addMethod("specialCharFilter", function(value, element) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;,.<>/?~！@#￥……&*（）——|【】‘；：”“'。，、？%+ 　\"\\\\]");
    var specialStr = "";
    for(var i=0;i<value.length;i++){
         specialStr += value.substr(i, 1).replace(pattern, '');
    }
    
    if( specialStr == value){
        return true;
    }
    
    return false;
}, '不可使用特殊字符（包含空格）');

jQuery.validator.addMethod("specialCharFilter2", function(value, element) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;,.<>?~！@#￥……&*（）——|【】‘；：”“'。，、？%+ 　\"\\\\]");
    var specialStr = "";
    for(var i=0;i<value.length;i++){
         specialStr += value.substr(i, 1).replace(pattern, '');
    }
    
    if( specialStr == value){
        return true;
    }
    
    return false;
}, '不可使用特殊字符（包含空格）');
