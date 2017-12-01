/**
 * Created by lollipop on 2017/12/1
 */
$(document).ready(function(){
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
            // $(this).siblings('.nair-radio-inner').addClass('active');
            // $(this).parents("label").siblings("label").children(".nair-radio-inner").removeClass("active");
        });

    });
});