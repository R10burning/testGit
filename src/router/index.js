import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// auto add lazyload
const boundEdit = resolve => {
    require(['../components/boundEdit/boundEdit.vue'], resolve)
};
// add boundEdit by autor

const addBoundInfo = resolve => {
    require(['../components/addBoundInfo/addBoundInfo.vue'], resolve)
};
// add addBoundInfo by autor

const mzfymx = resolve => {
    require(['../components/mzfymx/mzfymx.vue'], resolve)
};
// add mzfymx by autor

const zyRecordDetails = resolve => {
    require(['../components/zyRecordDetails/zyRecordDetails.vue'], resolve)
};
// add zyRecordDetails by autor

const mzRecordDetails = resolve => {
    require(['../components/mzRecordDetails/mzRecordDetails.vue'], resolve)
};
// add mzRecordDetails by autor

const registerConfirm = resolve => {
    require(['../components/registerConfirm/registerConfirm.vue'], resolve)
};
// add registerConfirm by autor

const boundManage = resolve => {
    require(['../components/boundManage/boundManage.vue'], resolve)
};
// add boundManage by autor

const deleteUser = resolve => {
    require(['../components/deleteUser/deleteUser.vue'], resolve)
};
// add deleteUser by autor

const telephoneBound = resolve => {
    require(['../components/telephoneBound/telephoneBound.vue'], resolve)
};
// add telephoneBound by autor

const onlinePay = resolve => {
    require(['../components/onlinePay/onlinePay.vue'], resolve)
};
// add onlinePay by autor

const editBoundInfo = resolve => {
    require(['../components/editBoundInfo/editBoundInfo.vue'], resolve)
};
// add editBoundInfo by autor

const schedulingDetail = resolve => {
    require(['../components/schedulingDetail/schedulingDetail.vue'], resolve)
};
// add schedulingDetail by autor

const schedulingList = resolve => {
    require(['../components/schedulingList/schedulingList.vue'], resolve)
};
// add schedulingList by autor

const doctorDetail = resolve => {
    require(['../components/doctorDetail/doctorDetail.vue'], resolve)
};
// add doctorDetail by autor


const index = resolve => {
    require(['../components/index/index.vue'], resolve)
};
const home = resolve => {
    require(['../components/home/home.vue'], resolve)
};
const introArticle = resolve => {
    require(['../components/introArticle/introArticle.vue'], resolve);
}
const personalCenter = resolve => {
    require(['../components/personalCenter/personalCenter.vue'], resolve);
}
const departmentList = resolve => {
    require(['../components/departmentList/departmentList.vue'], resolve);
}
const doctorDepartmentList = resolve => {
    require(['../components/doctorDepartmentList/doctorDepartmentList.vue'], resolve);
}
const newsList = resolve => {
    require(['../components/newsList/newsList.vue'], resolve);
}
const navigation = resolve => {
    require(['../components/navigation/navigation.vue'], resolve);
}
const appointment = resolve => {
    require(['../components/appointment/appointment.vue'], resolve);
}
const visitingRecord = resolve => {
    require(['../components/visitingRecord/visitingRecord.vue'], resolve);
}
const cardBound = resolve => {
    require(['../components/cardBound/cardBound.vue'], resolve);
}
const inpatientRecord = resolve => {
    require(['../components/inpatientRecord/inpatientRecord.vue'], resolve);
}
const payment = resolve => {
    require(['../components/payment/payment.vue'], resolve);
}
const articlePage = resolve => {
    require(['../components/articlePage/articlePage.vue'], resolve);
}
const doctorList = resolve => {
    require(['../components/doctorList/doctorList.vue'], resolve);
}
const jgList = resolve => {
    require(['../components/jgList/jgList.vue'], resolve);
}
const bMap = resolve => {
    require(['../components/bMap/bMap.vue'], resolve);
}
const wxFollow = resolve => {
    require(['../components/wxFollow/wxFollow.vue'], resolve);
}
const jkdaList=resolve=>{
    require(['../components/jkdaList/jkdaList.vue'], resolve);
}
const healthRecord = resolve => {
    require(['../components/healthRecord/healthRecord.vue'], resolve);
}
const jybgxq = resolve=>{
    require(['../components/jybgxq/jybgxq.vue'], resolve);
}
const jybgList = resolve => {
    require(['../components/jybgList/jybgList.vue'],resolve);
}
const archivesCenter = resolve => {
    require(['../components/archivesCenter/archivesCenter.vue'], resolve);
}
const jcbgList = resolve => {
    require(['../components/jcbgList/jcbgList.vue'],resolve);
}
const jcbgxq = resolve => {
    require(['../components/jcbgxq/jcbgxq.vue'],resolve);
}
const zyHealthService = resolve => {
    require(['../components/zyHealthService/zyHealthService.vue'], resolve);
}
const choose = resolve => {
    require(['../components/choose/choose.vue'], resolve);
}
const zyPresentation = resolve => {
    require(['../components/zyPresentation/zyPresentation.vue'], resolve);
}
const addSignInfo = resolve => {
    require(['../components/addSignInfo/addSignInfo.vue'], resolve);
}
const jktjRecord = resolve => {
    require(['../components/jktjRecord/jktjRecord.vue'], resolve);
}
const zdrqfwRecord = resolve => {
    require(['../components/zdrqfwRecord/zdrqfwRecord.vue'],resolve);
}
const gxyRecord = resolve => {
    require(['../components/gxyRecord/gxyRecord.vue'], resolve);
}
const tnbRecord = resolve => {
    require(['../components/tnbRecord/tnbRecord.vue'], resolve);
}
// const archiveSignRecord = resolve => {
//     require(['../components/archiveSignRecord/archiveSignRecord.vue'], resolve);
// }
const archiveSign = resolve => {
	require(['../components/archiveSign/archiveSign.vue'], resolve)
};
// auto add components


