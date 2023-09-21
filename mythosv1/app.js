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
//const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "A"];

var app = Vue.createApp({
  el: "#app",
  data() {
    return {
      deck: [],
      //drawnCards: [],
      handCards: [], //cards in your hand to augment the highlander
      highlanderCards: [], //cards that war with enemy
      bonusHighlanderCards: [], //bonus cards to beat enemy highlander
      enemyHighlanderCards: [],
      drawnCard: undefined,
      stepid: 0, //0 = start.  Which step in the game are we?
      cardCount: 0,
      message: "",
      gameOver:  false,
      winner: null,
      showNewCardButton: false,
      allowHighlanderPick: false,
      
    };
  },
  mounted() {
    this.makeDeck();
    this.advanceStep();
  },
  computed: {
    // cardCount() {
    //   return this.drawnCards.length;
    // }
    playerCardValue() {
      let result = 0;
      for (card of this.highlanderCards) {
        result += card.value;
      }
      return result;
    },
    playerHandValue() {
      let result = 0;

      for (card of this.handCards) {
        result += card.value;
      }
      return result;
    },

    enemyCardValue() {
      let result = 0;
      for (card of this.enemyHighlanderCards) {
        result += card.value;
      }
      return result;
    },
  },
  methods: {
    makeDeck() {
      //this.drawnCards.length=0;
      this.drawnCard = undefined;
      this.deck = [];
      let id = 0;
      //for each type of suit
      for (var i = 0; i < suits.length; i++) {
        //and for each rank
        for (var j = 0; j < ranks.length; j++) {
          //make a card
          var card = {};
          card.suit = suits[i];
          card.rank = ranks[j];
          id++; //make id start with 1, so it's always truthy.
          card.id = id;
          if (card.rank == "A") {
            card.value = 1; //aces are only worth 1 in this game.
          } else {
            card.value = parseInt(card.rank);
          }

          this.deck.push(card);
        }
        //cut the cards.  Ish  :-)  Well we are moving one from the middle to the end.
        // I think the last card in the deck will seldom get drawn.
        var randIndex = Math.floor(Math.random() * this.deck.length + 1);
        if (randIndex > this.deck.length) randIndex--;
        const randocard = this.deck.splice(randIndex, 1)[0];
        this.deck.push(randocard);
      }
    },
    drawCard() {
      if (this.deck.length > 0) {
        //random numbers never achieve 1, so you have to increase by 1.
        var randIndex = Math.floor(Math.random() * (this.deck.length + 1));

        //just in case the random was actually 1  :-)
        if (randIndex > this.deck.length) randIndex--;
        console.log('rand index ', randIndex);
        const card = this.deck.splice(randIndex, 1)[0];
        console.log(card);
        //console.log(this.drawnCard);
        this.highlanderCards.push(card);
        //console.log(this.drawnCard);
        this.advanceStep();//check number of cards that need to be drawn and then advance step.  For now assume 1 card.
      }
    },
    pickCards(numCards) {
      const cards = [];
      for (let i = 0; i < numCards; i++) {
        if (this.deck.length > 0) {
          //random numbers never achieve 1, so you have to increase by 1.
          var randIndex = Math.floor(Math.random() * (this.deck.length + 1));

          //just in case the random was actually 1  :-)
          if (randIndex >= this.deck.length) randIndex--;
          let dc = this.deck.splice(randIndex, 1)[0];
          cards.push(dc);
          console.log("drew " + dc.suit + ", " + dc.rank);
        }
      }
      this.cardCount += numCards;
      return cards;
    },
    setMessage(message) {
      console.log(message);
      this.message = message;
    },
    checkForWinner() {
      //if the highlander+hand is less than opposing highlander, game over.
      //if the step is late enough in the game (step x), then see who has more

      let playertotal = this.playerCardValue;
      const enemytotal = this.enemyCardValue;
      if(this.stepid > 20){

      }
      else{
        playertotal += this.playerHandValue;
        if (playertotal <= enemytotal){
          console.log('You lose, sucker!', playertotal, enemytotal, this.playerHandValue);
          this.gameOver=true;
          this.winner='Enemy';
        }
      }


    },
    //advanceStep is done at the beginning of a step.
    //cardChosen is done in the middle/end of the step.
    advanceStep() {
      this.stepid++;
      console.log ('advancing to step ', this.stepid);
      switch (this.stepid) {
        case 1:
          this.allowHighlanderPick=false;
          this.showNewCardButton=false;

          let cards = this.pickCards(2);
          for (const card of cards) {
            //card.index = this.highlanderCards.length;
            this.highlanderCards.push(card);
          }
          this.setMessage("Click one card to move to your bonus hand");
          break;
        case 2: //add an item into the opposing highlander. If needed augment your highlander;
        case 4:
        this.allowHighlanderPick=false;
        this.showNewCardButton=false;
        const numtodraw = this.highlanderCards.length - this.enemyHighlanderCards.length;
        console.log ('drawing num cards: ', numtodraw);
        const dcards = this.pickCards(numtodraw);
          //card.index = 0;
          for(const card of dcards){
            this.enemyHighlanderCards.push(card);

          }

          const playervalue = this.playerCardValue;
          const enemyvalue = this.enemyCardValue;
          if (playervalue <= enemyvalue) {
            this.checkForWinner();
            if (this.gameOver){
              this.setMessage("You lose!");

            }
            else{
              this.setMessage("Pick card from your hand to assist your Highlander."); 
            }

          } else {
            this.advanceStep();

          }
          //if ()

          break;
        case 3: // user has picked a new card or opposing highlander card.
          this.allowHighlanderPick=true;
          this.showNewCardButton=true;
          this.bonusHighlanderCards.length = 0;
          this.setMessage(
            "You won the round.  Pick a new card or opposing highlander card to add to your highlander."
          );

          break;
        case 4:
      }
    },

    //id represents the id of the card chosen.
    cardChosen(id) {
      //const chosenCard = this.highlanderCards.splice(idx, 1)[0];
      let chosenCard;
      let idx;
      let transferCard;
      console.log ('chosen card id = ', id);
      switch (this.stepid) {
        case 1: //choosing from highlander to hand
          chosenCard = this.highlanderCards.find((x) => x.id == id);
          idx = this.highlanderCards.findIndex(x=> x.id == id);
          //idx = chosenCard.index;
          console.log('chosen index ', idx);
          if (idx === undefined) break;
          //console.log('Emitted ', chosenCard.suit, chosenCard.rank, chosenCard.index);
          transferCard = this.highlanderCards.splice(idx, 1)[0];
          this.handCards.push(transferCard);
          this.advanceStep();
          break;
        case 2: // having to move from hand to bonus highlander extra
          chosenCard = this.handCards.find((x) => x.id == id);
          if (!chosenCard) {
            console.log('invalid card picked');
            break;
          }
          idx = this.handCards.findIndex(x=> x.id == id);
          console.log('chosen card ', chosenCard);
          if (idx < 0 ) break;
          //idx = chosenCard.index;
          //console.log('Emitted ', chosenCard.suit, chosenCard.rank, chosenCard.index);
          transferCard = this.handCards.splice(idx, 1)[0];
          console.log('transfer card id', transferCard.id);
          this.bonusHighlanderCards.push(transferCard);
          console.log('bonus card length ', this.bonusHighlanderCards.length);
          this.advanceStep();   //in the first round, if they move a card, it is the only card, they have guaranteed a win.
          break;
        case 3: //chosen from the highlander hand
        chosenCard = this.enemyHighlanderCards.find( (x) => x.id == id);
        if (!chosenCard) {
          console.log('invalid card picked');
          break;
        }
        idx = this.enemyHighlanderCards.findIndex(x=> x.id == id);
        console.log('chosen card ', chosenCard);
        this.enemyHighlanderCards.splice(idx, 1);
        this.highlanderCards.push(chosenCard);
        this.advanceStep();   //move to round 4 where the values are compared.
        break;
      }
    },
  },
});

