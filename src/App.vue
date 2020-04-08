<template>
  <div>
    <app-header class="top-bar"
                @searchCocktail="searchCocktails"
                @searchName="searchByName" />
    <div class="results-ctn flex flex-wrap">
      <app-no-result v-if="noResultIsVisible" />
      <app-cocktail v-else v-for="result in mainResult" ref="cocktail-item" :mainResult="result" :key="result.strDrink" class="cocktail-thumbnail m-4"/>
    </div>
    <app-footer @newLetterSearch="searchByLetter" />
  </div>
</template>

<script>
import axios from 'axios';

import Cocktail from './components/Cocktail';
import Header from './components/Header';
import Footer from './components/Footer';
import NoResult from './components/NoResult';

export default {
  name: 'App',
  components: {
    'app-cocktail': Cocktail,
    'app-header': Header,
    'app-footer': Footer,
    'app-no-result': NoResult,
  },
  mounted() {
    this.searchByLetter('a');
  },
  data() {
    return {
      mainResult: [],
      noResultIsVisible: false,
    };
  },
  methods: {
    searchByName(name) {
      // Reset
      this.mainResult = [];
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
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
    searchCocktails(payload) {
      // Reset
      this.mainResult = [];
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${payload.type}=${payload.filter}`)
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
}
</script>

<style>
.search-bar {
  border: 1px solid black;
  padding: 10px 15px;
  min-width: 200px;
}

.top-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  background: linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);
  background-blend-mode: multiply;
  box-shadow: 0 5px 5px rgba(0, 0, 0, .8);
  padding: 5px 20px;
}

.results-ctn {
  max-height: 720px;
  overflow: scroll;
  background: rgba(203, 245, 252, 0.8);
}

.cocktail-thumbnail {
  width: 300px;
}
</style>
