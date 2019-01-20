
/**
* 通用提示框
* options = {
*	isSuc: false,
*	message: '提示信息'	
* }
*/
function commonTipDialogInit() {
	var dlg = $('#Common_Tip_Dialog');
	if (dlg.length == 0) {
		$.get(COMMON_PARAMS.HOST_URL + 'html/page/common/common_tip.html', function(result) {
			$(document.body).append(result);
		})
	}
}
function commonTipDialogFunction(options) {
	//
	$('#Common_Tip_Dialog #suc').hide();
	$('#Common_Tip_Dialog #fail').hide();

	var isSuc = options.isSuc == null ? false : true;
	if (options.isSuc) {
		$('#Common_Tip_Dialog #suc').show();
		$('#Common_Tip_Dialog #suc #txt').html(options.message);
	} else {
		$('#Common_Tip_Dialog #fail').show();
		$('#Common_Tip_Dialog #fail #txt').html(options.message);
	}
	$('#Common_Tip_Dialog').modal({backdrop: 'static', keyboard: false});
}
