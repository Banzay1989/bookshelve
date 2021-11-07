<template>
  <v-app>
    <Header
      :name="'books'"
      :categories="categories"
      :sort_variables="sort_variables"
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
          Founded {{ searched_books }} results
        </h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="book in books"
        :key="book.id"
        class="text-center"
        cols="12"
        md="3"
        wrap
      >
        <book-item
          :id="'book_'+book.id"
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
  </v-app>
</template>

<script>
  /**
   * Components
   */
  import Header from '@/components/Header.vue';
  import BookItem from '@/components/BookItem.vue';

  /**
   * Constants
   */
  import {API_KEY, GET_QUERY} from "@/const/google_api";

  export default {
    name: 'App',

    components: {
      Header,
      BookItem,
    },

    data: () => ({
      searched_books: 0,
      subject: {},
      books: [],
      loading: false,
      categories: [
        'all',
        'art',
        'biography',
        'computers',
        'history',
        'medical',
        'poetry',
      ],
      sort_variables: [
        'relevance',
        'newest',
      ],
    }),


    mounted() {
      this.subject = this.clearSubject();
      document.addEventListener('scroll', e => {
        if (this.books.length === this.subject.startIndex+this.subject.maxResults){
          this.onScroll(e);
        }
      }, false);
    },

    methods: {
      clearSubject() {
        this.books = [];
        this.searched_books = 0;
        return {
          q: '', //Строка поиска
          orderBy: '', //сортировка
          startIndex: 0, //начальный индекс для пагинации (начинается с 0)
          maxResults: 30, //количество результатов для пагинации
          key: '', //API-ключ для авторизации
        };
      },

      /**
       * @description отправляет запрос для поиска книг
       * @param {Object} subject
       *
       * @return {Object} Vue Component
       */
      goSearch(subject) {
        this.subject = this.clearSubject();
        this.fillSubject(subject);
        const query_string = this.prepareQueryString();
        const p = this.getQuery(query_string);

        p.then(response => {
          const data = response.data;
          if (data.totalItems !== undefined && typeof data.totalItems === 'number') {
            this.searched_books = data.totalItems;
          } else {
            console.error('Не удалось определить количество найденных книг');
          }

          if (data.items !== undefined && typeof data.items === 'object' && data.items.length > 0) {
            this.books = data.items;
          } else {
            console.error('Не удалось получить данные по книгам');
          }


        })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            this.loading = false;
          })
        return this;
      },

      /**
       * @description подготовка объекта с данными для запроса
       * @param {Object} subject
       *
       * @return {Object} Vue Component
       */
      fillSubject(subject) {
        this.subject.q = subject.q;
        this.subject.orderBy = subject.orderBy;
        this.subject.key = API_KEY;

        return this;
      },

      prepareQueryString() {
        let query_string = GET_QUERY;
        Object.keys(this.subject).forEach(key => {
          query_string += `${key}=${this.subject[key]}&`;
        });

        //Последний символ "&" является лишним и надо его отрезать
        return query_string.substr(0, query_string.length - 1);
      },

      /**
       * Промис получения данных
       *
       * @param {String} query_string
       * @return {Promise<AxiosResponse<any>>}
       */
      getQuery(query_string) {
        this.loading = true;

        return window.axios.get(query_string);
      },

      onScroll(event) {
        let height = event.target.documentElement.clientHeight;
        let scroll = event.target.documentElement.scrollHeight - event.target.documentElement.scrollTop;
        if (height === scroll){
          this.loadMore();
        }
      },

      loadMore(){
        this.subject.startIndex = this.books.length;
        const query_string = this.prepareQueryString();
        const p = this.getQuery(query_string);

        p.then(response => {
          const data = response.data;

          if (data.items !== undefined && typeof data.items === 'object' && data.items.length > 0) {
            this.books = this.books.concat(data.items);
          } else {
            console.error('Не удалось получить данные по книгам');
          }

        })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            this.loading = false;
          })
        return this;
      }



    },

  };
</script>
<style>
  .row {
    margin: auto;
  }
</style>
