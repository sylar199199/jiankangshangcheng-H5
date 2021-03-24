export const SeckillList = {
  path: '/seckill/seckill-list/:activityId',
  name: 'seckill-list',
  component: () => import('@/views/seckill/seckill-list')
}
export const SeckillGoods = {
  path: '/seckill/seckill-goods/:activityId/:goodsId',
  name: 'seckillgoods',
  component: () => import('@/views/seckill/seckill-goods')
}
