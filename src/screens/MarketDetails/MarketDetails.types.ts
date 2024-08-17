export type Item = {
  id: string;
  name: {[key: string]: string};
  productImages?: Array<{
    smallImageUrl?: string;
  }>;
};

export type Subcategory = {
  id: string;
  name: {[key: string]: string};
  products: Item[];
};

export type Category = {
  id: string;
  name: {[key: string]: string};
  marketSubcategories: Subcategory[];
};

export type FlattenedItem =
  | {
      type: 'subcategoryTabs';
      id: string;
      categoryId: string;
      subcategories: Subcategory[];
    }
  | {
      type: 'subcategory';
      id: string;
      name: {[key: string]: string};
      categoryId: string;
      items: {
        type: 'item';
        id: string;
        title: string;
        categoryId: string;
        subcategoryId: string;
        image: string;
      }[];
    };
