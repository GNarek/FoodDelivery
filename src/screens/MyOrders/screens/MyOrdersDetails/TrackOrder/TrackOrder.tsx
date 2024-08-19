import React, {useRef} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useQuery} from '@tanstack/react-query';
// @ts-expect-error Could not find a declaration file for module 'react_native_mqtt'.
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {fetchMqttCredentials} from '@/api/mqtt-credentials';
import {colors} from '@/styles/colors';
import {useDraverLocation, useNewMapCordinates} from './TrackOrder.hooks';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

const latitudeDelta = 0.00001;
const longitudeDelta = 0.00001;

export const TrackOrder = () => {
  const mapRef = useRef<MapView>(null);

  const {data} = useQuery({
    queryKey: ['mqtt-credentials'],
    queryFn: fetchMqttCredentials,
  });

  const {driverLocation, status} = useDraverLocation(data);
  useNewMapCordinates(mapRef, driverLocation);

  if (!driverLocation) {
    return (
      <View style={styles.container}>
        <Text>Status: {status}</Text>
        <ActivityIndicator size="large" color={colors.red} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
            latitudeDelta,
            longitudeDelta,
          }}>
          <Marker coordinate={driverLocation} title="Driver Location" />
        </MapView>
      </View>

      <Text>Status: {status}</Text>

      <Text>
        Driver Location: {driverLocation.latitude.toFixed(6)},{' '}
        {driverLocation.longitude.toFixed(6)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
