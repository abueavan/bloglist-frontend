import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async (blogId, newObject) => {
  const putUrl = `${baseUrl}/${blogId}`
  const response = await axios.put(putUrl, newObject)
  return response.data
}

const del = async id => {
  const config = {
    headers: {Authorization: token}
  }
  const deleteUrl =  `${baseUrl}/${id}`
  await axios.delete(deleteUrl, config)
}

export default { getAll, create, put, del, setToken }