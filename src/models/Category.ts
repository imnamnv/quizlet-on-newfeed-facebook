export interface Item {
  id?: string;
  frontHTML: string;
  backHTML: string;
}

export interface Category {
  id?: string;
  name: string;
  data: Item[];
}
