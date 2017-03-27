//推荐人物
var recommend_url='/construction/show_in/';
var uid=[];
$.ajax({
    url: recommend_url,
    type: 'GET',
    dataType: 'json',
    async: true,
    success:recommend_1
});
function recommend_1(data1) {
    var data1 = eval(data1);
    uid=[];
    $('.recommend').css({display:'block'});
    $('.recommend2').css({display:'none'});
    $('.recommend3').css({display:'none'});
    $('#recommend').bootstrapTable('load', data1);
    $('#recommend').bootstrapTable({
        data:data1,
        search: true,//是否搜索
        pagination: true,//是否分页
        pageSize: 5,//单页记录数
        pageList: [5, 20, 40, 80],//分页步进值
        sidePagination: "client",//服务端分页
        searchAlign: "left",
        searchOnEnterKey: false,//回车搜索
        showRefresh: false,//刷新按钮
        showColumns: false,//列选择按钮
        buttonsAlign: "right",//按钮对齐方式
        locale: "zh-CN",//中文支持
        detailView: false,
        showToggle:true,
        sortName:'bci',
        sortOrder:"desc",
        columns: [
            {
                title: "序号",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return index+1;
                }
            },
            {
                title: "UID",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[0];
                }
            },
            {
                title: "昵称",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[1];
                },
            },
            {
                title: "注册地",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row[2]==''){
                        return '未知';
                    }else {
                        return row[2];
                    }
                },
            },
            {
                title: "微博数",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[3];
                },
            },
            {
                title: "粉丝数",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[4];
                },
            },
            {
                title: '影响力',//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[5].toFixed(2);
                },
            },
            //多选框
            {
                title: "",//标题
                field: "select",
                checkbox: true,
                align: "center",//水平
                valign: "middle"//垂直
            },

        ],
        onCheck:function (row) {
            uid.push(row[0]);
        }
        // onClickRow: function (row, tr) {
        //     if ($(tr.context).index()==2) {
        //         del_eventuid=row[0];
        //         $('#del_ject').modal("show");
        //     }
        // }
    });
};

function recommend_2(data2) {
    var data2 = eval(data2);
    uid=[];
    $('.recommend').css({display:'none'});
    $('.recommend2').css({display:'block'});
    $('.recommend3').css({display:'none'});
    $('#recommend2').bootstrapTable('load', data2);
    $('#recommend2').bootstrapTable({
        data:data2,
        search: true,//是否搜索
        pagination: true,//是否分页
        pageSize: 5,//单页记录数
        pageList: [5, 20, 40, 80],//分页步进值
        sidePagination: "client",//服务端分页
        searchAlign: "left",
        searchOnEnterKey: false,//回车搜索
        showRefresh: false,//刷新按钮
        showColumns: false,//列选择按钮
        buttonsAlign: "right",//按钮对齐方式
        locale: "zh-CN",//中文支持
        detailView: false,
        showToggle:true,
        sortName:'bci',
        sortOrder:"desc",
        columns: [
            {
                title: "序号",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return index+1;
                }
            },
            {
                title: "UID",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[0];
                }
            },
            {
                title: "昵称",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[1];
                },
            },
            {
                title: "注册地",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row[2]==''){
                        return '未知';
                    }else {
                        return row[2];
                    }
                },
            },
            {
                title: "粉丝数",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[3];
                },
            },
            {
                title: "微博数",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[4]
                },
            },
            {
                title: '敏感度',//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if(row[5]==''){
                        return '未知';
                    }else {
                        return row[5].toFixed(2);
                    }
                },
            },
            {
                title: '敏感词',//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if(row[6].length==0){
                        return '暂无';
                    }else {
                        $.each(row[6],function (index,item) {
                            return item;
                        })
                    }
                },
            },
            //多选框
            {
                title: "",//标题
                field: "select",
                checkbox: true,
                align: "center",//水平
                valign: "middle"//垂直
            },

        ],
        onCheck:function (row) {
            uid.push(row[0]);
        }
        // onClickRow: function (row, tr) {
        //     if ($(tr.context).index()==2) {
        //         del_eventuid=row[0];
        //         $('#del_ject').modal("show");
        //     }
        // }
    });
};

