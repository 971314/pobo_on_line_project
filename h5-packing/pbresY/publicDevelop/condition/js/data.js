/**
 * Created by xiajing on 2017/1/6.
 * ģ�������������
 */
function getList(){
    var template={
        'stopIsTouchArray|1-80': [
            {
                'id|+1':1,
                'flag1': 1,
                'flag3': 2,
                market: '��',
                code:   3009,
                StopLossCheckPriceType:34,//ֹ�����
                StopProfitCheckPriceType:55,//ֹӯ����
                Volume:88//����
            }
        ]
    }
    Mock.mock(/\.json/,template)
}