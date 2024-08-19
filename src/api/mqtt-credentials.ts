import axios from 'axios';

const BASE_URL = 'https://user-app-staging.internal.haat.delivery/api';

export type MqttCredentials = {
  userName: string;
  clientId: string;
  password: string;
  topic: string;
  host: string;
  port: number;
  qos: number;
  protocol: string;
};

export const fetchMqttCredentials = async (): Promise<MqttCredentials> => {
  try {
    const response = await axios.get<MqttCredentials>(
      `${BASE_URL}/orders/driver-location-credentials`,
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching MQTT credentials:', error);
    throw error;
  }
};
