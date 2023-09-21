<!-- not in use at this time. -->

<template>
  <div class="card" :class="{ red }">
    <div class="tl-rank">{{ rank }}</div>
    <div class="tl-suit" v-html="suitHTMLCharacter"></div>
    <div class="br-rank">{{ rank }}</div>
    <div class="br-suit" v-html="suitHTMLCharacter"></div>
    <div class="m-suit" v-html="suitHTMLCharacter"></div>
  </div>
</template>

<script>

export default {
  props: ["rank", "suit"],
  red() {
    return this.suit === "hearts" || this.suit === "diamonds";
  },
  suitHTMLCharacter() {
    if (this.suit === "diamonds") return "&diams;";
    return `&${this.suit.toLowerCase()}\;`;
  },
};
</script>
