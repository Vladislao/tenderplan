import React from "react";
import {
  AsyncStorage,
  Button,
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image
} from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import SvgUri from "react-native-svg-uri";
import KeyListItem from "../components/KeyListItem";
import TagsScreen from "./TagsScreen";
import NoticesScreen from "./NoticesScreen";
import ResponsibleScreen from "./ResponsibleScreen";
import SettingsScreen from "./SettingsScreen";
import SearchScreen from "./SearchScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from "prop-types";
import uuid from 'uuid'

const KeysScreen = props => {
  _keyItemPressed = title => {
    console.log(title)
    props.navigation.navigate("NoticesScreen", {
      itemTitle: title
    });
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate("Auth");
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.contentBlock, styles.firstBlockBorder]}>
          <View style={styles.contentBlockTitle}>
            <SvgUri
              width="25"
              height="25"
              source={require("../assets/keyLogo.svg")}
            />
            <Text style={styles.title}>Ключи</Text>
          </View>
          <KeyListItem
            keyContentBlock
            title="Все"
            number={999}
            allFromList={{ marginTop: 18, marginBottom: 4 }}
          />
          <FlatList
            data={[
              { title: "Стулья офисные", key: "123213123" },
              { title: "Строительство", key: "asdsadw21" },
              { title: "Оргтехника", key: "wqdwq213" },
              { title: "Мебель офисная", key: "asdsa214" }
            ]}
            renderItem={({ item }) => (
              <KeyListItem
                keyContentBlock
                title={item.title}
                number={23}
                key={uuid()}
                onPress={(title) => this._keyItemPressed(title)}
              />
            )}
          />
        </View>
        <View style={styles.contentBlock}>
          <View style={styles.contentBlockTitle}>
            <SvgUri
              width="25"
              height="25"
              source={require("../assets/tagsLogo.svg")}
            />
            <Text style={styles.title}>Метки</Text>
          </View>
          <FlatList
            data={[
              { title: "Участвуем", key: "1221" },
              { title: "Документ отправлен", key: "asdsa12321214dw21" },
              { title: "Юристу", key: "1244" }
            ]}
            renderItem={({ item }) => (
              <KeyListItem
                title={item.title}
                number={23}
                key={uuid()}
                onPress={(title) => this._keyItemPressed(title)}
              />
            )}
            style={{ marginVertical: 17 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

KeysScreen.propTypes = {
  navigation: PropTypes.object,
};

KeysScreen.defaultProps = {
  navigation: {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38465F"
  },
  contentBlockTitle: {
    display: "flex",
    flexDirection: "row"
  },
  firstBlockBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#152B42"
  },
  contentBlock: {
    flex: 1,
    paddingVertical: 19,
    paddingHorizontal: 22
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.41,
    color: "#FFFFFF",
    marginLeft: 15
  }
});

const KeyStack = createStackNavigator(
  {
    KeysScreen: {
      screen: KeysScreen,
      navigationOptions: () => ({
        headerTitle: "Ключи"
      })
    },
    NoticesScreen: {
      screen: NoticesScreen,
      navigationOptions: ({ navigation }) => {
        console.log(navigation);
        const { routeName } = navigation.state.routes[navigation.state.index];
        if (routeName === "NoticeScreen") {
          return { header: null };
        }
        return { headerTitle: "Список извещений" };
      }
    }
  },
  {
    headerLayoutPreset: "center"
  }
);

const KeysTabNavigator = createBottomTabNavigator(
  {
    KeysScreen: {
      screen: KeyStack,
      navigationOptions: () => ({
        title: "Ключи"
      })
    },
    TagsScreen: {
      screen: TagsScreen,
      navigationOptions: () => ({
        title: "Метки"
      })
    },
    ResponsibleScreen: {
      screen: ResponsibleScreen,
      navigationOptions: () => ({
        title: "Ответственные"
      })
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: () => ({
        title: "Настройки"
      })
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: () => ({
        title: "Поиск"
      })
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'KeysScreen') {
          iconName = 'md-key';
        } else if (routeName === 'TagsScreen') {
          iconName = `ios-card`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
    
  }
);

const KeysStackNavigator = createStackNavigator({
  KeysTabNavigator: KeysTabNavigator
});

// export default createAppContainer(StackNavigator);
export default KeysStackNavigator;
