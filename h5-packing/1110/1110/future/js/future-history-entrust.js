function callback(e){pbE.SYS().stopLoading();var t=JSON.parse(e);if(6052==t.functionNO){var a=t.jData.data;sortEntrust(a),dataTime[171]==strThree&&dataTime[172]==strYesterday?dataThree=a:dataTime[171]==strWeek&&dataTime[172]==strYesterday?dataWeek=a:dataTime[171]==strMonth&&dataTime[172]==strYesterday?dataMonth=a:dataRandom=a,ReactDOM.render(React.createElement(EntrustContentsFutures,{contents:a,history:!0}),document.getElementById("contents"))}}function doShow(e){e||pbE.SYS().stopLoading()}function process(e){var t=e.historyEntrust.fields;t[0].isShow?$(".deal0").css("display","block"):$(".deal0").css("display","none"),t[1].isShow?$(".deal1").css("display","block"):$(".deal1").css("display","none"),t[2].isShow?$(".deal2").css("display","block"):$(".deal2").css("display","none"),t[3].isShow?$(".deal3").css("display","block"):$(".deal3").css("display","none")}var isApp="undefined"!=typeof pbE;"undefined"==typeof pbE?(window.pbE={WT:function(){var e={wtGeneralRequest:function(){var e={functionNO:6052,jData:{data:[{64:"50ETF",54:234,159:"10:10",129:111,112:0,117:0,130:222,156:3,63:12345,113:333,126:"否",163:""},{64:"50ETF",54:234,159:"13:00",129:110,112:1,117:0,130:220,156:4,63:12345,113:330,126:"否",163:"备注信息"},{64:"50ETF",54:234,159:"13:00",129:110,112:1,117:0,130:220,156:4,63:12345,113:330,126:"否"}]}};callback(JSON.stringify(e))}};return e},SYS:function(){var e={stopLoading:function(){},startLoading:function(){}};return e}},$("#goBack").click(function(){location.href=document.referrer})):$("#goBack").click(function(){location.href="goBack"});var dateYesterday=new Date,dateThree=new Date,dateWeek=new Date,dateMonth=new Date;dateYesterday=new Date(dateYesterday.getTime()-864e5),dateThree=new Date(dateThree.getTime()-2592e5),dateWeek=new Date(dateWeek.getTime()-6048e5),dateMonth=new Date(dateMonth.getTime()-2592e6);var strYesterday=dateYesterday.format("yyyyMMdd"),strThree=dateThree.format("yyyyMMdd"),strWeek=dateWeek.format("yyyyMMdd"),strMonth=dateMonth.format("yyyyMMdd"),TIMES={yesterday:strYesterday,three:strThree,week:strWeek,month:strMonth},dataTime={171:strThree,172:strYesterday};ReactDOM.render(React.createElement(NavHeader,{name:"历史委托"}),document.getElementById("nav-header")),ReactDOM.render(React.createElement(TimeTitle,{times:TIMES,entrust:!0,futures:!0}),document.getElementById("time-title")),ReactDOM.render(React.createElement(EntrustTitleFutures,null),document.getElementById("title"));var dataThree=null,dataWeek=null,dataMonth=null,dataRandom=null;pbE.SYS().startLoading(),pbE.WT().wtGeneralRequest(CID,6052,JSON.stringify(dataTime));var dateFrom=pikadayResponsive($("#date-from")[0],{format:"YYYY-MM-DD",outputFormat:"YYYYMMDD",placeholder:"起始日期"}),dateTo=pikadayResponsive($("#date-to")[0],{format:"YYYY-MM-DD",outputFormat:"YYYYMMDD",placeholder:"终止日期"});dateFrom.setDate(moment(strYesterday,"YYYYMMDD"),"YYYY-MM-DD"),dateTo.setDate(moment(strYesterday,"YYYYMMDD"),"YYYY-MM-DD"),$("#date-from").change(function(e){var t=0;clearTimeout(t),t=setTimeout(function(){$("#date-from").val()<=$("#date-to").val()?(dataTime={171:$("#date-from").val(),172:$("#date-to").val()},pbE.SYS().startLoading(),pbE.WT().wtGeneralRequest(CID,6052,JSON.stringify(dataTime))):alert("起始日期不得晚于终止日期")},2e3)}),$("#date-to").change(function(e){var t=0;clearTimeout(t),t=setTimeout(function(){$("#date-to").val()>=$("#date-from").val()&&$("#date-to").val()<=strYesterday?(dataTime={171:$("#date-from").val(),172:$("#date-to").val()},pbE.SYS().startLoading(),pbE.WT().wtGeneralRequest(CID,6052,JSON.stringify(dataTime))):$("#date-to").val()>strYesterday?alert("终止日期不得晚于昨天"):$("#date-to").val()<$("#date-from").val()&&alert("终止日期不得早于起始日期")},2e3)}),isApp?process(JSON.parse(pbE.SYS().readConfig("future/conf/future.json"))):$.get("../conf/future.json",process);