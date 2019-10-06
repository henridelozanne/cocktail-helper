<template>
  <div>
    <app-title></app-title>
    <div class="selects">
      <el-select :automatic-dropdown="true" v-model="ingredient" class="ingredient-select" placeholder="Ingredients" @change="callSearchCocktails('i')">
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
    <input class="search-bar" placeholder="Search by name" type="text" v-model="searchName" @keyup.enter="callSearchName">
  </div>
</template>

<script>
import { Select, Option } from 'element-ui';
import axios from 'axios';

import Title from './Title.vue';

export default {
  name: 'Header',
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
  },
}
</script>

<style scoped>
.selects {
  max-width: 550px;
}

.selects .el-select {
  margin: 5px 0;
}

.selects .ingredient-select {
  margin-right: 40px;
}

.selects .glass-select {
  margin-right: 40px;  
}
</style>