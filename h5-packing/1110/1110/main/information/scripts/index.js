define("information/scripts/index.js",function(require,exports,module){function init(){window.callback=function(e){return callbackMsg(e)},isPoboApp&&(pbHQ=pbE.HQ(),pbSYS=pbE.SYS(),pbZX=pbE.ZX(),pbINFO=pbE.INFO());var e=JSON.parse(pbSYS.getDeviceJsonInfo());for(var a in e)72==a&&(token=e[a]);if($.validatorUtils.isNotEmpty($.getPageParam("ids"))&&"10401"==$.getPageParam("ids")){$(" #pobo_zx").css("display","none"),$(pageId+" #container_yourname").css("display","block"),Pcategory_id=$.getPageParam("Pcategory_id"),category_id=$.getPageParam("category_id"),$(pageId+" .parentMenu li").removeClass("active"),$(pageId+" .sub_tabnav li").removeClass("active"),"noticeIndex"==Pcategory_id||"researchReport"==Pcategory_id||"outerDiscPrice"==Pcategory_id?($(pageId+" .sub_tabnav").css("display","none"),$(pageId+" #"+Pcategory_id).addClass("active")):($(pageId+" #"+Pcategory_id).addClass("active"),$(pageId+" #"+category_id).parents().parent().css("display","block"),$(pageId+" #"+category_id).addClass("active"));var i={category_id:category_id,token:token,pageNum:pageNum,pageSize:pageSize};queryAnnouncement(i,!0)}else $(" #pobo_zx").css("display","none"),$(pageId+" #container_yourname").css("display","block"),$(pageId+" .sub_tabnav li").removeClass("active"),$(pageId+" .parentMenu li").removeClass("active"),$(pageId+" #FuturesNews").addClass("active"),$(pageId+" #FuturesNewsMenu").css("display","block"),"10101"==$.getPageParam("ids")||null==$.getPageParam("ids")?$(pageId+" #FuturesNewsMenu ul li:eq(0)").addClass("active"):"10301"==$.getPageParam("ids")?$(pageId+" #FuturesNewsMenu ul li:eq(1)").addClass("active"):$(pageId+" #FuturesNewsMenu ul li:eq(2)").addClass("active"),queryNews()}function queryNews(e){$(" #pobo_zx").css("display","block"),$(pageId+" #container_yourname").css("display","none");var a={count:10,ids:"",name:""};if($.validatorUtils.isNotEmpty(e)?a=e:$.validatorUtils.isNotEmpty($.getPageParam("ids"))&&"10401"!=$.getPageParam("ids")?"10101"==$.getPageParam("ids")?($(pageId+" .parentMenu li").removeClass("active"),$(pageId+" .parentMenu").find("li").eq(0).addClass("active"),a={count:10,ids:titleNo[0],name:"今日要闻"}):"10301"==$.getPageParam("ids")?($(pageId+" .parentMenu li").removeClass("active"),$(pageId+" .parentMenu").find("li").eq(1).addClass("active"),a={count:10,ids:titleNo[1],name:"金融财经"}):"10401"==$.getPageParam("ids")?($(pageId+" .parentMenu li").removeClass("active"),$(pageId+" .parentMenu").find("li").eq(3).addClass("active"),queryAnnouncement()):($(pageId+" .parentMenu li").removeClass("active"),$(pageId+" .parentMenu").find("li").eq(2).addClass("active"),a={count:10,ids:titleNo[2],name:"稀贵金属"}):a={count:10,ids:titleNo[0],name:"今日要闻"},url_ids=a.ids,isPoboApp)pbINFO.infoQueryListWithJson(JSON.stringify({type:"mu",groupIDs:a.ids,doc:"json",count:a.count}));else{for(var i={gcount:a.ids.length,count:a.count},t=0;t<i.gcount;t++)i["group"+(t+1)]=a.ids[t];$.get(mainConfig.news.webservice,i,function(e){newsData[newsCurrent]=JSON.parse(e).Indexes.slice(0,a.count)})}}function callbackMsg(message){if(eval("newsList="+message),htmls="","90004"==newsList.moduleId){var newsLists=newsList.jData.Indexes;$.each(newsLists,function(e,a){var i=common.timeBucket(a.Pubtime);htmls+="<li id='"+a.ID+"' href='pobo:uncheck=1&pageId=900005&url=main/information/views/details.html?newsid="+a.ID+"&url_ids="+url_ids[0]+"'><p>"+a.Title+"</p><span class='time'>"+i+"</span></li>"}),$(pageId+" #pobo_zx").html(htmls),initVIscroll(),$(".visc_pullDown").hide(),$(".visc_pullUp").hide()}}function queryAnnouncement(e,a){$(" #pobo_zx").css("display","none"),$(pageId+" #container_yourname").css("display","block"),$(".visc_pullDown").css("display","none;"),$(".visc_pullUp").css("display","none;");var i=e;informationService.getAnnouncement(i,function(e){if(0==e.error_no){totalRows=e.results[0].totalRows;var t="",n=e.results[0].data;$.each(n,function(){var e=common.timeBucket(this.news_date);t+="<li id='"+this.id+"' href='pobo:uncheck=1&pageId=900005&url=main/information/views/details.html?newsid="+this.id+"&url_ids="+titleNo[3]+"&Pcategory_id="+i.Pcategory_id+"&category_id="+i.category_id+"'><p>"+this.news_title+"</p><span class='time'>"+e+"</span></li>"}),a?$(pageId+" #container_yourname #zx").html(t):$(pageId+" #container_yourname #zx").append(t),initVIscroll(),$(".visc_pullDown").hide(),$(".visc_pullUp").hide()}else $.alert("公告获取异常:"+e.error_info)},{isShowWait:!1})}function initVIscroll(){if(show_height=$(window).height()-$(pageId+" .header").height(),console.log(show_height),myVIscroll){show_height=$(window).height()-$(pageId+" .header").height();var e={isPagingType:!1,visibleHeight:show_height};myVIscroll.refresh(e)}else{var e={isPagingType:!1,visibleHeight:show_height,container:$(pageId+" #container_yourname"),wrapper:$(pageId+" #wrapper_yourname1"),downHandle:function(){isInit=!0,pageNum=1;var e={category_id:category_id,token:"1111",pageNum:pageNum,pageSize:pageSize};queryAnnouncement(e,isInit)},upHandle:function(){if(isInit=!1,pageNum<totalRows){pageNum+=1;var e={category_id:category_id,token:"1111",pageNum:pageNum,pageSize:pageSize};queryAnnouncement(e,isInit)}else $(pageId+".visc_pullUp").hide()}};myVIscroll=new VIscroll(e)}}function bindPageEvent(){$.bindEvent($(pageId+" .icon_back"),function(){window.location.href="goBack"}),$.bindEvent($(pageId+" #search_btn"),function(){alert("搜索")}),$.bindEvent($(pageId+" .parentMenu li"),function(){$(pageId+" .parentMenu li").removeClass("active"),$(this).addClass("active");var e;"0"==$(this).index()?($(pageId+" .sub_tabnav").css("display","none"),$(pageId+" #FuturesNewsMenu").css("display","block"),$("#FuturesNewsMenu li:eq(0)").addClass("active"),queryNews(e)):"2"==$(this).index()?(Pcategory_id="deposit",category_id="depositSun",e={Pcategory_id:"deposit",category_id:"depositSun",token:token,pageNum:1,pageSize:pageSize},$(pageId+" .sub_tabnav").css("display","none"),$(pageId+" #depositMenu").css("display","block"),console.log($("#depositMenu").attr("id")),console.log($("#depositMenu ul li:eq(0)").attr("id")),$("#depositMenu li:eq(0)").addClass("active"),queryAnnouncement(e,!0)):"4"==$(this).index()?(Pcategory_id="futuresMReview",category_id="discMiddle",e={Pcategory_id:"futuresMReview",category_id:"discMiddle",token:token,pageNum:1,pageSize:pageSize},$(pageId+" .sub_tabnav").css("display","none"),$(" #futuresMReviewMenu").css("display","block"),$(pageId+" .sub_tabnav li").removeClass("active"),$("#futuresMReviewMenu li:eq(0)").addClass("active"),queryAnnouncement(e,!0)):(Pcategory_id=$(this).attr("id"),category_id=$(this).attr("id"),e={Pcategory_id:$(this).attr("id"),category_id:$(this).attr("id"),token:token,pageNum:1,pageSize:pageSize},$(pageId+" .sub_tabnav").css("display","none"),queryAnnouncement(e,!0))}),$.bindEvent($(pageId+" .sub_tabnav li"),function(){$(pageId+" .sub_tabnav li").removeClass("active"),$(this).addClass("active");var e;"FuturesNewsMenu"==$(this).parent().parent().attr("id")?(e="finance"==$(this).attr("id")?{count:10,ids:titleNo[1],name:"金融财经"}:"preciousMetals"==$(this).attr("id")?{count:10,ids:titleNo[2],name:"稀贵金属"}:{count:10,ids:titleNo[0],name:"今日要闻"},queryNews(e)):(e={Pcategory_id:$(this).parent().parent().attr("id").substring(0,$(this).parent().parent().attr("id").length-4),category_id:$(this).attr("id"),token:token,pageNum:1,pageSize:pageSize},queryAnnouncement(e,!0))}),$.preBindEvent($(pageId+" .zx_list")," li ",function(){window.open($(this).attr("href"))})}function destroy(){}function pageBack(){}function load(){}var pageId="#index";require("validatorUtils");var commonExt=require("commonExt"),common=require("common"),informationService=require("information/services/informationService").getInstance(),VIscroll=require("vIscroll"),myVIscroll=null,contract,contractInterval,prevCustom,navScroll,newsData,newsCurrent,prevConfig,mainConfig,pbHQ,pbSYS,pbINFO,pbZX,isPoboApp="undefined"!=typeof pbE,HISTORY=9,SELF=100,HOT=100,url_ids,token,pageNum=1,pageSize=15,isInit=!0,totalRows,show_height,Pcategory_id,category_id,titleNo=new Array;titleNo[0]=["10101"],titleNo[1]=["10301"],titleNo[2]=["40102","40202"],titleNo[3]=["10401"];var index={init:init,bindPageEvent:bindPageEvent,destroy:destroy,pageBack:pageBack,load:load};module.exports=index});