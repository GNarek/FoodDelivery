# React Native Developer Assignment

This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli). This project implements features such as a customizable home screen, pagination for order history, and real-time location tracking for delivery drivers.

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till the "Creating a new application" step, before proceeding.

### Step 1: Install Dependencies

Before running the app, make sure to install all necessary dependencies.

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

### Step 2: Provide Google Maps API Key (Android Only)

To use the map feature on Android, you need to provide a Google Maps API key. This can be done by editing the `config.js` file located in the root directory of the project.

Open the `config.js` file and replace `'Your_Google_Maps_API_Key_Here'` with your actual Google Maps API key:

```javascript
// config.js
export default {
  googleMapsApiKey: 'Your_Google_Maps_API_Key_Here',
};
```

### Step 3: iOS Setup (Pod Installation)

For iOS, navigate to the `ios` directory of the project and run `pod install` to ensure all necessary CocoaPods are installed:

```bash
cd ios
pod install
```

### Step 4: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 5: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Step 6: Using the App Features

1. **Customizable Home Screen**:

   - The home screen layout adapts dynamically based on backend parameters such as user preferences or time of day. You can test this feature by adjusting the parameters sent from the backend.

2. **Pagination for My Orders**:

   - The "My Orders" section supports infinite scrolling. Scroll through the list to trigger the loading of additional pages.

3. **Real-time Location Tracking**:
   - On the order history page, click on "Track your order" to open a new screen that shows the driver's live location on a map, updated in real-time using MQTT.
