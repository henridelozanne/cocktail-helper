<template>
  <div class="app-wrapper">
    <app-navbar @searchCocktail="searchCocktails"
                @searchName="searchByName" />
    <div class="results-ctn">
      <app-no-result v-if="noResultIsVisible" />
      <app-cocktail v-else v-for="result in results"
                    ref="cocktail-item"
                    :cocktail="result"
                    :key="result.strDrink"
                    @launchModal="launchModal"/>
    </div>
    <el-dialog :visible.sync="showDetails"
               @close="hideModal">
      <cocktail-modal :detailedCocktail="detailedCocktail"/>
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

export default {
  name: "App",
  components: {
    "app-cocktail": Cocktail,
    "app-navbar": Navbar,
    "app-footer": Footer,
    "app-no-result": NoResult,
    "el-button": Button,
    "el-dialog": Dialog,
    "cocktail-modal": CocktailModal,
  },
  mounted() {
    this.searchByLetter("a");
  },
  data() {
    return {
      results: [],
      noResultIsVisible: false,
      showDetails: false,
      detailedCocktail: {},
    };
  },
  methods: {
    animateResult() {
      gsap.to(".cocktail-ctn", {
        duration: .5,
        opacity: 1,
        scale: 1,
        y: 0,
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
          } else this.noResultIsVisible = true;
        })
        .catch(err => {
          console.error(err);
        });
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

.results-ctn {
  background: linear-gradient(to bottom, #d5dee7 0%, #e8ebf2 50%, #e2e7ed 100%),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.02) 50%,
      rgba(255, 255, 255, 0.02) 61%,
      rgba(0, 0, 0, 0.02) 73%
    ),
    linear-gradient(33deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
  background-blend-mode: normal, color-burn;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 80px;
  overflow: scroll;
  padding: 20px;
}

.cocktail-ctn {
  opacity: 0;
  transform: scale(.5) translateY(200px);
}

.el-dialog__wrapper {
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;

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
    max-height: 90%;
    margin: 0 !important;

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
