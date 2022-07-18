export class ProductModel {
  constructor(
    public id: string,
    public name: string,
    public provider: string,
    public stock: number,
  ) { }
}