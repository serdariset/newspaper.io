<template>
  <div class="newspaper-container" v-if="news.status == 'ok'">
    <div class="newspaper-header">
      {{ header }}
    </div>
    <div class="newscards">
      <NewsCard
        v-for="(item, index) in news.articles"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import NewsCard from "../components/NewsCard.vue";
export default {
  components: { NewsCard },
  name: "Newspaper",
  computed: {
    news() {
      return this.$store.state.newsInNewsPaper;
    },
    header() {
      return this.news.articles[0].source.name;
    },
  },
  created() {
    let id = this.$route.params.id;
    this.$store.dispatch("getNewsInNewsPaper", id).then(() => {
      document.title = `Newspaper.io | ${this.header}`;
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.newspaper-container {
  padding: 1rem;
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  height: auto;
  .newspaper-header {
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
  .newscards {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @include xl {
      &::after {
        content: "";
        flex: auto;
      }
    }
    @include lg {
      &::after {
        content: "";
        flex: auto;
      }
    }
    @include md {
      &::after {
        content: "";
        flex: auto;
      }
    }
  }
}
</style>
