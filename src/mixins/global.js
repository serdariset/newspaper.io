export const filters = {
  filters: {
    setFavourites(name) {
      let favourites = localStorage.getItem("favourites");
      let result;
      if (favourites !== undefined && favourites !== null) {
        favourites = JSON.parse(favourites);
        if (favourites.includes(name)) {
          result = "fa-solid fa-star";
        } else {
          result = "fa-regular fa-star";
        }
      }
      return result;
    },
  },
};
