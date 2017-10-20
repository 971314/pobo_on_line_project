/**
 * Created by xiajing on 2017/2/16.
 */
export default[
    { path:'/',component: require('../component/slIndex.vue'),
        children:[
            {path:'slNoneList/:id',component:require('../component/noneSlList.vue')},
            {path:'slIsList/:id',component:require('../component/isSlList.vue')},
        ]
    }
]
