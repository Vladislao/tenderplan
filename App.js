import React from "react";
import { Provider } from "react-redux";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import KeysScreen from "./screens/KeysScreen";
import SignInScreen from "./screens/SignInScreen";
import ApiClient from "./ApiClient";
import configureStore from "./configureStore";
import { StatusBar } from "react-native";

const initialState = {};
const client = new ApiClient();
const store = configureStore(initialState, {}, client);
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const AppContainer = createAppContainer(
  createSwitchNavigator({
    // AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Keys: KeysScreen
  })
);
console.log("store", store.getState());
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor="#D3D3D3" barStyle="black" />
        <AppContainer />
      </Provider>
    );
  }
}
