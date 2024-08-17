import React, {useState, useRef, useCallback, useMemo} from 'react';
import debounce from 'lodash/debounce';
import {View, FlatList, StyleSheet, ScrollView, ViewToken} from 'react-native';
import {lng} from '../../../configs';
import {CategoryTabs} from './CategoryTabs';
import {
  COLUMNS_PER_ROW,
  ITEM_WRAPPER_HEIGHT,
  STICKY_SUBCATEGORY_CONTAINER_HEIGHT,
  SUB_CATEGORY_HEADER_HEIGHT,
} from '../MarketDetails.config';
import {SubcategoryTabs} from './SubcategoryTabs';
import {SubcategoryItem} from './SubcategoryItem';
import {Category, FlattenedItem} from '../MarketDetails.types';
import {
  useScrollCategoriesIntoView,
  useScrollSubcategoryIntoView,
} from './MarketDeatilsList.hooks';

const emptyCategories: Category[] = [];
const viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
  minimumViewTime: 0,
};

interface MarketDetailsListProps {
  data?: {
    marketCategories: Category[];
  };
}

export const MarketDetailsList: React.FC<MarketDetailsListProps> = props => {
  const {data} = props;
  const categories = data?.marketCategories || emptyCategories;

  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.id || '',
  );
  const [activeSubcategory, setActiveSubcategory] = useState<string>(
    categories[0]?.marketSubcategories[0]?.id || '',
  );
  const flatListRef = useRef<FlatList<FlattenedItem>>(null);
  const categoryScrollViewRef = useRef<ScrollView>(null);
  const subcategoryScrollViewRef = useRef<{[key: string]: ScrollView | null}>(
    {},
  );

  const flattenedData: FlattenedItem[] = useMemo(() => {
    if (categories?.length > 0) {
      return categories.flatMap(category => [
        {
          type: 'subcategoryTabs',
          id: `subtabs-${category.id}`,
          categoryId: category.id,
          subcategories: category.marketSubcategories,
        },
        ...category.marketSubcategories.map(marketSubcategory => ({
          type: 'subcategory' as const,
          id: marketSubcategory.id,
          name: marketSubcategory.name,
          categoryId: category.id,
          items: marketSubcategory.products.map(product => ({
            image: product.productImages?.[0]?.smallImageUrl as string,
            type: 'item' as const,
            id: product.id,
            title: product.name[lng],
            categoryId: category.id,
            subcategoryId: marketSubcategory.id,
          })),
        })),
      ]);
    }
    return [];
  }, [categories]);

  const stickyHeaderIndices = useMemo(
    () =>
      flattenedData
        .map((item, index) => (item.type === 'subcategoryTabs' ? index : null))
        .filter((index): index is number => index !== null),
    [flattenedData],
  );

  const scrollCategoriesIntoView = useScrollCategoriesIntoView(
    categoryScrollViewRef,
    categories,
  );

  const scrollSubcategoryIntoView = useScrollSubcategoryIntoView(
    subcategoryScrollViewRef,
    categories,
  );

  const getItemLayout = useCallback(
    (_data: ArrayLike<FlattenedItem> | null | undefined, index: number) => {
      const item = flattenedData[index];
      let offset = 0;
      for (let i = 0; i < index; i++) {
        const currentItem = flattenedData[i];
        if (currentItem.type === 'subcategoryTabs') {
          offset += STICKY_SUBCATEGORY_CONTAINER_HEIGHT;
        } else if (currentItem.type === 'subcategory') {
          offset += SUB_CATEGORY_HEADER_HEIGHT;
          offset +=
            Math.ceil(currentItem.items.length / COLUMNS_PER_ROW) *
            ITEM_WRAPPER_HEIGHT;
        }
      }
      let length = 0;
      if (item.type === 'subcategoryTabs') {
        length = STICKY_SUBCATEGORY_CONTAINER_HEIGHT;
      } else if (item.type === 'subcategory') {
        length =
          SUB_CATEGORY_HEADER_HEIGHT +
          Math.ceil(item.items.length / COLUMNS_PER_ROW) * ITEM_WRAPPER_HEIGHT;
      }
      return {length, offset, index};
    },
    [flattenedData],
  );

  const onViewableItemsChanged = useMemo(
    () =>
      debounce(({viewableItems}: {viewableItems: ViewToken[]}) => {
        if (viewableItems.length > 0) {
          const visibleItems = viewableItems.filter(
            item => item.item.type !== 'subcategoryTabs',
          );

          if (visibleItems.length > 0) {
            const firstVisibleItem = visibleItems[0].item as FlattenedItem;
            const newActiveCategory = firstVisibleItem.categoryId;

            let newActiveSubcategory = '';
            if (firstVisibleItem.type === 'subcategory') {
              newActiveSubcategory = firstVisibleItem.id;
            } else {
              const subcategory = flattenedData.find(
                item =>
                  item.type === 'subcategory' &&
                  item.categoryId === newActiveCategory &&
                  item.items.some(
                    subItem => subItem.id === firstVisibleItem.id,
                  ),
              );
              if (subcategory) {
                newActiveSubcategory = subcategory.id;
              }
            }

            if (newActiveCategory !== activeCategory) {
              setActiveCategory(newActiveCategory);
              scrollCategoriesIntoView(newActiveCategory);
            }

            if (newActiveSubcategory !== activeSubcategory) {
              setActiveSubcategory(newActiveSubcategory);
              scrollSubcategoryIntoView(
                newActiveCategory,
                newActiveSubcategory,
              );
            }
          }
        }
      }, 100),
    [
      flattenedData,
      activeCategory,
      activeSubcategory,
      scrollCategoriesIntoView,
      scrollSubcategoryIntoView,
    ],
  );

  const scrollToCategory = useCallback(
    (categoryId: string) => {
      const index = flattenedData.findIndex(
        item =>
          item.type === 'subcategoryTabs' && item.categoryId === categoryId,
      );
      if (index !== -1) {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0,
        });
        setActiveCategory(categoryId);
        scrollCategoriesIntoView(categoryId);

        // Set the first subcategory of this category as active
        const firstSubcategory = flattenedData.find(
          item => item.type === 'subcategory' && item.categoryId === categoryId,
        );
        if (firstSubcategory) {
          setActiveSubcategory(firstSubcategory.id);
          scrollSubcategoryIntoView(categoryId, firstSubcategory.id);
        }
      }
    },
    [flattenedData, scrollCategoriesIntoView, scrollSubcategoryIntoView],
  );

  const scrollToSubcategory = useCallback(
    (categoryId: string, subcategoryId: string) => {
      const index = flattenedData.findIndex(
        item =>
          item.type === 'subcategory' &&
          item.categoryId === categoryId &&
          item.id === subcategoryId,
      );
      if (index !== -1) {
        const stickyHeaderHeight = STICKY_SUBCATEGORY_CONTAINER_HEIGHT;
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0,
          viewOffset: stickyHeaderHeight,
        });
        setActiveCategory(categoryId);
        setActiveSubcategory(subcategoryId);
        scrollCategoriesIntoView(categoryId);
        scrollSubcategoryIntoView(categoryId, subcategoryId);
      }
    },
    [flattenedData, scrollCategoriesIntoView, scrollSubcategoryIntoView],
  );

  const renderItem = useCallback(
    ({item}: {item: FlattenedItem}) => {
      switch (item.type) {
        case 'subcategoryTabs':
          return (
            <SubcategoryTabs
              setRef={(ref: any) =>
                (subcategoryScrollViewRef.current[item.categoryId] = ref)
              }
              categoryId={item.categoryId}
              subcategories={item.subcategories}
              activeSubcategory={activeSubcategory}
              onSelectSubcategory={scrollToSubcategory}
            />
          );
        case 'subcategory':
          return <SubcategoryItem item={item} />;
      }
    },
    [activeSubcategory, scrollToSubcategory],
  );

  return (
    <View style={styles.container}>
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={scrollToCategory}
        categoryRef={categoryScrollViewRef}
      />

      <FlatList
        ref={flatListRef}
        data={flattenedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={21}
        stickyHeaderIndices={stickyHeaderIndices}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
