/**
 * Created by xiajing on 2017/2/16.
 */
export default[
    { path:'/',component: require('../component/index.vue'),
        children:[
            {path:'noneConList/:id',component:resolve=> require(['../component/noneConList.vue'],resolve)},
            {path:'isConList/:id',component: resolve=>require(['../component/isConList.vue'],resolve)},
            {path:'setCon/:id',component: resolve=>require(['../component/setCon.vue'],resolve)},
            {path:'editCon/:id',component:resolve=> require(['../component/editCon.vue'],resolve)},
        ]
    }
]
