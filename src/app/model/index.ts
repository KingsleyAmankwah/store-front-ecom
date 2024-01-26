// item.model.ts
export class Item {
  constructor(
    public id: number,
    public imgSrc: string,
    public title: string,
    public price: string,
    public stars: number,
    public available: number
  ) {}
}
