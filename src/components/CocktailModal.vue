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
                    <span>{{ glass }}</span>
                </span>
                <div v-if="ingredients.length" class="ingredients-ctn">
                    <tag tagType="ingredients"/>
                    <ul>
                        <li v-for="(ingredient, i) in ingredients" :key="`${i}-${ingredient.name}`">
                            {{ ingredient.name }}
                            <span v-if="ingredient.dose">({{ ingredient.dose }})</span>
                        </li>
                    </ul>
                </div>
                <div v-if="instructions.length" class="instructions-ctn">
                    <tag tagType="instructions"/>
                    <ol v-if="instructions.length > 1">
                        <li v-for="instruction in instructions" :key="instruction">{{ instruction }}</li>
                    </ol>
                    <span v-else class="one-step-instruction">{{ instructions[0] }}</span>
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
    }
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
      this.ingredients = [];
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
      // Set instructions via ". "
      const instructions = this.detailedCocktail.more.strInstructions.split(
        ". "
      );
      const processedInstructions = instructions.map((instruction, i) => {
        // Remove empty instructions
        if (instruction === '') {
          instructions.splice(i, 1);
        }
        // Capitalize first word
        let [firstWord] = instruction.split(' ');
        firstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1)
        const instructionSplitted = instruction.split(' ');
        instructionSplitted[0] = firstWord;
        const corrected = instructionSplitted.join(' ');
        return instruction = corrected;
      }) 
      this.instructions = processedInstructions;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-content {
  display: flex;

  .main-image-ctn {
    flex-grow: 3;
    flex-basis: 60%;
    display: flex;
    align-items: center;

    .modal-img {
      object-fit: cover;
    }
  }

  .description {
    flex-basis: 40%;
    flex-grow: 2;
    min-height: 100%;
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
      justify-content: space-evenly;
      margin-top: 10%;
      margin-bottom: auto;
      overflow: scroll;

      .glass-ctn {
        margin-bottom: 30px;
        display: flex;
        align-items: center;

        span {
          margin-left: 10px;
        }
      }

      .ingredients-ctn {
        margin-bottom: 30px;

        ul {
          margin-top: 10px;
          list-style-type: disc !important;
          margin-left: 20px;

          li:not(:last-of-type) {
            margin-bottom: 5px;
          }
        }
      }

      .instructions-ctn {
        ol {
          margin-top: 10px;
          list-style-type: decimal !important;
          margin-left: 20px;

          li:not(:last-of-type) {
            margin-bottom: 5px;
          }
        }

        .one-step-instruction {
          display: block;
          margin-top: 10px;
        }
      }
    }
  }
}

@media screen and (max-width: 1279px) {
  .modal-content {
    flex-direction: column;
    overflow: hidden;
    
    .main-image-ctn {
      justify-content: center;
    
      .modal-img {
        max-width: 70%;
      }
    }

    .description {
      margin-top: 50px;

      .description-main {
        margin-top: 4%;
        height: 200px;
        justify-content: flex-start;
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .modal-content {    
    .main-image-ctn {    
      .modal-img {
        max-width: 85%;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .modal-content {    
    .main-image-ctn {    
      .modal-img {
        max-width: 70%;
      }
    }

    .description {
      .description-main {
        height: 150px;
      }
    }
  }
}
</style>