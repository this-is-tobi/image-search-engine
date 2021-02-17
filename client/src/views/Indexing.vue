<template>
  <div>
    <button
      class="border  border-blue-500  bg-blue-500  text-white  rounded-md  px-4  py-2  m-2"
      @click="indexImages"
    >
      Index !
    </button>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: 'Indexing',

  setup () {
    const indexImages = async () => {
      await api.indexImages()
    }

    return {
      indexImages,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
