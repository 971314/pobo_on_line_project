export default[
    { path:'/',component: require('./component/index.vue'),
        children:[
            {path:'alert/:id',component:resolve=> require(['./component/alertShezhi.vue'],resolve)},
            {path:'myalert/:id',component: resolve=>require(['./component/myAlert.vue'],resolve)},
        ]
    }
]