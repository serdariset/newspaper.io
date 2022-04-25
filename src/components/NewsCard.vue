<template>
  <div class="news-item" v-if="item">
    <div class="item-image">
      <img :src="item.urlToImage" v-if="item.urlToImage" />

      <span v-else class="no-image"></span>
    </div>

    <div class="item-title">{{ item.title }}</div>
    <div class="item-description">{{ item.description }}</div>
  </div>
</template>

<script>
export default {
  name: "NewsCard",
  props: ["item"],
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
.news-item {
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: calc((100% / 3) - 1rem);

  @include large {
    &:not(:nth-child(3n)) {
      margin-right: 1rem;
    }
  }
  @include desktop {
    &:not(:nth-child(3n)) {
      margin-right: 1rem;
    }
  }
  @include laptop {
    &:not(:nth-child(3n)) {
      margin-right: 1rem;
    }
  }

  @include tablet {
    width: 100%;
    max-width: calc((100% / 2) - 1rem);
    &:not(:nth-child(2n)) {
      margin-right: 1rem;
    }
  }
  @include mobile {
    width: 100%;
    &:not(:nth-child(3n)) {
      margin-right: 0;
    }
  }

  .item-image {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    border-radius: 5px;
    overflow: hidden;
    background-color: #f2f2f2;
    @include mobile {
      height: 300px;
    }

    img {
      width: 100%;
      max-height: 100%;
      object-fit: cover;
      min-height: 100%;
    }
    .no-image {
      width: 100%;
      height: 100%;
      background-color: #f2f2f2;
    }
  }
  .item-title {
    width: 100%;
    height: auto;
    text-transform: capitalize;
    font-weight: 600;
    margin-bottom: 1rem;
    &:hover {
      text-decoration: underline;
    }
  }
  .item-description {
    margin-bottom: 1rem;
  }
}
</style>
