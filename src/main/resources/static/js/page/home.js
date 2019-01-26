$(function() {

    gettSystemUser();

    $('#main .bodyIframe .body iframe').attr('src', '/change?page=companymanage');
    $('.navigate span').html('公司管理');

    $('#treeMenu').on('click', 'a', function () {
        $('#treeMenu li.active').removeClass('active');
        $(this).closest('li').addClass('active');
        var id = $(this).attr('id');
        if (id == 'picturemanage' || id == 'noticemanage') {
            return;
        }
        switch (id) {
            case 'companymanage':
                $('.navigate span').html('公司管理');
                break;
            case 'pic_information_center':
                $('.navigate span').html('信息中心');
                break;
            case 'pic_bulletin_bar':
                $('.navigate span').html('公告公示栏');
                break;
            case 'pic_village_info':
                $('.navigate span').html('小区信息栏');
                break;
            case 'pic_contact_us':
                $('.navigate span').html('联系我们');
                break;
            case 'notice_village_info':
                $('.navigate span').html('小区信息栏');
                break;
            case 'notice_housing_authority':
                $('.navigate span').html('房管局');
                break;
            case 'notice_street_ommunity':
                $('.navigate span').html('街道社区');
                break;
            case 'notice_industry_council':
                $('.navigate span').html('业委会');
                break;
            case 'notice_property':
                $('.navigate span').html('物业');
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
