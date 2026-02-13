
export enum ToolType {
  CATALOG = 'CATALOG',
  CONSULTANT = 'CONSULTANT',
  CHECKOUT = 'CHECKOUT',
  ABOUT = 'ABOUT',
}

export interface WatchModel {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  fidelity: number;
}

export interface CartItem extends WatchModel {
  quantity: number;
}
