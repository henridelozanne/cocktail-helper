<template>
  <div class="navbar">
    <app-title class="app-title" @click="callWebsiteTitleClick" @websiteTitleClicked="callWebsiteTitleClick"></app-title>
    <div class="selects">
      <el-select v-model="ingredient" class="ingredient-select" placeholder="Ingredients" @change="callSearchCocktails('i')">
        <el-option
          v-for="item in ingredientOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="category"  placeholder="Categories" @change="callSearchCocktails('c')">
        <el-option
          v-for="item in categoryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="glass"  placeholder="Glasses" class="glass-select" @change="callSearchCocktails('g')">
        <el-option
          v-for="item in glassOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="alcoholic"  placeholder="Alcoholic" @change="callSearchCocktails('a')">
        <el-option
          v-for="item in alcoholicOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <input class="search-bar" placeholder="Search by name" type="text" v-model="searchName" @input="callSearchName" @keyup.enter="callSearchName">
    <svg class="menu-burger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/></svg>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui';
import axios from 'axios';

import Title from './WebsiteTitle.vue';

export default {
  name: 'Navbar',
  props: {},
  components: {
    'el-select': Select,
    'el-option': Option,
    'app-title': Title,
  },
  mounted() {
    this.fillOptions();
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
      searchName: undefined,
    };
  },
  methods: {
    resetSelects() {
      this.alcoholic = '';
      this.category = '';
      this.glass = '';
      this.ingredient = '';
    },
    callSearchCocktails(type) {
      let filter;
      if (type === 'i') {
        filter = this.ingredient;
        this.alcoholic = '';
        this.category = '';
        this.glass = '';
        this.searchName = '';
      } else if (type === 'c') {
        filter = this.category;
        this.alcoholic = '';
        this.ingredient = '';
        this.glass = '';
        this.searchName = '';
      } else if (type === 'g') {
        filter = this.glass;
        this.alcoholic = '';
        this.category = '';
        this.ingredient = '';
        this.searchName = '';
      } else if (type === 'a') {
        filter = this.alcoholic;
        this.ingredient = '';
        this.category = '';
        this.glass = '';
        this.searchName = '';
      }
      this.$emit('searchCocktail', { type, filter });
    },
    callSearchName() {
      this.$emit('searchName', this.searchName);
      this.resetSelects();
    },
    callWebsiteTitleClick() {
      this.$emit('websiteTitleClicked');
      this.resetSelects();
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
                if (category.strCategory !== 'Cocoa') {
                    this.categoryOptions.push({
                    value: category.strCategory,
                    label: category.strCategory,
                  })
                }
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
  },
}
</script>

<style>
.el-select .el-input__inner {
  background: rgb(97, 97, 97);
  border: unset;
  color: white;
}

.el-select input {
  height: 24px !important;
}

.el-select__caret {
  line-height: 24px;
}
</style>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 110px;
  background: linear-gradient(to bottom, rgb(38, 38, 38) 0%, rgb(60, 60, 60) 40%, rgb(14, 14, 14) 150%), linear-gradient(to bottom, rgba(60, 60, 60, 0.4) 0%, rgba(55, 55, 55, 0.25) 200%);
  background-blend-mode: multiply;
  box-shadow: 0 3px 7px rgba(0, 0, 0, .5);
  padding: 5px 20px;
  position: fixed;
  top: 0;
  width: 100%;
}

.selects {
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.selects .el-select {
  margin: 5px 0;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, .9);
}

.search-bar {
  border-radius: 5px;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  box-shadow: 2px 2px 8px rgba(0, 0, 0, .9);
}

.menu-burger {
  display: none;
  width: 40px;
  height: 40px;
  fill: white;
  cursor: pointer;
}

@media screen and (max-width: 1023px) {
    .selects {
      display: none;
    }

    .search-bar {
      display: none;
    }

    .menu-burger {
      display: block;
    }
}
</style>