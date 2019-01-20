/**
 * 通用基础js
 */
var COMMON_PARAMS = {
    HOST_URL: '', //URL地址
    ACTIVE_PREFIX: 'sys' //数据请求前缀
}
$(function() {
    COMMON_PARAMS.HOST_URL = window.location.protocol + '//' + window.location.host + '/';

    //判断是不是正常显示
    var size = 0;
    if (window.top == window.self) {
        size = $('#homehomehomehomehomehome').size();
        console.log('home.html');
    } else {
        size = $('#homehomehomehomehomehome', window.parent.document).length;
    }
    return;
    if (size <= 0) {
        $.ajax({
            url: '/sys/checkIsLogin',
            data: {},
            success: function(data) {
                var dataObj = $.parseJSON(data);
                if (dataObj.result_data == 'ok') {
                    window.location.href = COMMON_PARAMS.HOST_URL + 'html/page/home.html';
                } else {
                    if (window.location.href != COMMON_PARAMS.HOST_URL + 'html/page/login.html')
                        window.location.href = COMMON_PARAMS.HOST_URL;
                }
            },
            error: function(data) {
                if (window.location.href != COMMON_PARAMS.HOST_URL + 'html/page/login.html')
                    window.location.href = COMMON_PARAMS.HOST_URL;
            }
        })

    }
})