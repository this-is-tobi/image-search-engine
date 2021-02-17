<template>
  <div>
    <div
      v-for="keyword in resultList"
      :key="resultList.indexOf(keyword)"
    >
      <div
        v-for="image in keyword.images"
        :key="image.imageId"
        class="md:flex shadow-lg  mx-6  md:mx-auto  my-10  max-w-lg  md:max-w-5xl  h-48"
      >
        <div class="h-full  w-full  md:w-5/12  pb-5/6">
          <a
            :href="image.url"
            target="blank"
          >
            <img
              :src="image.url"
              alt="image.url"
              class="h-full  max-h-60  w-full  object-cover  rounded-lg  rounded-r-none  pb-5/6"
            >
          </a>
        </div>
        <div class="w-full  md:w-7/12  px-4  py-1  bg-white  rounded-lg">
          <div class="flex  items-center">
            <h2 class="text-l  text-left  text-gray-800  font-medium  mr-auto">
              {{ image.url }}
            </h2>
          </div>
          <div class="text-sm  text-left  text-gray-700  mt-3">
            <p
              v-if="image.score"
              class="mt-2"
            >
              Score: {{ image.score }}
            </p>
          </div>
          <hr>
          <div class="text-left  mt-1  self-end">
            <div
              v-for="word in image.keywords"
              :key="word"
              :class="[word === keyword.word ? 'inline-block  justify-start  items-end  text-sm  border-red-500  bg-red-500  text-white  rounded-full  px-3  py-0.5  m-1' : 'inline-block  justify-start  items-end  text-sm  border-blue-500  bg-blue-500  text-white  rounded-full  px-3  py-0.5  m-1']"
            >
              {{ word }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'ImageResult',

  setup () {
    const store = useStore()

    return {
      resultList: computed(() => store.state.search.images),
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
