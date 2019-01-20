/**
 * 引入文件管理
 * 常用的js、css文件引入，
 */
var boot_module_path = ''; //根目录

var arr = window.location.pathname.split("/"); //
var boot_href = window.location.protocol + "//" + window.location.host + "/" + arr[1] + "/" + arr[2]; // http://localhost:8080
//前进和后退问题
if (location.href.split('page/menu/')[1]) {
    var path = location.href.split('page/menu/')[1].split('.')[0];
    if (parent.$('.menuActive').text() == '首页' && path != 'biz_home') {
        parent.$('#submenubody').attr('src', 'menu/biz_home.html');
    } else if (parent.$('.active').attr('id') != path) {
        parent.$('#biz_home').click();
    }
}
/**
 * 文件引入函数
 * @param type
 * @return
 */
function resourceImport(types, relative) {
    //是否需要添加相对路径
    if (relative != '')
        boot_module_path = relative + boot_module_path;

    var importFile = '';

    var typeArray = types.split(';');
    for (var j = 0; j < typeArray.length; ++j) {
        var type = typeArray[j];
        //第三方库

        //datatable11015
        if (type == "datatable11015") {
            importFile += '<link href="' + boot_module_path + 'lib/bootstrap-3.3.7-dist/css/bootstrap.css" rel="stylesheet" type="text/css">';
            importFile += '<link href="' + boot_module_path + 'lib/datatables1.10.15/css/dataTables.bootstrap.css" rel="stylesheet" type="text/css">';

            importFile += '<link href="' + boot_module_path + 'lib/datatables1.10.15/css/select.dataTables.css" rel="stylesheet" type="text/css">';
            importFile += '<link href="' + boot_module_path + 'lib/datatables1.10.15/css/select.bootstrap.css" rel="stylesheet" type="text/css">';

            importFile += '<link href="' + boot_module_path + 'lib/datatables1.10.15/css/buttons.dataTables.css" rel="stylesheet" type="text/css">';
            importFile += '<link href="' + boot_module_path + 'lib/datatables1.10.15/css/buttons.bootstrap.css" rel="stylesheet" type="text/css">';

            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/datatables1.10.15/js/jquery.dataTables.js"></script>';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/datatables1.10.15/js/dataTables.bootstrap.js"></script>';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/datatables1.10.15/js/dataTables.select.js"></script>';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/datatables1.10.15/js/dataTables.buttons.js"></script>';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/datatables1.10.15/js/buttons.bootstrap.js"></script>';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/datatables1.10.15/js/buttons.print.js"></script>';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/datatables1.10.15/js/buttons.colVis.js"></script>';

            importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common_datatables.js"></script>';

            //importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/Select-1.2.5/js/dataTables.selec.js"></script>';

        } else
        //jquery
        if (type == 'jquery') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/zui/lib/jquery/jquery.js"></script>';
        } else
        //spinkit
        if (type == 'spinkit') {
            importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'css/spinkit/spinkit.css">';
        } else
        //validate
        if (type == 'validate') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/validate/jquery.validate.js"></script>';
            // importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/validate/jquery.validate.config.js"></script>';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/validate/additional-methods.js"></script>';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/validate/localization/messages_zh.js"></script>';
            // importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/validate/specialCharFilter.js"></script>';

            importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'lib/validate/css/cmxform.css">';
            // importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'lib/validate/css/cmxformTemplate.css">';
            // importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'lib/validate/css/core.css">';
            // importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'lib/validate/css/reset.css">';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/validate/jquery.validatorMethod.js"></script>';
        } else
        //zui
        if (type == 'zui') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/zui/js/zui.js"></script>';
            importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'lib/zui/css/zui.css">';
        } else
        //zui-uploader
        if (type == 'zui-uploader') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/zui/lib/uploader/zui.uploader.js"></script>';
            importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'lib/zui/lib/uploader/zui.uploader.css">';
        } else
        //echarts
        if (type == 'echarts') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/echarts/echarts.min.js"></script>';
        } else
        //baidu-map
        if (type == 'baidu-map') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/echarts/echarts.min.js"></script>';
        } else

        ///////////////////////////////
        //自定义库
        ///////////////////////////////
        //common
        //基础数据对象
        if (type == 'common') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common.js"></script>';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common_tools.js"></script>';
        } else
        //common ajax
        if (type == 'common_ajax') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common_ajax.js"></script>';
        } else
        //common page css
        if (type == 'common_css') {
            importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'css/common/common.css">';
        } else
        //common_dialog
        //通用对话框
        if (type == 'common_dialog') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common_dialog.js"></script>';
        } else
        //common_form
        if (type == 'common_form') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common_form_dialog.js"></script>';
        } else
        //common_logout_dialog
        //通用对话框
        if (type == 'common_logout_dialog') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common_logoutdialog.js"></script>';
        } else
        //common 文件上传
        if (type == 'common_fileupload') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common_fileupload.js"></script>';
        } else
        //moment处理时间js
        if (type == 'moment') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/moment/moment.min.js"></script>';
        } else
        //树插件
        if (type == 'zTree') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/zTree/js/jquery.ztree.all.min.js"></script>';
            importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'lib/zTree/scc/metroStyle/metroStyle.css">';
        } else
        //ZUI下拉框
        if (type == 'chosen') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/zui/lib/chosen/chosen.min.js"></script>';
            importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'lib/zui/lib/chosen/chosen.min.css">';
        } else
        //一二级菜单所用加减号
        if (type == 'menu') {
            importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'css/page/menu.css">';
        } else
        //双日历时间插件
        if (type == 'daterangepicker') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/daterangepicker/daterangepicker.js"></script>';
            importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + 'lib/daterangepicker/daterangepicker.css">';
        } else
        if (type == 'md5') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/md5/md5.js"></script>';
        } else
            //common_tip 通用提示框
            if (type == 'common_tip') {
                importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common_tip.js"></script>';
            } else
        if (type == 'input-mask') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/validate/jquery.inputmask.js"></script>';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'lib/validate/jquery.inputmask.numeric.extensions.js"></script>';
        } else
        if (type == 'map') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + '/js/page/map.js"></script>';
            importFile += '<link rel="stylesheet" type="text/css" href="' + boot_module_path + '/css/page/map.css">';
        } else
        if (type == 'common_map') {
            //importFile += '<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=wlyiLpTGajwXdj9jSuwv2NQMDCdAz3M1"></script>';
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common_map.js"></script>';

        } else
        if (type == 'common_download') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common_download.js"></script>';

        } else
        if (type == 'filedownload') {
            importFile += '<script type="text/javascript" src="' + boot_module_path + 'js/common/common_filedownload.js"></script>';
        }

    }
    //写入
    document.write(importFile);
}