/**
 * Created by lollipop on 2017/12/1
 */
//Created by lollipop at 2017/11/21.
$('document').ready(function(){
    $('document').ready(function(){
        // //播放音乐
        // var audio = document.getElementById("audios");
        // audio.addEventListener("canplaythrough",
        //     function() {
        //         audio.play();
        //     },
        //     false);
        $('.nair-radio-input').click(function () {
            // console.log($(this).val());
            var _obj = this;
            bundle.addClassActive(_obj);
        });
        var radioGCGL = $('#que7').find("input[value=\'高层管理\']");
        var radioGG = $('#que6').find("input[value=\'高管\']");
        var que6Val,que7Val; //当前被选中的que6和que7的value
        $('#que6').on('click','.nair-radio-input',function (e) {
            que6Val = e.target.value;
            if('高管' == que6Val) {
                radioGCGL.parent('.label-container')
                    .siblings('.label-container')
                    .children('.nair-radio-input')
                    .attr('disabled', true)
                    .siblings('.nair-radio-inner').addClass('disabled');
                bundle.setChecked(radioGCGL);
                radioGCGL.attr('checked',true).siblings('.nair-radio-inner').removeClass('disabled').addClass('active');
            }else {
                radioGCGL.parent('.label-container')
                    .siblings('.label-container')
                    .children('.nair-radio-input')
                    .removeAttr('disabled')
                    .siblings('.nair-radio-inner').removeClass('disabled');
                radioGCGL.attr('disabled', true).siblings('.nair-radio-inner').removeClass('active').addClass('disabled');;
                if ('高管' != que6Val ) {
                    console.log(que7Val);
                    if ('高层管理' != que7Val && '' != que7Val && undefined != que7Val){
                        console.log('1...........其他情况下，高管组未选中高管，高层管理组未选中高层管理');
                        //删除高管disabled
                        radioGG.removeAttr('disabled').siblings('.nair-radio-inner').removeClass('disabled');
                        //删除高层管理disabled
                        radioGCGL.removeAttr('disabled').siblings('.nair-radio-inner').removeClass('disabled');
                        que6Val = '';
                        que7Val = '';
                    }

                }
            }
        });
        $('#que7').on('click','.nair-radio-input',function (e) {
            que7Val = e.target.value;
            if('高层管理' == que7Val) {
                radioGG.parent('.label-container')
                    .siblings('.label-container')
                    .children('.nair-radio-input')
                    .attr('disabled', true)
                    .siblings('.nair-radio-inner').addClass('disabled');
                bundle.setChecked(radioGG);
                radioGG.attr('checked',true).siblings('.nair-radio-inner').removeClass('disabled').addClass('active');
            }else {
                radioGG.parent('.label-container')
                    .siblings('.label-container')
                    .children('.nair-radio-input')
                    .removeAttr('disabled')
                    .siblings('.nair-radio-inner').removeClass('disabled');
                radioGG.attr('disabled', true).siblings('.nair-radio-inner').removeClass('active').addClass('disabled');
                if ('高层管理' != que7Val) {
                    console.log(que6Val);
                    if ( '高管' != que6Val && '' != que6Val && undefined != que6Val){
                        console.log('2..........其他情况下，高管组未选中高管，高层管理组未选中高层管理');
                        //删除高管disabled
                        radioGG.removeAttr('disabled').siblings('.nair-radio-inner').removeClass('disabled');
                        //删除高层管理disabled
                        radioGCGL.removeAttr('disabled').siblings('.nair-radio-inner').removeClass('disabled');
                        que6Val = '';
                        que7Val = '';
                    }

                }
            }
        })
    });

});