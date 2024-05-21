export interface Book {
  id: string
  authorId: string
  title: string
  isbn: string
  description: string
  buyUrl: string
  coverImageUrl: string
  publicationDate: Date
  price: number
  isNew: boolean
}
