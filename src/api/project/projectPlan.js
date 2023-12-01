import request from '@/utils/request'

export function add(data) {
  // return request.post('api/project/plan', data)
  return request.post('api/project/plan/publish', data)
}
export function save(data) {
  // return request.post('api/project/plan', data)
  return request.post('api/project/plan/save', data)
}

export function publish(data) {
  // return request.post('api/project/plan', data)
  return request.post('api/project/plan/publish', data)
}

export function review(data) {
  // return request.post('api/project/plan', data)
  return request.post('api/project/plan/review', data)
}

export function del(ids) {
  return request({
    url: 'api/project/plan/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/project/plan',
    method: 'put',
    data
  })
}

export default { add, edit, del, save }
