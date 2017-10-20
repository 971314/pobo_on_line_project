/**
 * Created by xiajing on 2017/1/6.
 * 模拟服务器的数据
 */
function getList(){
    var template={
        'stopIsTouchArray|1-80': [
            {
                'id|+1':1,
                'flag1': 1,
                'flag3': 2,
                market: '大豆',
                code:   3009,
                StopLossCheckPriceType:34,//止损参数
                StopProfitCheckPriceType:55,//止盈参数
                Volume:88//数量
            }
        ]
    }
    Mock.mock(/\.json/,template)
}