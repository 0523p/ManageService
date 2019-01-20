$(function() {

    if (window != top)
        top.location.href = location.href;

	var status = window.localStorage.getItem('loginName');
	if(status != null) {
		$('#loginName').val(window.localStorage.getItem('loginName'));
		$("input[type='checkbox']").prop("checked",true);  
	}

	$('#goHome').click(function() {
		validateLogin();
	});

});

function validateLogin(){
	var loginName = $('#loginName').val();
	var pwd = $('#pwd').val();
    if(!(/^[0-9a-zA-Z_]{1,}$/.test(loginName))) {
     	$('#info').html('请输入有效的账号!');
	    return;
    }
    if(pwd == '') {
	    $('#info').html('请输入密码!');
	    return;
    }
    $('#info').html('');
    $.CommonAjax({
        url: '/login/login',
        data: { loginName: loginName, pwd: pwd },
        success: function(data) {
            //是否记住账号
            if($("input[type='checkbox']").is(':checked')) {
                window.localStorage.setItem('loginName', loginName);
            }

            if(data.status == 'OK'){
                $(location).attr('href', '/home');
            }else{
                $('#info').html(data.message);
            }
        }
	});
}
//回车登录
function KeyDown(){
  if (event.keyCode == 13) {
	event.returnValue=false;
    event.cancel = true;
	validateLogin();
  }
}