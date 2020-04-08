<template>
  <div class="footer">
    <div class="letters-ctn">
        <div class="letter" v-for="letter in letters" :key="letter" @click="searchByLetter(letter)">{{ letter | capitalize }}</div>
    </div>
    <div class="letters-sm-screen">
        <div class="top-letters">
            <div class="letter" v-for="letter in topLetters" :key="letter" @click="searchByLetter(letter)">{{ letter | capitalize }}</div>
        </div>
        <div class="bottom-letters">
            <div class="letter" v-for="letter in bottomLetters" :key="letter" @click="searchByLetter(letter)">{{ letter | capitalize }}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            letters: [
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            ],
        };
    },
    filters: {
        capitalize: function (value) {
            if (!value) return '';
            return value.toUpperCase();
        },
    },
    computed: {
        topLetters() {
        return this.letters.slice(0, 13);
        },
        bottomLetters() {
        return this.letters.slice(13);
        },
    },
    methods: {
        searchByLetter(letter) {
            this.$emit('newLetterSearch', letter);
        },
    },
};
</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
  background: linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);
  background-blend-mode: multiply;
}

.letters-ctn {
  margin: 0 15%;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.letters-sm-screen {
  min-width: 500px;
  display: none;
  flex-direction: column;
  justify-content: space-between;
}

.top-letters {
  margin-bottom: 7px;
  display: flex;
  justify-content: space-around;
}

.bottom-letters {
  display: flex;
  justify-content: space-around;
}

.letter {
  background: rgb(97, 97, 97);
  color: #e2e8f0;
  border-radius: 3px;
  padding: 5px;
  margin: 0 2px;
  width: 30px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, .7);
}

.letter:hover {
  color: rgb(34, 34, 34);
  background: linear-gradient(to bottom, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%), linear-gradient(to bottom, rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.02) 61%, rgba(0,0,0,0.02) 73%), linear-gradient(33deg, rgba(255,255,255,0.20) 0%, rgba(0,0,0,0.20) 100%);
  background-blend-mode: normal,color-burn;
}

@media screen and (max-width: 1023px) {
    .letters-ctn {
      display: none;
    }

    .letters-sm-screen {
      display: flex;
    }
}
</style>