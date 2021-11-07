<template>
  <v-app>
    <Header
      :name="'books'"
      :categories="api.categories"
      :sort_values="api.sort_values"
      @search="goSearch"
    />
    <v-row
      justify="center"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <h4>
          Founded {{ api.result_count }} results
        </h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(book,index) in api.books"
        :key="index"
        class="text-center"
        cols="12"
        md="3"
        wrap
      >
        <book-item
          :item="book"
        />
      </v-col>

    </v-row>
    <v-progress-linear
      v-if="loading"
      height="15"
      color="black"
      indeterminate
    />
    <v-snackbar
      v-model="errors.length"
      color="red"
      top
    >
      <v-list dense>
        <v-list-item
          v-for="(error, index) in errors"
          :key="index"
        >
          {{ error }}
        </v-list-item>
      </v-list>
    </v-snackbar>
  </v-app>
</template>

<script>
  /**
   * Components
   */
  import Header from '@/components/Header.vue';
  import BookItem from '@/components/BookItem.vue';

  /**
   * Classes
   */
  import GoogleBooksApi from "@/classes/google_books/GoogleBooksApi"

  export default {
    name: 'App',

    components: {
      Header,
      BookItem,
    },

    data: () => ({
      loading: false,
      api: new GoogleBooksApi(),
      errors: [],
    }),

    mounted() {
      //Слушатель события пролистывания страницы
      document.addEventListener('scroll', e => {
        this.onScroll(e);
      }, false);
    },

    methods: {
      /**
       * @description отправляет запрос для поиска книг
       * @param {Object} subject
       *
       * @return {Object} Vue Component
       */
      goSearch(subject) {
        this.api.clearSearchString(subject.q);
        this.api.addCategoryToSearchString(subject.category);
        this.api.clearInfo();
        this.api.setSelectedSort(subject.orderBy);
        this.getBooks();
      },

      /**
       * Срабатывает при прокручивании страницы
       * @param {Object} event
       * @return {Object} Vue Component
       */
      onScroll(event) {
        let height = event.target.documentElement.clientHeight;
        let scroll = event.target.documentElement.scrollHeight - event.target.documentElement.scrollTop;
        if (height === scroll && !this.loading) { //Если мы достигли конца страницы и сейчас ничего не загружается
          this.getBooks();
        }

        return this;
      },

      async getBooks() {
        this.loading = true;
        const errors = await this.api.getBooks();
        this.loading = false;
        if (errors.length) { //Покажем ошибки если они есть
          this.errors = errors;
          setTimeout(() => {
            this.errors = [];
          }, 6000);
        }
      }
    },

  };
</script>
<style>
  .row {
    margin: auto;
  }
</style>
