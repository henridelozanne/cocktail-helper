<template>
  <div>
    <img :src="mainResult.strDrinkThumb" alt="" class="w-56 h-56 rounded-lg">
    <div class="border bg-gray-400">
      <h1 class="font-bold">{{ mainResult.strDrink }}</h1>
      <h2 class="text-red-700">Ingredients : </h2>
      <span v-if="showIngredientDetails">{{ ingredientDetails }}</span>
      <ul class="text-teal-600">
        <li v-for="(ingredient, i) in ingredients" :key="`${i}-${ingredient.name}`" @click="searchIngredientDetails(ingredient)">{{ ingredient.name }}<span class="text-gray-500 italic">({{ ingredient.dose }})</span></li>
      </ul>
      <span class="text-red-700 block">Glass : <span class="text-teal-600">{{ mainResult.more.strGlass}}</span></span>
      <!-- Instructions -->
      <span class="text-red-700">Instructions :</span>
      <ul>
        <li v-for="instruction in instructions" :key="instruction" class="my-5">{{ instruction }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Cocktail',
  props: {
    mainResult: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ingredients: [],
      instructions: [],
      ingredientDetails: undefined,
      showIngredientDetails: false,
    };
  },
  mounted() {
    this.processIngredients();
    this.processInstructions();
    // console.log(this.ingredients);
  },
  methods: {
    processIngredients() {
      console.log('this.mainResult.more', this.mainResult.more);
      for (let i=1; i<=15; i+=1) {
        if (this.mainResult.more[`strIngredient${i}`] !== null) {
          this.ingredients.push({
            name: this.mainResult.more[`strIngredient${i}`],
            dose: this.mainResult.more[`strMeasure${i}`]})
        } else return;
      }
    },
    processInstructions() {
      this.instructions = this.mainResult.more.strInstructions.split('. ');
    },
    searchIngredientDetails(ingredient) {
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552')
        .then(response => {
          console.log({ response })
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
}
</script>