const routes = [{
    path: '/',
    redirect: '/index/home'
}, {
    path: '/index',
    component: index,
    children: [
	{
		name: 'boundEdit',
		path: '/index/boundEdit',
		component: boundEdit
	},
	// add boundEdit by autor
	{
		name: 'addBoundInfo',
		path: '/index/addBoundInfo',
		component: addBoundInfo
	},
	// add addBoundInfo by autor
	{
		name: 'mzfymx',
		path: '/index/mzfymx',
		component: mzfymx
	},
	// add mzfymx by autor
	{
		name: 'zyRecordDetails',
		path: '/index/zyRecordDetails',
		component: zyRecordDetails
	},
	// add zyRecordDetails by autor
	{
		name: 'mzRecordDetails',
		path: '/index/mzRecordDetails',
		component: mzRecordDetails
	},
	// add mzRecordDetails by autor
	{
		name: 'registerConfirm',
		path: '/index/registerConfirm',
		component: registerConfirm
	},
	// add registerConfirm by autor
	{
		name: 'boundManage',
		path: '/index/boundManage',
		component: boundManage
	},
	// add boundManage by autor
	{
		name: 'deleteUser',
		path: '/index/deleteUser',
		component: deleteUser
	},
	// add deleteUser by autor
	{
		name: 'telephoneBound',
		path: '/index/telephoneBound',
		component: telephoneBound
	},
	// add telephoneBound by autor
	{
		name: 'onlinePay',
		path: '/index/onlinePay',
		component: onlinePay
	},
	// add onlinePay by autor
	{
		name: 'editBoundInfo',
		path: '/index/editBoundInfo',
		component: editBoundInfo
	},
	// add editBoundInfo by autor
	{
		name: 'schedulingDetail',
		path: '/index/schedulingDetail',
		component: schedulingDetail
	},
	// add schedulingDetail by autor
	{
		name: 'schedulingList',
		path: '/index/schedulingList',
		component: schedulingList
	},
	// add schedulingList by autor
	{
		name: 'doctorDetail',
		path: '/index/doctorDetail',
		component: doctorDetail
	},
	// add doctorDetail by autor
    {
        name: 'home',
        path: '/index/home',
        component: home
    }, {
        name: 'introArticle',
        path: '/index/introArticle',
        component: introArticle
    }, {
        name: 'personalCenter',
        path: '/index/personalCenter',
        component: personalCenter
    }, {
        name: 'departmentList',
        path: '/index/departmentList',
        component: departmentList
    }, {
        name: 'doctorDepartmentList',
        path: '/index/doctorDepartmentList',
        component: doctorDepartmentList
    }, {
        name: 'newsList',
        path: '/index/newsList',
        component: newsList
    }, {
        name: 'navigation',
        path: '/index/navigation',
        component: navigation
    }, {
        name: 'appointment',
        path: '/index/appointment',
        component: appointment
    }, {
        name: 'visitingRecord',
        path: '/index/visitingRecord',
        component: visitingRecord
    }, {
        name: 'cardBound',
        path: '/index/cardBound',
        component: cardBound
    }, {
        name: 'inpatientRecord',
        path: '/index/inpatientRecord',
        component: inpatientRecord
    }, {
        name: 'payment',
        path: '/index/payment',
        component: payment
    }, {
        name: 'articlePage',
        path: '/index/articlePage',
        component: articlePage
    }, {
        name: 'doctorList',
        path: '/index/doctorList',
        component: doctorList
    }, {
        name: 'jgList',
        path: '/index/jgList',
        component: jgList
    }, {
        name: 'bMap',
        path: '/index/bMap',
        component: bMap
    }, {
        name: 'wxFollow',
        path: '/index/wxFollow',
        component: wxFollow
    },{
        name:'jkdaList',
        path:'/index/jkdaList',
        component:jkdaList
    }, {
        name: 'healthRecord',
        path: '/index/healthRecord',
        component: healthRecord
    },{
        name: 'jybgxq',
        path: '/index/jybgxq',
        component: jybgxq
    },{
        name: 'jybgList',
        path: '/index/jybgList',
        component: jybgList
    },{
        name: 'archivesCenter',
        path: '/index/archivesCenter',
        component: archivesCenter
    },{
        name: 'jcbgList',
        path: '/index/jcbgList',
        component: jcbgList
    },{
        name: 'jcbgxq',
        path: '/index/jcbgxq',
        component: jcbgxq
    },{
        name: 'zyHealthService',
        path: '/index/zyHealthService',
        component: zyHealthService
    },{
        name: 'choose',
        path: '/index/choose',
        component: choose
    },{
        name: 'zyPresentation',
        path: '/index/zyPresentation',
        component: zyPresentation
    },{
        name: 'jktjRecord',
        path: '/index/jktjRecord',
        component: jktjRecord 
    },{
        name: 'zdrqfwRecord',
        path: '/index/zdrqfwRecord',
        component: zdrqfwRecord 
    },{
        name: 'gxyRecord',
        path: '/index/gxyRecord',
        component: gxyRecord 
    }, {
        name: 'tnbRecord',
        path: '/index/tnbRecord',
        component: tnbRecord
    },{
        name: 'archiveSign',
        path: '/index/archiveSign',
        component: archiveSign  
    },{
        name:'addSignInfo',
        path:'/index/addSignInfo',
        component: addSignInfo
    }/*,{
        name: 'archiveSignRecord',
        path: '/index/archiveSignRecord',
        component: archiveSignRecord    
    }*/]    
    // auto add routePath
}]
const router = new Router({
    // mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    router.app.$store.commit('setBackBtn', true)
    document.body.scrollTop = 0;
    next()
});
export default router;
