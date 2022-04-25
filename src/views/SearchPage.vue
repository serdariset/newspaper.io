<template>
  <div class="search-page-container" v-if="searchResults.status == 'ok'">
    <div class="search-row">
      <div class="search-header">Search: {{ search }}</div>
      <div class="search-results" v-if="searchResults.totalResults > 0">
        <NewsCard
          v-for="(item, index) in searchResults.articles"
          :item="item"
          :key="index"
        />
      </div>
      <div class="no-result" v-else>
        <span>
          Sorry, we couldn't find any news for <b>{{ search }}</b
          >.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import NewsCard from "../components/NewsCard.vue";
export default {
  components: { NewsCard },
  name: "SearchPage",
  watch: {
    $route(to, from) {
      if (to.query.q != from.query.q) {
        this.getSearchResults();
      }
    },
  },
  computed: {
    search() {
      return this.$route.query.q;
    },
    searchResults() {
      return this.$store.state.searchResults;
    },
  },
  created() {
    document.title = `Newspaper.io | Search`;
    this.getSearchResults();
  },
  methods: {
    getSearchResults() {
      this.$store.dispatch("getSearchResults", { searchQuery: this.search });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.search-page-container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  .search-row {
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    .search-header {
      width: 100%;
      height: 3rem;
      background-color: $primary;
      color: white;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      font-size: 1.5rem;
      margin-bottom: 3rem;
      font-weight: 600;
      border-radius: 5px;
    }
    .search-results {
      padding: 0 1rem;
      width: min(100%, 1200px);
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
