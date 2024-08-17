import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {lng} from '../../../../configs';
import {STICKY_SUBCATEGORY_CONTAINER_HEIGHT} from '../../MarketDetails.config';
import {colors} from '../../../../styles/colors';
import {Subcategory} from '../../MarketDetails.types';

export const SubcategoryTabs: React.FC<{
  subcategories: Subcategory[];
  activeSubcategory: string;
  onSelectSubcategory: (categoryId: string, subcategoryId: string) => void;
  setRef: any;
  categoryId: string;
}> = React.memo(props => {
  const {
    subcategories,
    activeSubcategory,
    onSelectSubcategory,
    setRef,
    categoryId,
  } = props;

  return (
    <ScrollView
      horizontal
      ref={setRef}
      showsHorizontalScrollIndicator={false}
      style={styles.stickySubcategoryContainer}>
      {subcategories.map(subcategory => (
        <TouchableOpacity
          key={subcategory.id}
          onPress={() => onSelectSubcategory(categoryId, subcategory.id)}
          style={[
            styles.subcategoryTab,
            subcategory.id === activeSubcategory && styles.activeSubTab,
          ]}>
          <Text
            style={[
              styles.subcategoryText,
              subcategory.id === activeSubcategory && styles.activeSubTabText,
            ]}>
            {subcategory.name[lng]}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  stickySubcategoryContainer: {
    height: STICKY_SUBCATEGORY_CONTAINER_HEIGHT,
    paddingBottom: 5,
    backgroundColor: '#f5f7f8',
  },
  subcategoryTab: {
    padding: 10,
    paddingBottom: 5,
    marginRight: 5,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },
  subcategoryText: {
    fontSize: 14,
    color: colors.gray,
  },
  activeSubTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.grayDark,
  },
  activeSubTabText: {
    color: colors.grayDark,
  },
});