function recommend_3(data3) {
    var data3 = eval(data3);
    uid=[];
    $('.recommend').css({display:'none'});
    $('.recommend2').css({display:'none'});
    $('.recommend3').css({display:'block'});
    $('#recommend3').bootstrapTable('load', data3);
    $('#recommend3').bootstrapTable({
        data:data3,
        search: true,//是否搜索
        pagination: true,//是否分页
        pageSize: 5,//单页记录数
        pageList: [5, 20, 40, 80],//分页步进值
        sidePagination: "client",//服务端分页
        searchAlign: "left",
        searchOnEnterKey: false,//回车搜索
        showRefresh: false,//刷新按钮
        showColumns: false,//列选择按钮
        buttonsAlign: "right",//按钮对齐方式
        locale: "zh-CN",//中文支持
        detailView: false,
        showToggle:true,
        sortName:'bci',
        sortOrder:"desc",
        columns: [
            {
                title: "序号",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return index+1;
                }
            },
            {
                title: "UID",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[0];
                }
            },
            {
                title: "昵称",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[1];
                },
            },
            {
                title: "注册地",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row[2]==''){
                        return '未知';
                    }else {
                        return row[2];
                    }
                },
            },
            {
                title: "微博数",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[3];
                },
            },
            {
                title: "粉丝数",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[4]
                },
            },
            {
                title: '影响力',//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[5].toFixed(2);
                },
            },
            {
                title: '关联用户',//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[6];
                },
            },
            //多选框
            {
                title: "",//标题
                field: "select",
                checkbox: true,
                align: "center",//水平
                valign: "middle"//垂直
            },

        ],
        onCheck:function (row) {
            uid.push(row[0]);
        }
        // onClickRow: function (row, tr) {
        //     if ($(tr.context).index()==2) {
        //         del_eventuid=row[0];
        //         $('#del_ject').modal("show");
        //     }
        // }
    });
};
//=======推荐人物==完=====


function type_1(value) {
    if (value==1){
        $('.user').show();
        $('.event').hide();
        $('.agency').hide();
        $('#node_list').show();
        $('#event_list').hide();
        node_type='user';
        type='influence';
    }else if (value==2) {
        $('.user').hide();
        $('.event').show();
        $('.agency').hide();
        $('#node_list').hide();
        $('#event_list').show();
        node_type='event';
    }else if (value==3){
        $('.user').hide();
        $('.event').hide();
        $('.agency').show();
        $('#node_list').show();
        $('#event_list').hide();
        node_type='org';
        type='influence';
    }
};

function type_2(value) {
    if (value==1){
        $('.user #tui_shou').empty();
        $('.user #tui_shou').append(
            '<option value="1">影响力推荐</option>'+
            '<option value="2">言论敏感度推荐</option>'+
            '<option value="3">关注用户推荐</option>'
        );
        $('.user .time_t').show();
        $('.user .manual-1').hide();
        $('.user .manual').hide();
    }else {
        $('.user #tui_shou').empty();
        $('.user #tui_shou').append(
            '<option value="4">文件导入</option>'+
            '<option value="5">手动添加</option>'
        );
        $('.user .time_t').hide();
        $('.user .manual-1').show();
        $('.user .manual').hide();
    }
};
//---7天时间
function get7DaysBefore(date,m){
    var date = date || new Date(),
        timestamp, newDate;
    if(!(date instanceof Date)){
        date = new Date(date);
    }
    timestamp = date.getTime();
    newDate = new Date(timestamp - m * 24 * 3600 * 1000);
    return [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()].join('-');
};
var day7=[];
for (var a=0;a < 8;a++){
    day7.push(get7DaysBefore(new Date(),a));
}
$('#task_time').empty();
for (var y=0;y<day7.length;y++){
    $('#task_time').append('<option value="'+day7[y]+'">'+day7[y]+'</option>');
}
$('#task_time_age').empty();
for (var y=0;y<day7.length;y++){
    $('#task_time_age').append('<option value="'+day7[y]+'">'+day7[y]+'</option>');
}
//---7天完

