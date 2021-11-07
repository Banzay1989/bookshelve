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
          v-if="sort_values.length"
          class="text-center"
          cols="12"
          md="5"
        >
          <v-combobox
            v-model="sort"
            :items="sort_values"
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
      sort_values: {
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
      this.sort = this.sort_values[0]; //не работает свойство auto-select-first
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
        this.$emit('search', {
          q: this.search_string,
          category: this.category,
          orderBy: this.sort,
        });

        return this;
      },
    },
  }
</script>
<style scoped>
  .header {
    background: black !important;
    background-image: url(https://ns328286.ip-37-187-113.eu/ew/wallpapers/800x480/07276_800x480.jpg) !important;
    background-size: 100% auto !important;
    background-repeat: no-repeat !important;
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
