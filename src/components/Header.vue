<template>
  <v-container
    class="header pa-0 ma-0"
    fluid
  >
    <h1
      class="title_header"
    >
      Search for {{ name }}
    </h1>
    <v-form
      ref="search_form"
      v-model="valid"
      lazy-validation
    >
      <v-row
        justify="center"
      >
        <v-col
          class="d-flex text-center flex-row"
          cols="12"
          md="8"

        >
          <v-text-field
            v-model="search_string"
            outlined
            clearable
            solo
            dense
            :rules="[required]"
            append-icon="mdi-magnify"
            @keyup.enter="goSearch"
          />
          <v-btn
            @click="goSearch"
          >
            Find
          </v-btn>
        </v-col>
      </v-row>
      <v-row
        justify="center"
      >
        <v-col
          class="text-center"
          cols="12"
          md="5"
          v-if="categories.length"
        >
          <v-combobox
            v-model="category"
            :items="categories"
            auto-select-first
            outlined
            solo
            dense
          >
            <template v-slot:prepend>
              <h4>
                Category
              </h4>
            </template>
          </v-combobox>
        </v-col>
        <v-col
          v-if="sort_variables.length"
          class="text-center"
          cols="12"
          md="5"
        >
          <v-combobox
            v-model="sort"
            :items="sort_variables"
            auto-select-first
            outlined
            solo
            dense
          >
            <template v-slot:prepend>
              <h4>
                Search by
              </h4>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      name: {
        type: String,
        default: 'someone'
      },
      categories: {
        type: Array,
        default: () => [],
      },
      sort_variables: {
        type: Array,
        default: () => [],
      }
    },
    data: () => ({
      search_string: '',
      category: null,
      sort: null,

      valid: true,


      //Rules
      required: v => !!v || 'Обязательное поле',
    }),
    mounted() {
      this.category = this.categories[0]; //не работает свойство auto-select-first
      this.sort = this.sort_variables[0]; //не работает свойство auto-select-first
    },
    methods: {
      /**
       * @description отправляет параметры поиска в родительский компонент
       *
       * @return {Object} Vue Component
       */
      goSearch() {
        if (!this.$refs.search_form.validate()) {
          return this;
        }
        const q = this.prepareSearchString();
        this.$emit('search', {
          q: q,
          orderBy: this.sort,
        });

        return this;
      },

      /**
       *  @description преобразуем строку поиска, чтоб искало по каждому слову
       *  @return {string}
       */
      prepareSearchString() {
        let search_string = this.search_string;
        search_string = search_string.replace(/ +/g, ' ').trim(); //Удалим лишние пробелы
        search_string = search_string.toLowerCase(); //приведем к нижнему регистру (не обязательно)
        this.search_string = search_string //покажем пользователю как правильно надо было написать
        search_string = search_string.replace(/ /g, '+'); //заменим оставшиеся пробелы на "+"
        search_string += this.category != 'all' ? '+subject:' + this.category : ''; //добавим поиск по категории
        return search_string;
      }
    },
  }
</script>
<style scoped>
  .header {
    background: black !important;
    background-image: url(https://ns328286.ip-37-187-113.eu/ew/wallpapers/800x480/07276_800x480.jpg) !important;
    background-size: 100% auto !important;
    background-repeat: no-repeat !important;
    /*background-position: top;*/
    /*background-position: left;*/
    /*display: inline-block;*/
    position: sticky !important;
    top:0;
    left: 0;
    z-index: 99;
  }

  >>> .title_header {
    font-size: xxx-large;
    color: white;
    text-align: center;
    width: 100%;
    position: relative;
  }

  >>> h4 {
    color: white;
  }
</style>
