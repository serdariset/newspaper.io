<template>
  <div class="home">
    <main class="home-main-container">
      <NewsGroup v-for="item in categories" :key="item" :category="item" />
    </main>
    <aside class="home-nav-container">
      <NewsPapers />
    </aside>
  </div>
</template>

<script>
import NewsGroup from "../components/NewsGroup.vue";
import NewsPapers from "../components/NewsPapers.vue";
export default {
  name: "Home",
  components: { NewsGroup, NewsPapers },
  created() {
    document.title = this.$route.meta.title;
  },
  data() {
    return {
      categories: [
        "general",
        "business",
        "sports",
        "technology",
        "health",
        "entertainment",
        "science",
      ],
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/main.scss";
.home {
  width: 100%;
  height: auto;
  display: flex;
  padding: 2rem 1rem;
  justify-content: space-between;
  flex-direction: column;
  @include large {
    width: 1200px;
    flex-direction: row;
  }

  .home-main-container {
    width: 100%;
    order: 2;
    @include large {
      width: 850px;
      order: 1;
    }
  }
  .home-nav-container {
    height: auto;
    order: 1;
    margin-bottom: 4rem;
    @include large {
      width: calc(1200px - (850px + 4rem));
      display: flex;
      order: 2;
    }
  }
}
</style>
