/**
*
* 通用对话框
*/

$(function() {
	$.get(COMMON_PARAMS.HOST_URL + 'html/common_dialog.html', function(result) {
		$(document.body).append(result);
	});
})

/**
 * 构造函数
 * @param paramerts
 * @returns
 */
/**
 * 参数说明：
 * {
 *  title : 标题（string）,
 *  queryTxt : 询问语句（string）,
 *  waitingTxt : 等待语句（string）,
 *  resultSucTxt : 成功语句（string）,
 *  resultFailTxt : 失败语句（string）,
 *  btn1Txt : 确认执行语句（string）,
 *  btn2Txt : 成功确认语句（string）,
 *  btn3Txt : 取消执行语句（string）,
 *  btn4Txt : 失败确认语句（string）,
 *  isShowCloseBtn : 在表头显示关闭按钮（boolean）,
 *  isSucAutoClose : 成功后自动关闭（boolean）,
 *  sucAutoCloseTimes : 成功后自动关闭延时秒数（Number）,
 *  isFailAutoClose : 失败后自动关闭（boolean）,
 *  failAutoCloseTimes : 失败后自动关闭延时秒数（Number）,
 *  statusKey : 返回状态标志位，和后台业务返回值对应（string）,
 *  sucCallBack : 成功后的回调函数（Function）,
 *  failCallBack : 失败后的回调函数（Function）,
 *  errCallBack : 错误后的回调函数（Function）,
 *  hidenCallBack : 隐藏后的回调函数（Function）,
 *  cancelCallBack : 取消后的回调函数（Function）,
 *  url : 调用的服务URL（string）,
 *  data : 调用服务的参数（Object）,
 *  onlywait : 只显示等待页面（boolean）,
 *	onlywait_showsuc: 只显示等待页面，是否展示成功信息（boolean）
 * }
 */