//I think this will be part of eventual conversion to Composition API.
// export default {
//   mounted() {
//       console.log('Component mounted.')
//   }

//app.component('yourComponentName',require('./components/yourComponentName.vue').default);

app.component("playing-card", {
  template: `<div class="card" :class="{red}" @click="pickme" >
  <div class="tl-rank">{{rank}}</div>
  <div class="tl-suit" v-html="suitHTMLCharacter"></div>
  <div class="br-rank">{{rank}}</div>
  <div class="br-suit" v-html="suitHTMLCharacter"></div>
  <div class="m-suit" v-html="suitHTMLCharacter"></div>
</div>`,
  props: ["rank", "suit", "value", "id", "index"],
  emits: {
    "card-chosen": function (id) {
      if (id) {
        return true;
      } else {
        console.warn("id is missing.");
        return false;
      }
    },
  },
  computed: {
    red() {
      return this.suit === "hearts" || this.suit === "diamonds";
    },
    suitHTMLCharacter() {
      if (this.suit === "diamonds") return "&diams;";
      return `&${this.suit.toLowerCase()}\;`;
    },
  },
  methods: {
    pickme() {
      //alert('chosen');
      //console.log('Chose ',this.suit, this.rank);
      this.$emit("card-chosen", this.id);
    },
  },
});

app.mount("#app");
