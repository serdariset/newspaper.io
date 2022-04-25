<template>
  <article class="news-group-container" v-if="news.status == 'ok'">
    <header
      class="title"
      :class="category"
      @click="seeAllNewsInCategory(category)"
    >
      <h3 class="name">{{ category }}</h3>
      <span class="see-more">See more...</span>
    </header>
    <section class="news-content">
      <NewsCard
        v-for="(item, index) in news.articles"
        :key="index"
        :item="item"
      />
    </section>
  </article>
</template>

<script>
import { filters } from "@/mixins/global.js";
import NewsCard from "./NewsCard.vue";
export default {
  components: { NewsCard },
  name: "NewsGroup",
  props: ["category"],
  mixins: [filters],
  data() {
    return {
      news: {
        status: "pending",
      },
    };
  },

  created() {
    let data = {
      category: this.category,
      count: 6,
      page: 1,
    };

    this.$store.dispatch("getNewsByCategory", data).then(() => {
      this.news = this.$store.state.newsByCategory[this.category];
    });
  },

  methods: {
    seeAllNewsInCategory(val) {
      this.$router.push(
        { name: "News", path: `/`, params: { category: val, page: "page-1" } },
        () => {}
      );
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.news-group-container {
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 2rem;
  flex-direction: column;
  .title {
    width: 100%;
    display: flex;
    height: 2rem;
    align-items: center;
    margin-bottom: 1rem;
    position: relative;
    justify-content: space-between;
    cursor: pointer;
    padding: 0 1rem;
    border-radius: 5px;

    .name {
      font-size: 1.25rem;
      font-weight: 600;
      text-transform: capitalize;
      color: white;
      background-color: transparent;
      line-height: 2rem;
      transition: 0.2s ease;
    }
    .see-more {
      color: white;
      opacity: 0;
      display: flex;
      transition: 0.1s ease;
    }
    &:hover {
      .see-more {
        opacity: 1;
      }
    }
  }
  .news-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: auto;
    justify-content: space-between;

    .news-item {
      .item-image {
        width: 100%;
        height: 150px;
        overflow: hidden;
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        @include mobile {
          height: 300px;
        }
        img {
          object-fit: cover;
          max-width: 100%;
          min-height: 100%;
          transform: scale(1.15);
        }
      }
    }
  }
}
</style>
