
export class Product {
  constructor (id, title, image) {
    this.id = id
    this.title = title
    this.image = image
  }

  static fromAPI (object) {
    return new Product(
      object.id,
      object.volumeInfo.title,
      object.volumeInfo.imageLinks.thumbnail
    )
  }
}
