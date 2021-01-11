import { axios } from '@/utils/request'

const api = {
  projectList: '/system/projectList'
}

export function getProjectList (parameter) {
  return axios({
    url: api.projectList + '/list',
    method: 'get',
    params: parameter
  })
}

export function getProjectById (id) {
  return axios({
    url: api.projectList + '/get/' + id,
    method: 'get'
  })
}

export function saveProjectList (parameter) {
  return axios({
    url: api.projectList + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delProjectList (parameter) {
  return axios({
    url: api.projectList + '/delete',
    method: 'post',
    params: {
      id: parameter
    }
  })
}

export const projectListExport = api.projectList + '/export'
