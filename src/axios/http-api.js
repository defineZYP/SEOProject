import request from './request'

export function query (data) {
  return request({
    url: '/api/cases/search',
    method: 'get',
    params: data
  })
}

export function getdetail (data) {
  return request({
    url: '/api/cases/detail',
    method: 'get',
    params: data
  })
}
