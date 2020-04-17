<template>
  <div class="cocktail-ctn" @click="emitLaunchModal">
    <div class="img-ctn">
      <img :src="cocktail.strDrinkThumb">
    </div>
    <h1 class="cocktail-title font-bold text-white p-3 text-center">
      {{ cocktail.strDrink }}
    </h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Cocktail",
  props: {
    cocktail: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    emitLaunchModal() {
      this.$emit('launchModal', this.cocktail);
    }
  }
};
</script>

<style lang="scss" scoped>
.cocktail-ctn {
  cursor: pointer;
  width: 250px;
  margin: 30px;
  box-shadow: 2px 5px 7px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}

.cocktail-title {
  max-height: 60px;
  line-height: 40px;
  text-overflow: ellipsis;
  color: rgb(57, 57, 57);
}

.img-ctn {
  padding: 10px 10px 0;
}
</style>
