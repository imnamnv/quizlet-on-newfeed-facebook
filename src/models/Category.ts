export interface Item {
  id?: number;
  front: string;
  back: string;
}

export interface Category {
  id?: number;
  name: string;
  data: Item[];
}
