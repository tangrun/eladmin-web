import request from '@/utils/request'

export function add(data) {
  const formData = new FormData()
  for (const dataKey in data) {
    console.log(dataKey, data[dataKey])
    const datum = data[dataKey]
    if (datum && datum) { formData.append(dataKey, data[dataKey]) }
  }
  console.log('add', data, formData)
  return request.post('api/projectPlan', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
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
