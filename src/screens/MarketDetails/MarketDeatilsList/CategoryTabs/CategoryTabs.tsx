import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {lng} from '../../../../configs';
import {colors} from '../../../../styles/colors';
import {Category} from '../../MarketDetails.types';

export const CategoryTabs: React.FC<{
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categoryRef: any;
}> = React.memo(
  ({categories, activeCategory, onSelectCategory, categoryRef}) => {
    return (
      <ScrollView
        horizontal
        ref={categoryRef}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            onPress={() => onSelectCategory(category.id)}
            style={[
              styles.categoryTab,
              category.id === activeCategory && styles.activeTab,
            ]}>
            <Text
              style={[
                styles.categoryText,
                category.id === activeCategory && styles.activeTabText,
              ]}>
              {category.name[lng]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  categoryContainer: {
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  categoryTab: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 5,
    borderRadius: 50,
    height: 40,
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: colors.roseLight,
  },
  categoryText: {
    fontSize: 14,
    color: colors.gray,
  },
  activeTabText: {
    color: colors.grayDark,
  },
});
