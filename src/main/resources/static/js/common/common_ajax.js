/**
* AJAX请求封装
*/
$.CommonAjax = function(options) {
	//获取url
	var url = COMMON_PARAMS.HOST_URL;

	//
	var action = options.url;
	if(typeof(action) == 'undefined')
		return;
	else
		action = options.url;

	var data = typeof(options.data) == 'undefined' ? {} : options.data;
	var cache = typeof(options.cache) == 'undefined' ? false : options.cache;
	var dataType = typeof(options.dataType) == 'undefined' ? 'json' : options.data;
	var method = typeof(options.method) == 'undefined' ? 'post' : options.method;
	var success = typeof(options.success) == 'undefined' ? null : options.success;
	var error = typeof(options.error) == 'undefined' ? null : options.error;

	//发送Ajax请求
	$.ajax({
		url : action,
		data: data,
		cache: options.cache,
		method: method,
		timeout: 30000,
		dataFilter: function(data, type) {
			//校验数据正确性
			var dataObj = $.parseJSON(data);
			//校验shiro当前用户是否有效
			if (dataObj != null && dataObj.shiroSessionStatus != null && dataObj.shiroSessionStatus == 'timeout')
                $(location).attr('href', '/doLogin');
			return dataObj;
		},
		success: success,
		error: error
	});
}
