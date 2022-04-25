<template>
  <header class="header-main-container">
    <div class="header-row">
      <div class="logo-section" @click="$router.push({ path: '/' }, () => {})">
        newspaper.io
      </div>
      <div class="categories">
        <router-link
          class="category-item"
          :to="{ name: 'News', params: { category: item, page: 'page-1' } }"
          v-for="item in categories"
          :key="item"
        >
          {{ item }}
        </router-link>
        <span class="fa-icon">
          <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            @click="searchBarDisplay = !searchBarDisplay"
          />
        </span>
        <span class="fa-icon bars">
          <font-awesome-icon icon="fa-solid fa-bars" @click="openSideBar()" />
        </span>
      </div>
    </div>
    <div :class="searchBarDisplay ? 'active search-input' : 'search-input'">
      <input
        type="text"
        placeholder="Search"
        v-model="searchValue"
        @keyup.enter="searchNews()"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  watch: {
    $route(to, from) {
      if (to.name != from.name) {
        this.searchBarDisplay = false;
      }
    },
  },
  data() {
    return {
      searchBarDisplay: false,
      categories: [
        "general",
        "business",
        "sports",
        "technology",
        "health",
        "entertainment",
        "science",
      ],
      searchValue: "",
    };
  },
  methods: {
    openSideBar() {
      this.$store.dispatch("sideBarDisplay", true);
    },
    searchNews() {
      if (this.searchValue.length > 0) {
        this.$router.push(
          {
            name: "Search",
            query: {
              q: this.searchValue,
            },
          },
          () => {}
        );
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.header-main-container {
  width: 100%;
  box-shadow: 0 2px 10px rgba($color: #000000, $alpha: 0.3);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: $primary;
  margin-bottom: 3rem;
  .header-row {
    width: min(100%, 1200px);
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    padding: 0 1rem;
    height: 5rem;
    @include mobile {
      height: 4rem;
    }
    @include tablet {
      height: 4rem;
    }

    .logo-section {
      font-weight: 700;
      color: white;
      font-family: "Roboto", sans-serif;
      font-size: 1.75rem;
      cursor: pointer;
      @include mobile {
        font-size: 1.5rem;
      }
      @include tablet {
        font-size: 1.5rem;
      }
    }
  }
  .categories {
    display: flex;
    width: auto;
    height: 100%;
    align-items: center;

    .fa-icon {
      color: white;
      font-size: 1.25rem;
      height: 1.25rem;
      width: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        width: 1.25rem;
      }
    }
    .bars {
      display: none;
      margin-left: 1rem;
      @include tablet {
        display: flex;
      }
      @include mobile {
        display: flex;
      }
    }
    .category-item {
      color: white;
      text-transform: capitalize;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }

      margin-right: 1rem;
      @include tablet {
        display: none;
      }
      @include mobile {
        display: none;
      }
      @include laptop {
        margin-right: 0.75rem;
      }
    }
  }
  .search-input {
    display: flex;
    background-color: white;
    border-bottom: 4px solid $primary;

    width: 100%;
    height: 0;
    transition: 0.2s ease-out;
    display: flex;
    justify-content: center;

    input[type="text"] {
      display: flex;
      width: 100%;
      height: 0;
      border: none;
      outline: none;
      @include large {
        width: 1200px;
      }
    }

    &.active {
      height: 3rem;
      input[type="text"] {
        height: 100%;
        padding-left: 1rem;
      }
    }
  }
}
</style>
