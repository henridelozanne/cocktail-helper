<template>
  <h1 @click="$emit('websiteTitleClicked');">
    <span class="logo-letter">C</span>
    <span class="logo-letter">O</span>
    <span class="logo-letter">C</span>
    <span class="logo-letter">K</span>
    <span class="logo-letter">T</span>
    <span class="logo-letter">A</span>
    <span class="logo-letter">I</span>
    <span class="logo-letter">L</span>
    <span class="logo-letter">I</span>
    <span class="logo-letter">O</span>
  </h1>
</template>

<script>
import gsap from 'gsap';

export default {
  name: 'WebsiteTitle',
  mounted() {
    gsap.from('.logo-letter', {
      opacity: 0,
      // y: -40,   Why this doesn't work ??
      duration: 0.5,
      stagger: { each: 0.1 },
    });
  },
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 40px;
  letter-spacing: 5px;
  font-weight: 900;
  background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgb(195, 190, 240) 0%, rgb(154, 224, 215) 89.8% );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;

  span {
    display: inline-block;
  }
}
</style>
