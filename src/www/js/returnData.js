/**
 * Created by lollipop on 2017/11/27
 */

var radarChart = {
    yearsalary: '',
    industrydescribe: '',
    yearincomdescribe: '',
    worktimedescribe: '',
    functiondescribe: '',
    otherdescribe: '',
    countlist: [],
    getNair: function(){
        var _thisNair = this;
        $.ajax({
            url: 'http://192.168.1.251:8080/vita/salary/result',
            data: {
                openid: "stranger"
            },
            success: function(data){
                console.log(JSON.parse(data));
                // return  JSON.parse(data);
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
                this.initRadar(countlist);
                $('#num').text(_thisNair.yearincomdescribe+'%');
                $('#salary').text(_thisNair.yearsalary);
                $('#bubble_1 span').text(_thisNair.industrydescribe);
                $('#bubble_2 span').text('完胜'+_thisNair.yearincomdescribe+'%');
                $('#bubble_3 span').text(_thisNair.worktimedescribe);
                $('#bubble_4 span').text(_thisNair.functiondescribe);
                $('#benefit').css({backgroundImage: 'url(./images/box7/'+_thisNair.otherdescribe+'.png)'});
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
        echarts.init(document.getElementById('main')).setOption({
            baseOption: {
                title: {
                    text: ''
                },
                tooltip: {},
                legend: {
                    data: []
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            fontSize: 20,
                            color: '#5192de',
                        },
                        formatter: (text) => {
                            text = text.replace(/\S{2}/g, function(match) {
                                // console.log(match)
                                return match + '\n'
                            })
                            return text
                        },
                    },
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
}



