import instance from './request'

export function query (data) {
  return request({
    url: '/api/search',
    method: 'get',
    params: data
  })
}

export function getdetail (data) {
  return request({
    url: '/api/detail',
    method: 'get',
    params: data
  })
}