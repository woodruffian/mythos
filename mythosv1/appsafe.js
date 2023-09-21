
  // const { createApp, ref } = Vue

  // createApp({
  //   setup() {
  //     const counter = ref(3);
  //     const fullname = ref ('Bill');
  //     return {
  //       counter:  counter, fullname: fullname
  //     }
  //   }
  // }).mount('#app')


const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

var app = Vue.createApp({
  el: "#app",
  data() {
    return {
    deck: [],
    drawnCards: [],
    drawnCard:undefined
    }
  },
  mounted() {
    this.makeDeck();
  },
  computed: {
    cardCount() {
      return this.drawnCards.length;
    }
  },
  methods: {
    makeDeck() {
      this.drawnCards.length=0;
      this.drawnCard = undefined;
      this.deck = [];
      //for each type of suit
      for (var i = 0; i < suits.length; i++) {
        //and for each rank
        for (var j = 0; j < ranks.length; j++) {
          //make a card
          var card = {};
          card.suit = suits[i];
          card.rank = ranks[j];

          this.deck.push(card);
        }
      }
    },
    drawCard() {
      
      if (this.deck.length > 0) {
        var randIndex = Math.floor(Math.random() * this.deck.length);
        this.drawnCard = this.deck.splice(randIndex, 1)[0];
        this.drawnCards.push(this.drawnCard);
        console.log(this.drawnCard);
      }
      
    }
  }
});

//I think this will be part of eventual conversion to Composition API.
// export default {
//   mounted() {
//       console.log('Component mounted.')
//   }

//app.component('yourComponentName',require('./components/yourComponentName.vue').default);

app.component('playing-card', {
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

app.mount('#app');
