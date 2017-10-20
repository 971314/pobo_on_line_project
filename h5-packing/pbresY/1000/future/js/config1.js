/**
 * Created by xiajing on 2016/12/16.
 */

var conditionUrl = 'http://192.168.6.52:8080/1_0';
var conditionList = '1014';
var testToken = 'iPvVC6kkgUiHD/hqYgxm6LUBwvS8i3ZvxlNONnTBVfpMqR2n9rN2633HdHFT922zqfxBwl+TD2EQlFW0b9Gd5eLu3hsKMmsOmPAerIx4+aLx7ykRWwQzuoxyZbnrnCvj'
var testId = '56';
var inquiriesFunc = '1004';
var alertInsert = function () {
    this.Contracts = [{ExchangeCode:'',ContractCode:''}],
    this.ConditionChoiced = 1,
    this.ConditionList = [{
            PriceUpLimit:{Enabled:false,Value:'--'},
            PriceDownLimit:{Enabled:false,Value:'--'},
            CurVolUpLimit:{Enabled:false,Value:'--'},
            VolumeUpLimit:{Enabled:false,Value:'--'},
            AmountUpLimit:{Enabled:false,Value:'--'},
            TurnOverUpLimit:{Enabled:false,Value:'--'}
        }],
    this.AlertAction = {
        PopupTips : {
            Enabled:true
        },
        PlaySound:{
            Enabled:true,
            File:"alert.wav"
        }
    }
};