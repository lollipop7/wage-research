/**
 * Created by lollipop on 2017/12/1
 */
//Created by lollipop at 2017/11/21.
$('document').ready(function(){
    $('document').ready(function(){
        //播放音乐
        var audio = document.getElementById("audios");
        audio.addEventListener("canplaythrough",
            function() {
                audio.play();
            },
            false);
        $('.nair-radio-input').click(function () {
            console.log($(this).val());
            var _obj = this;
            bundle.addClassActive(_obj)
        });
    });
    //修复在iphone平台上微信上音乐不能自动播放
    document.getElementById('audios').play();
});