var menu = 'informationCenter';
$(function() {

    initDatatables(menu);

    $('.resetbtn').click(function() {
        initDatatables(menu);
    })

    $('#btn-form .btn').bind('click', function() {
        $('#select-btn').html($(this).attr('name'));
        menu = $(this).attr('data');
        initDatatables();
    });

    $('#newPic').bind('click', function() {
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
                    // 最大上传文件为 1MB
                    max_file_size: '10MB',
                }
            });
            var options = {
                div: {
                    height: 250
                },
                oper: {
                    url: '/picture/uploadPic',
                    beforeSubmit: function(params) {
                        params.fileId = versionFileInfo.id;
                        params.menu = menu;
                        return params;
                    },
                    success: function() {
                        pictureTable.ajax.reload(null, false);
                    }
                },
                txt: {
                    titleTxt: '导入模块文件',
                    queryTxt: '确认导入吗？'
                },
                validate: taskValidateForm
            };
            $('#readExcelModal').commonFormDialog(options);
    });
});

var pictureTable = {};
function initDatatables() {
    pictureTable = $('#pictureList').CommonDataTables({
        dom: 'rtlip',
        ajaxSource: '/picture/selectAll',
        searching: false,
        processing: true,
        checkallId: 'checkallId',
        destroy: true,
        serverParams: function (aoData) {
            var params = {};
            params.menu = menu;
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
                    return '<span class="zdy-table-operator zdy-table-operator-warning" id="' + full.id + '" onclick="deletePicture(\'' + full.id + '\');">删除</span>';
                }
            }
        ],
        columns: [
            { data: null },
            { data: 'name' },
            { data: 'type' },
            { data: 'size' },
            { data: 'time' },
            { data: null }
        ],
        indexNum: 0
    });
}

function deletePicture(id) {
    $.CommonDialog({
        url: '/picture/deletePicture',
        data: {id : id},
        isFailAutoClose: true,
        queryTxt: '确认删除该图片吗？',
        sucCallBack: function() {
            pictureTable.ajax.reload(null, false);
        }
    }).showDlg();
}

function uploadComplete(file) {
    versionFileInfo = file;
    $('#file').val(file.name);
    $('#file').trigger('change');
    $('.uploader-btn-browse').attr('disabled', true);
}

function filesRemoved(file) {
    $('#file').val('');
    versionFileInfo = null;
    $('.uploader-btn-browse').attr('disabled', false);
}

var taskValidateForm = {
    rules: {
        file: {
            required: true
        }
    },
    messages: {
        file: {
            required: '请选择需要上传的文件'
        }
    }
}