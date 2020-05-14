<template>
  <div class="cocktail-ctn" :id="`${randomId}-cocktail-ctn`" @click="emitLaunchModal"
       @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="img-ctn">
      <div class="inner" :id="`${randomId}-inner`">
        <img :src="cocktail.strDrinkThumb">
      </div>
    </div>
    <h1 :id="`${randomId}-cocktail-title`" class="cocktail-title font-bold text-white p-3 text-center">
      {{ cocktail.strDrink }}
    </h1>
  </div>
</template>

<script>
import axios from "axios";
import gsap from "gsap";

export default {
  name: "Cocktail",
  props: {
    cocktail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      randomId: undefined,
    };
  },
  created() {
    this.makeId(8);
  },
  methods: {
    makeId(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      for (let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      this.randomId = result;
    },
    emitLaunchModal() {
      this.$emit('launchModal', this.cocktail);
    },
    mouseEnter() {
      gsap.to(`#${this.randomId}-cocktail-ctn`, {
        duration: 0.3,
        'background-image': 'linear-gradient(to top, rgb(169, 166, 166) 0%, rgb(169, 164, 164) 1%, #aba6a6 26%, #837c7c 48%, #7b7575 75%, #9d9d9d 100%)',
      });
      gsap.to(`#${this.randomId}-cocktail-title`, {
        duration: 0.3,
        color: '#e6e9f0',
      });
      gsap.to(`#${this.randomId}-inner`, {
        duration: 0.3,
        'background-image': 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)',
      });
    },
    mouseLeave() {
      gsap.to(`#${this.randomId}-cocktail-ctn`, {
        duration: 0.3,
        'background-image': 'linear-gradient(to top, #bfc4cb 0%, #d6d9e1 100%)',
      });
      gsap.to(`#${this.randomId}-cocktail-title`, {
        duration: 0.3,
        color: 'rgb(69, 69, 69)',
      });
      gsap.to(`#${this.randomId}-inner`, {
        duration: 0.3,
        'background-image': 'linear-gradient(to top, rgb(169, 166, 166) 0%, rgb(169, 164, 164) 1%, #aba6a6 26%, #837c7c 48%, #7b7575 75%, #9d9d9d 100%)',
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.cocktail-ctn {
  cursor: pointer;
  width: 220px;
  margin: 30px;
  box-shadow: 1px 2px 9px rgba(80, 80, 80, 0.7);
  border-radius: 5px;
  overflow: hidden;
  background-image: linear-gradient(to top, #bfc4cb 0%, #d6d9e1 100%);
}

.cocktail-title {
  max-height: 60px;
  line-height: 40px;
  text-overflow: ellipsis;
  color: rgb(69, 69, 69);
  font-size: 18px;
  font-weight: 800;
}

.img-ctn {
  padding: 10px 10px 0;
}

.inner {
  padding: 3px 8px;
  background-image: linear-gradient(to top, rgb(169, 166, 166) 0%, rgb(169, 164, 164) 1%, #aba6a6 26%, #837c7c 48%, #7b7575 75%, #9d9d9d 100%);
  border: 1px solid rgb(131, 131, 131);
}
</style>
