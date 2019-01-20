/**
* form表单提交
* 
* 
*
*/

$.fn.commonFormDialog = function(options) {
	var defOptions = {
		div : {
			width: 600,
			wUnit: 'px',
			height: 400,
			hUnit: 'px',
			isOnlyShow: false,
			zIndex: 50000,
			needReset: true,
		},
		//
		oper: {
			url: null,
			success: null,
			error: null,
			autoClose: true,
			beforeSubmit: null,
			//element
			submitBtn: null,
			cancelBtn: null,
		},
		//validate
		validate: {
		},
		//
		txt: {
		 	titleTxt : '温馨提示',
		 	queryTxt : '确认这么做吗？',
		 	waitingTxt : '请稍候，系统正在努力处理...',
		 	resultSucTxt : '系统处理成功！',
		 	resultFailTxt : '系统处理失败，请重试！',
		 	btn1Txt : '确认',
		 	btn2Txt : '确认',
		 	btn3Txt : '取消',
		 	btn4Txt : '确认',
		}
	}
	var _cur = {};
	$.extend(true, _cur, defOptions, options);
	_cur.validate.errorClass = 'common-error';

	var elementId =  $(this).attr('id');
	_cur.elementId = elementId;

	var FDO = {
		options: _cur,
		onSubmitBtnClick: function() {
			if(!FDO.onValidate())
				return;

			//
			var params = $('#' + FDO.options.elementId + ' form').serializeObject();
			for(var key in params) {
				params[key] = $.trim(params[key]);
				$('#' + FDO.options.elementId + ' [name = "' + key + '"]').val(params[key]);
			}

			if(FDO.options.oper.beforeSubmit != null)
				params = FDO.options.oper.beforeSubmit(params);
			if(params == null) {
				return;
			}

			//
			var requestValues = FDO.options.txt;
			requestValues.url = FDO.options.oper.url;
			requestValues.data = { formData : JSON.stringify(params) };
			requestValues.isSucAutoClose = FDO.options.oper.autoClose;
			requestValues.hidenCallBack = function(data) {
				if(FDO.options.oper.autoClose)
					$('#' + FDO.options.elementId).modal('hide');

				if(FDO.options.oper.success != null)
					FDO.options.oper.success(data);
			}

			//显示
			$.CommonDialog(requestValues).showDlg();
		},
		onValidate: function() {
	        var validate = $('#' + FDO.options.elementId + ' form').validate(FDO.options.validate);
	        return validate.form();
		}
	}

	//
	var earr = $('#' + FDO.options.elementId + ' form');
	var validateObject = $('#' + FDO.options.elementId + ' form').validate().destroy();

	//
	if(FDO.options.div.needReset)
		$('#' + elementId + ' form')[0].reset();
	$('#' + elementId + ' form input').removeClass("common-error");
	$('#' + elementId).modal({backdrop: 'static', keyboard: false});
	$('#' + elementId + ' .modal-dialog .modal-body').css('height', (_cur.div.height - 86) +  _cur.div.hUnit);
	$('#' + elementId + ' .modal-dialog').css('height', _cur.div.height +30+  _cur.div.hUnit);
	$('#' + elementId + ' .modal-dialog').css('width', _cur.div.width +  _cur.div.wUnit);
	//
	var selector = _cur.oper.submitBtn;
	if(selector == null)
		selector = '#' + elementId + ' .common-modal-footer .btn-primary';

	$(selector).unbind('click');
	$(selector).bind('click', FDO.onSubmitBtnClick);
		
}