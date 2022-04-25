<template>
  <div class="newspapers-container" v-if="newsPaperList">
    <div class="title">
      <span>News Papers</span>
      <div class="show-favourites">
        <font-awesome-icon
          :icon="onlyFavs ? 'fa-solid fa-star' : 'fa-regular fa-star'"
          @click="onlyFavourites()"
        />
      </div>
    </div>
    <div class="newspapers-list-filter">
      <input
        type="text"
        placeholder="Search newspapers"
        v-model="filterInput"
      />
    </div>
    <div class="newspapers-list">
      <div
        class="list-item"
        v-for="(item, index) in onlyFavs ? favsList : filteredList"
        :key="index"
      >
        <div class="item-name" @click="goNewsPaperPage(item.id)">
          {{ item.name }}
        </div>
        <div class="add-favourite">
          <font-awesome-icon
            :icon="item.id | isFavourite(`${favourites}`)"
            class="fa-icon"
            @click="setFavourite(item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsPaper",
  data() {
    return {
      filterInput: "",
      favsList: [],
      favourites: [""],
      onlyFavs: false,
    };
  },
  computed: {
    newsPaperList() {
      return this.$store.state.newsPaperList.sources;
    },
    filteredList() {
      return this.newsPaperList.filter(({ name }) => {
        return name.toLowerCase().includes(this.filterInput.toLowerCase());
      });
    },
  },
  created() {
    this.$store.dispatch("getNewsPapers");
    this.favourites = JSON.parse(localStorage.getItem("favourites"));
    if (!this.favourites) {
      this.favourites = [];
    }
  },
  methods: {
    setFavourite(val) {
      if (this.favourites.includes(val)) {
        this.favourites.splice(this.favourites.indexOf(val), 1);
      } else {
        this.favourites.push(val);
      }

      localStorage.setItem("favourites", JSON.stringify(this.favourites));
    },
    goNewsPaperPage(val) {
      this.$router.push({
        name: "Newspaper",
        path: `/news-paper/:id`,
        params: { id: val },
      });
    },
    onlyFavourites() {
      this.onlyFavs = !this.onlyFavs;
      this.favsList = this.newsPaperList.filter(({ id, name }) => {
        if (this.favourites.includes(id)) {
          return name.toLowerCase().includes(this.filterInput.toLowerCase());
        }
      });
    },
  },
  filters: {
    isFavourite(val, val2) {
      if (val2.includes(val)) {
        return "fa-solid fa-star";
      } else {
        return "fa-regular fa-star";
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.newspapers-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  .title {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $primary;
    color: white;
    padding: 0 10px;
    .show-favourites {
      cursor: pointer;
    }
  }
  .newspapers-list-filter {
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
    input[type="text"] {
      width: 100%;
      height: 35px;
      padding-left: 10px;
      outline: none;
      border: none;
      border: 2px solid $primary;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .newspapers-list {
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    height: 200px;
    overflow-y: scroll;
    border-left: 2px solid $primary;
    border: 2px solid $primary;
    @include large {
      height: 500px;
    }

    &::-webkit-scrollbar-track {
      background-color: white;
    }
    &::-webkit-scrollbar-thumb:vertical {
      background-color: $primary;
      border-radius: 5px;
    }

    &::-webkit-scrollbar {
      width: 3px;
      background-color: white;
    }
    .list-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      min-height: 30px;
      align-items: center;
      padding: 0 10px;
      .item-name {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      &:nth-child(odd) {
        background-color: #f2f2f2;
      }
      .fa-icon {
        color: #ff9800;
        cursor: pointer;
      }
    }
  }
}
</style>
