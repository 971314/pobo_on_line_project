define("futures/scripts/userInfo/opinoinFeedback.js",function(n,i,o){function t(){d&&(u=pbE.HQ(),f=pbE.SYS(),v=pbE.INFO())}function e(){$.bindEvent($(l+" .icon_back"),function(){window.location.href="goBack"}),$.bindEvent($(l+" #opinion_btn"),function(){if($.validatorUtils.isEmpty($(l+" #opinion").val()))return void alert("反馈内容不能为空");if($.validatorUtils.isEmpty($(l+" #contact").val()))return void alert("联系方式不能为空");if(!$.validatorUtils.isMobile($(l+" #contact").val()))return void alert("联系方式不正确");var n={mobile_no:pbE.SYS().getPublicData("mobile"),content:$(l+" #opinion").val(),contact:$(l+" #contact").val()};s.opinion(n,function(n){0==n.error_no?($("input").val(""),$(" #opinion").val(""),setTimeout(function(){window.location.href="goBack"},"100"),alert("谢谢你的意见")):alert("提交失败，请重试")})})}function a(){}function c(){}function r(){}var l="#userInfo_opinoinFeedback ";n("validatorUtils");var u,f,v,s=n("futures/services/userService").getInstance(),d="undefined"!=typeof pbE,p={init:t,bindPageEvent:e,destroy:a,pageBack:c,load:r};o.exports=p});