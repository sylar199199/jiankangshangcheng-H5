export const GroupList = {
  path: '/group/grouplist',
  name: 'grouplistt',
  component: () => import('@/views/group/grouplist')
}
export const GroupDetails = {
  path: '/group/groupdetails/:activityId/:goodsId/:join',
  name: 'groupdetails',
  component: () => import('@/views/group/groupdetails')
}
export const GroupPayresult = {
  path: '/group/grouppayresult',
  name: 'grouppayresult',
  component: () => import('@/views/group/grouppayresult')
}
export const GroupJoinNow = {
  path: '/group/groupjoin-now',
  name: 'groupjoin-now',
  component: () => import('@/views/group/groupjoin-now')
}
export const GroupOrderDetails = {
  path: '/group/grouporder-details/:orderId',
  name: 'grouporder-details',
  component: () => import('@/views/group/grouporder-details')
}
export const GroupOrder = {
  path: '/group/grouporder/:addressId',
  name: 'grouporder',
  component: () => import('@/views/group/grouporder')
}
