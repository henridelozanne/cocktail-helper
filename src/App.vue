<template>
  <div>
    <div class="top-bar">
      <el-select v-model="ingredient"  placeholder="Ingredients" @change="searchCocktails('i')">
        <el-option
          v-for="item in ingredientOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="category"  placeholder="Categories" @change="searchCocktails('c')">
        <el-option
          v-for="item in categoryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="glass"  placeholder="Glasses" @change="searchCocktails('g')">
        <el-option
          v-for="item in glassOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="alcoholic"  placeholder="Alcoholic" @change="searchCocktails('a')">
        <el-option
          v-for="item in alcoholicOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <button @click="getRandomCocktail" class="text-white">RANDOM</button>
      <input class="search-bar" placeholder="Search by name" type="text" v-model="searchName" @keyup.enter="searchByName">
    </div>
    <div class="results-ctn flex flex-wrap">
      <span v-if="noResultIsVisible">pas de résultats</span>
      <app-cocktail v-else v-for="result in mainResult" :mainResult="result" :key="result.strDrink" class="cocktail-thumbnail m-4"/>
    </div>
    <div class="letters-ctn">
      <div class="letter" v-for="letter in letters" :key="letter" @click="searchByLetter(letter)">{{ letter | capitalize }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Select, Option } from 'element-ui';

import Cocktail from './components/Cocktail';

export default {
  name: 'app',
  components: {
    'el-select': Select,
    'el-option': Option,
    'app-cocktail': Cocktail,
  },
  mounted() {
    this.fillOptions();
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552')
        .then(response => {
          console.log({ response })
        })
        .catch(err => {
          console.error(err)
        })
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      return value.toUpperCase()
    },
  },
  methods: {
    getRandomCocktail() {
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => {
          this.mainResult = [];
          this.noResultIsVisible = false;
          this.searchMoreDetails(response);
        })
        .catch(err => {
          console.error(err)
        })
    },
    fillOptions() {
      const options = ['i', 'c', 'g', 'a'];
      options.forEach((option) => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${option}=list`)
          .then(response => {
            if (option === 'i') {
              response.data.drinks.forEach((ingredient) => {
                this.ingredientOptions.push({
                  value: ingredient.strIngredient1,
                  label: ingredient.strIngredient1,
                })
              });
            } else if (option === 'c') {
              response.data.drinks.forEach((category) => {
                this.categoryOptions.push({
                  value: category.strCategory,
                  label: category.strCategory,
                })
              });
            } else if (option === 'g') {
              response.data.drinks.forEach((glass) => {
                this.glassOptions.push({
                  value: glass.strGlass,
                  label: glass.strGlass,
                })
              });
            } else if (option === 'a') {
              response.data.drinks.forEach((alcoholic) => {
                this.alcoholicOptions.push({
                  value: alcoholic.strAlcoholic,
                  label: alcoholic.strAlcoholic,
                })
              });
            }
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.error(err);
          })
      });
    },
    searchByName() {
      // Reset
      this.mainResult = [];
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.searchName}`)
        .then(response => {
          console.log({ response })
          if (response.data.drinks !== null) {
            this.noResultIsVisible = false;
            this.searchMoreDetails(response);
          } else this.noResultIsVisible = true;
        })
        .catch(err => {
          console.error(err)
        })
    },
    searchMoreDetails(results) {
      results.data.drinks.forEach((drink) => {
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`)
            .then(response => {
              drink.more = response.data.drinks[0];
              this.mainResult.push(drink);
            })
            .catch(err => {
              console.error(err)
            })
          });
    },
    searchByLetter(letter) {
      // Reset
      this.mainResult = [];
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => {
          if (response.data.drinks !== null) {
            this.noResultIsVisible = false;
            this.searchMoreDetails(response);
          } else this.noResultIsVisible = true;
        })
        .catch(err => {
          console.error(err)
        })
    },
    searchCocktails(type) {
      // Reset
      this.mainResult = [];
      let source;
      if (type === 'i') {
        source = this.ingredient;
        this.alcoholic = '';
        this.category = '';
        this.glass = '';
      } else if (type === 'c') {
        source = this.category;
        this.alcoholic = '';
        this.ingredient = '';
        this.glass = '';
      } else if (type === 'g') {
        source = this.glass;
        this.alcoholic = '';
        this.category = '';
        this.ingredient = '';
      } else if (type === 'a') {
        source = this.alcoholic;
        this.ingredient = '';
        this.category = '';
        this.glass = '';
      }
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${type}=${source}`)
        .then(response => {
          if (response.data.drinks !== null) {
            this.noResultIsVisible = false;
            this.searchMoreDetails(response);
          } else this.noResultIsVisible = true;
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
  data() {
    return {
      alcoholic: '',
      alcoholicOptions: [],
      category: '',
      categoryOptions: [],
      glass: '',
      glassOptions: [],
      ingredient: '',
      ingredientOptions: [],
      letters: [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      ],
      mainResult: [],
      noResultIsVisible: false,
      searchName: undefined,
    };
  },
}
</script>

<style>
body {
  background: rgb(19, 19, 19);
}

.letter {
  border: 1px solid black;
  background: white;
  border-radius: 3px;
  padding: 5px;
  margin: 0 2px;
  width: 30px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}

.letter:hover {
  color: white;
  background: black;
}

.search-bar {
  border: 1px solid black;
  padding: 10px 15px;
  min-width: 200px;
}

.top-bar {
  display: flex;
  justify-content: space-around;
}

.letters-ctn {
  position: fixed;
  bottom: 10px;
  text-align: center;
  width: 100%;
}

.results-ctn {
  max-height: 720px;
  overflow: scroll;
}

.cocktail-thumbnail {
  width: 300px;
}
</style>