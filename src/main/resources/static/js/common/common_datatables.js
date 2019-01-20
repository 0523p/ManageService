//dataTables中文设置
var language = {
    lengthMenu: ' _MENU_ ',
    zeroRecords: '抱歉，没有找到',
    sLengthMenu: '每页 _MENU_ 条',
    info: '从 _START_ 到 _END_ /共 _TOTAL_ 条数据',
    infoEmpty: '没有数据',
    infoFiltered: '(从 _MAX_ 条数据中检索)',
    zeroRecords: '没有查询到数据',
    search: '名称:',
    select: {
        rows: {
            _: '已选择%d行',
            0: '',
            1: '已选择1行'
        }
    },
    processing: '<div class="sk-wave-c"><div class="sk-rect-c sk-rect1-c"></div><div class="sk-rect-c sk-rect2-c"></div><div class="sk-rect-c sk-rect3-c"></div><div class="sk-rect-c sk-rect4-c"></div><div class="sk-rect-c sk-rect5-c"></div></div>',
    loadingRecords: '加载中...',
    paginate: {
        first: '首页',
        previous: '前一页',
        next: '后一页',
        last: '尾页'
    }
}

/**
 * datatable 初始化默认参数
 */
var DatatTableDefOptions = {
    dom: 'Brtlip', //datatable的布局方式
    checkallId: 'dt-checkbox-all',
    buttons: [],
    select: {
        style: 'multi+shift' //选择的样式
    },
    serverMethod: 'post',
    serverData: function(sSource, aoData, fnCallback) { //重写从服务器获取数据的方法
        $.CommonAjax({
            dataType: 'json',
            type: 'POST',
            url: sSource,
            data: aoData,
            success: fnCallback
        });
    },
    autoWidth: true, //控制Datatables是否自适应宽度
    ordering: false, //是否开启排序 默认true
    destroy: false, //销毁已存在的dt实例  默认false
    serverSide: true, //是否开启服务器模式 默认false 
    stateSave: false, //保存状态 - 在页面重新加载的时候恢复状态（页码等内容）默认false
    processing: true, //是否显示处理状态 默认false
    info: true, //控制是否显示表格左下角的信息 默认true
    paging: true, //是否开启本地分页 默认true
    deferRender: false, //控制表格的延迟渲染 默认false
    ajaxDataProp: 'dataResult', //返回结果封装的对象名称
    lengthMenu: [10, 25, 50, 100],
    pageLength: 10,
    language: language,
    //data: {},
    //
    checkallId: null, //全选按钮的id 非必填
    order: [
        [0, 'asc']
    ], //表格初始化后的排序 非必填
    exportColumns: [], //导出的行，数组[0,1,2……] 必填，无button功能可不填
    indexNum: -1, //datatable表格加索引的列  -1时不加索引 非必填
    ajaxSource: null, //数据提交的url，必填
    serverParams: null, //提交的参数，非必填，例：function(aoData) {}
    columnDefs: [], //设置定义列的属性，非必填
    columns: [] //设定datatable从请求返回的dataResult中展示的取值字段，必填
};


/**
 *
 */
$.fn.CommonDataTables = function(optins) {
    //
    var all = {};
    $.extend(true, all, DatatTableDefOptions, optins);
    all.tableId = $(this).attr('id');

    // 初始化datatable
    all.initComplete = function() {
        //checkbox全选
        $('#' + all.checkallId).click(function() {
            $('#' + all.checkallId + '-th').removeClass('select-checkbox');
            $('#' + all.tableId + ' tr').toggleClass('selected');
            if ($(this).prop('checked')) {
                $('#' + all.tableId + ' tr').addClass('selected');
                all.dt.rows('.selected').select();
            } else {
                $('#' + all.tableId + ' tr').removeClass('selected');
                all.dt.rows().deselect();
            }
        });
    }

    //
    if (all.indexNum > -1) {
        all.drawCallback = function() {
            var api = this.api();
            var startIndex = api.context[0]._iDisplayStart; //获取到本页开始的条数  
            while (startIndex > api.context[0]._iRecordsTotal) {
                startIndex = 0;
            }
            if (all.indexNum > -1) {
                api.column(all.indexNum).nodes().each(
                    function(cell, i) {
                        cell.innerHTML = startIndex + i + 1; //设置索引列
                    });
            }

            //
            $('#' + all.checkallId + '-th').removeClass('select-checkbox');
            $('#' + all.tableId + ' tr').removeClass('selected');
            $('#' + all.checkallId).attr("checked", false);
            if (all.dt != undefined)
                all.dt.rows().deselect();
        }
    }

    //
    var dt = $('#' + all.tableId).DataTable(all);
    all.dt = dt;

    return dt;
};