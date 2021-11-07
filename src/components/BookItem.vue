<template>
  <v-container
    fluid
    class="book_item"
    @click="openBook"
  >
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        class="text-center pa-0"
      >
        <v-img
          class="image"
          :src="src"
          :aspect-ratio="128/178"
          width="128"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="text-start pa-0 pl-10"
      >
        <p class="category">
          {{ category }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="text-start pa-0 pl-10"
      >
        <h4 class="title">
          {{ title }}
        </h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="text-start pa-0 pl-10"
      >
        <p class="author">
          {{ authors }}
        </p>
      </v-col>
    </v-row>
    <v-dialog
      v-model="open_book"
    >
      <v-card>
        <v-row>
          <v-col
            cols="12"
            md="6"
            class="text-center pa-0"
          >
            <!-- Не нашел картинку лучшего качества -->
            <v-img
              class="image"
              :src="src"
              :aspect-ratio="128/178"
              width="500px"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  />
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-row>
              <v-col
                cols="12"
                class="text-start"
              >
                <p class="category">
                  {{ category }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                class="text-start"
              >
                <h4 class="title">
                  {{ title }}
                </h4>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                class="text-start"
              >
                <p class="author">
                  {{ authors }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                class="text-start"
              >
                <v-textarea
                  v-model="description"
                  readonly
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    name: 'BookItem',
    props: {
      item: {
        type: Object,
        default: () => {
        },
      },
    },
    data: () => ({
      open_book: false,
    }),
    computed: {
      /**
       * @return {string}
       */
      authors() {
        const authors = this.item.volumeInfo.authors;
        return authors !== undefined
        && typeof authors === 'object'
        && authors.length > 0
          ? authors.join(', ')
          : 'Неизвестен';
      },

      /**
       * @return {string}
       */
      category() {
        const categories = this.item.volumeInfo.categories;
        return categories !== undefined
        && typeof categories === 'object'
        && categories.length > 0
          ? categories[0]
          : 'Неизвестна';
      },

      /**
       * @return {string}
       */
      title() {
        const title = this.item.volumeInfo.title;
        return title !== undefined
        && typeof title === 'string'
          ? title
          : 'Неизвестно';
      },

      /**
       * @return {string}
       */
      src() {
        const src = this.item.volumeInfo.imageLinks.thumbnail;
        return src !== undefined
        && typeof src === 'string'
          ? src
          : '';
      },

      /**
       * @return {string}
       */
      description() {
        const description = this.item.volumeInfo.description;
        return description !== undefined
        && typeof description === 'string'
          ? description
          : 'Описание не найдено';
      }
    },
    methods: {
      openBook() {
        this.open_book = true;
      },
    }
  }
</script>
<style scoped>
  >>> .image {
    display: inline-block;
    margin-top: 15px;
    box-shadow: 10px 10px 8px 0px rgba(34, 60, 80, 0.2);
  }

  >>> .category {
    color: darkgrey;
    text-decoration: underline;
  }

  >>> .author {
    color: darkgrey;
  }
</style>