var recommend='影响力';
var type='influence';
var node_type='user';
function type_3(value) {
    if (value==4){
        $('.user .manual-1').show();
        $('.user .manual').hide();
    }else if (value==5){
        $('.user .manual').show();
        $('.user .manual-1').hide();
    }else if (value==1){
        recommend='影响力';
        type='influence';
    }else if (value==2){
        recommend='敏感度';
        type='sensitive';
    }else if (value==3){
        recommend='关注度';
        type='auto';
    }
};

function event_type_2(value) {
    if(value==2){
        $('.event .manual').show();
        $('.event .manual-1').show();
        $('.event .manual-2').hide();
    }else if (value==3){
        $('.event .manual').hide();
        $('.event .manual-1').hide();
        $('.event .manual-2').show();
    }else {
        $('.event .manual').hide();
        $('.event .manual-1').hide();
        $('.event .manual-2').hide();
    }
}

function type_2_age(value) {
    if (value==1){
        $('.agency #tui_shou_age').empty();
        $('.agency #tui_shou_age').append(
            '<option value="1">影响力推荐</option>'+
            '<option value="2">言论敏感度推荐</option>'+
            '<option value="3">关注用户推荐</option>'
        );
    }else {
        $('.agency #tui_shou_age').empty();
        $('.agency #tui_shou_age').append(
            '<option value="4">文件导入</option>'+
            '<option value="5">手动添加</option>'
        );
        $('.agency .time_t_age').hide();
        $('.agency .manual-1').show();
        $('.agency .manual').hide();
    }
}

function type_3_age(value) {
    if (value==4){
        $('.agency .manual-1').show();
        $('.agency .manual').hide();
    }else if (value==5){
        $('.agency .manual').show();
        $('.agency .manual-1').hide();
    }else if (value==1){
        recommend='影响力';
        type='influence';
    }else if (value==2){
        recommend='敏感度';
        type='sensitive';
    }else if (value==3){
        recommend='关注度';
        type='auto';
    }
}

//-----------推荐人物----------
$('.add_sure').on('click',function () {
    $('#recommend').empty();
    // var date=$('#task_time').val();
    var date='2016-11-27';
    // var submit_user=$('#name').text();
    var submit_user='admin';
    if (recommend=='关注度'){
        var recommend_url_3='/construction/show_auto_in/?date='+date+'&submit_user='+submit_user+
            '&node_type='+node_type;
        $.ajax({
            url: recommend_url_3,
            type: 'GET',
            dataType: 'json',
            async: true,
            success:recommend_3
        });
    }else if (recommend=='敏感度'){
        var recommend_url_2='/construction/show_in/?date='+date+'&type='+type+'&submit_user='+submit_user+
            '&node_type='+node_type;
        $.ajax({
            url: recommend_url_2,
            type: 'GET',
            dataType: 'json',
            async: true,
            success:recommend_2
        });
    }else {
        var recommend_url_1='/construction/show_in/?date='+date+'&type='+type+'&submit_user='+submit_user+
            '&node_type='+node_type;
        $.ajax({
            url: recommend_url_1,
            type: 'GET',
            dataType: 'json',
            async: true,
            success:recommend_1
        });
    }
})

