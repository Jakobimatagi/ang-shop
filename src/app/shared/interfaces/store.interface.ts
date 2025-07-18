export interface IShopItem {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    rating: IRating;
  }

export interface IRating {
    rate: number;
    count: number;
}

export interface ICartItem extends IShopItem {
    quantity: number;
}