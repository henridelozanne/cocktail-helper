<template>
    <div class="modal-content">
        <div class="main-image-ctn">
            <img class="modal-img" :src="mainResult.strDrinkThumb" alt="cocktail-img">
        </div>
        <div class="description">
            <h1 class="cocktail-title">
                {{ mainResult.strDrink }}
            </h1>
            <div class="description-main">
                <span v-if="mainResult.more.strGlass" class="glass-ctn">
                    <div class="tag">
                        <glass-icon class="modal-icon" />
                        Glass
                    </div>
                    {{ mainResult.more.strGlass}}
                </span>
                <div v-if="ingredients.length" class="ingredients-ctn">
                    <h2>
                        <ingredients-icon class="modal-icon" />
                        Ingredients :
                    </h2>
                    <ul>
                        <li v-for="(ingredient, i) in ingredients" :key="`${i}-${ingredient.name}`">{{ ingredient.name }}
                            <span>({{ ingredient.dose }})</span>
                        </li>
                    </ul>
                </div>
                <div v-if="instructions.length" class="instructions-ctn">
                    <span>
                        <instructions-icon class="modal-icon" />
                        Instructions :
                    </span>
                    <ul>
                        <li v-for="instruction in instructions" :key="instruction">{{ instruction }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GlassIcon from './Icons/Glass.vue';
import IngredientsIcon from './Icons/Ingredients.vue';
import InstructionsIcon from './Icons/Instructions.vue';

export default {
    name: 'CocktailModal',
    props: {
        mainResult: { type: Object },
    },
    components: {
        'glass-icon': GlassIcon,
        'ingredients-icon': IngredientsIcon,
        'instructions-icon': InstructionsIcon,
    },
    data() {
        return {
            ingredients: [],
            instructions: [],
        };
    },
    mounted() {
        this.processIngredients();
        this.processInstructions();
    },
    methods: {
        processIngredients() {
            for (let i=1; i<=15; i+=1) {
                if (this.mainResult.more[`strIngredient${i}`] !== null) {
                this.ingredients.push({
                    name: this.mainResult.more[`strIngredient${i}`],
                    dose: this.mainResult.more[`strMeasure${i}`]})
                } else return;
            }
        },
        processInstructions() {
            this.instructions = this.mainResult.more.strInstructions.split('. ');
        },
    },
};
</script>

<style lang="scss" scoped>
.modal-content {
    display: flex;
    height: 490px;

    .main-image-ctn {
        flex-grow: 3;
        flex-basis: 60%;
        height: 100%;

        .modal-img {
            height: 490px;
        }
    }

    .description {
        flex-basis: 40%;
        flex-grow: 2;
        height: 100%;
        overflow: scroll;
        margin-left: 20px;
        display: flex;
        flex-direction: column;

        .cocktail-title {
            font-family: 'Vast Shadow', cursive;
            font-size: 27px;
        }

        .description-main {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .tag {
                display: flex;
                background: rgb(218, 218, 218);

                .modal-icon {
                    display: inline;
                    height: 20px;
                    fill: #606266;
                }
            }

            .glass-ctn {
                margin-bottom: 20px;
            }

            .ingredients-ctn {
                margin-bottom: 20px;
            }
        }
    }
}
</style>