import api from '../api'

export default {
  state: () => ({
    images: undefined,
  }),

  mutations: {
    getImage (state, images) {
      state.images = images
    },
  },

  actions: {
    async getImageList ({ commit, dispatch }) {
      let images
      try {
        images = await api.getImageList()
      } catch (error) {
        const errorMessage = `An error as occured : ${error.message}` // eslint-disable-line no-irregular-whitespace
        console.log(errorMessage)
      }
      commit('getImage', images)
    },

    async getImage ({ commit, dispatch }, keyword) {
      let images
      try {
        images = await api.getImage(keyword)
      } catch (error) {
        const errorMessage = `An error as occured : ${error.message}` // eslint-disable-line no-irregular-whitespace
        console.log(errorMessage)
      }
      commit('getImage', images)
    },

    async getImageRegex ({ commit, dispatch }, regex) {
      let images
      try {
        images = await api.getImageRegex(regex)
      } catch (error) {
        const errorMessage = `An error as occured : ${error.message}` // eslint-disable-line no-irregular-whitespace
        console.log(errorMessage)
      }
      commit('getImage', images)
    },
  },
}
