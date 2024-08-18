import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Order} from '../../../MyOrders';
import {MyOrderItemNavigationProp} from '../../../../../AppNavigation/types';

type Props = {
  item: Order;
};

export const MyOrderItem: React.FC<Props> = props => {
  const {item} = props;

  const navigation = useNavigation<MyOrderItemNavigationProp>();

  const navigateToDetails = () => {
    navigation.navigate('MyOrderDetails', {orderId: item.id});
  };

  return (
    <TouchableOpacity onPress={navigateToDetails} style={styles.orderItem}>
      <Text>Order ID: {item.id}</Text>
      <Text>Date: {new Date(item.orderDate).toLocaleDateString()}</Text>
      <Text>
        Total: {item.price} {item.currencyData?.symbol}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
