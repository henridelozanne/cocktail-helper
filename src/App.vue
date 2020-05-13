<template>
  <div class="app-wrapper">
    <app-navbar @searchCocktail="searchCocktails"
                @searchName="searchByName"
                @websiteTitleClicked="websiteTitleClicked" />
    <div class="main-ctn">
      <div class="home-blocks">
        <app-home-block class="recommended" :detailedCocktail="recommendedCocktail" v-if="recommendedIsReady" :recommended="true"></app-home-block>
        <app-home-block class="random" :detailedCocktail="randomCocktail" v-if="randomCocktailIsReady"></app-home-block>
      </div>
      <p v-if="true" class="results-for">Results for > {{ resultsFor }}</p>
      <div class="results-ctn">
        <app-no-result v-if="noResultIsVisible" />
        <app-cocktail v-else v-for="result in results"
                      ref="cocktail-item"
                      :cocktail="result"
                      :key="result.strDrink"
                      @launchModal="launchModal"/>
      </div>
    </div>
    <el-dialog :visible.sync="showDetails"
               @close="hideModal">
      <cocktail-modal :detailedCocktail="detailedCocktail" :showDetails="showDetails"/>
    </el-dialog>
    <app-footer @newLetterSearch="searchByLetter" />
  </div>
</template>

<script>
import axios from "axios";
import gsap from "gsap";
import { Button, Dialog } from "element-ui";

import Cocktail from "./components/Cocktail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NoResult from "./components/NoResult";
import CocktailModal from "./components/CocktailModal.vue";
import HomeBlock from "./components/HomeBlock.vue";

export default {
  name: "App",
  components: {
    "app-cocktail": Cocktail,
    "app-navbar": Navbar,
    "app-footer": Footer,
    "app-no-result": NoResult,
    "app-home-block": HomeBlock,
    "el-button": Button,
    "el-dialog": Dialog,
    "cocktail-modal": CocktailModal,
  },
  mounted() {
    this.searchCocktails({ type: 'c', filter: 'Cocktail' });
    gsap.from('.results-for', {
      opacity: 0,
      duration: 1,
    });
    this.processRecommendedCocktail();
    this.processRandom();
  },
  data() {
    return {
      results: [],
      noResultIsVisible: false,
      showDetails: false,
      detailedCocktail: {},
      resultsFor: 'Popular searches',
      showHomeBlocks: true,
      recommendedCocktail: undefined,
      recommendedIsReady: false,
      randomCocktail: undefined,
      randomCocktailIsReady: false,
    };
  },
  methods: {
    processRandom() {
      axios
        .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => {
          this.randomCocktail = response.data.drinks[0];
          this.randomCocktailIsReady = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    processRecommendedCocktail() {
      axios
        .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=moscow')
        .then(response => {
          this.recommendedCocktail = response.data.drinks[0];
          this.recommendedIsReady = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    websiteTitleClicked() {
      this.searchCocktails({ type: 'c', filter: 'Cocktail' });
    },
    animateResult() {
      gsap.to(".cocktail-ctn", {
        duration: .5,
        opacity: 1,
        ease: "power1",
        stagger: {
          each: 0.05,
        }
      });
    },
    hideModal() {
      this.showDetails = false;
    },
    launchModal(cocktail) {
      const detailedCocktail = cocktail;
      axios
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`
        )
        .then(response => {
          detailedCocktail.more = response.data.drinks[0];
          this.detailedCocktail = detailedCocktail;
          this.showDetails = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    searchByName(name) {
      // Reset
      this.results = [];
      axios
        .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(response => {
          if (response.data.drinks !== null) {
            this.noResultIsVisible = false;
            this.results = response.data.drinks;
            setTimeout(() => {
              this.animateResult();
            }, 400);
          } else this.noResultIsVisible = true;
        })
        .catch(err => {
          console.error(err);
        });
        this.resultsFor = name;
    },
    searchByLetter(letter) {
      // Reset
      this.results = [];
      axios
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
        )
        .then(response => {
          if (response.data.drinks !== null) {
            this.noResultIsVisible = false;
            this.results = response.data.drinks;
            setTimeout(() => {
              this.animateResult();
            }, 400);
          } else {
            this.noResultIsVisible = true;
            }
        })
        .catch(err => {
          console.error(err);
        });
        this.resultsFor = letter.toUpperCase();
    },
    searchCocktails(payload) {
      // Reset
      this.results = [];
      axios
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${payload.type}=${payload.filter}`
        )
        .then(response => {
          if (response.data.drinks !== null) {
            this.noResultIsVisible = false;
            this.results = response.data.drinks;
            setTimeout(() => {
              this.animateResult();
            }, 400);
          } else this.noResultIsVisible = true;
        })
        .catch(err => {
          console.error(err);
        });
        this.resultsFor = payload.filter;
    }
  }
};
</script>

<style lang="scss">
.app-wrapper {
  height: 100%;
  display: flex;
  flex-flow: column;
  font-family: "Montserrat", sans-serif;
}

.search-bar {
  padding: 10px 15px;
  min-width: 200px;
}

.main-ctn {
  background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; 
  background-blend-mode: multiply,multiply;
  padding: 20px 100px;
  flex-grow: 1;
  overflow: scroll;
  margin-top: 110px;
}

@media screen and (max-width: 1200px) {
  .main-ctn {
    padding: 20px 20px;
  }
}

.results-for {
  margin: 20px 30px 25px;
  padding-bottom: 7px;
  color: white;
  border-bottom: 1px solid white;
  font-size: 0.9em;
}

.results-ctn {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  // margin-top: 110px;
  
}

@media screen and (max-width: 1200px) {
  .results-ctn {
    // padding: 20px 20px;
  }
}

.cocktail-ctn {
  opacity: 0;
  // transform: scale(.5) translateY(200px);
}

.home-blocks {
  height: 500px;
  display: flex;
  justify-content: space-around;
  margin: 30px 0;

  >div {
    width: 45%;
  }
}

.el-dialog__wrapper {
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);

  .el-dialog {
    background: linear-gradient(
        to bottom,
        #323232 0%,
        #3f3f3f 40%,
        #1c1c1c 150%
      ),
      linear-gradient(
        to top,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(0, 0, 0, 0.25) 200%
      );
    background-blend-mode: multiply;
    width: 60%;
    max-width: 840px;
    margin: 0 !important;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

    .el-dialog__header {
      display: none !important;
    }

    .el-dialog__body {
      color: rgb(215, 215, 215);
      word-break: unset !important;
    }

    .el-dialog__footer {
      display: none !important;
    }
  }

  @media screen and (max-width: 768px) {
    .el-dialog {    
      width: 90%;
    }
  }
}
</style>
