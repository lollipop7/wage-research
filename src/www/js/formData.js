//Created by lollipop at 2017/11/21.

var submitFormData = function () {
    //1
    var workyears = $('#workyears').val();
    if("" == workyears){
        bundle.openDialog('1.总工作年限不能为空');
        return;
    }
    //2
    var workyearinfinance = $("#workyearinfinance").val();
    if("" == workyearinfinance){
        bundle.openDialog('2.金融行业工作年限不能为空');
        return;
    }
    //3
    var industry = $("input[name='industry']:checked").val();
    console.log(industry)
    if("" == industry){
        bundle.openDialog('3.所处的行业不能为空');
        return;
    }
    //4
    var companynature = $("input[name='companynature']:checked").val();
    if("" == companynature){
        bundle.openDialog('4.企业性质不能为空');
        return;
    }
    //5
    var company =  $('#company').val();
    //6
    var functions = $("input[name='functions']:checked").val();
    if("" == functions){
        bundle.openDialog('6.所处的部门/职能不能为空');
        return;
    }
    //7
    var positions = $("input[name='positions']:checked").val();
    if("" == positions){
        bundle.openDialog('7.所处的层级不能为空');
        return;
    }
    //8
    var monthsalary = $("#monthsalary").val();
    if("" == monthsalary){
        bundle.openDialog('8.月基本薪资（税前）不能为空');
        return;
    }
    //9
    var months = bundle.getMonths();
    if("" == parseInt(months)){
        bundle.openDialog('9.每年支付月薪月数不能为空');
        return;
    }
    //10
    var othermonths = bundle.getOthermonths();
    if("" == parseInt(othermonths)){
        bundle.openDialog('10.年目标浮动奖金/佣金不能为空');
        return;
    }
    //11
    var allowance = $('#allowance').val();
    if("" == allowance){
        bundle.openDialog('11.每年津贴总额不能为空');
        return;
    }
    //12
    var gains = $("input[name='gains']:checked").val();
    if("" == gains){
        bundle.openDialog('12.今年的薪酬涨幅比例不能为空');
        return;
    }
    //13
    var morethanbefore = $("input[name='morethanbefore']:checked").val();
    if("" == morethanbefore){
        bundle.openDialog('13.薪酬涨幅比例是否有提高不能为空');
        return;
    }
    //14
    var wefare = $('#wefare').val();
    if("" == wefare){
        bundle.openDialog('14.补充福利项目不能为空');
        return;
    }
    //15
    var jobchange = $("input[name='jobchange']:checked").val();
    var hopindustry = $("input[name='hopindustry']:checked").val();
    var hopgains = $("input[name='hopgains']:checked").val();
    if("" == jobchange){
        bundle.openDialog('15.是否有跳槽的打算不能为空');
        return;
    }
    if (jobchange == 1){
        //16
        if("" == hopindustry){
            bundle.openDialog('16.期望的行业不能为空');
            return;
        }
        //17
        if("" == hopgains){
            bundle.openDialog('17.理想薪酬涨幅不能为空');
            return;
        }
    }else {
        hopindustry = '无';
        hopgains = 0;
    }
    /*var workyears = 2;
    var workyearinfinance = 2;
    var industry = '银行';
    var companynature = '外商独资';
    var company = '';
    var functions = '高管';
    var positions = '高层管理';
    var monthsalary = 90000;
    var months = 12;
    var othermonths = 5;
    var allowance = 15000;
    var gains = 20;
    var morethanbefore = 1;
    var wefare = 0;
    var jobchange = 0;
    var hopindustry = 0;
    var hopgains = 0;*/
    console.log(`
        问题1 workyears:${workyears},
        问题2 workyearinfinance:${workyearinfinance},
        问题3 industry:${industry},
        问题4 companynature:${companynature},
        问题5 company:${company},
        问题6 functions:${functions},
        问题7 positions:${positions},
        问题8 monthsalary:${parseInt(monthsalary)},
        问题9 months:${parseInt(months)},
        问题10 othermonths:${parseInt(othermonths)},
        问题11 allowance:${parseInt(allowance)},
        问题12 gains:${((parseFloat(gains))/100).toFixed(2)},
        问题13 morethanbefore:${morethanbefore},
        问题14 wefare:${parseInt(wefare)},
        问题15 jobchange:${jobchange},
        问题16 hopindustry:${hopindustry},
        问题17 hopgains:${(parseFloat(hopgains)/100).toFixed(2)},
    `)

    /*console.log(`
        问题9:${months},
        问题10:${othermonths},
    `)*/
    var formData = {
        workyears: workyears,
        workyearinfinance: workyearinfinance,
        industry: industry,
        companynature: companynature,
        company: company,
        functions: functions,
        positions: positions,
        monthsalary: parseInt(monthsalary),
        months: parseInt(months),
        othermonths: parseInt(othermonths),
        allowance: parseInt(allowance),
        gains: ((parseFloat(gains))/100).toFixed(2),
        morethanbefore: morethanbefore,
        wefare: parseInt(wefare),
        jobchange: jobchange,
        hopindustry: hopindustry,
        hopgains: (parseFloat(hopgains)/100).toFixed(2)
    };

    var PR ="http://"+window.location.host+"/";
    var url = PR + "vita/m/salary/count";
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        success: function (data) {
            if(JSON.parse(data).result) {
                bundle.openShareModal();
                $('#iknow').click(function () {
                    bundle.closeShareModal();
                    window.location.href = 'nair.html?answerid='+JSON.parse(data).d.answerid;
                    localStorage.setItem('answerid', JSON.parse(data).d.answerid);

                    // var params = new Array();
                    // params[0] = new Array(JSON.parse(data).d.answerid);
                    // var popwin = window.open(PR +'wx/xcbg/nair.html', '_blank');
                    // popwin.onload = function(e){
                    //     popwin.postMessage(params, PR);
                    // }
                    // window.addEventListener('message', function(e){
                    //     console.log(e);
                    // })
                    // popwin.onunload = function(e){
                    //     alert(e.returnValue);
                    // }
                });
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    })
}
