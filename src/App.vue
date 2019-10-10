<template>
  <div>
    <app-header class="top-bar"
                @searchCocktail="searchCocktails"
                @searchName="searchByName" />
    <div class="results-ctn flex flex-wrap">
      <span v-if="noResultIsVisible">pas de résultats</span>
      <app-cocktail v-else v-for="result in mainResult" ref="cocktail-item" :mainResult="result" :key="result.strDrink" class="cocktail-thumbnail m-4"/>
    </div>
    <div class="letters-ctn">
      <div class="letter" v-for="letter in letters" :key="letter" @click="searchByLetter(letter)">{{ letter | capitalize }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Cocktail from './components/Cocktail';
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    'app-cocktail': Cocktail,
    'app-header': Header,
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      return value.toUpperCase()
    },
  },
  data() {
    return {
      letters: [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      ],
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
body {
  background: rgb(19, 19, 19);
  background-image: linear-gradient(to right, rgb(19, 19, 19) 0%, rgb(34, 32, 32) 100%);
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
  height: 80px
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