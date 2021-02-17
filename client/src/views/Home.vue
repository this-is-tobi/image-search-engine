<template>
  <div>
    <button
      class="border  border-blue-500  bg-blue-500  text-white  rounded-md  px-4  py-2  m-2"
      @click="getImageList"
    >
      Get all images !
    </button>
    <ImageResult />
  </div>
</template>

<script>
import ImageResult from '@/components/ImageResult.vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',

  components: {
    ImageResult,
  },

  setup () {
    const store = useStore()

    const getImageList = async () => {
      await store.dispatch('getImageList')
    }

    return {
      getImageList,
    }
  },
}
</script>
