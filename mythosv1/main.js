//so far this page not working.  using app.js

//import { createApp } from 'vue';
const { createApp, ref, reactive, component } = Vue;

//import App from './App.vue';
// export default {
//   mounted() {
//     const plugin = document.createElement("script");
//     plugin.setAttribute(
//       "src",
//       "//api.myplugincom/widget/mykey.js"
//     );
//     plugin.async = true;
//     document.head.appendChild(plugin);
//   }
// };
Vue.createApp(App).mount('#app');

const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];




App.component('playing-card', {
  template: `<div class="card" :class="{red}">
  <div class="tl-rank">{{rank}}</div>
  <div class="tl-suit" v-html="suitHTMLCharacter"></div>
  <div class="br-rank">{{rank}}</div>
  <div class="br-suit" v-html="suitHTMLCharacter"></div>
  <div class="m-suit" v-html="suitHTMLCharacter"></div>
</div>`,
  props: ["rank", "suit"],
  computed: {
    red() {
      return this.suit === "hearts" || this.suit === "diamonds"
    },
    suitHTMLCharacter() {
      
      if( this.suit === "diamonds" ) return "&diams\;";
      return `&${this.suit.toLowerCase()}\;`;
      
    }
  }
});



//app.mount("#app");
