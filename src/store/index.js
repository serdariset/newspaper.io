import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarDisplay: false,
    newsByCategory: [],
    newsPaperList: [],
    newsInNewsPaper: [],
    searchResults: [],
  },
  mutations: {
    setSideBarDisplay(state, payload) {
      state.sideBarDisplay = payload;
    },
    setNewsByCategory(state, payload) {
      state.newsByCategory = payload;
    },
    setNewsPaperList(state, payload) {
      state.newsPaperList = payload;
    },
    setNewsInNewsPaper(state, payload) {
      state.newsInNewsPaper = payload;
    },
    setSearchResults(state, payload) {
      state.searchResults = payload;
    },
  },
  actions: {
    sideBarDisplay(context, payload) {
      context.commit("setSideBarDisplay", payload);
    },
    getNewsByCategory(context, payload) {
      return axios({
        method: "GET",
        url: `https://newsapi.org/v2/top-headlines`,
        params: {
          apiKey: process.env.VUE_APP_API_KEY,
          language: "en",
          category: payload.category,
          pageSize: payload.count,
          page: payload.page,
        },
      })
        .then((res) => {
          context.commit("setNewsByCategory", { [payload.category]: res.data });
        })
        .catch((e) => console.log(e));
    },
    getNewsPapers(context) {
      return axios({
        method: "GET",
        url: `https://newsapi.org/v2/top-headlines/sources`,
        params: {
          apiKey: process.env.VUE_APP_API_KEY,
          language: "en",
        },
      })
        .then((res) => {
          context.commit("setNewsPaperList", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getNewsInNewsPaper(context, payload) {
      context.commit("setNewsInNewsPaper", []);
      return axios({
        method: "GET",
        url: `https://newsapi.org/v2/top-headlines`,
        params: {
          apiKey: process.env.VUE_APP_API_KEY,
          sources: payload,
        },
      })
        .then((res) => {
          context.commit("setNewsInNewsPaper", res.data);
        })
        .catch((e) => console.log(e));
    },
    getSearchResults(context, payload) {
      context.commit("setSearchResults", []);
      return axios({
        method: "GET",
        url: `https://newsapi.org/v2/everything`,
        params: {
          apiKey: process.env.VUE_APP_API_KEY,
          q: payload.searchQuery,
          searchIn: "title",
        },
      }).then((res) => {
        context.commit("setSearchResults", res.data);
      });
    },
  },
  modules: {},
});
