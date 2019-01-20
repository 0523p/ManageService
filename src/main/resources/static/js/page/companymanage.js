$(function() {
    initDatatables();

    $('.resetbtn').click(function() {
        initDatatables();
    })

    $("#newCompany").bind('click', function() {
        var options = {
            div: {
                width: 500,
                height: 400,
                needReset: false,
            },
            oper: {
                url: '/company/addCompany',
                autoClose: true,
                beforeSubmit: function(params) {
                    params.showOrder = parseInt(params.showOrder);
                    return params;
                },
                success: function() {
                    companyTable.ajax.reload(null, false);
                }
            },
            txt: {
                titleTxt: '添加公司信息',
                queryTxt: '确认添加吗？'
            },
            validate: companyValidateForm
        };
        $('#addCompanyModel').commonFormDialog(options);

        $('#addCompanyModel input').val('');
    });
})

var companyTable = {};
function initDatatables() {
    companyTable = $('#companyList').CommonDataTables({
        dom: 'rtlip',
        ajaxSource: '/company/selectAll',
        searching: false,
        processing: true,
        checkallId: 'checkallId',
        destroy: true,
        serverParams: function (aoData) {
            var params = {};
            aoData.push( { "name": "formData", "value":JSON.stringify(params) } );
        },
        select: {
            style: 'multi'
        },
        buttons: [{
            extend: 'colvis',
            text: '列过滤'
        }],
        columnDefs: [
            {
                orderable: false,
                aTargets: [4],
                mRender: function(data, type, full) {
                    var date = new Date();
                    date.setTime(data);
                    return date.format('yyyy-MM-dd hh:mm:ss');
                }
            },
            {
                orderable: false,
                aTargets: [6],
                mRender: function(data, type, full) {
                    var updateDom = '<span class="zdy-table-operator zdy-table-operator-ok" id="' + full.guid + '" onclick="updateInfo(\'' + full.guid + '\');">修改</span>|';
                    var deleteDom = '<span class="zdy-table-operator zdy-table-operator-warning" id="' + full.guid + '" onclick="deleteCompany(\'' + full.guid + '\');">删除</span>';
                    return updateDom + deleteDom;
                }
            }
        ],
        columns: [
            { data: null },
            { data: 'name' },
            { data: 'address' },
            { data: 'phone' },
            { data: 'createTime' },
            { data: 'showOrder' },
            { data: null }
        ],
        indexNum: 0
    });
}

function updateInfo(guid) {
    var options = {
        div: {
            width: 500,
            height: 400,
            needReset: false,
        },
        oper: {
            url: '/company/update',
            autoClose: true,
            beforeSubmit: function(params) {
                params.guid = guid;
                params.showOrder = parseInt(params.showOrder);
                return params;
            },
            success: function() {
                companyTable.ajax.reload(null, false);
            }
        },
        txt: {
            titleTxt: '修改公司信息',
            queryTxt: '确认修改吗？'
        },
        validate: companyValidateForm
    };
    $('#updateCompanyModel').commonFormDialog(options);

    var rowData = companyTable.row($('#' + guid).parent()).data();
    $.each(rowData, function(key, value) {
        $('#updateCompanyModel #' + key).val(value);
    });
}

function deleteCompany(guid) {
    $.CommonDialog({
        url: '/company/delete',
        data: {guid : guid},
        isFailAutoClose: true,
        queryTxt: '确认删除该公司信息吗？',
        sucCallBack: function() {
            companyTable.ajax.reload(null, false);
        }
    }).showDlg();
}

var companyValidateForm = {
    rules: {
        name: {
            required: true,
            stringCheck: true,
            maxlength: 32
        },
        address: {
            required: true
        },
        phone: {
            required: true,
            isPhone: true
        },
        showOrder: {
            required: true
        }
    },
    messages: {
        name: {
            required: '请输入用户名',
            maxlength: '名称过长'
        },
        address: {
            required: '请输入地址'
        },
        showOrder: {
            required: '请输入展示顺序'
        },
        phone: {
            required: '请填写联系电话'
        },
    }
}
