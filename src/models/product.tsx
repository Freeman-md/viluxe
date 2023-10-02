export class Product {
    constructor(
      public title: string,
      public image: string,
      public price: number,
      public category?: string,
      public rating?: { rate: number; count: number },
      public description?: string,
      public id?: number,
    ) {}
  
    static fromJson(json: any): Product {
      return Object.assign(this, json)
    }
  
    toJson(): any {
      return {
        id: this.id,
        title: this.title,
        image: this.image,
        price: this.price,
        category: this.category,
        rating: this.rating,
        description: this.description
      };
    }
  }
  