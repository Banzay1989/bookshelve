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
          :src="item.src"
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
          {{ item.category }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="text-start pa-0 pl-10"
      >
        <h4 class="title">
          {{ item.title }}
        </h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="text-start pa-0 pl-10"
      >
        <p class="author">
          {{ item.authors }}
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
              :src="item.src"
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
                  {{ item.category }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                class="text-start"
              >
                <h4 class="title">
                  {{ item.title }}
                </h4>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                class="text-start"
              >
                <p class="author">
                  {{ item.authors }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                class="text-start"
              >
                <v-textarea
                  v-model="item.description"
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
        default: () => {},
      },
    },
    data: () => ({
      open_book: false,
    }),

    methods: {

      /**
       * @description Открыть окно более полного описания книги
       *
       * @return {Object} Vue Component
       */
      openBook() {
        this.open_book = true;

        return this;
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

  >>> .book_item {
    cursor: pointer;
  }
</style>
