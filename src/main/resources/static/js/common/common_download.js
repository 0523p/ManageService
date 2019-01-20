$(function() {
    $.get(COMMON_PARAMS.HOST_URL + '/html/page/common/common_download.html', function(result) {
        $(document.body).append(result);
    });
})

function common_download_showProcessingDlg(url, params, type) {
    $('#Common_Download_Dialog #processDiv').css('width', '0%')
    $('#Common_Download_Dialog #process').html('0%');
    $.CommonAjax({
        url: url,
        data: { paramJson: params, type: type },
        success: function(data) {
            $('#Common_Download_Dialog').modal({ backdrop: 'static', keyboard: false });
            var uuid = data.data;
            var cycleEvent = setInterval(function() {
                $.CommonAjax({
                    url: '/generate/status?uuId=' + data.data,
                    method: 'get',
                    success: function(obj) {
                        if (obj.status == "success") {
                            clearInterval(cycleEvent);
                            $('#Common_Download_Dialog #processDiv').css('width', '100.00%')
                            $('#Common_Download_Dialog #process').html('100%');
                            var sleep = setInterval(function() {
                                clearInterval(sleep);
                                window.location.href = COMMON_PARAMS.HOST_URL + 'sys/generate/download?uuid=' + uuid;
                                $('#Common_Download_Dialog').modal('hide');
                            }, 500);
                            $("#loading-file").remove();
                        } else if (obj.status == "error") {
                            clearInterval(cycleEvent);
                            new $.zui.Messager('下载文件失败！', {
                                icon: 'bell',
                                type: 'warning',
                                time: 3000
                            }).show();
                            $('#Common_Download_Dialog').modal('hide');
                        } else {
                            var percentage = (obj.percentage * 100).toFixed(0);
                            $('#Common_Download_Dialog #processDiv').css('width', percentage + '%')
                            $('#Common_Download_Dialog #process').html(percentage + '%');
                        }
                    },
                    error: function() {
                        clearInterval(cycleEvent);
                        new $.zui.Messager('下载文件失败！', {
                            icon: 'bell',
                            type: 'warning',
                            time: 3000
                        }).show();
                        $('#Common_Download_Dialog').modal('hide');
                    }
                })
            }, 1000)
        }
    });
}