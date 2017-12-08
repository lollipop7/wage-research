/**
 * Created by lollipop on 2017/11/27
 */

var PR ="http://"+window.location.host+"/";
var url = PR + "vita/m/salary/result";
var industrydescribe = '';
var yearincomdescribe = '';
var worktimedescribe = '';
var functiondescribe = '';


function getNair(answerid){
    $.ajax({
        url: url,
        data: {
            answerid: answerid
        },
        success: function(data){
            if(JSON.parse(data).result){

                //气泡
                industrydescribe = JSON.parse(data).d.industrydescribe; //"高大上传统金融行业"
                yearincomdescribe = parseInt(JSON.parse(data).d.yearincomdescribe); //百分比
                worktimedescribe = JSON.parse(data).d.worktimedescribe; //"老腊肉"
                functiondescribe = JSON.parse(data).d.functiondescribe; //"企业发动机"



                $('#num').text(yearincomdescribe+'%');
                $('#bubble_1 span').text(industrydescribe);
                $('#bubble_2 span').text('完胜'+yearincomdescribe+'%');
                $('#bubble_3 span').text(worktimedescribe);
                $('#bubble_4 span').text(functiondescribe);
                if(yearincomdescribe < 40) {
                    $('#hint').text('（此刻内心受到一万点伤害>_<！）')
                }else {
                    $('#hint').text('（您没有拖金融行业薪资后腿哦！）');
                }
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    });

};



function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return '';
}

var answerid = GetQueryString('answerid') || localStorage.getItem('answerid');

console.log(GetQueryString('answerid'),localStorage.getItem('answerid'));

setTimeout(function(){getNair(answerid);},1000);


