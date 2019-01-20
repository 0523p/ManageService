/**
* map select站点选择

   demo

   options = {
            url: '/Common/getSiteByUser',
            sucCallBack:function(data){
                console.log(data)
            }
    }
    $.CommonMap(options);
*/
$(function() {
    $.get(COMMON_PARAMS.HOST_URL + '/html/page/common/common_map.html', function(result) {
        $(document.body).append(result);
    });
})

var commonSiteSelectMap = null;
var selectedSites = [];
var allSites = [];
var commonOnline = null;
var commonSelect = null;
var cssm_callback = null;
var cssm_input_selected = null;
var selectType = null;//imsi mac all

function commonSiteSelectMapCallback() {
    commonSiteSelectMap = new BMap.Map("commonSiteSelectMap"); // 创建Map实例
    var point = new BMap.Point(lng,lat); // 创建点坐标
    commonSiteSelectMap.centerAndZoom(point, mapLevel);
    commonSiteSelectMap.enableScrollWheelZoom(); //启用滚轮放大缩小
    commonSiteSelectMap.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_RIGHT }));
    commonSiteSelectMap.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT }));
    commonOnline = new BMap.Icon("../../image/marker-offline.png", new BMap.Size(64, 76));
    commonOnline.setImageOffset(new BMap.Size(13, 10))
    commonSelect = new BMap.Icon("../../image/marker-offline.gif", new BMap.Size(64, 76));
    cssm_CreateMarker();
}

function showCommonSiteSlectMapDialog(callback, selected, type) {
    cssm_input_selected = selected;
    selectType = type;
    $("#sdiv").html('');
    cssm_callback = callback;
    $('#common-site-map-modal').modal({ backdrop: 'static', keyboard: false });
    // var script = document.createElement("script");
    // script.type = "text/javascript";
    // script.src = "http://api.map.baidu.com/api?v=2.0&ak=wlyiLpTGajwXdj9jSuwv2NQMDCdAz3M1&callback=commonSiteSelectMapCallback";
    // document.body.appendChild(script);
    commonSiteSelectMapCallback();
}

function cssm_CreateMarker() {
    var url = 'getSiteByUser';
    switch(selectType) {
        case 'all':
            url = 'getSiteByUser';
            break;
        case 'imsi':
            url = 'getUeSiteBySearch';    
            break;
        case 'mac':
            url = 'getMacSiteBySearch';
            break;    
    }

    selectedSites = [];
    allSites = [];
    $.CommonAjax({
        url: "/Common/" + url,
        success: function(data) {
            allSites = data;
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var isSelected = false;
                if (cssm_input_selected != null) {
                    for (var j = 0; j < cssm_input_selected.length; j++) {
                        if (cssm_input_selected[j].id == obj.sn) {
                            selectedSites[selectedSites.length] = obj;
                            isSelected = true;
                            break;
                        }
                    }
                }
                cssm_onShowMarker(obj, i, isSelected);
            }
        }
    })
}

function cssm_onShowMarker(site, j, isSelected) {
    var point = new BMap.Point(site.longitude, site.latitude);
    var marker = new BMap.Marker(point, isSelected ? { icon: commonSelect } : { icon: commonOnline });
    var label = new BMap.Label(site.name,{offset:new BMap.Size(30, -20)});
    label.setStyle({
             fontSize : "14px",
             height : "26px",
             lineHeight : "20px",
             padding: "3px",
             fontFamily:"微软雅黑",
             border: "1px solid #a8c0df",
             borderRadius: "4px",
             textAlign: "center",
             backgroundColor: "#a8c0df",
             minWidth: "100px"
         });
    marker.setLabel(label);
    commonSiteSelectMap.addOverlay(marker);
    allSites[j].marker = marker;
    marker.addEventListener('click', function(event) {
        var idx = -1;
        for (var i = 0; i < selectedSites.length; i++) {
            if (selectedSites[i].id == site.id) {
                idx = i;
                selectedSites.splice(i, 1);
                break;
            }
        }

        if (idx == -1) {
            allSites[j].marker.setIcon(commonSelect)
            selectedSites[selectedSites.length] = site;
        } else {
            allSites[j].marker.setIcon(commonOnline)
        }

        cssm_doShowList();
    })
    cssm_doShowList();
}

function cssm_doShowList() {
    var html = '';
    for (var i = 0; i < selectedSites.length; i++) {
        var item = selectedSites[i];
        html += '<div class="cssm_left_item">' + item.name + '<i class="icon icon-trash" style="margin-left: 3px; color: red; cursor: pointer;" title="删除" onclick="cssm_removeSelected(\'' + item.id + '\')"></i></div>';
    }
    $("#sdiv").html(html);
}

