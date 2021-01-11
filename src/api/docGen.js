import { axios } from '@/utils/request'

const api = {
  documentGen: '/system/docGen'
}

export function documentGen (id, parameter) {
  return axios({
    url: api.documentGen + '/gen',
    method: 'post',
    data: {
      id: id,
      queryParam: parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getDocumentGenList (parameter) {
  return axios({
    url: api.documentGen + '/list',
    method: 'get',
    params: parameter
  })
}

export function getDocumentGenById (id) {
  return axios({
    url: api.documentGen + '/get/' + id,
    method: 'get'
  })
}

export function saveDocumentGen (parameter) {
  return axios({
    url: api.documentGen + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delDocumentGen (parameter) {
  return axios({
    url: api.documentGen + '/delete',
    method: 'post',
    params: {
      id: parameter
    }
  })
}

export const documentGenExport = api.documentGen + '/export'
