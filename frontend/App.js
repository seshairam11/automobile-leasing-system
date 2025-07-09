import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import Entry from './screens/Entry';
import Header from './components/Header';
import GetLoction from './screens/GetLoction';
import 'react-native-get-random-values';
import { useSelector } from "react-redux";
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import DriverLocation from './screens/DriverLocation'
import AddLocation from './screens/PlacingMarker';
import TrackVehicle from './screens/TrackVehicle';
import ReqestTracking from './screens/ReqestTracking';
import DeleteTracking from './screens/DeleteTracking';
import OrderIOT from './screens/OrderIOT';
import DeviceList from './screens/DeviceList';

const Stack = createStackNavigator();
const navigationRef = React.createRef();

export const GetCurrentRouteName = () => {
  return navigationRef.current?.getCurrentRoute()?.name;
};

const App = () => {
  const [currentRoute, setCurrentRoute] = useState(null);
  const appState = useSelector((state) => state.appstate.login_info);

  useEffect(() => {
    setTimeout(() => {
      setCurrentRoute(GetCurrentRouteName());
    }, 100);
  }, []);

  return (

    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
      />
      <NavigationContainer ref={navigationRef} onStateChange={() => setCurrentRoute(GetCurrentRouteName())}>
        {currentRoute !== 'entry' && <Header />}
        <View style={styles.content}>
          <Stack.Navigator initialRouteName={appState.isAuth == true ? "home" : "entry"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="entry" component={Entry} />
            <Stack.Screen name="home" component={MapScreen} />
            <Stack.Screen name="getProviderloction" component={GetLoction} />
            <Stack.Screen name="addLocation" component={AddLocation} />
            <Stack.Screen name="myprofile" component={Profile} />
            <Stack.Screen name="settings" component={Settings} />
            <Stack.Screen name="driverlocation" component={DriverLocation} />
            <Stack.Screen name="trackvehicle" component={TrackVehicle} />
            <Stack.Screen name="requesttrack" component={ReqestTracking} />
            <Stack.Screen name="deletetrack" component={DeleteTracking} />
            <Stack.Screen name="orderiot" component={OrderIOT} />
            <Stack.Screen name="devicelist" component={DeviceList} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1, // Takes the remaining space
  },
});

export default App;
