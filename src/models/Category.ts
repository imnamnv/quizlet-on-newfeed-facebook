export interface Item {
  id?: string;
  front: string;
  back: string;
}

export interface Category {
  id?: string;
  name: string;
  data: Item[];
}
