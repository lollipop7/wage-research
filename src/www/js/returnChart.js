/**
 * Created by lollipop on 2017/12/7
 */
/**
 * Created by lollipop on 2017/11/27
 */
var PR ="http://"+window.location.host+"/";
var url = PR + "vita/m/salary/result";
var radarChart = {
    yearsalary: '',
    industrydescribe: '',
    yearincomdescribe: '',
    worktimedescribe: '',
    functiondescribe: '',
    otherdescribe: '',
    countlist: [],
    getNair: function(answerid){
        console.log(answerid);
        var _thisNair = this;
        $.ajax({
            url: url,
            data: {
                answerid: answerid
            },
            success: function(data){
                console.log(JSON.parse(data));
                if(JSON.parse(data).result){
                    _thisNair.yearsalary = JSON.parse(data).d.yearsalary;

                    //气泡
                    _thisNair.industrydescribe = JSON.parse(data).d.industrydescribe; //"高大上传统金融行业"
                    _thisNair.yearincomdescribe = parseInt(JSON.parse(data).d.yearincomdescribe); //百分比
                    _thisNair.worktimedescribe = JSON.parse(data).d.worktimedescribe; //"老腊肉"
                    _thisNair.functiondescribe = JSON.parse(data).d.functiondescribe; //"企业发动机"

                    //lemons下面的话
                    _thisNair.otherdescribe = JSON.parse(data).d.otherdescribe; //4

                    //展示radarChart
                    _thisNair.countlist= JSON.parse(data).d.countlist; //雷达图数据值
                    for ( var i = 0; i < _thisNair.countlist.length; i++) {
                        if(_thisNair.countlist[i] > 100) {
                            _thisNair.countlist[i] = 100;
                        }
                    }
                    _thisNair.initRadar(_thisNair.countlist);

                    $('#num').text(_thisNair.yearincomdescribe+'%');
                    $('#salary').text(_thisNair.yearsalary);
                    $('#bubble_1 span').text(_thisNair.industrydescribe);
                    $('#bubble_2 span').text('完胜'+_thisNair.yearincomdescribe+'%');
                    $('#bubble_3 span').text(_thisNair.worktimedescribe);
                    $('#bubble_4 span').text(_thisNair.functiondescribe);
                    $('#benefit').css({backgroundImage: 'url(./images/box7/'+_thisNair.otherdescribe+'.png)'});
                    if(_thisNair.yearincomdescribe < 40) {
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

    },
    // 绘制图表。
    initRadar:function(dataGR){
        var myChart = echarts.init(document.getElementById('main')).setOption({
            baseOption: {
                title: { text:null }, // 隐藏图表标题
                legend: { enabled: false }, // 隐藏图例
                tooltip : {
                    trigger: 'axis'
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#5192de',
                        },
                        formatter: (text) => {
                            text = text.replace(/\S{3}/g, function(match) {
                                // console.log(match)
                                return match + '\n'
                            })
                            return text
                        },
                    },
                    center:['50%','50%'], // 图的位置
                    indicator: [
                        { name: '月基本薪资', max: 100},
                        { name: '年现金津贴', max: 100},
                        { name: '年薪月数', max: 100},
                        { name: '补充福利', max: 100},
                        { name: '薪酬涨幅', max: 100},
                    ],
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: [
                                'rgba(81, 146, 222, 0.1)', 'rgba(81, 146, 222, 0.2)',
                                'rgba(81, 146, 222, 0.4)', 'rgba(81, 146, 222, 0.6)',
                                'rgba(81, 146, 222, 0.8)', 'rgba(81, 146, 222, 1)'
                            ].reverse()
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(81, 146, 222, 0.4)'
                        }
                    }
                },
                series: [
                    {
                        name: '预算',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data : [
                            {
                                value : dataGR,
                                name : '年收入分布'
                            }
                        ],
                        itemStyle: {
                            normal: {
                                color: 'rgba(81, 146, 222, 1)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                opacity: 0.1
                            }
                        }
                    }
                ]
            }

        });
    }
};



function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return '';
}

var answerid = GetQueryString('answerid') || localStorage.getItem('answerid');

setTimeout(function(){radarChart.getNair(answerid);},1000);




$(window).resize(function() {//这是能够让图表自适应的代码
    myChart.resize();
});





