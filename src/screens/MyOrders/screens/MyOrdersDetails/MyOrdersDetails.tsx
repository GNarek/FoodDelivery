import {RouteProp} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TrackOrder} from './TrackOrder';

type RootStackParamList = {
  MyOrderDetails: {orderId: number};
};

type MyOrderDetailssRouteProp = RouteProp<RootStackParamList, 'MyOrderDetails'>;

type Props = {
  route: MyOrderDetailssRouteProp;
};

export const MyOrdersDetails: React.FC<Props> = props => {
  const {route} = props;
  const {orderId} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order ID: {orderId}</Text>
      <TrackOrder />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lighter,
  },
  text: {
    fontSize: 16,
  },
});
