<template>
  <div class="tag-ctn">
    <GlassIcon class="tag-icon" v-if="tagType === 'glass'" />
    <IngredientsIcon  class="tag-icon" v-else-if="tagType === 'ingredients'"/>
    <InstructionsIcon  class="tag-icon" v-else-if="tagType === 'instructions'"/>
    {{ tagType }}
  </div>
</template>

<script>
import GlassIcon from "./Icons/Glass.vue";
import IngredientsIcon from "./Icons/Ingredients.vue";
import InstructionsIcon from "./Icons/Instructions.vue";

export default {
  name: "Tag",
  components: {
    GlassIcon,
    IngredientsIcon,
    InstructionsIcon
  },
  props: {
    tagType: { type: String }
  }
};
</script>

<style lang="scss">
.tag-ctn {
  background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 4px;
  padding: 5px 10px;
  text-transform: capitalize;
  color: rgb(62, 62, 62);
  box-shadow: 2px 1px 5px rgba(0, 0, 0, .4);

  .tag-icon {
    height: 20px;
    margin-right: 5px;
  }
}
</style>