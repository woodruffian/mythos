<!-- not in use at this time. -->
<template></template>

<script>
import { ref, computed, watch } from 'vue';

export default {
   setup() {
    const deck = reactive([]);
    const drawnCards = reactive([]);
    const drawnCard = reactive({});

    function makeDeck() {

      this.drawnCards= [];
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
    }

    function drawCard() {
      if (this.deck.length > 0) {
        var randIndex = Math.floor(Math.random() * this.deck.length);
        this.drawnCard = this.deck.splice(randIndex, 1)[0];
        this.drawnCards.push(this.drawnCard);
        console.log(this.drawnCard);
      }
    }

    makeDeck();

    return {
      deck:  deck,
      drawnCards: drawnCards,
      drawnCard:  drawnCard,
      cardCount: drawnCards.length,
      drawCard:  drawCard
    };
  },

}


</script>
