<template>
    <div class="modal-content">
        <div class="main-image-ctn">
            <img class="modal-img" :src="detailedCocktail.strDrinkThumb" alt="cocktail-img">
        </div>
        <div class="description">
            <h1 class="cocktail-title text-center">
                {{ detailedCocktail.strDrink }}
            </h1>
            <div class="description-main">
                <span v-if="glass" class="glass-ctn">
                    <tag tagType="glass"/>
                    {{ glass}}
                </span>
                <div v-if="ingredients.length" class="ingredients-ctn">
                    <tag tagType="ingredients"/>
                    <ul>
                        <li v-for="(ingredient, i) in ingredients" :key="`${i}-${ingredient.name}`">{{ ingredient.name }}
                            <span>({{ ingredient.dose }})</span>
                        </li>
                    </ul>
                </div>
                <div v-if="instructions.length" class="instructions-ctn">
                    <tag tagType="instructions"/>
                    <ul>
                        <li v-for="instruction in instructions" :key="instruction">{{ instruction }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tag from "./Tag.vue";
export default {
  name: "CocktailModal",
  props: {
    detailedCocktail: { type: Object }
  },
  components: {
    tag: Tag
  },
  data() {
    return {
      glass: undefined,
      ingredients: [],
      instructions: []
    };
  },
  mounted() {
    this.process();
  },
  watch: {
    detailedCocktail() {
      this.process();
    },
  },
  methods: {
    process() {
      this.processGlass();
      this.processIngredients();
      this.processInstructions();
    },
    processGlass() {
      this.glass = this.detailedCocktail.more.strGlass;
    },
    processIngredients() {
      for (let i = 1; i <= 15; i += 1) {
        if (this.detailedCocktail.more[`strIngredient${i}`] !== null) {
          this.ingredients.push({
            name: this.detailedCocktail.more[`strIngredient${i}`],
            dose: this.detailedCocktail.more[`strMeasure${i}`]
          });
        } else return;
      }
    },
    processInstructions() {
      this.instructions = this.detailedCocktail.more.strInstructions.split(". ");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-content {
  display: flex;
  height: 490px;

  .main-image-ctn {
    flex-grow: 3;
    flex-basis: 60%;
    height: 100%;

    .modal-img {
      height: 490px;
    }
  }

  .description {
    flex-basis: 40%;
    flex-grow: 2;
    height: 100%;
    overflow: scroll;
    margin-left: 20px;
    display: flex;
    flex-direction: column;

    .cocktail-title {
      font-family: "Vast Shadow", cursive;
      font-size: 27px;
      color: rgb(244, 244, 244);
    }

    .description-main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .tag {
        display: flex;
        background: rgb(218, 218, 218);

        .modal-icon {
          display: inline;
          height: 20px;
          fill: #606266;
        }
      }

      .glass-ctn {
        margin-bottom: 20px;
      }

      .ingredients-ctn {
        margin-bottom: 20px;
      }
    }
  }
}
</style>