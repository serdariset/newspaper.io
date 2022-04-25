<template>
  <div class="sidebar-container" :class="sideBarDisplay ? 'active' : 'disable'">
    <span @click="closeSideBar">
      <font-awesome-icon icon="fa-solid fa-xmark" class="close-icon" />
    </span>
    <router-link
      v-for="item in categories"
      :key="item"
      :to="{ name: 'News', params: { category: item, page: 'page-1' } }"
    >
      <span @click="closeSideBar" class="link-item"> {{ item }} </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SideBar",
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

  computed: {
    sideBarDisplay() {
      return this.$store.state.sideBarDisplay;
    },
  },
  methods: {
    closeSideBar() {
      this.$store.dispatch("sideBarDisplay", false);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.sidebar-container {
  width: 300px;
  height: 100vh;
  background-color: $primary;
  position: fixed;
  transition: 0.3s ease right;
  top: 0;
  right: -300px;
  padding: 1rem;
  z-index: 9999999;
  flex-direction: column;

  a {
    color: white;
    text-decoration: none;
    height: 35px;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    font-weight: 500;
    font-size: 1rem;
    .link-item {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .close-icon {
    color: white;
  }

  @include mobile {
    &.active {
      right: 0;
      display: flex;
      box-shadow: 2px 0 10px 3px rgba($color: #000000, $alpha: 0.3);
    }
  }
  @include tablet {
    &.active {
      right: 0;
      display: flex;
      box-shadow: 2px 0 10px 3px rgba($color: #000000, $alpha: 0.3);
    }
  }
}
</style>
