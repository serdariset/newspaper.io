<template>
  <div id="app">
    <Navbar />
    <SideBar />
    <div class="router-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "./components/Footer.vue";
import SideBar from "./components/SideBar.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    SideBar,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,900;1,300;1,600&display=swap");
@import "@/assets/scss/main.scss";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Source Sans Pro", sans-serif;
}
#app {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;

  position: relative;
  .router-container {
    min-height: calc(100vh - (5rem + 3rem));
  }
}
</style>
