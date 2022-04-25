import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faStar as faStarSolid,
  faAngleRight,
  faAngleLeft,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faMagnifyingGlass,
  faStar,
  faStarSolid,
  faAngleRight,
  faAngleLeft,
  faBars,
  faXmark
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

export default library;
