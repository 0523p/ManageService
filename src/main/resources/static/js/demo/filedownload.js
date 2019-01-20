        //文件下载实例
		$("body").append('<div id="loading-file" style="position: fixed;top: 15%;left: 45%;font-size: 40px"><i class="icon icon-spin icon-spinner-indicator" style="font-size:40px" ></i><span class="loading-text">加载中...</span></div>')
        $.CommonAjax({
         url: '/file/generate',
         method:"GET",
         success: function(data) {
             var  cycleEvent = setInterval(function(){
                $.CommonAjax({
                     url: '/file/status?name='+data,
                     method:"GET",
                     success: function(obj) {
                        if(obj=="success"){
                           clearInterval(cycleEvent);
                           window.location.href='/sys/file/download/?uuid='+data+"&type=csv&fileName=charlie_demo";
                           $("#loading-file").remove();

                        }else if(obj=="error"){

                        new $.zui.Messager('下载文件失败！', {
                             icon: 'bell',
                             type: 'warning',
                             time: 5000
                          }).show();
                       $("#loading-file").remove();
                        }
                     }
                 })
            },1000)
          }
      });