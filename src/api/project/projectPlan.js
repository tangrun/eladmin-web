import request from '@/utils/request'

export function add(data) {
  return request.post('api/projectPlan', data)
}

export function del(ids) {
  return request({
    url: 'api/projectPlan/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/projectPlan',
    method: 'put',
    data
  })
}

export default { add, edit, del }
