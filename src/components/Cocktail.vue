<template>
  <div class="text-center cocktail-container" @mouseenter="switchHover(true)" @mouseleave="switchHover(false)">
    <div v-if="imageIsLoading" class="loading-ctn">
      <div class="loader">
      </div>
    </div>
    <div v-images-loaded:on.progress="imageProgress">
      <img :src="mainResult.strDrinkThumb" alt="" class="rounded-t" :class="{ 'img-hovered': hovered }"
       @click="launchCocktailModal">
    </div>
    <h1 class="cocktail-title font-bold text-white bg-gray-800 p-3 rounded-b"
        :class="{ 'text-hovered': hovered }"
        @click="launchCocktailModal">
        {{ mainResult.strDrink }}
    </h1>
    <el-dialog :visible.sync="showDetails"
               @close="hideModal">
        <div class="border bg-gray-400">
          <img :src="mainResult.strDrinkThumb" alt="" class="rounded-t">
          <h1 class="cocktail-title font-bold text-white bg-gray-800 p-3 rounded-b">
            {{ mainResult.strDrink }}
          </h1>
          <h2 class="text-red-700">Ingredients : </h2>
          <span>{{ ingredientDetails }}</span>
          <ul class="text-teal-600">
            <li v-for="(ingredient, i) in ingredients" :key="`${i}-${ingredient.name}`">{{ ingredient.name }}<span class="text-gray-500 italic">({{ ingredient.dose }})</span></li>
          </ul>
          <span class="text-red-700 block">Glass : <span class="text-teal-600">{{ mainResult.more.strGlass}}</span></span>
          <span class="text-red-700">Instructions :</span>
          <ul>
            <li v-for="instruction in instructions" :key="instruction" class="my-5">{{ instruction }}</li>
          </ul>
      </div>
      <span slot="footer">
        <el-button @click="showDetails = false">
          Close
        </el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import imagesLoaded from 'vue-images-loaded';
import { Button, Dialog } from 'element-ui';

export default {
  name: 'Cocktail',
  props: {
    mainResult: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    'el-button': Button,
    'el-dialog': Dialog,
  },
  directives: {
      imagesLoaded
  },
  data() {
    return {
      hovered: false,
      ingredients: [],
      instructions: [],
      ingredientDetails: undefined,
      showDetails: false,
      imageIsLoading: true,
    };
  },
  mounted() {
    this.processIngredients();
    this.processInstructions();
  },
  methods: {
    hideModal() {
      this.showDetails = false;
    },
    imageProgress(instance, image ) {
      // keep instance in arguments
      if (image.isLoaded) {
        this.imageIsLoading = false;
      }
    },
    launchCocktailModal() {
      this.showDetails = true;
    },
    switchHover(payload) {
      this.hovered = payload;
    },
    processIngredients() {
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
  },
}
</script>

<style scoped>
.cocktail-title {
  font-family: 'Teko', sans-serif;
  font-size: 27px;
}

.text-hovered {
  font-size: 30px;
  text-shadow: 1px 2px rgb(216, 109, 146);
}

.img-hovered {
  filter: brightness(1.05);
}

.cocktail-container {
  cursor: pointer;
}

h1 {
  max-height: 60px;
  line-height: 40px;
  text-overflow: ellipsis;
  text-shadow: 1px 2px rgb(109, 165, 216);
}

.loading-ctn {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(22,22,22);
background: linear-gradient(342deg, rgba(22,22,22,1) 0%, rgba(112,112,108,1) 100%);
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
}
.loader {
  color: rgb(113, 112, 112);
  font-size: 11px;
  text-indent: -99999em;
  margin: 55px auto;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  
}
.loader:before,
.loader:after {
  position: absolute;
  content: '';
}
.loader:before {
  width: 5.2em;
  height: 10.2em;
  background: rgb(181, 181, 181);
  border-radius: 10.2em 0 0 10.2em;
  top: -0.1em;
  left: -0.1em;
  -webkit-transform-origin: 5.2em 5.1em;
  transform-origin: 5.2em 5.1em;
  -webkit-animation: load2 2s infinite ease 1.5s;
  animation: load2 2s infinite ease 1.5s;
}
.loader:after {
  width: 5.2em;
  height: 10.2em;
  background: rgb(228, 228, 228);
  border-radius: 0 10.2em 10.2em 0;
  top: -0.1em;
  left: 5.1em;
  -webkit-transform-origin: 0px 5.1em;
  transform-origin: 0px 5.1em;
  -webkit-animation: load2 2s infinite ease;
  animation: load2 2s infinite ease;
}
@-webkit-keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>