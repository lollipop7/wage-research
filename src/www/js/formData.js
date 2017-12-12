//Created by lollipop at 2017/11/21.

var submitFormData = function () {
    //1
    var workyearinfinance = $("#workyearinfinance").val();
    if("" == workyearinfinance){
        bundle.openDialog('1.金融行业工作年限不能为空');
        return;
    }
    //2
    var industry = $("input[name='industry']:checked").val();
    console.log(industry)
    if("" == industry){
        bundle.openDialog('2.所处的行业不能为空');
        return;
    }
    //3
    var functions = $("input[name='functions']:checked").val();
    if("" == functions){
        bundle.openDialog('3.所处的部门/职能不能为空');
        return;
    }
    //4
    var positions = $("input[name='positions']:checked").val();
    if("" == positions){
        bundle.openDialog('4.所处的层级不能为空');
        return;
    }
    //5
    var monthsalary = $("#monthsalary").val();
    if("" == monthsalary){
        bundle.openDialog('5.月基本薪资（税前）不能为空');
        return;
    }
    //6
    var months = bundle.getMonths();
    if("" == parseInt(months)){
        bundle.openDialog('6.每年支付月薪月数不能为空');
        return;
    }
    //7
    var othermonths = bundle.getOthermonths();
    if("" == parseInt(othermonths)){
        bundle.openDialog('7.年目标浮动奖金/佣金不能为空');
        return;
    }
    //8
    var allowance = $('#allowance').val();
    if("" == allowance){
        bundle.openDialog('8.每年津贴总额不能为空');
        return;
    }
    //9
    var gains = $("input[name='gains']:checked").val();
    if("" == gains){
        bundle.openDialog('9.今年的薪酬涨幅比例不能为空');
        return;
    }

    //10
    var wefare = $('#wefare').val();
    if("" == wefare){
        bundle.openDialog('10.补充福利项目不能为空');
        return;
    }
    //11
    var hopgains = $("input[name='hopgains']:checked").val();
    if("" == hopgains){
        bundle.openDialog('11.理想薪酬涨幅不能为空');
        return;
    }

    /*
    var workyearinfinance = 2;
    var industry = '银行';
    var functions = '高管';
    var positions = '高层管理';
    var monthsalary = 90000;
    var months = 12;
    var othermonths = 5;
    var allowance = 15000;
    var gains = 20;
    var wefare = 0;
    var hopgains = 0;*/
    console.log(`
        问题1 workyearinfinance:${workyearinfinance},
        问题2 industry:${industry},
        问题3 functions:${functions},
        问题4 positions:${positions},
        问题5 monthsalary:${parseInt(monthsalary)},
        问题6 months:${parseInt(months)},
        问题7 othermonths:${parseInt(othermonths)},
        问题8 allowance:${parseInt(allowance)},
        问题9 gains:${((parseFloat(gains))/100).toFixed(2)},
        问题10 wefare:${parseInt(wefare)},
        问题11 hopgains:${(parseFloat(hopgains)/100).toFixed(2)},
    `)

    /*console.log(`
        问题9:${months},
        问题10:${othermonths},
    `)*/
    var formData = {
        workyearinfinance: workyearinfinance,
        industry: industry,
        functions: functions,
        positions: positions,
        monthsalary: parseInt(monthsalary),
        months: parseInt(months),
        othermonths: parseInt(othermonths),
        allowance: parseInt(allowance),
        gains: ((parseFloat(gains))/100).toFixed(2),
        wefare: parseInt(wefare),
        hopgains: (parseFloat(hopgains)/100).toFixed(2)
    };

    // var PR ="http://"+window.location.host+"/";
    // var url = PR + "vita/m/salary/count";
    // $.ajax({
    //     url: url,
    //     type: 'POST',
    //     data: formData,
    //     success: function (data) {
    //         if(JSON.parse(data).result) {
    //             bundle.openShareModal();
    //             $('#iknow').click(function () {
    //                 bundle.closeShareModal();
    //                 window.location.href = 'nair.html?answerid='+JSON.parse(data).d.answerid;
    //                 localStorage.setItem('answerid', JSON.parse(data).d.answerid);
    //             });
    //         }
    //     },
    //     error:function(XMLHttpRequest, textStatus, errorThrown) {
    //         console.log(XMLHttpRequest.status);
    //         console.log(XMLHttpRequest.readyState);
    //         console.log(textStatus);
    //     }
    // })

    count(formData);
}
