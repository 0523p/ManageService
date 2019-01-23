$(function() {

    gettSystemUser();

    $('#treeMenu').on('click', 'a', function () {
        $('#treeMenu li.active').removeClass('active');
        $(this).closest('li').addClass('active');
        var id = $(this).attr('id');
        switch (id) {
            case 'companymanage':
                $('.navigate span').html('公司管理');
                break;
            case 'picturemanage':
                $('.navigate span').html('轮播管理');
                break;
            case 'noticemanage':
                $('.navigate span').html('小区公告发布');
                break;
        }
        $('#main .bodyIframe .body iframe').attr('src', '/change?page=' + id);
    });

    $('#logout').bind('click', function() {
        $(location).attr('href', '/logout');
    });

    $('#pwd-reset').bind('click', function() {
        $('#pwd').val();
        $('#rePwd').val();
        var options = {
            div: {
                needReset: false,
                height: 260
            },
            oper: {
                url: '/user/updatePassword',
                autoClose: true,
                beforeSubmit: function(params) {
                    params.id = systemUser.id;
                    delete params.rePwd;
                    return params;
                }
            },
            txt: {
                titleTxt: '修改用户密码',
                queryTxt: '确认修改吗？'
            },
            validate: updatePwdValidate
        };
        $('#updatePwdModel').commonFormDialog(options);
    });

})

var systemUser;
function gettSystemUser() {
    $.CommonAjax({
        url: '/user/getSystemUser',
        success: function(data) {
            $('#login-name').html(data.loginName);
            systemUser = data;
        }
    });
}

//修改密码form验证
var updatePwdValidate = {
    rules: {
        pwd: {
            required: true,
            checkPwd: true,
            passwordIntensity: true,
            isSpace: true
        },
        rePwd: {
            required: true,
            isSpace: true,
            passwordIntensity: true,
            equalTo: "#pwd",
            checkPwd: true,
        },
    },
    messages: {
        pwd: {
            required: "请输入密码",
            rangelength: "请输入8-16位的登录密码"
        },
        rePwd: {
            required: "请输入密码确认",
            equalTo: "两次输入密码不一致",
            rangelength: "请输入8-16位的登录密码"
        },
    }
}
