import {useCallback} from 'react';
import {findNodeHandle, ScrollView} from 'react-native';
import {Category} from '../MarketDetails.types';

export const useScrollCategoriesIntoView = (
  categoryScrollViewRef: React.RefObject<ScrollView>,
  categories: Category[],
) => {
  return useCallback(
    (categoryId: string) => {
      if (categoryScrollViewRef.current) {
        // @ts-expect-error Property 'measureLayout' does not exist on type 'ScrollView'
        categoryScrollViewRef.current.measureLayout(
          findNodeHandle(categoryScrollViewRef.current) as number,
          (_: any, __: any, width: number) => {
            const categoryIndex =
              categories.findIndex(cat => cat.id === categoryId) ?? -1;
            if (categoryIndex !== -1 && categoryScrollViewRef.current) {
              categoryScrollViewRef.current.scrollTo({
                x: categoryIndex * (width / 3),
                animated: true,
              });
            }
          },
          () => {},
        );
      }
    },
    [categories, categoryScrollViewRef],
  );
};

export const useScrollSubcategoryIntoView = (
  subcategoryScrollViewRef: React.MutableRefObject<{
    [key: string]: ScrollView | null;
  }>,
  categories: Category[],
) => {
  return useCallback(
    (categoryId: string, subcategoryId: string) => {
      if (subcategoryScrollViewRef.current) {
        const scrollView = subcategoryScrollViewRef.current[categoryId];
        if (scrollView) {
          // @ts-expect-error Property 'measureLayout' does not exist on type 'ScrollView'
          scrollView.measureLayout(
            findNodeHandle(scrollView) as number,
            (_: any, __: any, width: number) => {
              const subcategoryIndex =
                categories
                  .find(cat => cat.id === categoryId)
                  ?.marketSubcategories.findIndex(
                    subcat => subcat.id === subcategoryId,
                  ) ?? -1;
              if (subcategoryIndex !== -1) {
                scrollView.scrollTo({
                  x: subcategoryIndex * (width / 3),
                  animated: true,
                });
              }
            },
            () => {},
          );
        }
      }
    },
    [categories, subcategoryScrollViewRef],
  );
};
