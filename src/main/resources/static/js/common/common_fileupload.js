/**
* 文件上传组件
* 传输单个文件
* options = {
	filters: {
	    mime_types: [
	        {title: '图片', extensions: 'jpg,gif,png'}
	    ],
	    // 最大上传文件为 1MB
	    max_file_size: '1mb',
	    // 不允许上传重复文件
	    prevent_duplicates: true
	},
	//当队列中的所有文件上传完成后触发
	uploadComplete: null,
	//当文件从上传队列移除后触发
	filesRemoved: null
}
*/
$.fn.CommonFileUpload = function(options) {
    var defOptions = {
        filters: {
            mime_types: [],
            // 最大上传文件为 1MB
            max_file_size: '30MB',
            // 不允许上传重复文件
            prevent_duplicates: true
        },
        //当队列中的所有文件上传完成后触发
        uploadComplete: null,
        //当文件从上传队列移除后触发
        filesRemoved: null,
        fileData: null
    };

    var _cur = {};
    $.extend(true, _cur, defOptions, options);
    $('.file-list').append('<div style="display:none" id ="filedragarea"><div>')
    $('.uploader-btn-browse').removeProp("disabled");
    var uploader = this.uploader({
        autoUpload: true,
        url: COMMON_PARAMS.HOST_URL + 'file/upload', // 文件上传提交地址
        deleteActionOnDone: function(file, doRemoveFile) {
            return true;
        },
        chunk_size: 0,
        max_retries: 0,
        multi_selection: false,
        filters: _cur.filters,
        drop_element: $('#filedragarea'),
        onUploadComplete: function(files) {
            if (_cur.uploadComplete != null)
                _cur.uploadComplete(_cur.fileData);
            $('.uploader-btn-browse').prop("disabled", "disabled");
        },
        onFilesRemoved: function(file) {
            if (_cur.filesRemoved != null)
                _cur.filesRemoved(_cur.fileData);
            _cur.fileData = null;
            $('.uploader-btn-browse').removeProp("disabled");
        },
        responseHandler: function(responseObject, file) {
            var result = responseObject.response;
            var dataObj = $.parseJSON(result);

            if (!dataObj.session_ok) {
                window.top._Common_LogoutDialogShow();
                return "error";
            } else {
                if (dataObj.result_data.status) {
                    _cur.fileData = dataObj.result_data.data;
                }
            }
        }
    });
    $('.file-list').removeAttr('data-drag-placeholder');
    $('#filedragarea').remove();
    return uploader;
}