# React Native Developer Assignment

## Overview

This project is a simplified version of a food delivery app developed as part of a React Native Developer assignment. The app includes a customizable home screen, pagination for order history, real-time location tracking for delivery drivers, and more.

## Features

### 1. Customizable Home Screen

**Objective**: Implement a home screen that dynamically adapts its layout based on user preferences or time of day, as configured by the backend.

**Approach**:

- Utilized `react-query` to fetch market data from the backend API, ensuring efficient data management with features like caching and background synchronization.
- Dynamically configured the base URL for images based on the app settings returned by the API.
- Filtered categories to include only those relevant for the current view (`MarketVerticalCategory` and `MarketHorizontalCategory`), ensuring the home screen displays only the necessary information.
- Implemented conditional rendering to switch between horizontal and vertical layouts based on backend parameters, allowing the UI to adapt dynamically.

**Challenges**:

- Efficient data fetching and management, solved using `react-query`.
- Dynamic app configuration, handled through React’s `useEffect` hook.
- Filtering and displaying relevant categories, optimized with `useMemo`.

**Optimizations**:

- Leveraged `react-query` for optimized performance.
- Implemented graceful loading and error states to enhance user experience.

### 2. Market Details Screen

**Objective**: Implement a complex market details screen that allows users to navigate through categories and subcategories with synchronized scrolling behavior, as demonstrated in the provided video.

**Approach**:

- **Fixed Categories**: Displayed in a horizontal scroll view at the top, allowing users to easily switch between different categories.
- **Sticky Subcategories**: Implemented within a `FlatList` to maintain sticky headers for subcategories as the user scrolls through the content.
- **Scroll Synchronization**: Achieved bidirectional synchronization between the content and the category/subcategory tabs, ensuring that the correct tab is highlighted and scrolled into view during user interaction.

**Challenges**:

- **Synchronizing Scroll Behavior**: Managed by custom hooks that ensure smooth and accurate scrolling synchronization between the content and tabs.
- **Performance Optimization**: Implemented to maintain a smooth user experience, particularly on lower-end devices, by optimizing the rendering of sticky headers and scroll views.
- **Sticky Header Implementation**: Successfully implemented sticky headers within a `FlatList`, ensuring that the correct subcategory remains visible at the top during scrolling.

### 3. Pagination for My Orders

**Objective**: Implement efficient pagination for the "My Orders" section to allow users to browse through their order history seamlessly.

**Approach**:

- **Infinite Scrolling**: Utilized `react-query`’s `useInfiniteQuery` to manage the pagination process. The hook allows for fetching additional pages of data as the user scrolls through the list.
- **FlatList Component**: Used to render the list of orders, configured with `onEndReached` to trigger the loading of more data when the user nears the end of the current list.
- **Loading Indicators**: Incorporated `ActivityIndicator` to inform users when additional data is being loaded, providing a smooth and intuitive user experience.

**Challenges**:

- **Handling Large Data Sets**: Successfully managed by loading data incrementally through `useInfiniteQuery`.
- **Maintaining Smooth UX**: Achieved through careful management of loading states and scroll events.

### 4. Real-time Location Tracking

**Objective**: Implement a feature to track the real-time location of a delivery driver using MQTT and display the driver’s position on a map.

**Approach**:

- **MQTT Initialization**: Configured and initialized MQTT using `react_native_mqtt` with persistent storage and automatic reconnection features to ensure a stable connection.
- **Fetching Credentials**: Used `react-query` to fetch the necessary MQTT credentials securely before establishing a connection.
- **Location Tracking**: Implemented a custom hook (`useDraverLocation`) to manage the MQTT connection, subscribe to the driver’s location topic, and update the UI with the latest coordinates.
- **Map Integration**: Integrated `react-native-maps` to visually display the driver’s location on a map. The map view dynamically updates as new location data is received.
- **User Interface**: Provided real-time feedback on the connection status and displayed the driver’s current latitude and longitude, along with a map marker.

**Challenges**:

- **Stable MQTT Connection**: Ensured by implementing automatic reconnection and robust error handling within the custom hook.
- **Smooth Map Updates**: Achieved through a dedicated hook that animates map updates in real-time as the driver’s location changes.
- **Real-time Data Handling**: Efficiently parsed and utilized incoming MQTT messages to maintain an accurate and up-to-date display of the driver’s location.
