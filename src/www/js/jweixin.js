//Created by lollipop at 2017/11/21.
//微信JSSDK https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115


function abc() {
    $.ajax({
        url: 'http://www.51jrq.com/weixin/token',
        data: {
            location: window.location.href
        },
        success: function(data){
            var d = eval("("+data+")");
            d.jsApiList = ['onMenuShareTimeline',
                'onMenuShareAppMessage',
                'getNetworkType',
                'previewImage',
                'playVoice',
                'checkJsApi'];
            wx.config(d);
        },
        error: function(xhr, type){
            // alert(xhr);
        }
    });
};
abc();

wx.ready(function(){

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    //修复在iphone平台上微信上音乐不能自动播放
    document.getElementById('audios').play();
    //判断当前客户端版本是否支持指定JS接口
    wx.checkJsApi({

        jsApiList: [// 需要检测的JS接口列表，所有JS接口列表见附录2,
            'getNetworkType',
            'previewImage'
        ],

        success: function(res) {

            // 以键值对的形式返回，可用的api值true，不可用为false

            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}

        }

    });
    //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({

        title: '别人眼中金融高薪的你，收入水平达标了吗？一分钟给你薪酬竞争力分析报告', // 分享标题

        link: 'http://www.51jrq.com/wx/xcbg/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

        imgUrl: 'http://www.51jrq.com/wx/xcbg/images/header.png', // 分享图标

        success: function () {

        },

        cancel: function () {

            // 用户取消分享后执行的回调函数

        }

    });
    //获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({

        title: '别人眼中金融高薪的你，收入水平达标了吗？一分钟给你薪酬竞争力分析报告', // 分享标题

        desc: '51金融圈将以严谨的职业态度对您提交的数据资料严格保密。此问卷仅在本次调研活动中做分析依据使用，请放心作答。', // 分享描述

        link: 'http://www.51jrq.com/wx/xcbg/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

        imgUrl: 'http://www.51jrq.com/wx/xcbg/images/header.png', // 分享图标

        type: '', // 分享类型,music、video或link，不填默认为link

        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

        success: function () {

        },

        cancel: function () {

            // 用户取消分享后执行的回调函数

        }

    });
});


wx.error(function(res){

    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

});