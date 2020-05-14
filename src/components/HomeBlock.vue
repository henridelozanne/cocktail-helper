<template>
  <div class="home-block">
    <h1 class="home-block-title">{{ recommended ? 'Cocktail of the week' : 'Random cocktail'}}</h1>
      <div class="block-inner" :class="recommended ? 'green-background' : 'pink-background'" @click="emitLaunchModal">
        <div class="home-block-img" :style="`background-image: url('${detailedCocktail.strDrinkThumb}')`">
          <div class="cocktail-name">{{ detailedCocktail.strDrink }}</div>
        </div>
      </div>
  </div>
</template>

<script>
import Tag from "./Tag.vue";

export default {
  name: 'HomeBlock',
  props: {
    detailedCocktail: { type: Object, default: () => {} },
    recommended: { type: Boolean, default: false },
  },
  components: {
    tag: Tag
  },
  mounted() {
    this.process();
  },
  data() {
    return {
      glass: undefined,
      ingredients: [],
      instructions: []
    };
  },
  methods: {
    emitLaunchModal() {
      this.$emit('launchModal', this.detailedCocktail);
    },
    process() {
      this.processIngredients();
    },
    processIngredients() {
      this.ingredients = [];
      for (let i = 1; i <= 15; i += 1) {
        if (this.detailedCocktail[`strIngredient${i}`] !== null
            && this.detailedCocktail.more[`strIngredient${i}`] !== '') {
          this.ingredients.push({
            name: this.detailedCocktail[`strIngredient${i}`],
            dose: this.detailedCocktail[`strMeasure${i}`]
          });
        } else return;
      }
    },
  }
}
</script>

<style scoped lang="scss">
.home-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.block-inner {
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  box-shadow: 1px 2px 9px rgba(80, 80, 80, 0.7);

  &:hover {
    filter: brightness(108%);
  }
}

.pink-background {
  background: rgba(195, 190, 240, 0.4);
}

.green-background {
  background: rgba(154, 224, 215, 0.4);
}

.home-block-title {
  font-size: 24px;
  color: white;
  padding-bottom: 7px;
  border-bottom: 1px solid white;
  font-size: 0.9em;
  width: 100%;
  margin-bottom: 50px;
}

.home-block-img {
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  position: relative;
  height: 350px;
  width: 350px;

  .cocktail-name {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 10%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 20px 5px;
  }
}
</style>