export interface Item {
  id?: number;
  front: string;
  back: string;
}

export interface Category {
  id?: string;
  name: string;
  data: Item[];
}
