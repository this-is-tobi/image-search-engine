<template>
  <div>
    <div class="md:flex">
      <SearchBar
        query-type="keyword"
        class="md:w-1/2"
      />
      <SearchBar
        query-type="regex"
        class="md:w-1/2"
      />
    </div>
    <ImageResult />
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import ImageResult from '@/components/ImageResult.vue'

export default {
  name: 'SearchEngine',

  components: {
    ImageResult,
    SearchBar,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
