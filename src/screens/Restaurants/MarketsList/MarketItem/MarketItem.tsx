import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getImageUrl} from '../../../../utls';
import {MarketItemNavigationProp} from '../../../../AppNavigation/types';

const screenWidth = Dimensions.get('window').width;

export const MarketItem = (props: {market: any; isHorizontal: boolean}) => {
  const {market, isHorizontal} = props;
  const navigation = useNavigation<MarketItemNavigationProp>();

  const navigateToDetails = () => {
    navigation.navigate('MarketDetails', {marketId: market.storeId});
  };

  return (
    <TouchableOpacity
      onPress={navigateToDetails}
      style={[
        styles.storeContainer,
        isHorizontal ? styles.horizontalItem : styles.verticalItem,
      ]}>
      <Image
        source={{uri: getImageUrl(market.icon?.serverImage)}}
        style={styles.storeIcon}
      />
      <Text style={styles.storeName}>{market.name}</Text>
      <Text style={styles.storeAddress}>{market.address}</Text>
      <Text style={styles.storeRating}>
        {market.rating?.value} ({market.rating?.numberOfRatings})
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storeContainer: {
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 5,
    backgroundColor: 'white',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 5,
  },
  verticalItem: {
    width: (screenWidth - 40) / 2,
    marginBottom: 10,
    height: 240,
  },
  horizontalItem: {
    width: (screenWidth - 40) / 2.5,
    marginBottom: 10,
    height: 240,
  },
  storeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  storeAddress: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  storeRating: {
    fontSize: 12,
    color: 'green',
    textAlign: 'center',
  },
});
