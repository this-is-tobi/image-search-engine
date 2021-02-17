import { apiClient } from './xhr-client'

export async function getImageList () {
  const response = await apiClient.get('/')
  return response?.data.message
}

export async function getImage (keyword) {
  const response = await apiClient.get(`/myImageFromKeywords/${keyword}`)
  return response?.data.message
}

export async function getImageRegex (regex) {
  const response = await apiClient.get(`/myImageFromRegex/${regex}`)
  return response?.data.message
}

export async function indexImages () {
  const response = await apiClient.get('/indexImages')
  return response?.data.message
}
