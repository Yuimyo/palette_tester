import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

// /* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core'

// /* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// /* import specific icons */
// import { faFrown } from '@fortawesome/free-regular-svg-icons'

// /* add icons to the library */
// library.add(faUserSecret)

createApp(App).use(router).mount("#app");
