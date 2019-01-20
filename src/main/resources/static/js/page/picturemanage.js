//菜单名称
var menu = null;
//顺序
var sequence = null;
$(function() {
    $('.uploadPic').bind('click', function() {
        var index = $('.uploadPic').index(this);
        sequence = index;
        menu = "messageCenter";
        $('#uploadPicModel .uploader-btn-browse').attr('disabled', false);
        var uploader = $('#uploaderExample').data('zui.uploader');
        if (uploader != null) {
            $('#uploadPicModel #uploaderExample .file-list').html('');
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
                height: 250
            },
            oper: {
                url: '/file/uploadPic',
                beforeSubmit: beforeSubmit,
                success: function() {

                }
            },
            txt: {
                titleTxt: '导入图片文件',
                queryTxt: '确认导入吗？'
            },
            validate: taskValidateForm
        };
        $('#uploadPicModel').commonFormDialog(options);
    });


});

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

function beforeSubmit(params) {
    params.fileId = versionFileInfo.id;
    params.menu = menu;
    params.sequence = sequence;
    return params;
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
