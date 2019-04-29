import React from "react";
import {
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  FlatList
} from "react-native";
import { createStackNavigator } from "react-navigation";
import NoticeScreen from "./NoticeScreen";
import NoticesListItem from '../components/NoticesListItem'
import PropTypes from "prop-types";
import uuid from 'uuid'

const NoticesScreen = props => {
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("NoticeScreen");
  };
  console.log("navig", props.navigation.getParam("itemTitle"));
  const detitledScreenTitle = props.navigation.getParam("itemTitle");
  const noticesList = [
    {
      title: "Поставка продуктов питания и так далее ледует следующее",
      category: "ис",
      date: "27.12.12",
      activeTo: "Осталось 7 дней",
      price: "12 123 321",
      important: true
    },
    {
      title: "Поставка продуктов питания и так далее ледует следующее",
      category: "ис",
      date: "27.12.12",
      activeTo: "Осталось 7 дней",
      price: "12 123 321",
      important: false
    },
    {
      title: "Поставка продуктов питания и так далее ледует следующее",
      category: "ис",
      date: "27.12.12",
      activeTo: "Осталось 7 дней",
      price: "12 123 321",
      important: false
    },
    {
      title: "Поставка продуктов питания и так далее ледует следующее",
      category: "ис",
      date: "27.12.12",
      activeTo: "Осталось 7 дней",
      price: "12 123 321",
      important: false
    },
    {
      title: "Поставка продуктов питания и так далее ледует следующее",
      category: "ис",
      date: "27.12.12",
      activeTo: "Осталось 7 дней",
      price: "12 123 321",
      important: true
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={noticesList}
        renderItem={({ item }) => <NoticesListItem {...item}/>}
      />
    </View>
  );
};

NoticesScreen.propTypes = {
  navigation: PropTypes.object
};

NoticesScreen.defaultProps = {
  navigation: {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const NocticeStack = createStackNavigator(
  {
    NoticesScreen: {
      screen: NoticesScreen,
      navigationOptions: () => {
        return { header: null };
      }
    },
    NoticeScreen: {
      screen: NoticeScreen,
      navigationOptions: () => ({
        headerTitle: "Извещение"
      })
    }
  },
  {
    headerLayoutPreset: "center"
  }
);

export default NocticeStack;
