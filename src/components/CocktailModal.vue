<template>
    <div class="modal-content">
        <div class="main-image">
            <img :src="mainResult.strDrinkThumb" alt="cocktail-img">
        </div>
        <div class="description">
            <h1 class="cocktail-title">
                {{ mainResult.strDrink }}
            </h1>
            <h2>Ingredients : </h2>
            <ul>
                <li v-for="(ingredient, i) in ingredients" :key="`${i}-${ingredient.name}`">{{ ingredient.name }}
                    <span>({{ ingredient.dose }})</span>
                </li>
            </ul>
            <span>Glass : <span>{{ mainResult.more.strGlass}}</span></span>
            <span>Instructions :</span>
            <ul>
                <li v-for="instruction in instructions" :key="instruction">{{ instruction }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CocktailModal',
    props: {
        mainResult: { type: Object },
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
    height: 100%;

    .main-image {
        flex-grow: 3;
        flex-basis: 60%;
        height: 100%;
    }

    .description {
        flex-basis: 40%;
        flex-grow: 2;
        height: 100%;
        overflow: scroll;

        .cocktail-title {
            font-family: 'Teko', sans-serif;
            font-size: 27px;
        }
    }
}
</style>