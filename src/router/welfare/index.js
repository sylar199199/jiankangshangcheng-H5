export const WelfareList = {
  path: '/welfare/welfare-list',
  name: 'welfare-list',
  component: () => import('@/views/welfare/welfare-list')
}
export const WelfareDetails = {
  path: '/welfare/welfare-details/:id',
  name: 'welfare-details',
  component: () => import('@/views/welfare/welfare-details')
}
export const WelfareResultList = {
  path: '/welfare/welfare-result-list',
  name: 'welfare-result-list',
  component: () => import('@/views/welfare/welfare-result-list')
}
export const HappyAround = {
  path: '/welfare/happyaround/:addressId/:activiteId',
  name: 'happyaround',
  component: () => import('@/views/welfare/happyaround')
}
export const NinegGrid = {
  path: '/welfare/ninegrid/:addressId/:activiteId',
  name: 'ninegrid',
  component: () => import('@/views/welfare/ninegrid')
}
