//Created by lollipop at 2017/11/21.
$('document').ready(function(){
    bundle.init();
});
var bundle = {
    init: function() {
        //设置swiper-container的高度
        this.setContainerHeight();
        //预加载图片
        this.preloadImage();
    },
    //实例化swiper
    initSwiper: function(){
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            pagination: '.swiper-pagination',
            hasnav: true,
            height: $(window).height(),
            // onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            //     swiperAnimateCache(swiper); //隐藏动画元素
            //     swiperAnimate(swiper); //初始化完成开始动画
            // },
            // onSlideChangeEnd: function(swiper){
            //     swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            // },
            // longSwipesMs : 1000,
            // watchSlidesProgress: true,
            // onProgress: function(swiper) {
            //     for (var i = 0; i < swiper.slides.length; i++) {
            //         var slide = swiper.slides[i];
            //         var progress = slide.progress;
            //         var translate, boxShadow;
            //         translate = progress * swiper.height * 0.8;
            //         scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
            //         boxShadowOpacity = 0;
            //         slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';
            //         if (i == swiper.myactive) {
            //             es = slide.style;
            //             es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
            //             es.zIndex=0;
            //         }else{
            //             es = slide.style;
            //             es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform ='';
            //             es.zIndex=1;
            //         }
            //     }
            // },
            // onTransitionEnd: function(swiper, speed) {
            //     swiper.myactive = swiper.activeIndex;
            // },
            // onSetTransition: function(swiper, speed) {
            //     for (var i = 0; i < swiper.slides.length; i++) {
            //         es = swiper.slides[i].style;
            //         es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
            //     }
            // }
        })
    },
    //设置swiper容器的高度
    setContainerHeight: function(){
        $('.swiper-container').css({
            height: $(window).height()
        })
    },
    //预加载图片
    preloadImage: function(){
        console.log('开始加载图片')
        var imgList = [];
        var pattern = /http:\/\/(\w|\W){1,}.(png|gif|jpg)/g;
        $('.preload').each(function(index,item){
            var str = $(item).css('background-image');
            imgList.push(str.match(pattern)[0])
        });
        $('img').each(function(index,item){
            imgList.push(item.src);
        })
        var totalCount = imgList.length;
        console.log(imgList)
        var count = 0;
        //bind event
        var loadedAllImg = this.loadedAllImg.bind(this);
        var loadImgProgress = this.loadImgProgress.bind(this);
        $.each(imgList,function(index, item){
            //创建一个img对象
            var img = new Image();
            img.src = item;
            if(!img.complete){
                img.onload = function(){
                    ++count;
                    loadImgProgress(count,totalCount);
                    if(totalCount == count){
                        loadedAllImg();
                    }
                }
            }else {
                ++count;
                loadImgProgress(count,totalCount);
                if(totalCount == count) {
                    loadedAllImg();
                }
            }
        })
    },
    //更改进度条
    loadImgProgress: function(currentNum, totalNum){
        $('.loading-container .number').text(Math.floor(currentNum/totalNum*100)+`%`);
    },
    //图片加载全部后的完成事件
    loadedAllImg: function(){
        this.loadImgProgress(1,1);
        setTimeout(function(){
            $('.loading-container').css({
                display: 'none'
            });
            $('.wrapper').css({
                display: 'block'
            });
            //初始化swiper
            this.initSwiper();
        }.bind(this), 200);
    }
};