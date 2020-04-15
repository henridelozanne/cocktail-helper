<template>
  <div class="text-center cocktail-container" @mouseenter="switchHover(true)" @mouseleave="switchHover(false)">
    <div v-if="imageIsLoading" class="loading-ctn">
      <div class="loader">
      </div>
    </div>
    <div v-images-loaded:on.progress="imageProgress" class="img-ctn">
      <img :src="mainResult.strDrinkThumb" :class="{ 'img-hovered': hovered }"
       @click="launchCocktailModal">
    </div>
    <h1 class="cocktail-title font-bold text-white p-3"
        :class="{ 'text-hovered': hovered }"
        @click="launchCocktailModal">
        {{ mainResult.strDrink }}
    </h1>
    <el-dialog :visible.sync="showDetails"
               @close="hideModal">
      <cocktail-modal :mainResult="mainResult"/>
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

import CocktailModal from './CocktailModal.vue';

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
    'cocktail-modal': CocktailModal,
  },
  directives: {
      imagesLoaded
  },
  data() {
    return {
      hovered: false,
      showDetails: false,
      imageIsLoading: true,
    };
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
  },
}
</script>

<style lang="scss" scoped>
.cocktail-container {
  cursor: pointer;
  width: 250px;
  margin: 30px;
  box-shadow: 2px 5px 7px rgba(0, 0, 0, .2);
  border-radius: 5px;
  overflow: hidden;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}

.cocktail-title {
  max-height: 60px;
  line-height: 40px;
  text-overflow: ellipsis;
  color: rgb(57, 57, 57);
}

.img-ctn {
  padding: 10px 10px 0;
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

<style lang="scss">
.el-dialog__wrapper {
  cursor: default;

  .el-dialog {
    width: 70% !important;

    .el-dialog__header {
      display: none !important;
    }

    .el-dialog__body {
      // padding: 0 !important;
    }

    .el-dialog__footer {
      display: none !important;
    }
  }
}
</style>