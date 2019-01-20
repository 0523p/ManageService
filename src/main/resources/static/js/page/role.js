
$(function() {

    //初始化datatables
    initDatatables();

    //查询按钮绑定datatables初始化方法
    INNER_SEARCH.init({ process: initDatatables});

    //添加角色
    $('#newRole').bind('click', function() {
        $('#name').val('');
        $('#remark').val('');
        var options = {
            div: {
                needReset: false,
                height: 250
            },
            oper: {
                url: '/role/addRole',
                autoClose: true,
                success: function() {
                    roleTable.ajax.reload(null, false);
                }
            },
            txt: {
                titleTxt: '添加角色',
                queryTxt: '确认添加吗？'
            },
            validate: roleValidateForm
        };
        $('#addRoleModel').commonFormDialog(options);
    })

    //删除角色
    $('#deleteRole').bind('click', function() {
        $.CommonDialog({
            url: '/role/deleteRole',
            data: getCheckboxId(),
            isFailAutoClose: true,
            queryTxt: '确认删除吗？',
            sucCallBack: function() {
                roleTable.ajax.reload(null, false);
            }
        }).showDlg();
    })

})

//初始化datatables
var roleTable = {};
function initDatatables() {
    roleTable = $('#roleList').CommonDataTables({
        dom: 'rtlip',
        ajaxSource: '/role/getRoles',
        searching: false,
        processing: true,
        checkallId: 'checkallId',
        destroy: true,
        serverParams: function (aoData) {
            var params = {};
            var name = $('#selectRoleName').val();
            if(name == ''){
                params.name = '';
            }else{
                params.name = name;
            }
            var type = $('#selectType').val();
            if(type == '不限'){
                params.type = '';
            }else{
                params.type = type;
            }
            aoData.push( { "name": "formData", "value":JSON.stringify(params) } );
        },
        select: {
            style: 'multi'
        },
        buttons: [{
            extend: 'colvis',
            text: '列过滤'
        }],
        columnDefs: [{
                sDefaultContent: '',
                aTargets: ['_all']
            },
            {
                orderable: false,
                className: 'select-checkbox',
                targets: 0
            },
            {
                orderable: false,
                targets: [0],
                mRender: function(data, type, full) {
                    return '';
                }
            },
            {
                orderable: false,
                targets: [3],
                mRender: function(data, type, full) {
                    switch(data){
                        case '0':
                            return "管理类";
                            break;
                        case '1':
                            return "业务类";
                            break;
                        default:
                            return "未知类型";
                            break;    
                    }
                    
                }
            },
            {
                orderable: false,
                targets: [4],
                mRender: function(data, type, full) {
                    return moment(data).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                aTargets: [7],
                mRender: function(data, type, full) {
                    return '<button class="btn btn-primary common-btn-4-table" id="' + data.id + '" onclick="updateInfo(\'' + data.id + '\');">编辑</button>';
                }
            }
        ],
        columns: [
            { data: 'id', width: '8%' },
            { data: null, width: '8%' },
            { data: 'name' },
            { data: 'type' } ,
            { data: 'createTime' },
            { data: 'createName' },
            { data: 'remark' },
            { data: null, width: '8%' }
        ],
        indexNum: 1
    });
}

//修改角色信息
function updateInfo(id) {
    var elementId = $('#' + id).attr('id');
    var roleData = roleTable.row($('#' + id).parent()).data();
    //获取zTree菜单
    $.CommonAjax({
        url: '/Common/getMenusInfo',
        data: { type: roleData.type, id: elementId },
        success: function(data) {
            //初始化菜单tree
            initMenuTree(data);
            menuList = new Array();
            menuList = data.menuIds;
        }
    });
    $('#updateRoleModel #upname').val(roleData.name);
    $('#updateRoleModel #upremark').val(roleData.remark);

    var options = {
        div: {
            needReset: false
        },
        oper: {
            url: '/role/updateRoleInfo',
            autoClose: true,
            beforeSubmit: function(params) {
                params.id = id;
                params.menuList = menuList;
                return params;
            },
            success: function(){
                 roleTable.ajax.reload(null,false);
            }
        },
        txt: {
            titleTxt: '修改角色信息',
            queryTxt: '确认修改吗？'
        },
        validate: roleValidateForm
    };
    $('#updateRoleModel').commonFormDialog(options);
}



//获取选中的id
function getCheckboxId() {
    var rowData = roleTable.rows({ selected: true }).data();
    var idArray = new Array();
    $.each(rowData, function(i, val) {
        idArray.push(val.id);
    });
    var param = {
        data : JSON.stringify(idArray),
    };
    return param;
}

//zTree配置
var setting = {
    check: {
        enable: true,
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        //onClick: onClick,
        onCheck: onCheck
    }
};

//设置zTree节点、name联动
var menuList = new Array();
function onCheck(event, treeId, treeNode) {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);
    treeObj.selectNode(nodes);
    //将选取的节点ID给隐藏的input
    menuList = new Array();
    $.each(nodes, function(i, child) {
        menuList[menuList.length] = child.id;
    });
    /*$('#menus').val(menus);*/
}

//初始化菜单tree
function initMenuTree(data) {
    var menus = data.menus;
    var menuIds = data.menuIds;
    var params = new Array();
    $.each(menus, function(i, child) {
        var param = {};
        if('0' == child.parentId) {
            param.id = child.id;
            param.pId = '0';
            param.name = child.name;
            param.open = true;
            param.nocheck = false;
            param.level = 0;
            if(menuIds.indexOf(child.id) >= 0){
                param.checked = true;
            }
        }else{
            param.id = child.id;
            param.pId = child.parentId;
            param.name = child.name;
            param.open = true;
            param.nocheck = false;
            param.level = 1;
            if(menuIds.indexOf(child.id) >= 0){
                param.checked = true;
            }    
        }
        params[params.length] = param;
    });
    $.fn.zTree.init($("#treeDemo"), setting, params);
    $('#menus').val(menuIds);
}

//设置Ztree节点、name联动
/*function onClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}*/

//角色form验证
var roleValidateForm = {
    rules: {
        name: {
            required: true,
            stringCheck: true
        }
    },
    messages: {
        name: {
            required: "请输入角色名称"
        }
    }
}
