<template>
  <div class="relative  mr-6  my-2">
    <input
      v-model="query"
      type="text"
      class="bg-purple-white  shadow  rounded  border-0  p-2  w-6/12"
      :placeholder="props.queryType === 'regex' ? '^fi[a-z]{2}$' : 'red fish'"
    >
    <button
      class="border  border-blue-500  bg-blue-500  text-white  rounded-md  px-4  py-2  m-2"
      @click="getImage"
    >
      Search by {{ props.queryType }} !
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'SearchBar',

  props: {
    queryType: {
      type: String,
      default: '',
    },
  },

  setup (props) {
    const store = useStore()

    const query = ref('')

    const getImage = async () => {
      props.queryType === 'keyword'
        ? await store.dispatch('getImage', query.value)
        : await store.dispatch('getImageRegex', query.value)
    }

    return {
      props,
      query,
      getImage,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
