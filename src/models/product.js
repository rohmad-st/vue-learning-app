
export default class Product {
  constructor (id, title, image, authors, description, source) {
    this.id = id
    this.title = title
    this.image = image
    this.authors = authors
    this.description = description
    this.source = source
  }

  static fromAPI (object) {
    return new Product(
      object.id,
      object.volumeInfo.title,
      object.volumeInfo.imageLinks.thumbnail,
      object.volumeInfo.authors,
      object.volumeInfo.description,
      object.volumeInfo.infoLink
    )
  }
}
