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
                    //薪资
                    _thisNair.yearsalary = JSON.parse(data).d.yearsalary;

                    //展示radarChart
                    _thisNair.countlist= JSON.parse(data).d.countlist; //雷达图数据值
                    for ( var i = 0; i < _thisNair.countlist.length; i++) {
                        if(_thisNair.countlist[i] > 100) {
                            _thisNair.countlist[i] = 100;
                        }
                    }
                    _thisNair.initRadar(_thisNair.countlist);

                    //#benefit
                    _thisNair.otherdescribe = JSON.parse(data).d.otherdescribe; //4


                    _thisNair.yearincomdescribe = parseInt(JSON.parse(data).d.yearincomdescribe);

                    _thisNair.industrydescribe = JSON.parse(data).d.industrydescribe;
                    _thisNair.functiondescribe = JSON.parse(data).d.functiondescribe;
                    _thisNair.worktimedescribe = JSON.parse(data).d.worktimedescribe;

                    $('#salary').text(_thisNair.yearsalary);
                    $('#benefit').css({backgroundImage: 'url(./images/box4/'+_thisNair.otherdescribe+'.png)'});


                    $('#num').text(_thisNair.yearincomdescribe+'%');


                    if(_thisNair.yearincomdescribe < 40) {
                        $('#hint').text('此刻内心受到一万点伤害>_<！')
                        $('#txt1').text('但是薪酬貌似不是很高！')
                        $('#txt2').text('该请老板涨工资了！')
                    }else {
                        $('#hint').text('您没有拖金融行业薪资后腿哦！');
                        $('#txt1').text('可谓是企业不可或缺的人才！')
                        $('#txt2').text('我们做朋友可好?')
                    }

                    //整体评测
                    $('#industrydescribe').text(_thisNair.industrydescribe);
                    $('#functiondescribe').text(_thisNair.functiondescribe);
                    $('#worktimedescribe').text(_thisNair.worktimedescribe);
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
                            color: '#74edf8',
                            fontSize: '16px'
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
                                'rgba(116, 237, 248, 0.1)', 'rgba(116, 237, 248, 0.2)',
                                'rgba(116, 237, 248, 0.4)', 'rgba(116, 237, 248, 0.6)',
                                'rgba(116, 237, 248, 0.8)', 'rgba(116, 237, 248, 1)'
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
                                color: 'rgba(116, 237, 248, 1)'
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

radarChart.getNair(answerid);


$(window).resize(function() {//这是能够让图表自适应的代码
    myChart.resize();
});

$('.announce').click(function () {
    window.location.href = 'http://www.51jrq.com'
})





