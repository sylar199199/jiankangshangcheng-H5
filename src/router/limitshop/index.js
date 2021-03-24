export const LimitShop = {
  path: '/limitshop/limitshop-list',
  name: 'limitshop-list',
  component: () => import('@/views/limitshop/limitshop-list')
}
export const LimitShopDetail = {
  path: '/limitshop/limitshop-detail/:activiteId/:goodId',
  name: 'limitshop-detail',
  component: () => import('@/views/limitshop/limitshop-detail')
}
export const OrderconfirmNew = {
  path: '/product/orderconfirm-new/:addressId',
  name: 'orderconfirm-new',
  component: ()=> import('@/views/product/orderconfirm-new')
}
