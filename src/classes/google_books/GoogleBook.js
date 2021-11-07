/**
 * Класс Книги из работы с Google Books Api (https://developers.google.com/books/docs/v1/using)
 */
class GoogleBook {
  constructor(book) {

    //картинка для превью
    this.src = book?.volumeInfo?.imageLinks?.thumbnail;

    //Авторы книги
    this.authors = book?.volumeInfo?.authors !== undefined ? book.volumeInfo.authors.join(', ') : 'Неизвестен';

    //Первая категория в которой находится книга
    this.category = book?.volumeInfo?.categories !== undefined ? book.volumeInfo.categories[0] : 'Неизвестна';

    //Название книги
    this.title = book?.volumeInfo?.title ?? 'Неизвестно';

    //Описание книги
    this.description = book?.volumeInfo?.description ?? 'Описание не найдено';
  }

}

export default GoogleBook;
