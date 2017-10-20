loading(true);
var config, syncCode, syncCount, appVue, syncTm;

function sync() {
    var ids = config.categories[0].id;
    syncCount = ids.length;
    if(syncCount == 0) {
        loading(false);
        return;
    }
    syncCode = {};
    for(var i=0;i<ids.length;i++){
        syncCode[pbMSG.ytzHandleMsgHistoryQuery(ids[i]-0, "")] = 1;
    }
    syncTm = setTimeout(function(){
        if(syncCount > 0) {
            syncCode = {};
            loading(false);
            loadData(appVue.cat);  
        }
    },180000);
}

function callback(msg){
    var msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && msg.functionNO == 111 && msg.requestNO in syncCode) {
        if(--syncCount <= 0) {
            clearTimeout(syncTm);
            loading(false);
            loadData(appVue.cat);    
        }
    }
}

function loadData(i){
    var unread = 0, ids = config.categories[i].id, lastid = "", data = config.categories[i].data, data2;
    data.length>0 && (lastid=data[data.length-1].msgid);
    if(lastid=="") { 
        if(i == 0)
            unread = pbMSG.ytzGetUnReadMsgCount();
        else {
            for(var j =0;j<ids.length;j++)
              unread += pbMSG.ytzGetUnReadMsgCountByType(ids[j]-0);
        }
        config.categories[i].unread = unread;
    }
    if(i == 0)
        data2 = pbMSG.ytzLoadProFileMsg(10, lastid);
    else if(ids.length == 1)
        data2 = pbMSG.ytzLoadProfileTypeMsg(ids[0]-0, 10, lastid);
    else
        data2 = pbMSG.ytzLoadProfileTypesMsg(JSON.stringify({
            maxmsgcount: "10",
            latestid: lastid
        }));
    data2 = JSON.parse(data2).Messages;
    for(var j =0;j<data2.length;j++) {
        var d = data2[j];
        if(!config.types[d.typeid])
            config.types[d.typeid] = {listTemplate:"UNKNOWN", noDetail:true};
        if(config.types[d.typeid].noDetail && d.readed == 0)
            updateUnread(i, d, false);
        data.push(d);
    } 
}


function updateUnread(i, d, clear) {
    pbMSG.ytzUpdateReaded(d.msgid);
    d.readed = 1;
    --config.categories[i].unread;
    for(var j = 0;j<config.categories.length;j++){
        if(j == i)
            continue;
        if(config.categories[j].id.indexOf(d.typeid)!=-1) {
            if(config.categories[j].data.length>0) {
                if(clear)
                    config.categories[j].data = [];
                else
                    --config.categories[j].unread;
            }
            break;
        }
    }
}

Vue.filter("msgTime", function(t){
    var date = new Date();
    var today = ""+date.getFullYear()+(date.getMonth()+1)+date.getDate();
    date.setTime(date.getTime()-86400000);
    var yestorday = ""+date.getFullYear()+(date.getMonth()+1)+date.getDate();
    try {
        if(t.indexOf(today) == 0)
            return t.substr(8,2)+":"+t.substr(10,2);
        else if(t.indexOf(yestorday) == 0)
            return "昨天";
        return t.substr(0,4)+"-"+t.substr(4,2)+"-"+t.substr(6,2);
    }catch(e){}    
    return t;
})

function init(cfg) {
    config = cfg;
    cfg.categories = [];
    for(var k in TEMPLATES.LIST) {
        TEMPLATES.LIST[k].props = ["item"];
        TEMPLATES.LIST[k] = Vue.extend(TEMPLATES.LIST[k]);
    }
    isReady(function(){
        var otherIds = [], allIds = [], typeid, currentCat = 0, searchCat = location.search.substr(1);
        var types = getMsgTypes(true);
        for(var i=0;i<types.length;i++){
            typeid = types[i].typeid;
            allIds.push(typeid);
            cfg.types[typeid] = $.extend({listTemplate:"DEFAULT", noDetail:false}, cfg.types[typeid]);
            if(types[i].other)
                otherIds.push(typeid);
            else {
                cfg.categories.push({name:types[i].types, id: [typeid], unread:0, data:[]});
                if(searchCat == typeid)
                    currentCat = i+1;
            }
        }
        cfg.categories.push({name:"其他消息", id:otherIds, unread:0, data:[]});
        cfg.categories.unshift({name:"全部消息", id:allIds, unread:0, data:[]});
        
        $("#app").show();
        new Vue({
            el: "#app",               
            data: function(){         
                appVue = this;
                this.$options.components = TEMPLATES.LIST;
                return {
                    cats: cfg.categories,
                    cat: currentCat,
                    types: cfg.types
                }
            },
            mounted: function(){
                var doc = $(document), w = Math.floor(doc.width()/4);
                var cats = $("#app .cats");
                cats.children().css("width", w*this.cats.length).children().css("width", w);
                new iScroll(cats[0],{
                    vScroll: false,
                    bounce: false, 
                    hScrollbar: false
                });
                var h = doc.height() - $("#navbar").height() - 41;
                $("#app .list").each(function(i){
                    $(this).css("height", h + "px");
                    this.children[0].style.minHeight = h + "px";
                    new iScroll(this,  {
                        hScroll: false,
                        vScrollbar: false,
                        checkDOMChanges: true,
                        onRefresh: function(){
                            console.log("refresh");
                        },
                        onTouchEnd: function(){
                            if(this.y < this.maxScrollY)
                                this.loadType = 1;
                            else if(this.y > 100)
                                this.loadType = 2;
                            else
                                this.loadType = 0;
                        },
                        onScrollEnd: function(){
                            if(this.loadType == 1)
                                loadData(i);
                            else if(this.loadType == 2) {
                                loading(true);
                                for(var j=0;j<cfg.categories.length;j++){
                                    cfg.categories[j].data = [];
                                }
                                sync();
                            }
                        }
                    });
                });
//                loadData(this.cat);
                sync();
             },
             methods:{
                 changeCat: function(i) {
                     if(this.cat == i)
                         return;
                     this.cat = i;
                     if(this.cats[i].data.length==0)
                         loadData(i);
                 },
                 read: function(d) {
                     d.readed == 0 && updateUnread(this.cat, d, true);
                 }
             }
         });
    })
}

getConf("", init);