//创建任务
$('#container .node #node_list .node_join').on('click',function () {
    if (node_type=='user'){
        $('#relation .rel_list').empty();
        $('#relation .rel_list').append(
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="friend" checked> 交互'+
            '</label>'+
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="colleague" checked> 自述关联'+
            '</label>'+
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="colleague" checked> 业务关联'+
            '</label>'+
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="discuss" checked> 参与讨论'+
            '</label>'+
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="join" checked> 参与事件'+
            '</label>'
        );
    }else if (node_type=='event'){
        $('#relation .rel_list').empty();
        $('#relation .rel_list').append(
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="join" checked> 参与事件'+
            '</label>'+
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="discuss" checked> 参与讨论'+
            '</label>'+
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="contain" checked> 主题关联'+
            '</label>'
        )
    }else {
        $('#relation .rel_list').empty();
        $('#relation .rel_list').append(
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="friend" checked> 交互'+
            '</label>'+
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="colleague" checked> 业务关联'+
            '</label>'+
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="join" checked> 参与事件'+
            '</label>'+
            '<label class="checkbox-inline">'+
            '   <input type="checkbox" value="discuss" checked> 参与讨论'+
            '</label>'
        )
    }
    $('#relation').modal('show');

});
function sure_task() {
    var status,user_rel=[];
    if($('#box1').is(':checked')) { status=1; };
    if($('#box2').is(':checked')) { status=2; };
    $("#relation .rel_list input:checkbox:checked").each(function (index,item) {
        user_rel.push($(this).val());
    });
    var uid_list=uid.join(',');
    var user_rel_list=user_rel.join(',');
    // var date=$('#task_time').val();
    var date='2016-11-27';
    // var submit_user=$('#name').text();
    var submit_user='admin';
    var n_t=0;
    if(node_type=='user'){
        n_t=0;
    }else if(node_type=='org') {
        n_t=1;
    }
    var new_task_url='/construction/admin_identify_in/?date='+date+'&uid_list='+uid_list+
        '&user_rel='+user_rel_list+'&status='+status+'&recommend_style='+type+
            '&node_type='+n_t+'&submit_user='+submit_user;
    $.ajax({
        url: new_task_url,
        type: 'GET',
        dataType: 'json',
        async: true,
        success:fail_or_success
    });
}
//创建成功与失败
function fail_or_success(data) {
    if (data==1){
        $('#fail_success #prompt').text('创建成功');
    }else {
        $('#fail_success #prompt').text('创建失败');
    }
    $('#fail_success').modal('show');
}

//任务列表
var nt=0;
if(node_type=='user'){
    nt=0;
}else if(node_type=='org') {
    nt=1;
}
var task_url='/construction/show_user_task_status/?node_type='+nt;
$.ajax({
    url: task_url,
    type: 'GET',
    dataType: 'json',
    async: true,
    success:task_list
});
function task_list(data) {
    var data = eval(data);
    console.log(data)
    $('#count').bootstrapTable('load', data);
    $('#count').bootstrapTable({
        data:data,
        search: true,//是否搜索
        pagination: true,//是否分页
        pageSize: 5,//单页记录数
        pageList: [5, 20, 40, 80],//分页步进值
        sidePagination: "client",//服务端分页
        searchAlign: "left",
        searchOnEnterKey: false,//回车搜索
        showRefresh: false,//刷新按钮
        showColumns: false,//列选择按钮
        buttonsAlign: "right",//按钮对齐方式
        locale: "zh-CN",//中文支持
        detailView: false,
        showToggle:true,
        sortName:'bci',
        sortOrder:"desc",
        columns: [
            {
                title: "人物名称",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return index+1;
                }
            },
            {
                title: "添加方式",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[0];
                }
            },
            {
                title: "添加人",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[1];
                },
            },
            {
                title: "提交时间",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row[2]==''){
                        return '未知';
                    }else {
                        return row[2];
                    }
                },
            },
            {
                title: "任务状态",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[3];
                },
            },

        ],
        // onClickRow: function (row, tr) {
        //     if ($(tr.context).index()==2) {
        //         del_eventuid=row[0];
        //         $('#del_ject').modal("show");
        //     }
        // }
    });
};



