<template>
  <div class="news-in-category-container">
    <div class="news-in-category-row">
      <div class="category-header" :class="category">{{ category }} News</div>
      <div class="newscards" v-if="news.status == 'ok'">
        <NewsCard
          v-for="(item, index) in news.articles"
          :key="index"
          :item="item"
        />
      </div>
      <div class="page-router" v-if="news.status == 'ok'">
        <span class="page-item" v-if="page != 1" @click="changePage('-1')">
          <font-awesome-icon icon="fa-solid fa-angle-left" />
        </span>
        <span class="page-item">{{ page }}</span>
        <span class="page-item" @click="changePage('1')"
          ><font-awesome-icon icon="fa-solid fa-angle-right" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import NewsCard from "@/components/NewsCard.vue";
export default {
  name: "News",
  components: {
    NewsCard,
  },
  data() {
    return {
      news: {
        status: "pending",
      },
    };
  },
  computed: {
    category() {
      return this.$route.params.category;
    },

    page() {
      let page = this.$route.params.page;
      return Number(page.replace("page-", ""));
    },
  },
  watch: {
    $route(to, from) {
      if (to.params.category != from.params.category) {
        this.getNews(this.page);
      }
    },
  },
  created() {
    document.title = `Newspaper.io | ${
      this.category.charAt(0).toUpperCase() + this.category.slice(1)
    } News`;
    this.getNews(this.page);
  },
  methods: {
    changePage(val) {
      this.$router.push({
        path: "/",
        name: "News",
        params: {
          category: this.category,
          page: `page-${this.page + Number(val)}`,
        },
      });
      this.getNews(this.page + Number(val));
    },
    getNews(page) {
      let data = {
        category: this.category,
        count: 21,
        page,
      };
      this.news = {
        status: "pending",
      };
      this.$store.dispatch("getNewsByCategory", data).then(() => {
        this.news = this.$store.state.newsByCategory[this.category];
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.news-in-category-container {
  width: 100%;
  padding: 1rem;
  display: flex;
  height: auto;
  justify-content: center;
  .news-in-category-row {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;

    @include large {
      width: 1200px;
    }
    .category-header {
      width: 100%;
      height: 3rem;
      color: white;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      font-size: 1.5rem;
      margin-bottom: 3rem;
      font-weight: 600;
      text-transform: capitalize;
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
    .page-router {
      width: 100%;
      display: flex;
      height: 2.5rem;
      align-items: center;
      justify-content: flex-end;
      margin-top: 2rem;
      .page-item {
        background-color: $primary;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        &:nth-child(2) {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>
