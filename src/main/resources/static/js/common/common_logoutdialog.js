/**
*
* 注销提醒对话框
*/

$(function() {
	$.get(COMMON_PARAMS.HOST_URL + 'html/common_authorized.html', function(result) {
		$(document.body).append(result);
	});
})

function _Common_LogoutDialogShow() {
	$('#Common_Dialog').hide();
	//
	$('#Common_Logout_Dialog').modal({backdrop: 'static', keyboard: false});
	$('#Common_Logout_Dialog .modal-footer button').unbind('click').bind('click', _Common_LogoutDialogDo);
	$('#Common_Logout_Dialog a').unbind('click').bind('click', _Common_LogoutDialogDo);

	$('#Common_Logout_Dialog #timer').html(times);
	setTimeout(timerFun, 1000);
}

var times = 3;
function timerFun() {
	if(times == 0) {
		$('#Common_Logout_Dialog #timer').html(times);
		_Common_LogoutDialogDo();
	} else {
		$('#Common_Logout_Dialog #timer').html(times);
		times -= 1;
		setTimeout(timerFun, 1000);
	}
}

function _Common_LogoutDialogDo() {
	window.location.href = COMMON_PARAMS.HOST_URL + 'index.html';	
}