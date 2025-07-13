import {  View } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./brewStore/store";

// Wrap App with Redux and Persist
const RootComponent = () => (

        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
);

// Register for Expo
registerRootComponent(RootComponent);

// Optionally register for vanilla React Native (usually not needed for Expo
// AppRegistry.registerComponent(appName, () => RootComponent);