/**
 * Created by lollipop on 2017/11/27
 */

$.ajax({
    url: 'http://192.168.1.251:8080/vita/salary/result',
    data: {
        openid: "stranger"
    },
    success: function(data){
        console.log(JSON.parse(data));
        //展示radarChart
        var countlist= JSON.parse(data).d.countlist;
        var yearincomdescribe = JSON.parse(data).d.yearincomdescribe; //您的年收入为500.0还有很大的上升空间
        var worktimedescribe = JSON.parse(data).d.worktimedescribe; //"老腊肉"
        var otherdescribe = JSON.parse(data).d.otherdescribe; //"涨那么多？茅台当水喝!"
        var industrydescribe = JSON.parse(data).d.industrydescribe; //"高大上传统金融行业"
        var functiondescribe = JSON.parse(data).d.functiondescribe; //"企业发动机"
        for ( var i = 0; i < countlist.length; i++) {
            if(countlist[i] > 100) {
                countlist[i] = 100;
            }
        }
        radarChart.initRadar(countlist);
        // $('#salary').text(yearincomdescribe);
        $('#bubble_1 span').text(industrydescribe);
        // $('#bubble_2 span').text(worktimedescribe);
        $('#bubble_3 span').text(worktimedescribe);
        $('#bubble_4 span').text(functiondescribe);
    },
    error:function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.status);
        console.log(XMLHttpRequest.readyState);
        console.log(textStatus);
    }
});

var radarChart = {
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
// radarChart.initRadar();