<template>
  <div class="cocktail-ctn" @click="emitLaunchModal">
    <div class="img-ctn">
      <div class="inner">
        <img :src="cocktail.strDrinkThumb">
      </div>
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
  box-shadow: 1px 2px 9px rgba(220, 220, 220, 0.3);
  border-radius: 5px;
  overflow: hidden;
  background-image: linear-gradient(45deg, #8baaaa 0%, #ae8b9c 100%);
}

.cocktail-title {
  max-height: 60px;
  line-height: 40px;
  text-overflow: ellipsis;
  color: rgb(242, 242, 242);
  font-size: 20px;
}

.img-ctn {
  padding: 10px 10px 0;
}

.inner {
  padding: 3px 4px;
  background-image: linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #d0c4c4 48%, #cbc5c5 75%, #bcbcbc 100%);
}
</style>
