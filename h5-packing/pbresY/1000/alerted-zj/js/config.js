/**
 * Created by pobo on 2017/3/6.
 */
//预警的设置
var alertInsert = function () {
        this.Stock = {MarketID:null,PBCode:''};
        this.ConditionChoiced = 1;
        this.ConditionList = [{
            PriceUpLimit:{Enabled:false,Value:'--'},
            PriceDownLimit:{Enabled:false,Value:'--'},
            CurVolUpLimit:{Enabled:false,Value:'--'},
            VolumeUpLimit:{Enabled:false,Value:'--'},
            AmountUpLimit:{Enabled:false,Value:'--'},
            TurnOverUpLimit:{Enabled:false,Value:'--'}
        }];
        this.AlertAction = {
            PopupTips : {
                Enabled:true
            },
            PlaySound:{
                Enabled:true,
                File:"alert.wav"
            }
        }
    },
    conditionUrl= 'http://61.172.197.205:8888/cloud_trade/1_0',
    type = '3',//预警type
    accountID;//预警编号
if(window.pbE){
    var deviceRelated = JSON.parse(pbE.SYS().getDeviceJsonInfo());
        testId = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId'),//认证userId/id
        userName = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName'),//认证手机号
        testToken = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token'),//token
        orgCode = deviceRelated.jgid,//机构编码
        osP = deviceRelated['255'];
}