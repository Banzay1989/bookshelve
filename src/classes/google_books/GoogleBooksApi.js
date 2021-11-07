import GoogleBook from "@/classes/google_books/GoogleBook";
/**
 * Класс с набором свойств и методов для работы с Google Books API (https://developers.google.com/books/docs/v1/using)
 */
class GoogleBooksApi {

  //API-ключ для авторизации
  static API_KEY = 'AIzaSyAW4W-xY4NQhPiThO69Cir3mSX1dydDGvY'; //TODO лучше загружать из внешнего настроечного файла

  //Неизменяемая часть URL для запроса
  static GET_QUERY_PREFIX = 'https://www.googleapis.com/books/v1/volumes?';

  //Количество загружаемых элементов
  static MAX_RESULTS = 30;

  //Разделитель для параметров поиска
  static Q_DELIMITER = '+';

  //Разделитель для параметров запроса
  static PARAM_DELIMITER = '&';


  /**
   * Создания объекта класса
   *
   * @return {GoogleBooksApi}
   */
  constructor() {
    //Строка запроса
    this.query_string = '';

    //Категории, которые можно выбрать для уточнения поиска
    this.categories = [
      'all',
      'art',
      'biography',
      'computers',
      'history',
      'medical',
      'poetry',
    ];

    //Категории, которые не должны влиять на поиск
    this.nonactive_categories = [
      'all',
    ];

    //Выбранная категория
    this.selected_category = 'all';

    //Параметры сортировки
    this.sort_values = [
      'relevance',
      'newest',
    ];

    //Выбранная сортировка
    this.selected_sort = '';

    //Количество найденных книг
    this.result_count = 0;

    //найденные элементы класса GoogleBook
    this.books = [];

    //Строка поиска (включается в себя выбранную категорию)
    this.search_string = '';

    return this;
  }


  /**
   * Создадим строку поиска по правилам (https://developers.google.com/books/docs/v1/using#PerformingSearch)
   *
   * @param {String} search_string
   * @return {GoogleBooksApi}
   */
  clearSearchString(search_string) {
    search_string = search_string.replace(/ +/g, ' ').trim(); //Удалим лишние пробелы
    search_string = search_string.toLowerCase(); //приведем к нижнему регистру (не обязательно)
    search_string = search_string.replace(/ /g, GoogleBooksApi.Q_DELIMITER); //заменим оставшиеся пробелы на "+"
    this.search_string = search_string;

    return this;
  }

  /**
   * Запишем выбранную категорию в соответствующее свойство
   *
   * @param {String} category_name
   * @return {GoogleBooksApi}
   */
  setSelectedCategory(category_name) {
    //Вернулась одна из категорий, которую поддерживает АПИ
    if (this.categories.includes(category_name)) {
      this.selected_category = category_name;
    } else {
      this.selected_category = 'all';
    }

    return this;
  }

  /**
   * Запишем выбранную сортировку в соответствующее свойство
   *
   * @param {String} sort_name
   * @return {GoogleBooksApi}
   */
  setSelectedSort(sort_name) {
    //Вернулась одна из сортировок, которую поддерживает АПИ
    if (this.sort_values.includes(sort_name)) {
      this.selected_sort = sort_name;
    } else {
      this.selected_sort = '';
    }

    return this;
  }

  /**
   * Добавим в строку поиска уточнение по категории
   *
   * @param {String} category_name
   * @return {GoogleBooksApi}
   */
  addCategoryToSearchString(category_name) {
    this.setSelectedCategory(category_name);

    if (!this.nonactive_categories.includes(this.selected_category)) {
      this.search_string += `${GoogleBooksApi.Q_DELIMITER}subject:${this.selected_category}`;
    }

    return this;
  }


  /**
   * Подготовим строку запроса
   *
   * @return {GoogleBooksApi}
   */
  prepareQueryString() {
    //Запишем постоянную часть
    this.query_string = `${GoogleBooksApi.GET_QUERY_PREFIX}key=${GoogleBooksApi.API_KEY}`;

    //Добавим строку поиска
    this.query_string += `${GoogleBooksApi.PARAM_DELIMITER}q=${this.search_string}`;

    //Добавим параметр сортировки
    if (this.selected_sort !== '') {
      this.query_string += `${GoogleBooksApi.PARAM_DELIMITER}orderBy=${this.selected_sort}`;
    }

    //Добавим индекс начала выборки элементов
    this.query_string += `${GoogleBooksApi.PARAM_DELIMITER}startIndex=${this.books.length}`;

    //Добавим максимальное колиество элементов выборки
    this.query_string += `${GoogleBooksApi.PARAM_DELIMITER}maxResults=${GoogleBooksApi.MAX_RESULTS}`;

    return this;
  }

  /**
   * Промис для запроса книг
   *
   * @return {Promise<AxiosResponse<any>>}
   */
  returnGetPromise() {
    return window.axios.get(this.query_string);
  }

  /**
   * Сброс данных о книгах
   */
  clearInfo() {
    this.books = [];
  }

  /**
   * Загрузка книг
   *
   * @return {Promise<*[]>} ошибки, возникшие в ходе запроса
   */
  async getBooks() {
    let errors = [];
    this.prepareQueryString();
      try {
        const promise = await this.returnGetPromise();
        if (promise.data.totalItems !== undefined && typeof promise.data.totalItems === 'number') {
          this.result_count = promise.data.totalItems;
        } else {
          errors.push('Не удалось определить количество найденных книг');
        }

        if (promise.data.items !== undefined && typeof promise.data.items === 'object' && promise.data.items.length > 0) {
          promise.data.items.forEach(book => this.books.push(new GoogleBook(book)));
        } else {
          errors.push('Не удалось получить данные по книгам');
        }
      } catch (error) {
        console.log(error);
        errors.push(error);
      }

    return errors;
  }

}

export default GoogleBooksApi;
