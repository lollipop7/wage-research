//Created by lollipop at 2017/11/21.
var submitFormData = function () {
    //1
    var workyears = $('#workyears').val();
    if("" == workyears){
        bundle.openDialog('总工作年限不能为空');
        return;
    }
    //2
    var workyearinfinance = $("#workyearinfinance").val();
    if("" == workyearinfinance){
        bundle.openDialog('金融行业工作年限不能为空');
        return;
    }
    //3
    var industry = $("input[name='industry']:checked").val();
    if("" == industry){
        bundle.openDialog('所处的行业不能为空');
        return;
    }
    //4
    var companynature = $("input[name='companynature']:checked").val();
    if("" == companynature){
        bundle.openDialog('企业性质不能为空');
        return;
    }
    //5
    var company =  $('#company').val();
    //6
    var functions = $("input[name='functions']:checked").val();
    if("" == functions){
        bundle.openDialog('所处的部门/职能不能为空');
        return;
    }
    //7
    var positions = $("input[name='positions']:checked").val();
    if("" == positions){
        bundle.openDialog('所处的层级不能为空');
        return;
    }
    //8
    var monthsalary = $("#monthsalary").val();
    if("" == monthsalary){
        bundle.openDialog('月基本薪资（税前）不能为空');
        return;
    }
    //9
    var months = bundle.getMonths();
    if("" == parseInt(months)){
        bundle.openDialog('每年支付月薪月数不能为空');
        return;
    }
    //10
    var othermonths = bundle.getOthermonths();
    if("" == parseInt(othermonths)){
        bundle.openDialog('年目标浮动奖金/佣金不能为空');
        return;
    }
    //11
    var allowance = $('#allowance').val();
    if("" == allowance){
        bundle.openDialog('每年津贴总额不能为空');
        return;
    }
    //12
    var gains = $("input[name='gains']:checked").val();
    if("" == gains){
        bundle.openDialog('今年的薪酬涨幅比例不能为空');
        return;
    }
    //13
    var morethanbefore = $("input[name='morethanbefore']:checked").val();
    if("" == morethanbefore){
        bundle.openDialog('薪酬涨幅比例是否有提高不能为空');
        return;
    }
    //14
    var wefare = $('#wefare').val();
    if("" == wefare){
        bundle.openDialog('补充福利项目不能为空');
        return;
    }
    //15
    var jobchange = $("input[name='jobchange']:checked").val();
    if("" == jobchange){
        bundle.openDialog('是否有跳槽的打算不能为空');
        return;
    }
    if (jobchange == 1){
        //16
        var hopindustry = $("input[name='hopindustry']:checked").val();
        if("" == hopindustry){
            bundle.openDialog('期望的行业不能为空');
            return;
        }
        //17
        var hopgains = $("input[name='hopgains']:checked").val();
        if("" == hopgains){
            bundle.openDialog('理想薪酬涨幅不能为空');
            return;
        }
    }

    console.log(`
        问题1:${workyears},
        问题2:${workyearinfinance},
        问题3:${industry},
        问题4:${companynature},
        问题5:${company},
        问题6:${functions},
        问题7:${positions},
        问题8:${monthsalary},
        问题9:${months},
        问题10:${othermonths},
        问题11:${allowance},
        问题12:${gains},
        问题13:${morethanbefore},
        问题14:${wefare},
        问题15:${jobchange},
        问题16:${hopindustry},
        问题17:${hopgains},
    `)
    $('#submit').click(function () {
        $('.share_modal').css({opacity: 1});
        bundle.openShareModal();
    });
    /*console.log(`
        问题9:${months},
        问题10:${othermonths},
    `)*/
    /*$.ajax({
        url: '',
        type: '',
        data: {
            workyears: workyears,
            workyearinfinance: workyearinfinance,
            industry: industry,
            companynature: companynature,
            company: company,
            functions: functions,
            positions: positions,
            monthsalary: monthsalary,
            months: months,
            othermonths: othermonths,
            allowance: allowance,
            gains: gains,
            morethanbefore: morethanbefore,
            wefare: wefare,
            jobchange: jobchange,
            hopindustry: hopindustry,
            hopgains: hopgains
        },
        success: function (data) {
            
        }
    })*/
}