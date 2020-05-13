<template>
  <div class="home-block">
    <h1 class="home-block-title">{{ recommended ? 'Month\'s selection' : 'Random cocktail'}}</h1>
      <div class="home-block-img" :style="`background-image: url('${detailedCocktail.strDrinkThumb}')`">
        <div class="cocktail-name">{{ detailedCocktail.strDrink }}</div>
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
    process() {
      this.processIngredients();
    },
    processIngredients() {
      this.ingredients = [];
      for (let i = 1; i <= 15; i += 1) {
        if (this.detailedCocktail[`strIngredient${i}`] !== null) {
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
  height: 420px;
  width: 420px;

  .cocktail-name {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 10%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 20px 5px;
  }
}
</style>