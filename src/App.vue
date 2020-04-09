<template>
  <div class="app-wrapper">
    <app-navbar @searchCocktail="searchCocktails"
                @searchName="searchByName" />
    <div class="results-ctn">
      <app-no-result v-if="noResultIsVisible" />
      <app-cocktail v-else v-for="result in mainResult"
                    ref="cocktail-item"
                    :mainResult="result"
                    :key="result.strDrink"/>
    </div>
    <app-footer @newLetterSearch="searchByLetter" />
  </div>
</template>

<script>
import axios from 'axios';

import Cocktail from './components/Cocktail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NoResult from './components/NoResult';

export default {
  name: 'App',
  components: {
    'app-cocktail': Cocktail,
    'app-navbar': Navbar,
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
.app-wrapper {
  height: 100%;
  display: flex;
  flex-flow: column;
}

.search-bar {
  padding: 10px 15px;
  min-width: 200px;
}

.results-ctn {
  /* background-image: linear-gradient(to right, #6e7880 0%, #404749 100%); */
  background-image: radial-gradient(circle at 0, #6e7880 0, #404749 100%);
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 80px;
  overflow: scroll;
  padding: 20px;
}
</style>
