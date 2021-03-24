import Vue from 'vue'
import Filters from '../common/filter'
import Global from '../common/global'
import Router from 'vue-router'

import {HappyAround, NinegGrid, WelfareDetails, WelfareList, WelfareResultList} from './welfare/index'
import {LimitShop, LimitShopDetail, OrderconfirmNew} from './limitshop/index'
import {GroupDetails, GroupJoinNow, GroupList, GroupOrder, GroupOrderDetails, GroupPayresult} from './group/index'
import {SeckillGoods, SeckillList} from './seckill/index'

Vue.use(Router);


Object.keys(Filters).forEach((k) => Vue.filter(k, Filters[k]));
let baseUrl = Global.env == 'test' ? '' : '';
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/authentication',
      name: 'authentication',
      component: () => import('@/views/user/person/authentication')
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/home'),
      meta: {keepAlive: false}
    },
    {
      path: '/home-1.0',
      name: 'home-1.0',
      component: () => import('@/views/home/home-1.0')
    },
    {
      path: '/user/person/equity',
      name: 'equity',
      component: () => import('@/views/user/person/equity')
    },
    // 权益列表
    {
      path: '/user/equity/equitey-list',
      name: 'equitey-list',
      component: () => import('@/views/user/equity/equitey-list')
    },
    // 权益奖品地址
    {
      path: '/user/person/award-address',
      name: 'award-address',
      component: () => import('@/views/user/equity/award-address')
    },
    // 权益服务详情
    {
      path: '/user/equity/equitylist-deails/:orderId',
      name: 'equitylist-deails',
      component: () => import('@/views/user/equity/equitylist-deails')
    },
    // 权益表单
    {
      path: '/user/equity/equity-form/:typeId/:specId/:entityFlag/:contNo/:orderId/:productPlanShortName/:auditFlag',
      name: 'equity-form',
      component: () => import('@/views/user/equity/equity-form')
    },
    { //金牌护士
      path: '/user/equity/goldnurse/:typeId/:specId/:entityFlag/:contNo/:orderId/:productPlanShortName/:auditFlag',
      name: 'goldnurse',
      component: () => import('@/views/user/equity/goldnurse')
    },
    {
      path: '/service/videoList',
      name: 'videoList',
      component: () => import('@/views/service/videoList')
    },
    {
      path: '/service/health-info',
      name: 'health-info',
      component: () => import('@/views/service/health-info')
    },
    {
      path: '/service/health-info-details/:newsId',
      name: 'health-info-details',
      component: () => import('@/views/service/health-info-details')
    },
    //个人中心
    {
      path: '/user/person/person-center',
      name: 'person-center',
      component: () => import('@/views/user/person/person-center')
    },
    {
      path: '/service/videodetail/:videoId',
      name: 'videodetail',
      component: () => import('@/views/service/videodetail')
    },
    {
      path: '/product/detail/:productId/:type/:contNo',
      name: 'detail',
      component: () => import('@/views/product/detail')
    },
    // 2.0商品详情
    {
      path: '/product/seleted-detail/:activiteId/:goodId/:type',
      name: 'seleted-detail',
      component: () => import('@/views/product/seleted-detail')
    },
    { // h5活动详情
      path: '/product/h5detail/:activiteId/:goodId/:type',
      name: 'h5-detail',
      component: () => import('@/views/product/h5detail')
    },
    {
      path: '/product/goodsclassification/:activiteId',
      name: 'goodsclassification',
      component: () => import('@/views/product/goodsclassification')
    },
    {
      path: '/product/new-activite/:activiteId',
      name: 'new-activite',
      component: () => import('@/views/product/activity-h5/new-activite')
    },
    { // h5活动详情
      path: '/product/h5detail/:activiteId/:goodId/:type',
      name: 'h5detail',
      component: () => import('@/views/product/h5detail')
    },
    {
      path: '/service/helpcenter',
      name: 'helpcenter',
      component: () => import('@/views/service/helpcenter')
    },
    {
      path: '/service/logistics/:orderid',
      name: 'logistics',
      component: () => import('@/views/service/logistics')
    },
    {
      path: '/product/orderconfirm/:productId',
      name: 'orderconfirm',
      component: () => import('@/views/product/orderconfirm')
    },
    {
      path: '/user/address/addressList/:activityId/:source',
      name: 'addressList',
      component: () => import('@/views/user/address/addressList')
    },
    {
      path: '/user/address/address-details/:addressId/:activityId/:source',
      name: 'address-details',
      component: () => import('@/views/user/address/address-details')
    },
    {
      path: '/user/order/orderlist/:name',
      name: 'orderlist',
      component: () => import('@/views/user/order/orderlist')
    },
    {
      path: '/user/order/invioceDetail/:orderId',
      name: 'invioceDetail',
      component: () => import('@/views/user/order/invioceDetail')
    },
    {
      path: '/user/order/statusDetail/:orderId',
      name: 'statusDetail',
      component: () => import('@/views/user/order/statusDetail')
    },
    {
      path: "/pay/result/:payId",
      name: 'result',
      component: () => import('@/views/pay/result'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/user/order/orderDetail/:orderId',
      name: 'orderDetail',
      component: () => import('@/views/user/order/orderDetail')
    },
    {
      path: '/product/productdescription/:rightsId',
      name: 'rightdescription',
      component: () => import('@/views/product/rightdescription')
    },
    {
      path: '/product/productdescription/:goodsId',
      name: 'productdescription',
      component: () => import('@/views/product/productdescription')
    },
    {
      path: '/product/cashier',
      name: 'cashier',
      component: () => import('@/views/product/cashier')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/home/test')
    },
    // 抽奖福利相关路由
    WelfareList,
    WelfareDetails,
    WelfareResultList,
    HappyAround,
    NinegGrid,
    // 限时抢购相关路由
    LimitShop,
    LimitShopDetail,
    OrderconfirmNew,
    // 拼团
    GroupList, // 拼团列表
    GroupDetails, // 拼团详情
    GroupPayresult, // 拼团支付结果页面
    GroupJoinNow,  // 参与拼团
    GroupOrderDetails,  // 拼团订单详情
    GroupOrder,  // 拼团订单详情
    // 秒杀
    SeckillList,
    SeckillGoods,
    // 找不到页面回首页
    {
      path: '*',
      redirect: '/home',
    }
  ],
})


