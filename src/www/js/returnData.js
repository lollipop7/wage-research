/**
 * Created by lollipop on 2017/11/27
 */
var dataGR = [50, 30, 20, 40, 60, 45];
var radarChart = {
    // 绘制图表。
   initRadar:function(){
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
                       }
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
                               name : '预算分配（Allocated Budget）'
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
