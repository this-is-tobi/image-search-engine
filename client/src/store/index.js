import { createStore } from 'vuex'

import search from './search.js'

const store = createStore({
  modules: {
    search,
  },
})

export default store
