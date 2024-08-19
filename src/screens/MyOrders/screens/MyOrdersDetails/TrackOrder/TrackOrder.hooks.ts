import {useEffect, useState, useRef} from 'react';
// @ts-expect-error Could not find a declaration file for module 'react_native_mqtt'.
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MqttCredentials} from '@/api/mqtt-credentials';
import MapView from 'react-native-maps';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24, // 1 day
  enableCache: true,
  reconnect: true,
  sync: {},
});

type DriverLocation = {
  latitude: number;
  longitude: number;
};

const latitudeDelta = 0.00001;
const longitudeDelta = 0.00001;

export const useDraverLocation = (credentials?: MqttCredentials) => {
  const [status, setStatus] = useState('Initializing...');
  const [driverLocation, setDriverLocation] = useState<null | DriverLocation>(
    null,
  );
  const clientRef = useRef<{disconnect: any} | null>(null);

  useEffect(() => {
    if (credentials) {
      const setupMqtt = async () => {
        try {
          const brokerUrl = `wss://${credentials.host}/mqtt`;
          // @ts-expect-error Cannot find name 'Paho'.
          const mqttClient = new Paho.MQTT.Client(
            brokerUrl,
            credentials.clientId,
          );

          function onConnect() {
            setStatus('Connected');
            mqttClient.subscribe(credentials?.topic, {qos: credentials?.qos});
          }

          function onConnectionLost(responseObject: any) {
            if (responseObject.errorCode !== 0) {
              setStatus('Connection lost');
            }
          }

          function onMessageArrived(message: any) {
            try {
              const locationData = JSON.parse(message.payloadString);
              const coordinates = locationData.location.geometry.coordinates;
              const newLocation = {
                latitude: coordinates[1],
                longitude: coordinates[0],
              };

              setDriverLocation(newLocation);
            } catch (_error) {
              // console.log('Error parsing message:', error);
            }
          }

          mqttClient.onConnectionLost = onConnectionLost;
          mqttClient.onMessageArrived = onMessageArrived;

          mqttClient.connect({
            userName: credentials.userName,
            password: credentials.password,
            useSSL: true,
            onSuccess: onConnect,
            onFailure: (_err: any) => {
              // Reconnect on fail
              setStatus('Reconnecting...');
              setupMqtt();
            },
          });

          clientRef.current = mqttClient;
        } catch (error) {
          // Reconnect on fail
          setStatus('Reconnecting...');
          setupMqtt();
        }
      };

      setupMqtt();
    }

    return () => {
      if (clientRef.current) {
        try {
          clientRef.current.disconnect();
        } catch (_error: any) {}
      }
    };
  }, [credentials]);

  return {
    driverLocation,
    status,
  };
};

export const useNewMapCordinates = (
  mapRef: React.RefObject<MapView>,
  driverLocation: DriverLocation | null,
) => {
  useEffect(() => {
    if (driverLocation) {
      const newCoordinate = {
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta,
        longitudeDelta,
      };

      if (mapRef.current) {
        mapRef.current.animateToRegion(newCoordinate, 100);
      }
    }
  }, [driverLocation, mapRef]);
};
