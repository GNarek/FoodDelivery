import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {getImageUrl} from '../../../../utls';
import {
  COLUMNS_PER_ROW,
  ITEM_WRAPPER_HEIGHT,
  SUB_CATEGORY_HEADER_HEIGHT,
} from '../../MarketDetails.config';
import {colors} from '../../../../styles/colors';
import {lng} from '../../../../configs';
import {FlattenedItem} from '../../MarketDetails.types';

export const SubcategoryItem: React.FC<{
  item: FlattenedItem;
}> = React.memo(({item}) => {
  if (item.type !== 'subcategory') return null;

  return (
    <View>
      <View style={styles.subcategoryHeader}>
        <Text style={styles.subcategoryHeaderText}>{item.name[lng]}</Text>
        <View style={styles.subcategoryHeaderLine} />
      </View>
      <View style={styles.itemContainer}>
        {item.items.map(product => (
          <View key={product.id} style={styles.itemWrapper}>
            <View style={styles.item}>
              <Image
                source={{
                  uri: getImageUrl(product?.image),
                }}
                style={styles.itemImage}
              />
              <Text>{product.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  subcategoryHeader: {
    height: SUB_CATEGORY_HEADER_HEIGHT,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subcategoryHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.grayDark,
    marginRight: 10,
  },
  subcategoryHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.grayLight,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemWrapper: {
    height: ITEM_WRAPPER_HEIGHT,
    width: `${100 / COLUMNS_PER_ROW}%`,
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'white',
  },
  item: {
    height: 186,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,

    // Shadow for iOS
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 5,
  },
  itemImage: {
    height: 100,
  },
});