function cssm_removeSelected(id) {
    for (var i = 0; i < selectedSites.length; i++) {
        var item = selectedSites[i];
        if (item.id == id) {
            selectedSites.splice(i, 1);
            break;
        }
    }

    //
    for (var i = 0; i < allSites.length; i++) {
        if (allSites[i].id == id) {
            allSites[i].marker.setIcon(commonOnline);
            break;
        }
    }
    cssm_doShowList();
}

function cssm_complate() {
    $('#common-site-map-modal').modal("hide");
    if (cssm_callback != null) {
        cssm_callback(selectedSites);
    }
}

// function removeMarker(id) {
//     var online = new BMap.Icon("../../image/marker-offline.png", new BMap.Size(64, 76));
//     var select = new BMap.Icon("../../image/marker-offline.gif", new BMap.Size(64, 76));
//     online.setImageOffset(new BMap.Size(13, 10))
//     for (var x = 0; x < selectedSites.length; x++) {
//         if (id == selectedSites[x].id) {
//             selectedSites[x].marker.setIcon(online);
//             selectedSites.splice(x, 1)
//             $("#selected" + id).remove();
//         }
//     }
// }
// $.CommonMap = function(options) {
//     var _options = {};
//     var defOptions = {
//         url: '',
//         sucCallBack: null,
//         resultData: [],
//     }
//     $.extend(_options, defOptions, options);
//     _this = this;
//     //地图的配合
//     //$("#allmap").html("");
//     selectedSites = [];
//     $("#select-sites").html('<span  style="width:200px;margin:5px" class="label">已选站点</span>');
//     var map = new BMap.Map("allmap");
//     createMarker = function(obj) {
//         var online = new BMap.Icon("../../image/marker-offline.png", new BMap.Size(64, 76));
//         online.setImageOffset(new BMap.Size(13, 10))
//         var select = new BMap.Icon("../../image/marker-offline.gif", new BMap.Size(64, 76));
//         var id = obj.id;
//         var text = obj.name;
//         var sn = obj.sn;
//         var point = new BMap.Point(obj.longitude, obj.latitude);
//         var marker = new BMap.Marker(point, { icon: online });
//         map.addOverlay(marker);
//         marker.addEventListener("click", function() {
//             var obj = { "id": id, "marker": marker }
//             if (marker.getIcon().imageUrl == online.imageUrl) {
//                 marker.setIcon(select)
//                 $("#select-sites").append('<div id="selected' + id + '"><button class="btn btn-block  btn-primary selectedSiteClass" data-sn="' + sn + '" data-id="' + id + '" data-text="' + text + '"  style="margin: 5px;width:60%;display: inline;" type="button">' + text + '</button><i class="icon icon-trash" onclick="removeMarker(' + id + ')" ></div>');
//                 selectedSites.push(obj)
//             } else {
//                 for (var x = 0; x < selectedSites.length; x++) {
//                     if (id == selectedSites[x].id) {
//                         selectedSites.splice(x, 1)
//                         $("#selected" + id).remove();
//                     }
//                 }
//                 marker.setIcon(online)
//             }
//         });
//     }
//     $.CommonAjax({
//         url: _options.url,
//         success: function(data) {
//             // 创建Map实例
//             map.enableScrollWheelZoom(); //启用滚轮放大缩小
//             map.clearOverlays();
//             if (data != null) {
//                 var point = new BMap.Point(data[0].longitude, data[0].latitude); // 创建点坐标
//                 map.centerAndZoom(point, 14);
//             } else {
//                 var point = new BMap.Point(116.404, 39.915); // 创建点坐标
//                 map.centerAndZoom(point, 14);
//             }
//             for (var i = 0; i < data.length; i++) {
//                 createMarker(data[i])
//             }
//         }
//     })
//     $('#common-site-map-modal').modal({})
//     var CommonMap = {
//         options: _options,
//         doRequest: function() {
//             var result = [];
//             $(".selectedSiteClass").each(function() {
//                 result.push({
//                     "id": $(this).attr("data-id"),
//                     "text": $(this).attr("data-text"),
//                     "sn": $(this).attr("data-sn"),
//                 })
//             });
//             _options.sucCallBack(result);
//         }
//     }
//     $("#common-site-map-submit").unbind("click").click(
//         function() {
//             CommonMap.doRequest();
//             $('#common-site-map-modal').modal("hide")
//         }
//     );
//     return CommonMap;
// }