import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {MarketItem} from './MarketItem';
import {getImageUrl} from '../../../utls';

type Category = {
  elementType: string;
  backgroundColor?: string;
  name: string;
  stores: any[];
  topImage?: {
    smallServerImage?: string;
  };
  id: number;
};

type MarketCategoryProps = {
  category: Category;
};

const MarketCategory: React.FC<MarketCategoryProps> = ({category}) => {
  const isHorizontal = category.elementType === 'MarketHorizontalCategory';
  const numColumns = isHorizontal ? 1 : 2;

  return (
    <View
      style={[
        styles.categoryContainer,
        {backgroundColor: category.backgroundColor || Colors.lighter},
      ]}>
      <View style={{marginBottom: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          <Text style={styles.categoryInfo}>
            {isHorizontal ? 'Horizontal' : 'Vertical'} ({category.stores.length}
            )
          </Text>
        </View>
        {category.topImage?.smallServerImage && (
          <Image
            source={{uri: getImageUrl(category.topImage.smallServerImage)}}
            style={styles.categoryImage}
          />
        )}
      </View>
      <View style={{paddingHorizontal: 10}}>
        <FlatList
          horizontal={isHorizontal}
          data={category.stores}
          keyExtractor={item => item.storeId.toString()}
          numColumns={numColumns}
          renderItem={({item}) => (
            <MarketItem market={item} isHorizontal={isHorizontal} />
          )}
          contentContainerStyle={
            isHorizontal ? styles.horizontalList : styles.verticalList
          }
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

type MarketsListProps = {
  categories: Category[];
};

export const MarketsList: React.FC<MarketsListProps> = ({categories}) => {
  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <MarketCategory category={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginVertical: 10,
    paddingVertical: 10,
  },
  categoryTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
    // The textShadow is used to make text visiable on black background
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  categoryImage: {
    width: '100%',
    height: 150,
  },
  categoryInfo: {
    fontSize: 11,
    marginLeft: 10,
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  horizontalList: {
    paddingBottom: 10,
  },
  verticalList: {
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default MarketsList;