$.CommonDialog = function(options) {
	var _options = {};
	var defOptions =  {
	 	titleTxt : '温馨提示',
	 	queryTxt : '确认这么做吗？',
	 	waitingTxt : '请稍候，系统正在努力处理...',
	 	resultSucTxt : '系统处理成功！',
	 	resultFailTxt : '系统处理失败，请重试！',
	 	btn1Txt : '确认',
	 	btn2Txt : '确认',
	 	btn3Txt : '取消',
	 	btn4Txt : '确认',

	 	isShowCloseBtn : true,
	 	isSucAutoClose : true,
	 	sucAutoCloseTimes : 1000,
	 	isFailAutoClose : false,
	 	failAutoCloseTimes : 1000,

	 	statusKey : 'status',
	 	status : -1,
	 	dataKey : 'data',
	 	resultData : null,
	 	msgKey : 'message',
	 	message : '',

	 	sucCallBack : null,
	 	failCallBack : null,
	 	errCallBack : null,
	 	cancelCallBack: null,

	 	url : '',
	 	data : {},
	 	onlywait : false,
	 	onlywait_showsuc: false
	}

	$.extend(_options, defOptions, options);

	$('#Common_Dialog #title').html(_options.titleTxt);
	$('#Common_Dialog #queryTxt').html(_options.queryTxt);
	$('#Common_Dialog #waitingTxt').html(_options.waitingTxt);
	$('#Common_Dialog #resultSucTxt').html(_options.resultSucTxt);
	$('#Common_Dialog #resultFailTxt').html(_options.resultFailTxt);
	
	$('#Common_Dialog #btn1').html(_options.btn1Txt);
	$('#Common_Dialog #btn2').html(_options.btn2Txt);
	$('#Common_Dialog #btn3').html(_options.btn3Txt);
	$('#Common_Dialog #btn4').html(_options.btn4Txt);
	
	if(!_options.isShowCloseBtn)
		$('#Common_Dialog #closeBtn').hide();
	
	var CommonDialog = {
		options: _options,
		showAndHide: function(model) {
			var dialog = $('#Common_Dialog');
			dialog.modal({backdrop: 'static', keyboard: false});
			
			$('#Common_Dialog #title').show();
			$('#Common_Dialog .modal-header').show();
			$('#Common_Dialog .modal-footer').show();


			if(model == 1) {
				$('#Common_Dialog #info').show();
				$('#Common_Dialog #suc').hide();
				$('#Common_Dialog #fail').hide();
				$('#Common_Dialog #wait').hide();
				$('#Common_Dialog #btn1').show();
				$('#Common_Dialog #btn2').hide();
				$('#Common_Dialog #btn3').show();
				$('#Common_Dialog #btn4').hide();
			} else if(model == 2){
				$('#Common_Dialog #info').hide();
				$('#Common_Dialog #suc').hide();
				$('#Common_Dialog #fail').hide();
				$('#Common_Dialog #wait').show();
				$('#Common_Dialog #btn1').hide();
				$('#Common_Dialog #btn2').hide();
				$('#Common_Dialog #btn3').hide();
				$('#Common_Dialog #btn4').hide();
				$('#Common_Dialog #title').hide();
				$('#Common_Dialog .modal-header').hide();
				$('#Common_Dialog .modal-footer').hide();
			} else if(model == 3){
				$('#Common_Dialog #info').hide();
				if(this.options.message != null && this.options.message != '')
					$('#Common_Dialog #resultSucTxt').html(this.options.message);
				$('#Common_Dialog #suc').show();
				$('#Common_Dialog #fail').hide();
				$('#Common_Dialog #wait').hide();
				$('#Common_Dialog #btn1').hide();
				$('#Common_Dialog #btn2').show();
				$('#Common_Dialog #btn3').hide();
				$('#Common_Dialog #btn4').hide();
				
				//
				if(this.options.isSucAutoClose)
					$('#Common_Dialog .common-modal-footer').hide();

			} else if(model == 4){
				$('#Common_Dialog #info').hide();
				$('#Common_Dialog #suc').hide();
				if(this.options.message != null && this.options.message != '')
					$('#Common_Dialog #resultFailTxt').html(this.options.message);
				$('#Common_Dialog #fail').show();
				$('#Common_Dialog #wait').hide();
				$('#Common_Dialog #btn1').hide();
				$('#Common_Dialog #btn2').hide();
				$('#Common_Dialog #btn3').hide();
				$('#Common_Dialog #btn4').show();
				
			}
			
			//设置按钮
			var flag = true;
			if(model == 1 || model == 3 || model == 4) {
				flag = false;
			} 
			$('#Common_Dialog button').each(function(i) {
				$(this).attr('disabled', flag); 
			}); 
		},

		doRequest: function() {
			if(this.options.url == '')
				return;

			this.showAndHide(2);
			
			//执行变更操作
			var _this = this;
			$.CommonAjax({
				url : this.options.url,
				data : this.options.data,  
				success: function(data) {
					$('#Common_Dialog button').each(function(i) {
						$(this).attr('disabled', false); 
					});

					_this.options.status = data[_this.options.statusKey];
					_this.options.resultData = data[_this.options.dataKey];
					_this.options.message = data[_this.options.msgKey];

					if(_this.options.status == 'OK') {
						if(!_this.options.onlywait)
							_this.showAndHide(3);
						else if(_this.options.onlywait_showsuc)
							_this.showAndHide(3);

						if(_this.options.isSucAutoClose)
							setTimeout(_this.dialogClose, _this.options.sucAutoCloseTimes);
						if(_this.options.sucCallBack != undefined && _this.options.sucCallBack != null)
							_this.options.sucCallBack(_this.options.resultData);
					} else {
						_this.showAndHide(4);
						if(_this.isFailAutoClose)
							setTimeout(_this.dialogClose, _this.failAutoCloseTimes);
						if(_this.options.failCallBack != undefined && _this.options.failCallBack != null)
							_this.options.failCallBack(_this.options.resultData);
					}
				}, 
				error: function(data) {
					if(typeof data == 'object') {
						if(data.status >= 500)
							_this.options.message = '服务器出现异常';
						else if(data.status >= 400)
							_this.options.message = '未知的业务请求';
					}
					
					_this.showAndHide(4);
					if(_this.options.errCallBack != undefined && _this.errCallBack != null)
						_this.options.errCallBack(null);
				}
			});
		},

		showDlg : function() {
			// body...
			if(this.options.onlywait) {
				this.showAndHide(2);
				this.doRequest();
			} else {
				this.showAndHide(1);
			}
			var _this = this;
			$('#Common_Dialog').on('hidden.zui.modal', function() {
				if(_this.options.status == 'OK') {
					if(_this.options.hidenCallBack != null) {
						_this.options.hidenCallBack(_this.options.resultData);
					}
				}
			})

			$('#Common_Dialog').modal(
				{
					backdrop: options.backdrop == null ? 'static' : options.backdrop, 
					keyboard: options.keyboard == null ? false : options.keyboard
				}
			)
		},

		dialogClose : function() {
			var dialog = $('#Common_Dialog');
			dialog.modal('hide');
		}
	}
	//
	$('#Common_Dialog #btn1').unbind('click').click(
		function() { 
			CommonDialog.doRequest(); 
		}
	);
	//
	$('#Common_Dialog #btn3').unbind('click').click(
		function() { 
			if (CommonDialog.options.cancelCallBack != null) {
				CommonDialog.options.cancelCallBack();
			}
		}
	);
	return CommonDialog;
}

