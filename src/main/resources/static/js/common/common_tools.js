$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};



$.fn.contentTabs = function() {
    $("ul.tabs li").click(function() {
        $(this).parent().parent().find("ul.tabs li").removeClass("activeTab"); //Remove any "active" class
        $(this).addClass("activeTab"); //Add "active" class to selected tab
        $(this).parent().parent().find(".tab_content").hide(); //Hide all tab content
        var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
        $(activeTab).show(); //Fade in the active content
        return false;
    });
};

//带返回值的模态窗口 居中
function openWindowModal(url, wWith, wHeight) {
    var x1 = Math.round((screen.availWidth - wWith) / 2);
    var y1 = Math.round((screen.availHeight - wHeight) / 2);
    var noCacheUrl = '';
    if (url.indexOf("?") != -1) {
        noCacheUrl = url + '&args=' + new Date();
    } else {
        noCacheUrl = url + '?args=' + new Date();
    }
    var returnVs = window.showModalDialog(url, window, 'dialogWidth:' + wWith + 'px;dialogHeight:' + wHeight + 'px;dialogLeft:' + x1 + '; dialogTop:' + y1 + ';help:no;unadorned:no;resizable:no;status:no;center:yes;scroll:no;scrollbars:true;');
    return returnVs;
}

function openWindow(url, name, width, height) {
    var x1 = Math.round((screen.availWidth - width) / 2);
    var y1 = Math.round((screen.availHeight - height) / 2);
    var noCacheUrl = '';
    if (url.indexOf("?") != -1) {
        noCacheUrl = url + '&args=' + new Date();
    } else {
        noCacheUrl = url + '?args=' + new Date();
    }
    return window.open(url, name, 'height=' + height + ',width=' + width + ',top=' + y1 + ',left=' + x1 + ',toolbar=no,menubar=no,scrollbars=yes,location=no,status=no');
}

function closeWin() {
    window.close();
}


//获取当前浏览器的websocket;
var websocket;

function getWebsocket(param) {
    if (websocket != null) {
        return websocket;
    }
    if (param == null || typeof(param) == "undefined") {
        param = "";
    }
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://localhost:8080/x/webSocketServer" + param);
    } else if ('MozWebSocket' in window) {
        websocket = new MozWebSocket("ws://localhost:8080/x/webSocketServer" + param);
    } else {
        websocket = new SockJS("http://localhost:8080/x/sockjs/webSocketServer" + param);
    }
    return websocket;
}

//websocket的事件
/*
websocket.onopen = function (evnt) {
};
websocket.onmessage = function (evnt) {
  alert(evnt.data);
};
websocket.onerror = function (evnt) {
};
websocket.onclose = function (evnt) {
}*/

/*****计算日期时间差***************/
/**
 * interval ：D表示查询精确到天数的之差
 *  interval ：H表示查询精确到小时之差
 *  interval ：M表示查询精确到分钟之差
 *  interval ：S表示查询精确到秒之差
 *  interval ：T表示查询精确到毫秒之差
 */
function dateDiff(interval, date1, date2) {
    var objInterval = { 'D': 1000 * 60 * 60 * 24, 'H': 1000 * 60 * 60, 'M': 1000 * 60, 'S': 1000, 'T': 1 };
    interval = interval.toUpperCase();
    var dt1 = new Date();
    if (date1 != '') {
        dt1 = new Date(Date.parse(date1.replace(/-/g, '/')));
    } else {}
    var dt2 = new Date(Date.parse(date2.replace(/-/g, '/')));
    try {
        return Math.round((dt2.getTime() - dt1.getTime()) / eval('objInterval.' + interval));
    } catch (e) {
        return e.message;
    }
}

/**
 * 判断年份是否为润年
 *
 * @param {Number} year
 */
function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

/**
 * 获取某一年份的某一月份的天数
 *
 * @param {Number} year
 * @param {Number} month
 */
function getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}

/**
 * 获取某年的某天是第几周
 * @param {Number} y
 * @param {Number} m
 * @param {Number} d
 * @returns {Number}
 */
function getWeekNumber(y, m, d, curDate) {
    var now = curDate;
    if (now == '') {
        now = new Date(y, m - 1, d);
    }
    var year = now.getFullYear(),
        month = now.getMonth(),
        days = now.getDate();
    //那一天是那一年中的第多少天
    for (var i = 0; i < month; i++) {
        days += getMonthDays(year, i);
    }

    //那一年第一天是星期几
    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
    var week = null;
    if (yearFirstDay == 1) {
        week = Math.ceil(days / yearFirstDay);
    } else {
        days -= (7 - yearFirstDay + 1);
        week = Math.ceil(days / 7) + 1;
    }
    return week;
}

/**
 * js生成uuid
 * @returns
 */
function getUuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid.replace(new RegExp("-", "gm"), "");
}