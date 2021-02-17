import { apiClient } from './xhr-client'
import {
  getImage,
} from './api'

jest.spyOn(apiClient, 'get')

describe('api', () => {
  beforeEach(() => {
    apiClient.get.mockClear()
  })

  it('Should GET image', async () => {
    // Given
    apiClient.get.mockReturnValueOnce(Promise.resolve({ data: { success: true } }))

    // When
    await getImage()

    // Then
    expect(apiClient.get).toHaveBeenCalled()
    expect(apiClient.get).toHaveBeenCalledTimes(1)
    expect(apiClient.get.mock.calls[0][0]).toBe('/prediction')
  })
})
