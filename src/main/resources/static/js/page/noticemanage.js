$(function() {
    initDatatables();

    $('.resetbtn').click(function() {
        initDatatables();
    })

    $("#newNotice").bind('click', function() {
        $('.uploader-btn-browse').attr('disabled', false);
            var uploader = $('#uploaderExample').data('zui.uploader');
            if (uploader != null) {
                $('#uploaderExample .file-list').html('');
                uploader.destroy();
            }
            $('#uploaderExample').CommonFileUpload({
                autoUpload: true, // 当选择文件后立即自动进行上传操作
                max_retries: 0,
                deleteActionOnDone: true,
                uploadComplete: uploadComplete,
                filesRemoved: filesRemoved,
                filters: {
                    // 最大上传文件为 10MB
                    max_file_size: '10MB',
                }
            });
        var options = {
            div: {
                width: 500,
                height: 400,
                needReset: false,
            },
            oper: {
                url: '/notice/addNotice',
                autoClose: true,
                beforeSubmit: function(params) {
                params.pdf = versionFileInfo.id;
                    return params;
                },
                success: function() {
                    noticeTable.ajax.reload(null, false);
                }
            },
            txt: {
                titleTxt: '添加公告信息',
                queryTxt: '确认添加吗？'
            },
            validate: noticeValidateForm
        };
        $('#addNoticeModel').commonFormDialog(options);

        $('#addNoticeModel input').val('');
    });
})

var noticeTable = {};
function initDatatables() {
    noticeTable = $('#noticeList').CommonDataTables({
        dom: 'rtlip',
        ajaxSource: '/notice/selectAll',
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
                aTargets: [5],
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
                    var deleteDom = '<span class="zdy-table-operator zdy-table-operator-warning" id="' + full.guid + '" onclick="deleteNotice(\'' + full.guid + '\');">删除</span>';
                    return updateDom + deleteDom;
                }
            }
        ],
        columns: [
            { data: null },
            { data: 'title' },
            { data: 'description' },
            { data: 'owner' },
            { data: 'file' },
            { data: 'createTime' },
            { data: null }
        ],
        indexNum: 0
    });
}

function updateInfo(guid) {
        $('.uploader-btn-browse').attr('disabled', false);
            var uploader = $('#uploaderExample1').data('zui.uploader');
            if (uploader != null) {
                $('#uploaderExample1 .file-list').html('');
                uploader.destroy();
            }
            $('#uploaderExample1').CommonFileUpload({
                autoUpload: true, // 当选择文件后立即自动进行上传操作
                max_retries: 0,
                deleteActionOnDone: true,
                uploadComplete: uploadCompleteUpdate,
                filesRemoved: filesRemovedUpdate,
                filters: {
                    // 最大上传文件为 10MB
                    max_file_size: '10MB',
                }
            });
    var options = {
        div: {
            width: 500,
            height: 400,
            needReset: false,
        },
        oper: {
            url: '/notice/updateNotice',
            autoClose: true,
            beforeSubmit: function(params) {
            try{
                params.pdf = versionFileInfo.id;
            }catch(e) {
                params.pdf = "";
            }
            params.guid = guid;
                return params;
            },
            success: function() {
                noticeTable.ajax.reload(null, false);
            }
        },
        txt: {
            titleTxt: '修改公告栏信息',
            queryTxt: '确认修改吗？'
        },
        validate: noticeValidateForm
    };
    $('#updateNoticeModel').commonFormDialog(options);

    var rowData = noticeTable.row($('#' + guid).parent()).data();
    $.each(rowData, function(key, value) {
    if(key == "file") {
            $('#updateNoticeModel #' + "file1").val(value);
    }
        $('#updateNoticeModel #' + key).val(value);
    });
}

function deleteNotice(guid) {
    $.CommonDialog({
        url: '/notice/delete',
        data: {guid : guid},
        isFailAutoClose: true,
        queryTxt: '确认删除该公告栏信息吗？',
        sucCallBack: function() {
            noticeTable.ajax.reload(null, false);
        }
    }).showDlg();
}

var noticeValidateForm = {
    rules: {
        title: {
            required: true,
            stringCheck: true,
            maxlength: 32
        },
        description: {
            required: true
        },
        owner: {
            required: true,
        },
        file: {
        required: true
        }
    },
    messages: {
        title: {
            required: '请输入公告',
            maxlength: '名称过长'
        },
        description: {
            required: '请输入公告简介'
        },
        owner: {
            required: '请输入发布人'
        },
        file: {
            required: '请选择需要上传的PDF文件'
        }
    }
    }
    function uploadComplete(file) {
        versionFileInfo = file;
        $('#file').val(file.name);
        $('#file').trigger('change');
        $('.uploader-btn-browse').attr('disabled', true);
    }
    function uploadCompleteUpdate(file) {
        versionFileInfo = file;
        $('#file1').val(file.name);
        $('#file1').trigger('change');
        $('.uploader-btn-browse').attr('disabled', true);
    }

    function filesRemoved(file) {
        $('#file1').val('');
        versionFileInfo = null;
        $('.uploader-btn-browse').attr('disabled', false);
    }
    function filesRemovedUpdate(file) {
        $('#file1').val('');
        versionFileInfo = null;
        $('.uploader-btn-browse').attr('disabled', false);
    }
