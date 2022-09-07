import fly from '../utils/request.js'
import request from '../utils/request.js'
// console.log(fly.get('/home/swiperdata'))
export const getBanners = () => fly.get('/home/swiperdata')

/**
 * 获取分类数据
 * */
export const getNavList = () => {
	return request.get('/home/catitems')
}

export const getFloorList = () => {
  return request.get('/home/floordata')
}