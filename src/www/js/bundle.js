//Created by lollipop at 2017/11/21.
$('document').ready(function(){
    bundle.init();
    $('.nair-radio-input').click(function () {
        $(this).siblings('.nair-radio-inner').addClass('active');
        $(this).parents("label").siblings("label").children(".nair-radio-inner").removeClass("active");
    })
});
var bundle = {
    init: function() {
        //设置swiper-container的高度
        this.setContainerHeight();
        //预加载图片
        this.preloadImage();
    },
    //设置swiper容器的高度
    setContainerHeight: function(){
        $('.swiper-container').css({
            height: $(window).height()
        })
    },
    //实例化swiper
    initSwiper: function(){
        var swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            pagination: '.swiper-pagination',
            hashnav:true,
            // mousewheelControl : true,
            nextButton:'.little-box',
            autoHeight: true, //高度随内容变化
            onInit: function(swiper){//初始化之后执行
                swiperAnimateCache(swiper);//隐藏动画元素
                swiperAnimate(swiper);//初始化完成开始动画
            },
            onSlideChangeEnd: function(swiper){
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            },
            longSwipesMs : 1000, //定义longSwipes的时间（单位ms），超过则属于longSwipes
            watchSlidesProgress: true, //开启这个参数来计算每个slide的progress(进度)，Swiper的progress无需设置即开启。
            onProgress: function(swiper) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slide = swiper.slides[i];
                    var progress = slide.progress;
                    var translate, boxShadow;
                    translate = progress * swiper.height * 0.8;
                    scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
                    boxShadowOpacity = 0;
                    slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';
                    if (i == swiper.myactive) {
                        es = slide.style;
                        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
                        es.zIndex=0;
                    }else{
                        es = slide.style;
                        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform ='';
                        es.zIndex=1;
                    }
                }
            },
            onTransitionEnd: function(swiper){//回调函数，过渡结束时触发，接收Swiper实例作为参数。
                swiperAnimate(swiper);
            },
            onSetTransition: function(swiper, speed) {//回调函数，每次当Swiper开始过渡动画时持续执行。transtion获取到的是Swiper的speed值。
                for (var i = 0; i < swiper.slides.length; i++) {
                    es = swiper.slides[i].style;
                    es.webkitTransitionDuration =
                    es.MsTransitionDuration =
                    es.msTransitionDuration =
                    es.MozTransitionDuration =
                    es.OTransitionDuration =
                    es.transitionDuration = speed + 'ms';
                }
            }
        });
        var startScroll, touchStart, touchCurrent;
        swiper.slides.on('touchstart', function (e) {
            startScroll = this.scrollTop;
            touchStart = e.targetTouches[0].pageY;
        }, true);
        swiper.slides.on('touchmove', function (e) {
            touchCurrent = e.targetTouches[0].pageY;
            var touchesDiff = touchCurrent - touchStart;
            var slide = this;
            var onlyScrolling =
                ( slide.scrollHeight > slide.offsetHeight ) && //allow only when slide is scrollable
                (
                    ( touchesDiff < 0 && startScroll === 0 ) || //start from top edge to scroll bottom
                    ( touchesDiff > 0 && startScroll === ( slide.scrollHeight - slide.offsetHeight ) ) || //start from bottom edge to scroll top
                    ( startScroll > 0 && startScroll < ( slide.scrollHeight - slide.offsetHeight ) ) //start from the middle
                );
            if (onlyScrolling) {
                e.stopPropagation();
            }
        }, true);
    },
    //预加载图片
    preloadImage: function(){
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